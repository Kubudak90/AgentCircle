/**
 * Test Hypercert minting for AgentCircle.
 * Mints a hypercert on Sepolia for a PolicyBundle.
 *
 * Usage: npx tsx scripts/test-hypercert.ts
 * Requires: PRIVATE_KEY in .env.local (needs Sepolia ETH)
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { mintPolicyHypercert } from "../src/lib/hypercert";

async function main() {
  console.log("=== Hypercert Mint Test ===\n");

  try {
    const result = await mintPolicyHypercert({
      agentName: "Garry's Whale Tracker",
      agentId: "1",
      operatorWallet: "0x557E1E07652B75ABaA667223B11704165fC94d09",
      policyBundleCID: "ipfs://bafybeimockpolicybundle",
      description: "Monitors smart money wallets and large inflows across Hyperliquid and Uniswap V3.",
      workScope: ["crypto-agent", "whale-tracking", "hyperliquid"],
    });

    console.log("Hypercert minted!");
    console.log(`  Tx: ${result.txHash}`);
    console.log(`  Chain: ${result.chain}`);
    console.log(`  Explorer: ${result.explorerUrl}`);
  } catch (err: any) {
    console.error("Failed:", err.message);
    if (err.message.includes("insufficient funds")) {
      console.error("\nYou need Sepolia ETH. Get some from:");
      console.error("  https://sepoliafaucet.com/");
      console.error("  https://faucet.quicknode.com/ethereum/sepolia");
    }
  }
}

main();
