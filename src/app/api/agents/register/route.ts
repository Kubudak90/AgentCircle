import { NextRequest, NextResponse } from "next/server";
import { registerAgent, reindexAgent } from "@/lib/agent-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, operatorWallet, policyBundleCID, teePublicKey, description, policyBundle, onChainAgentId } = body;

    if (!name || !operatorWallet) {
      return NextResponse.json({ error: "name and operatorWallet required" }, { status: 400 });
    }

    const result = registerAgent({ name, operatorWallet, policyBundleCID, teePublicKey, description, policyBundle });

    // Override the auto-generated ID with the real on-chain ID if provided
    if (onChainAgentId) {
      reindexAgent(result.agentId, onChainAgentId, result.agent);
      result.agent.nft.tokenId = onChainAgentId;
      result.agent.identity.agentId = onChainAgentId;
      result.agentId = onChainAgentId;
    }

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
