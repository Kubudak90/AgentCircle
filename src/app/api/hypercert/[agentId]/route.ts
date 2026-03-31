import { NextRequest, NextResponse } from "next/server";

// In-memory store for minted hypercerts (production: query The Graph subgraph)
const hypercerts = new Map<string, { txHash: string; chain: string; explorerUrl: string; mintedAt: number }>();

export function recordHypercert(agentId: string, data: { txHash: string; chain: string; explorerUrl: string }) {
  hypercerts.set(agentId, { ...data, mintedAt: Date.now() });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const cert = hypercerts.get(agentId);

  if (!cert) {
    return NextResponse.json({ agentId, hypercert: null, message: "No hypercert minted for this agent" });
  }

  return NextResponse.json({ agentId, hypercert: cert });
}
