// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/AgentPolicyRegistry.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        AgentPolicyRegistry registry = new AgentPolicyRegistry();

        // Register demo agents for hackathon
        registry.registerAgent(
            "Garry's Whale Tracker",
            msg.sender,
            "ipfs://bafybeigwhale001",
            msg.sender // TEE key = deployer for demo
        );

        registry.registerAgent(
            "Degen Spartan Perps",
            msg.sender,
            "ipfs://bafybeigdegen002",
            msg.sender
        );

        registry.registerAgent(
            "Alpha Liquidity Scanner",
            msg.sender,
            "ipfs://bafybeigalpha003",
            msg.sender
        );

        vm.stopBroadcast();
    }
}
