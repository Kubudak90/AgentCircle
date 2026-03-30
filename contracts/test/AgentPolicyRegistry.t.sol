// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AgentPolicyRegistry.sol";

contract AgentPolicyRegistryTest is Test {
    AgentPolicyRegistry registry;

    address owner = address(0xA00A);
    address operator = address(0xB00B);
    address follower = address(0xD00D);
    address relayer = address(0xE00E);

    // TEE keypair — Foundry vm.sign uses private key to produce real ECDSA sigs
    uint256 constant TEE_PK = 0xBEEF;
    address tee; // derived from TEE_PK

    function setUp() public {
        registry = new AgentPolicyRegistry();
        tee = vm.addr(TEE_PK);
    }

    // ──────────────────── Helpers ────────────────────

    function _signReceipt(uint256 agentId, bool adherence, string memory cid)
        internal
        view
        returns (bytes memory)
    {
        bytes32 messageHash = keccak256(abi.encodePacked(block.chainid, address(registry), agentId, adherence, cid));
        bytes32 ethHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(TEE_PK, ethHash);
        return abi.encodePacked(r, s, v);
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

    // ──────────────────── Receipt Submission (ECDSA) ────────────────────

    function test_submitReceipt_validSig_boostsReputation() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        bytes memory sig = _signReceipt(id, true, "receipt_cid_1");

        // Anyone can submit (relayer pays gas)
        vm.prank(relayer);
        registry.submitExecutionReceipt(id, "receipt_cid_1", true, sig);

        AgentPolicyRegistry.Agent memory agent = registry.getAgent(id);
        assertEq(agent.reputationScore, 55); // 50 + gap/10 = 50 + 5
        assertEq(agent.totalExecutions, 1);
    }

    function test_submitReceipt_validSig_dropsReputation() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        bytes memory sig = _signReceipt(id, false, "receipt_bad");

        vm.prank(relayer);
        registry.submitExecutionReceipt(id, "receipt_bad", false, sig);

        assertEq(registry.getReputation(id), 30); // 50 - 20
    }

    function test_submitReceipt_revertInvalidSig() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        // Sign with wrong private key
        uint256 wrongPk = 0xDEAD;
        bytes32 messageHash = keccak256(abi.encodePacked(block.chainid, address(registry), id, true, "fake"));
        bytes32 ethHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(wrongPk, ethHash);
        bytes memory badSig = abi.encodePacked(r, s, v);

        vm.prank(relayer);
        vm.expectRevert(AgentPolicyRegistry.InvalidSignature.selector);
        registry.submitExecutionReceipt(id, "fake", true, badSig);
    }

    function test_submitReceipt_revertTamperedData() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        // Sign for adherence=true but submit with adherence=false
        bytes memory sig = _signReceipt(id, true, "receipt_cid");

        vm.prank(relayer);
        vm.expectRevert(AgentPolicyRegistry.InvalidSignature.selector);
        registry.submitExecutionReceipt(id, "receipt_cid", false, sig); // tampered bool
    }

    function test_submitReceipt_revertTamperedCID() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        bytes memory sig = _signReceipt(id, true, "real_cid");

        vm.prank(relayer);
        vm.expectRevert(AgentPolicyRegistry.InvalidSignature.selector);
        registry.submitExecutionReceipt(id, "tampered_cid", true, sig); // tampered CID
    }

    function test_submitReceipt_anyoneCanSubmit() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        bytes memory sig = _signReceipt(id, true, "receipt_1");

        // Follower submits (not TEE, not owner, not relayer)
        vm.prank(follower);
        registry.submitExecutionReceipt(id, "receipt_1", true, sig);
        assertEq(registry.getAgent(id).totalExecutions, 1);

        // Owner submits next one
        bytes memory sig2 = _signReceipt(id, true, "receipt_2");
        vm.prank(owner);
        registry.submitExecutionReceipt(id, "receipt_2", true, sig2);
        assertEq(registry.getAgent(id).totalExecutions, 2);
    }

    function test_submitReceipt_reputationFloorAtZero() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        // 50 → 30 → 10 → 0
        for (uint256 i = 0; i < 3; i++) {
            string memory cid = string(abi.encodePacked("r", vm.toString(i)));
            bytes memory sig = _signReceipt(id, false, cid);
            vm.prank(relayer);
            registry.submitExecutionReceipt(id, cid, false, sig);
        }

        assertEq(registry.getReputation(id), 0);
    }

    function test_submitReceipt_reputationCeiling() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        for (uint256 i = 0; i < 50; i++) {
            string memory cid = string(abi.encodePacked("r", vm.toString(i)));
            bytes memory sig = _signReceipt(id, true, cid);
            vm.prank(relayer);
            registry.submitExecutionReceipt(id, cid, true, sig);
        }

        uint256 rep = registry.getReputation(id);
        assertGe(rep, 90);
        assertLe(rep, 100);
    }

    // ──────────────────── Replay Protection ────────────────────

    function test_submitReceipt_revertReplay() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        bytes memory sig = _signReceipt(id, true, "receipt_1");

        vm.prank(relayer);
        registry.submitExecutionReceipt(id, "receipt_1", true, sig);

        // Same signature again → revert
        vm.prank(relayer);
        vm.expectRevert(AgentPolicyRegistry.ReceiptAlreadyUsed.selector);
        registry.submitExecutionReceipt(id, "receipt_1", true, sig);
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

    // ──────────────────── ERC-8126: Risk Verification ────────────────────

    function test_getAgentVerification_defaults() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);
        (bool verified, uint8 score) = registry.getAgentVerification(id);
        assertTrue(verified);
        assertEq(score, 15); // default low risk
    }

    function test_setRiskScore() public {
        vm.prank(owner);
        uint256 id = registry.registerAgent("Bot", operator, "cid", tee);

        vm.prank(owner);
        registry.setRiskScore(id, 45, true);
        (, uint8 score) = registry.getAgentVerification(id);
        assertEq(score, 45);
    }

    // ──────────────────── ERC-8183: Escrow ────────────────────

    function test_createAndFundJob() public {
        vm.prank(owner);
        uint256 agentId = registry.registerAgent("Bot", operator, "cid", tee);

        vm.deal(follower, 1 ether);
        vm.prank(follower);
        uint256 jobId = registry.createAndFundJob{value: 0.01 ether}(agentId);
        assertEq(jobId, 1);

        AgentPolicyRegistry.Job memory job = registry.getJob(jobId);
        assertEq(job.agentId, agentId);
        assertEq(job.client, follower);
        assertEq(job.fundedAmount, 0.01 ether);
        assertEq(uint8(job.status), uint8(AgentPolicyRegistry.JobStatus.Funded));
    }

    function test_createAndFundJob_revertHighRisk() public {
        vm.prank(owner);
        uint256 agentId = registry.registerAgent("Bot", operator, "cid", tee);
        vm.prank(owner);
        registry.setRiskScore(agentId, 85, true); // HIGH RISK

        vm.deal(follower, 1 ether);
        vm.prank(follower);
        vm.expectRevert(AgentPolicyRegistry.RiskTooHigh.selector);
        registry.createAndFundJob{value: 0.01 ether}(agentId);
    }

    function test_completeJob_releasesEscrow() public {
        vm.prank(owner);
        uint256 agentId = registry.registerAgent("Bot", operator, "cid", tee);

        vm.deal(follower, 1 ether);
        vm.prank(follower);
        uint256 jobId = registry.createAndFundJob{value: 0.1 ether}(agentId);

        uint256 ownerBalBefore = owner.balance;
        vm.prank(tee); // TEE is the evaluator
        registry.completeJob(jobId);

        assertEq(owner.balance, ownerBalBefore + 0.1 ether);
        assertEq(uint8(registry.getJob(jobId).status), uint8(AgentPolicyRegistry.JobStatus.Completed));
    }

    function test_claimRefund_afterExpiry() public {
        vm.prank(owner);
        uint256 agentId = registry.registerAgent("Bot", operator, "cid", tee);

        vm.deal(follower, 1 ether);
        vm.prank(follower);
        uint256 jobId = registry.createAndFundJob{value: 0.05 ether}(agentId);

        // Fast forward past expiry
        vm.warp(block.timestamp + 2 hours);
        uint256 followerBalBefore = follower.balance;
        vm.prank(follower);
        registry.claimRefund(jobId);

        assertEq(follower.balance, followerBalBefore + 0.05 ether);
    }

    // ──────────────────── Edge: nonexistent agent ────────────────────

    function test_revertOnNonexistentAgent() public {
        bytes memory sig = _signReceipt(999, true, "cid");
        vm.prank(relayer);
        vm.expectRevert(AgentPolicyRegistry.AgentNotFound.selector);
        registry.submitExecutionReceipt(999, "cid", true, sig);
    }
}
