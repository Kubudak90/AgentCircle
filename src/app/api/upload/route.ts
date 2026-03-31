import { NextRequest, NextResponse } from "next/server";
import type { AgentLogReceipt } from "@/types/schema";

const BRIDGE_URL = process.env.FILECOIN_BRIDGE_URL || "http://localhost:3001";

async function uploadViaBridge(receipt: AgentLogReceipt): Promise<{
  cid: string;
  storage: string;
  url: string | null;
}> {
  const res = await fetch(`${BRIDGE_URL}/store`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: JSON.stringify(receipt),
      filename: "agent_log.json",
    }),
  });

  if (!res.ok) throw new Error(`Bridge returned ${res.status}`);

  const data = await res.json();

  return {
    cid: data.cid,
    storage: data.storage === "filecoin-foc" ? "filecoin-foc" : "local-fallback",
    url: data.url || null,
  };
}

async function mockFallback(receipt: AgentLogReceipt): Promise<{
  cid: string;
  storage: string;
  url: string | null;
}> {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(receipt));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return {
    cid: `ipfs://bafybeig${hashHex.slice(0, 50)}`,
    storage: "local-fallback",
    url: null,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: { receipt: AgentLogReceipt } = await req.json();

    if (!body.receipt) {
      return NextResponse.json({ error: "Missing receipt" }, { status: 400 });
    }

    let result: { cid: string; storage: string; url: string | null };

    try {
      result = await uploadViaBridge(body.receipt);
    } catch (err: any) {
      console.error("Filecoin bridge unavailable:", err.message);
      result = await mockFallback(body.receipt);
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { cid: "ipfs://error_fallback", storage: "local-fallback", url: null },
      { status: 200 }
    );
  }
}
