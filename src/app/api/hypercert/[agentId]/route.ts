import { NextRequest, NextResponse } from "next/server";

export interface HypercertRecord {
  txHash: string;
  chain: string;
  explorerUrl: string;
  mintedAt: number;
  claimId?: string;
  claimUri?: string;
  metadataCID?: string;
  totalUnits?: string;
}

// In-memory store for minted hypercerts (production: query The Graph subgraph)
const hypercerts = new Map<string, HypercertRecord>();

export function recordHypercert(agentId: string, data: Omit<HypercertRecord, "mintedAt">) {
  hypercerts.set(agentId, { ...data, mintedAt: Date.now() });
}

export function getHypercert(agentId: string): HypercertRecord | undefined {
  return hypercerts.get(agentId);
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
