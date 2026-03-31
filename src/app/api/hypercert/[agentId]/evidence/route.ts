import { NextRequest, NextResponse } from "next/server";
import { addEvidence, getEvidence } from "@/lib/evidence-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const evidence = getEvidence(agentId);
  return NextResponse.json({ agentId, evidence, count: evidence.length });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params;
    const body = await req.json();
    const { receiptCID, teeSignature, adherenceVerified, followerWallet, metrics } = body;

    if (!receiptCID || !teeSignature) {
      return NextResponse.json({ error: "receiptCID and teeSignature required" }, { status: 400 });
    }

    const count = addEvidence(agentId, {
      receiptCID,
      teeSignature,
      adherenceVerified: !!adherenceVerified,
      followerWallet: followerWallet || "unknown",
      timestamp: Date.now(),
      metrics,
    });

    return NextResponse.json({ success: true, agentId, count });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
