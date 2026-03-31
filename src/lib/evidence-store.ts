// In-memory evidence store linking TEE execution receipts to agent hypercerts
// Each evidence entry proves a TEE execution happened and was verified

export interface EvidenceEntry {
  receiptCID: string;
  teeSignature: string;
  adherenceVerified: boolean;
  followerWallet: string;
  timestamp: number;
  metrics?: { latency_ms: number; slippage_bps: number };
}

const evidenceMap = new Map<string, EvidenceEntry[]>();

export function addEvidence(agentId: string, entry: EvidenceEntry): number {
  if (!evidenceMap.has(agentId)) {
    evidenceMap.set(agentId, []);
  }
  evidenceMap.get(agentId)!.push(entry);
  return evidenceMap.get(agentId)!.length;
}

export function getEvidence(agentId: string): EvidenceEntry[] {
  return evidenceMap.get(agentId) || [];
}
