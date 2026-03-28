// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AgentPolicyRegistry.sol";

contract AgentPolicyRegistryTest is Test {
    AgentPolicyRegistry registry;

    address owner = address(0xA);
    address operator = address(0xB);
    address tee = address(0xC);
    address follower = address(0xD);

    function setUp() public {
        registry = new AgentPolicyRegistry();
    }

    // ──────────────────── Registration ────────────────────

    function test_registerAgent() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("AlphaBot", operator, "ipfs://policy123", tee);
        assertEq(id, 1);

        AgentPolicyRegistry.Agent memory agent = registry.getAgent(id);
        assertEq(agent.owner, owner);
        assertEq(agent.operatorWallet, operator);
        assertEq(agent.teePublicKey, tee);
        assertEq(agent.reputationScore, 50);
        assertEq(agent.totalExecutions, 0);
        assertEq(agent.activeAdopters, 0);
        assertEq(keccak256(bytes(agent.policyBundleCID)), keccak256(bytes("ipfs://policy123")));
    }

    function test_registerMultipleAgents() public {
        vm.prank(owner);
        uint256 id1 = registry.registerAgent("Bot1", operator, "cid1", tee);
        vm.prank(owner);
        uint256 id2 = registry.registerAgent("Bot2", operator, "cid2", tee);
        assertEq(id1, 1);
        assertEq(id2, 2);
    }

    // ──────────────────── Policy Update ────────────────────

    function test_updatePolicyBundle() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "old_cid", tee);

        vm.prank(owner);
        registry.updatePolicyBundle(id, "new_cid");

        AgentPolicyRegistry.Agent memory agent = registry.getAgent(id);
        assertEq(keccak256(bytes(agent.policyBundleCID)), keccak256(bytes("new_cid")));
    }

    function test_updatePolicyBundle_revertNotOwner() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        vm.prank(follower);
        vm.expectRevert(AgentPolicyRegistry.NotOwner.selector);
        registry.updatePolicyBundle(id, "hacked_cid");
    }

    // ──────────────────── Receipt Submission ────────────────────

    function test_submitReceipt_adherenceTrue_boostsReputation() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        // Starting rep = 50, gap = 50, boost = 5 → 55
        vm.prank(tee);
        registry.submitExecutionReceipt(id, "receipt_cid_1", true);

        AgentPolicyRegistry.Agent memory agent = registry.getAgent(id);
        assertEq(agent.reputationScore, 55);
        assertEq(agent.totalExecutions, 1);
        assertEq(keccak256(bytes(agent.latestReceiptCID)), keccak256(bytes("receipt_cid_1")));
    }

    function test_submitReceipt_adherenceFalse_dropsReputation() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        // Starting rep = 50, drop 20 → 30
        vm.prank(tee);
        registry.submitExecutionReceipt(id, "receipt_bad", false);

        assertEq(registry.getReputation(id), 30);
    }

    function test_submitReceipt_revertNotTEE() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        vm.prank(follower);
        vm.expectRevert(AgentPolicyRegistry.NotTEE.selector);
        registry.submitExecutionReceipt(id, "fake", true);
    }

    function test_submitReceipt_reputationFloorAtZero() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        // 50 → 30 → 10 → 0
        vm.startPrank(tee);
        registry.submitExecutionReceipt(id, "r1", false);
        registry.submitExecutionReceipt(id, "r2", false);
        registry.submitExecutionReceipt(id, "r3", false);
        vm.stopPrank();

        assertEq(registry.getReputation(id), 0);
    }

    function test_submitReceipt_reputationCeiling() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        // Submit many successful receipts — should approach 100 but never exceed
        vm.startPrank(tee);
        for (uint256 i = 0; i < 50; i++) {
            registry.submitExecutionReceipt(id, "r", true);
        }
        vm.stopPrank();

        uint256 rep = registry.getReputation(id);
        assertGe(rep, 90);
        assertLe(rep, 100);
    }

    // ──────────────────── Adopter Tracking ────────────────────

    function test_joinAndLeaveCircle() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        vm.prank(follower);
        registry.joinCircle(id);
        assertEq(registry.getAgent(id).activeAdopters, 1);
        assertTrue(registry.isAdopter(id, follower));

        vm.prank(follower);
        registry.leaveCircle(id);
        assertEq(registry.getAgent(id).activeAdopters, 0);
        assertFalse(registry.isAdopter(id, follower));
    }

    function test_joinCircle_revertAlreadyAdopter() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        vm.startPrank(follower);
        registry.joinCircle(id);
        vm.expectRevert(AgentPolicyRegistry.AlreadyAdopter.selector);
        registry.joinCircle(id);
        vm.stopPrank();
    }

    function test_leaveCircle_revertNotAdopter() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        vm.prank(follower);
        vm.expectRevert(AgentPolicyRegistry.NotAdopter.selector);
        registry.leaveCircle(id);
    }

    // ──────────────────── Edge: nonexistent agent ────────────────────

    function test_revertOnNonexistentAgent() public {
        vm.prank(tee);
        vm.expectRevert(AgentPolicyRegistry.AgentNotFound.selector);
        registry.submitExecutionReceipt(999, "cid", true);
    }
}
