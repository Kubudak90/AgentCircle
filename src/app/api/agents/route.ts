import { NextRequest, NextResponse } from "next/server";
import { getAllAgents, getAgent, registerAgent, reindexAgent } from "@/lib/agent-store";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { REGISTRY_ADDRESS, REGISTRY_ABI } from "@/lib/contract";

const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL || "https://base-sepolia-rpc.publicnode.com";
const publicClient = createPublicClient({ chain: baseSepolia, transport: http(rpcUrl) });

let hydrated = false;

async function hydrateFromChain() {
  if (hydrated) return;
  hydrated = true;

  try {
    // Read nextAgentId to know how many agents exist on-chain
    const nextId = await publicClient.readContract({
      address: REGISTRY_ADDRESS,
      abi: [...REGISTRY_ABI, { type: "function", name: "nextAgentId", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" }] as const,
      functionName: "nextAgentId",
    }) as bigint;

    // Hydrate any agents not already in the store
    for (let i = 1; i < Number(nextId); i++) {
      const id = String(i);
      if (getAgent(id)) continue; // Already in store

      try {
        const onChain = await publicClient.readContract({
          address: REGISTRY_ADDRESS,
          abi: REGISTRY_ABI,
          functionName: "getAgent",
          args: [BigInt(i)],
        });

        if (!onChain.name) continue;

        const { agent } = registerAgent({
          name: onChain.name,
          operatorWallet: onChain.operatorWallet,
          policyBundleCID: onChain.policyBundleCID,
          teePublicKey: onChain.teePublicKey,
          description: "",
        });

        reindexAgent(agent.nft.tokenId, id, agent);
        agent.nft.tokenId = id;
        agent.identity.agentId = id;
        agent.identity.reputationScore = Number(onChain.reputationScore);
        agent.identity.activeAdopters = Number(onChain.activeAdopters);
        agent.identity.latestReceiptCID = onChain.latestReceiptCID || null;
      } catch {
        // Skip agents that fail to read
      }
    }
  } catch (err) {
    console.error("Failed to hydrate agents from chain:", err);
  }
}

// Curated listing — only show agents with real policies.
// All agents still accessible via /api/agents/[id] directly.
const LISTED_AGENTS = new Set(["1", "2", "3", "23"]);

export async function GET(req: NextRequest) {
  await hydrateFromChain();
  const all = req.nextUrl.searchParams.get("all") === "true";
  const agents = getAllAgents().filter((a) => all || LISTED_AGENTS.has(a.nft.tokenId));
  return NextResponse.json({ agents });
}
