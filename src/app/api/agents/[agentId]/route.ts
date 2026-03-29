import { NextRequest, NextResponse } from "next/server";
import { MOCK_KOLS } from "@/lib/mock-data";

const agents = new Map(MOCK_KOLS.map((k) => [k.nft.tokenId, k]));

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const agent = agents.get(agentId);

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  return NextResponse.json(agent);
}
