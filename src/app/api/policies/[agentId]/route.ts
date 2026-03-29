import { NextRequest, NextResponse } from "next/server";
import { MOCK_KOLS } from "@/lib/mock-data";

const policies = new Map(MOCK_KOLS.map((k) => [k.nft.tokenId, k.policy]));

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const policy = policies.get(agentId);

  if (!policy) {
    return NextResponse.json({ error: "Policy not found" }, { status: 404 });
  }

  return NextResponse.json({ agentId, policy });
}
