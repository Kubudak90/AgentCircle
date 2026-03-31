// Shared in-memory agent store (server-side only)
// In production: read from contract via viem publicClient

import { MOCK_KOLS, type KOLAgent } from "@/lib/mock-data";
import type { PolicyBundle } from "@/types/schema";

const agents = new Map<string, KOLAgent>(MOCK_KOLS.map((k) => [k.nft.tokenId, k]));
let nextId = MOCK_KOLS.length + 1;

export function getAgent(agentId: string): KOLAgent | undefined {
  return agents.get(agentId);
}

export function getAllAgents(): KOLAgent[] {
  return Array.from(agents.values());
}

export function reindexAgent(oldId: string, newId: string, agent: KOLAgent) {
  agents.delete(oldId);
  agents.set(newId, agent);
}

export function registerAgent(data: {
  name: string;
  operatorWallet: string;
  policyBundleCID?: string;
  teePublicKey?: string;
  description?: string;
  policyBundle?: PolicyBundle;
}): { agentId: string; agent: KOLAgent } {
  const agentId = String(nextId++);
  const agent: KOLAgent = {
    nft: {
      tokenId: agentId,
      owner: data.operatorWallet as `0x${string}`,
      name: data.name,
      description: data.description || "",
      policyBundleCID: data.policyBundleCID || "",
      teeEndpoint: "",
    },
    identity: {
      agentId,
      operatorWallet: data.operatorWallet as `0x${string}`,
      reputationScore: 50,
      activeAdopters: 0,
      latestReceiptCID: null,
    },
    policy: data.policyBundle || {
      version: "1.0",
      sourceGraph: { trackedWalletClusters: [], monitoredVenues: [], eventTypes: [] },
      candidateFilters: { minTokenAgeHours: 0, minLiquidityUSD: 0, maxFDV: null, blacklistedSectors: [], requireContractSafetyScore: 0 },
      riskGuardrails: { maxPositionSizeUSDC: 10000, maxLeverage: 3, dailyLossLimitPercent: 5.0, killSwitchEnabled: true },
    },
    recentReceipts: [],
  };
  agents.set(agentId, agent);
  return { agentId, agent };
}
