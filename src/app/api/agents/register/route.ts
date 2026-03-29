import { NextRequest, NextResponse } from "next/server";
import { MOCK_KOLS } from "@/lib/mock-data";

// In-memory store (production: read from contract via viem publicClient)
const agents = new Map(MOCK_KOLS.map((k) => [k.nft.tokenId, k]));
let nextId = MOCK_KOLS.length + 1;

export async function POST(req: NextRequest) {
  try {
    const { name, operatorWallet, policyBundleCID, teePublicKey } = await req.json();

    if (!name || !operatorWallet) {
      return NextResponse.json({ error: "name and operatorWallet required" }, { status: 400 });
    }

    const agentId = String(nextId++);
    const agent = {
      nft: {
        tokenId: agentId,
        owner: operatorWallet,
        name,
        description: "",
        policyBundleCID: policyBundleCID || "",
        teeEndpoint: "",
      },
      identity: {
        agentId,
        operatorWallet,
        reputationScore: 50,
        activeAdopters: 0,
        latestReceiptCID: null,
      },
      policy: {
        version: "1.0",
        sourceGraph: { trackedWalletClusters: [], monitoredVenues: [], eventTypes: [] },
        candidateFilters: { minTokenAgeHours: 0, minLiquidityUSD: 0, maxFDV: null, blacklistedSectors: [], requireContractSafetyScore: 0 },
        riskGuardrails: { maxPositionSizeUSDC: 10000, maxLeverage: 3, dailyLossLimitPercent: 5.0, killSwitchEnabled: true },
      },
    };

    agents.set(agentId, agent);

    return NextResponse.json({ agentId, agent });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Export for other routes to access
export { agents };
