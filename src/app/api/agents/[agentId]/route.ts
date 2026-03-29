import { NextRequest, NextResponse } from "next/server";
import { getAgent } from "@/lib/agent-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const agent = getAgent(agentId);

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  return NextResponse.json(agent);
}
