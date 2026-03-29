import { NextRequest, NextResponse } from "next/server";
import { registerAgent } from "@/lib/agent-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, operatorWallet, policyBundleCID, teePublicKey, description } = body;

    if (!name || !operatorWallet) {
      return NextResponse.json({ error: "name and operatorWallet required" }, { status: 400 });
    }

    const result = registerAgent({ name, operatorWallet, policyBundleCID, teePublicKey, description });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
