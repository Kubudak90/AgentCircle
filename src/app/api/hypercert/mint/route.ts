import { NextRequest, NextResponse } from "next/server";
import { mintPolicyHypercert } from "@/lib/hypercert";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentName, agentId, operatorWallet, policyBundleCID, description, workScope } = body;

    if (!agentName || !agentId || !operatorWallet) {
      return NextResponse.json({ error: "agentName, agentId, and operatorWallet required" }, { status: 400 });
    }

    const result = await mintPolicyHypercert({
      agentName,
      agentId,
      operatorWallet,
      policyBundleCID: policyBundleCID || "ipfs://pending",
      description: description || `PolicyBundle for ${agentName}`,
      workScope: workScope || [],
    });

    return NextResponse.json(result);
  } catch (e: any) {
    console.error("Hypercert mint error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
