import { NextRequest, NextResponse } from "next/server";
import { getMemberCount, getMemberList } from "@/lib/circle-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;

  return NextResponse.json({
    agentId,
    activeAdopters: getMemberCount(agentId),
    members: getMemberList(agentId),
  });
}
