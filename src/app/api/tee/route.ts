import { NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";

/**
 * GET /api/tee — Returns the TEE public key derived from TEE_PRIVATE_KEY.
 * This is the address that signs all execution receipts.
 * Agents must register with this as their teePublicKey for on-chain receipt verification to work.
 */
export async function GET() {
  const pk = process.env.TEE_PRIVATE_KEY || process.env.PRIVATE_KEY || "";
  if (!pk) {
    return NextResponse.json({ error: "TEE_PRIVATE_KEY not configured" }, { status: 500 });
  }

  const pkHex = (pk.startsWith("0x") ? pk : `0x${pk}`) as `0x${string}`;
  const account = privateKeyToAccount(pkHex);

  return NextResponse.json({
    teePublicKey: account.address,
    description: "This is the ECDSA signer for all TEE execution receipts. Register agents with this key for on-chain verification to work.",
  });
}
