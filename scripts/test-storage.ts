/**
 * Step 1.3: Storacha / Filecoin Upload Script
 *
 * Takes a mock AgentLogReceipt and uploads it as JSON to decentralized storage.
 * Returns the IPFS CID (Content Identifier).
 *
 * Production path: w3up-client → Storacha → Filecoin
 * Fallback: if STORACHA_KEY / SPACE_DID are missing, returns a mock CID.
 */

import type { AgentLogReceipt } from "../src/types/schema.js";

// ─────────────────────────────────────────────────────────
// 1. Mock Receipt (same shape as Step 1.2 TEE output)
// ─────────────────────────────────────────────────────────

const mockReceipt: AgentLogReceipt = {
  followerWallet: "0xFollower1234567890abcdef1234567890abcdef",
  providerAgentId: "1",
  timestamp: Date.now(),
  policyAdherenceVerified: false,
  executionSuccess: true,
  metrics: {
    latency_ms: 320,
    slippage_bps: 45,
  },
  onChainTxHash: "0xabc123def456789000000000000000000000000000000000000000000000dead",
  teeSignature: "0xTEE_SIG_PLACEHOLDER_abc123",
};

// ─────────────────────────────────────────────────────────
// 2. Production Upload (w3up-client SDK)
// ─────────────────────────────────────────────────────────

async function uploadToStoracha(receipt: AgentLogReceipt): Promise<string> {
  const key = process.env.STORACHA_KEY;
  const spaceDid = process.env.SPACE_DID;

  if (!key || !spaceDid) {
    throw new Error("STORACHA_KEY or SPACE_DID not set");
  }

  // Dynamic import to avoid top-level errors when env vars are missing
  const { create } = await import("@web3-storage/w3up-client");

  const client = await create();

  // Login with the stored key (base64-encoded agent archive)
  const { Signer } = await import("@ucanto/principal/ed25519");
  const principal = Signer.parse(key);

  // @ts-ignore — w3up internal agent setup
  const store = client.agent;

  // Set the space
  await client.setCurrentSpace(spaceDid as `did:${string}:${string}`);

  // Create a File-like blob from the receipt JSON
  const blob = new Blob([JSON.stringify(receipt, null, 2)], {
    type: "application/json",
  });
  const file = new File([blob], "agent_log_receipt.json", {
    type: "application/json",
  });

  // Upload and get CID
  const cid = await client.uploadFile(file);
  return `ipfs://${cid.toString()}`;
}

// ─────────────────────────────────────────────────────────
// 3. Mock Fallback (deterministic CID from receipt hash)
// ─────────────────────────────────────────────────────────

async function mockUpload(receipt: AgentLogReceipt): Promise<string> {
  // Generate a deterministic mock CID from receipt content
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(receipt));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Simulate bafy... CIDv1 format (not a real CID, but recognizable)
  return `ipfs://bafybeig${hashHex.slice(0, 50)}`;
}

// ─────────────────────────────────────────────────────────
// 4. Main
// ─────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║  Step 1.3: Storacha / Filecoin — Receipt Upload Test ║");
  console.log("╚══════════════════════════════════════════════════════╝\n");

  console.log("📋 AgentLogReceipt to upload:");
  console.log(JSON.stringify(mockReceipt, null, 2));
  console.log("");

  let cid: string;
  let mode: string;

  try {
    cid = await uploadToStoracha(mockReceipt);
    mode = "REAL (Storacha → Filecoin)";
  } catch (e: any) {
    const reason = e.message.includes("STORACHA_KEY")
      ? "env vars not set (STORACHA_KEY / SPACE_DID)"
      : e.message;
    console.log(`⚠️  Storacha upload skipped: ${reason}`);
    console.log("   Falling back to mock CID generation...\n");
    cid = await mockUpload(mockReceipt);
    mode = "MOCK (deterministic hash)";
  }

  console.log("─── Upload Result ───");
  console.log(`   Mode: ${mode}`);
  console.log(`   CID:  ${cid}`);
  console.log("");
  console.log("✅ This CID will be passed to AgentPolicyRegistry.submitExecutionReceipt()");
  console.log("   on-chain in Phase 2.\n");

  return cid;
}

main().catch(console.error);

export { uploadToStoracha, mockUpload };
