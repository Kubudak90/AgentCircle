import { NextResponse } from "next/server";
import { getAllAgents } from "@/lib/agent-store";

export async function GET() {
  const agents = getAllAgents();
  return NextResponse.json({ agents });
}
