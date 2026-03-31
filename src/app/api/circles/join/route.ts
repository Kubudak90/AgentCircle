import { NextRequest, NextResponse } from "next/server";
import { getMembers } from "@/lib/circle-store";
import { getAgent } from "@/lib/agent-store";

export async function POST(req: NextRequest) {
  try {
    const { agentId, followerWallet } = await req.json();

    if (!agentId || !followerWallet) {
      return NextResponse.json({ error: "agentId and followerWallet required" }, { status: 400 });
    }

    const members = getMembers(agentId);

    if (members.has(followerWallet)) {
      return NextResponse.json({ error: "Already a member" }, { status: 409 });
    }

    members.add(followerWallet);

    // Update adopter count in agent store
    const agent = getAgent(agentId);
    if (agent) {
      agent.identity.activeAdopters = members.size;
    }

    return NextResponse.json({
      success: true,
      agentId,
      activeAdopters: members.size,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
