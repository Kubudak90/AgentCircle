import { NextRequest, NextResponse } from "next/server";
import { getAgent, registerAgent } from "@/lib/agent-store";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { REGISTRY_ADDRESS, REGISTRY_ABI } from "@/lib/contract";

const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL || "https://base-sepolia-rpc.publicnode.com";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(rpcUrl),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;

  // Try in-memory store first
  const agent = getAgent(agentId);
  if (agent) {
    return NextResponse.json(agent);
  }

  // Fall back to on-chain read
  try {
    const onChain = await publicClient.readContract({
      address: REGISTRY_ADDRESS,
      abi: REGISTRY_ABI,
      functionName: "getAgent",
      args: [BigInt(agentId)],
    });

    // Check if agent exists (name is empty for non-existent agents)
    if (!onChain.name) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Hydrate into in-memory store so subsequent reads are fast
    const { agent: hydratedAgent } = registerAgent({
      name: onChain.name,
      operatorWallet: onChain.operatorWallet,
      policyBundleCID: onChain.policyBundleCID,
      teePublicKey: onChain.teePublicKey,
      description: "",
    });

    // Override auto-generated ID with actual on-chain ID
    hydratedAgent.nft.tokenId = agentId;
    hydratedAgent.identity.agentId = agentId;
    hydratedAgent.identity.reputationScore = Number(onChain.reputationScore);
    hydratedAgent.identity.activeAdopters = Number(onChain.activeAdopters);
    hydratedAgent.identity.latestReceiptCID = onChain.latestReceiptCID || null;

    return NextResponse.json(hydratedAgent);
  } catch (err: any) {
    console.error(`Failed to read agent ${agentId} from contract:`, err.message);
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }
}
