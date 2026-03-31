import { NextRequest, NextResponse } from "next/server";

const BRIDGE_URL = process.env.FILECOIN_BRIDGE_URL || "http://localhost:3001";

/**
 * GET /api/verify?cid=xxx — Verify and retrieve data from Filecoin bridge by CID.
 * Returns the stored content + source (filecoin-foc or local).
 */
export async function GET(req: NextRequest) {
  const cid = req.nextUrl.searchParams.get("cid");

  if (!cid) {
    return NextResponse.json({ error: "Missing cid parameter" }, { status: 400 });
  }

  // Strip ipfs:// prefix if present
  const cleanCID = cid.replace(/^ipfs:\/\//, "");

  try {
    const res = await fetch(`${BRIDGE_URL}/retrieve/${cleanCID}`);

    if (!res.ok) {
      return NextResponse.json({
        verified: false,
        cid: cleanCID,
        error: "CID not found in storage",
        bridgeStatus: "reachable",
      });
    }

    const data = await res.json();

    return NextResponse.json({
      verified: true,
      cid: cleanCID,
      source: data.source, // "filecoin-foc" or "local"
      content: typeof data.content === "string" ? JSON.parse(data.content) : data.content,
    });
  } catch {
    // Bridge not running
    return NextResponse.json({
      verified: false,
      cid: cleanCID,
      error: "Filecoin bridge unreachable (port 3001). Run: pnpm bridge",
      bridgeStatus: "unreachable",
    });
  }
}
