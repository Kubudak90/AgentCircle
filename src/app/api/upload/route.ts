import { NextRequest, NextResponse } from "next/server";
import type { AgentLogReceipt } from "@/types/schema";

async function uploadToStoracha(receipt: AgentLogReceipt): Promise<string> {
  const key = process.env.STORACHA_KEY;
  const spaceDid = process.env.SPACE_DID;

  if (!key || !spaceDid) {
    throw new Error("STORACHA_KEY or SPACE_DID not set");
  }

  const { create } = await import("@web3-storage/w3up-client");
  const client = await create();
  await client.setCurrentSpace(spaceDid as `did:${string}:${string}`);

  const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: "application/json" });
  const file = new File([blob], "agent_log_receipt.json", { type: "application/json" });
  const cid = await client.uploadFile(file);

  return `ipfs://${cid.toString()}`;
}

async function mockUpload(receipt: AgentLogReceipt): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(receipt));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `ipfs://bafybeig${hashHex.slice(0, 50)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body: { receipt: AgentLogReceipt } = await req.json();

    if (!body.receipt) {
      return NextResponse.json({ error: "Missing receipt" }, { status: 400 });
    }

    let cid: string;
    let mode: string;

    try {
      cid = await uploadToStoracha(body.receipt);
      mode = "storacha";
    } catch {
      cid = await mockUpload(body.receipt);
      mode = "mock";
    }

    return NextResponse.json({ cid, mode });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
