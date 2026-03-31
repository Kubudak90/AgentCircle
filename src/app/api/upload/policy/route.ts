import { NextRequest, NextResponse } from "next/server";
import type { PolicyBundle } from "@/types/schema";

const BRIDGE_URL = process.env.FILECOIN_BRIDGE_URL || "http://localhost:3001";

export async function POST(req: NextRequest) {
  try {
    const body: { policy: PolicyBundle } = await req.json();

    if (!body.policy || !body.policy.version) {
      return NextResponse.json({ error: "Missing or invalid policy" }, { status: 400 });
    }

    let cid: string;
    let storage: string;

    try {
      const res = await fetch(`${BRIDGE_URL}/store`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: JSON.stringify(body.policy),
          filename: "policy_bundle.json",
        }),
      });

      if (!res.ok) throw new Error(`Bridge returned ${res.status}`);

      const data = await res.json();
      cid = data.cid;
      storage = data.storage === "filecoin-foc" ? "filecoin-foc" : "local-fallback";
    } catch (err: any) {
      console.error("Filecoin bridge unavailable for policy upload:", err.message);
      // Fallback: deterministic CID from policy hash
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(body.policy));
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      cid = `ipfs://bafybeig${hashHex.slice(0, 50)}`;
      storage = "local-fallback";
    }

    return NextResponse.json({ cid, storage });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
