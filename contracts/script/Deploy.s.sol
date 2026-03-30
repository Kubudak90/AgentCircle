// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/AgentPolicyRegistry.sol";

contract DeployScript is Script {
    function run() external {
        address teeKey = vm.envAddress("TEE_PUBLIC_KEY");

        vm.startBroadcast();

        AgentPolicyRegistry registry = new AgentPolicyRegistry();

        // Register demo agents with real TEE key
        registry.registerAgent(
            "Garry's Whale Tracker",
            msg.sender,
            "ipfs://bafybeimockpolicybundle",
            teeKey
        );

        registry.registerAgent(
            "Degen Spartan Perps",
            msg.sender,
            "ipfs://bafybeigdegen002",
            teeKey
        );

        registry.registerAgent(
            "Alpha Liquidity Scanner",
            msg.sender,
            "ipfs://bafybeigalpha003",
            teeKey
        );

        vm.stopBroadcast();
    }
}
