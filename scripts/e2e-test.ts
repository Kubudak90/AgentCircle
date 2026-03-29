/**
 * E2E Integration Test
 * Runs the full AgentCircle flow against localhost:3000
 *
 * Usage: pnpm dev (in another terminal) then: pnpm e2e
 */

const API = process.env.API_BASE || "http://localhost:3000";

async function step(name: string, fn: () => Promise<any>): Promise<any> {
  process.stdout.write(`  ${name}... `);
  try {
    const result = await fn();
    console.log("OK");
    return result;
  } catch (e: any) {
    console.log(`FAIL: ${e.message}`);
    throw e;
  }
}

async function main() {
  console.log("\n=== AgentCircle E2E Test ===\n");

  // 1. Read agent
  const agent = await step("GET /api/agents/1", async () => {
    const res = await fetch(`${API}/api/agents/1`);
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  });
  console.log(`    Agent: ${agent.nft.name}, Rep: ${agent.identity.reputationScore}`);

  // 2. Read policy
  const policyRes = await step("GET /api/policies/1", async () => {
    const res = await fetch(`${API}/api/policies/1`);
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  });
  console.log(`    Venues: ${policyRes.policy.sourceGraph.monitoredVenues.join(", ")}`);

  // 3. Join circle
  await step("POST /api/circles/join", async () => {
    const res = await fetch(`${API}/api/circles/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId: "1", followerWallet: "0xE2ETest000000000000000000000000000000001" }),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  });

  // 4. Execute via TEE
  const execResult = await step("POST /api/execute (TEE + ECDSA)", async () => {
    const res = await fetch(`${API}/api/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: {
          followerWallet: "0xE2ETest000000000000000000000000000000001",
          inheritedPolicyId: "1",
          targetTxHash: null,
        },
        policy: policyRes.policy,
        mockTradeResult: { pnlPercent: -6.0, slippageBps: 45, latencyMs: 320, txHash: null },
      }),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  });
  console.log(`    Adherence: ${execResult.receipt.policyAdherenceVerified}`);
  console.log(`    Violations: ${execResult.violations.length > 0 ? execResult.violations.join(", ") : "none"}`);
  console.log(`    Signature: ${execResult.receipt.teeSignature.slice(0, 22)}...`);

  // 5. Upload receipt
  const uploadResult = await step("POST /api/upload (Storacha)", async () => {
    const res = await fetch(`${API}/api/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receipt: execResult.receipt }),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  });
  console.log(`    CID: ${uploadResult.cid}`);
  console.log(`    Mode: ${uploadResult.mode}`);

  // 6. Read circle
  const circle = await step("GET /api/circles/1", async () => {
    const res = await fetch(`${API}/api/circles/1`);
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  });
  console.log(`    Members: ${circle.activeAdopters}`);

  // 7. Leave circle
  await step("POST /api/circles/leave", async () => {
    const res = await fetch(`${API}/api/circles/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId: "1", followerWallet: "0xE2ETest000000000000000000000000000000001" }),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  });

  console.log("\n=== All 7 steps passed ===\n");
}

main().catch(() => {
  console.error("\nE2E test failed. Is pnpm dev running?");
  process.exit(1);
});
