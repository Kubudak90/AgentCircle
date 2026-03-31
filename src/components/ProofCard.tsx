"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { KOLAgent } from "@/lib/mock-data";

interface HypercertData {
  txHash: string;
  chain: string;
  explorerUrl: string;
  claimId?: string;
  claimUri?: string;
  metadataCID?: string;
  mintedAt: number;
}

interface EvidenceEntry {
  receiptCID: string;
  teeSignature: string;
  adherenceVerified: boolean;
  followerWallet: string;
  timestamp: number;
  metrics?: { latency_ms: number; slippage_bps: number };
}

function ElapsedTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-[10px] font-mono text-[#97d5a3]/60">{seconds}s</span>;
}

export default function ProofCard({ agentId, agent }: { agentId: string; agent: KOLAgent | null }) {
  const [hypercert, setHypercert] = useState<HypercertData | null>(null);
  const [evidence, setEvidence] = useState<EvidenceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [hcRes, evRes] = await Promise.all([
          fetch(`/api/hypercert/${agentId}`),
          fetch(`/api/hypercert/${agentId}/evidence`),
        ]);
        if (hcRes.ok) {
          const data = await hcRes.json();
          if (data.hypercert) setHypercert(data.hypercert);
        }
        if (evRes.ok) {
          const data = await evRes.json();
          setEvidence(data.evidence || []);
        }
      } catch {
        // Silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [agentId]);

  const handleMint = async () => {
    if (!agent) return;
    setMinting(true);
    try {
      const res = await fetch("/api/hypercert/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentName: agent.nft.name,
          agentId: agent.identity.agentId,
          operatorWallet: agent.identity.operatorWallet,
          policyBundleCID: agent.nft.policyBundleCID,
          description: agent.nft.description,
          workScope: agent.policy.sourceGraph.monitoredVenues,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setHypercert({
          txHash: data.txHash,
          chain: data.chain,
          explorerUrl: data.explorerUrl,
          claimId: data.claimId,
          claimUri: data.claimUri,
          metadataCID: data.metadataCID,
          mintedAt: Date.now(),
        });
        toast.success("Hypercert minted!", {
          description: `Tx: ${data.txHash.slice(0, 14)}...`,
          action: { label: "View", onClick: () => window.open(data.explorerUrl, "_blank") },
        });
      } else {
        const err = await res.json();
        toast.error("Mint failed", { description: err.error });
      }
    } catch (err: any) {
      toast.error("Mint failed", { description: err.message });
    } finally {
      setMinting(false);
    }
  };

  const passCount = evidence.filter((e) => e.adherenceVerified).length;
  const failCount = evidence.length - passCount;
  const adherenceRate = evidence.length > 0 ? Math.round((passCount / evidence.length) * 100) : 0;
  const repScore = agent?.identity.reputationScore || 0;
  const overallScore = Math.round(
    adherenceRate * 0.4 + repScore * 0.3 + Math.min(evidence.length * 10, 100) * 0.2 + (hypercert ? 100 : 0) * 0.1
  );

  if (loading) {
    return (
      <div className="bg-[#141f0b] p-8 border border-[#414941]/10 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#97d5a3] animate-pulse" />
        <span className="text-sm text-[#8a9389]">Loading impact data...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#141f0b] border border-[#414941]/10 overflow-hidden">
      {/* Certificate Header */}
      <div className="bg-[#0c1605] border-b border-[#00FF9C]/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/30 flex items-center justify-center">
            <span className="text-[#00FF9C] text-xs font-bold">◆</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#00FF9C]">Impact Proof Certificate</p>
            <p className="text-[10px] text-[#c0c9be]/30 font-mono">AgentCircle × Hypercerts</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#00FF9C] font-mono">{overallScore}</div>
          <div className="text-[9px] text-[#8a9389] uppercase tracking-widest">Impact Score</div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Verification Layers */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#97d5a3]">Verification Chain</p>
          <div className="space-y-2">
            {[
              {
                label: "ERC-8004 Identity",
                status: true,
                detail: `Agent ID: ${agentId} | Rep: ${repScore}/100`,
                link: `https://sepolia.basescan.org/address/0x899bd273ad6c1e1191df43a3e8756e773517a20b`,
                linkText: "Contract",
              },
              {
                label: "PolicyBundle (Filecoin)",
                status: !!agent?.nft.policyBundleCID,
                detail: agent?.nft.policyBundleCID ? `CID: ${agent.nft.policyBundleCID.slice(0, 25)}...` : "Not uploaded",
                link: null,
                linkText: null,
              },
              {
                label: "Hypercert NFT (ERC-1155)",
                status: !!hypercert,
                detail: hypercert ? `Claim: ${hypercert.claimId || "pending"} | Tx: ${hypercert.txHash.slice(0, 14)}...` : "Not minted",
                link: hypercert?.explorerUrl || null,
                linkText: hypercert ? "Basescan" : null,
              },
              {
                label: "TEE Evidence",
                status: evidence.length > 0,
                detail: evidence.length > 0 ? `${evidence.length} receipts | ${adherenceRate}% adherence` : "No executions yet",
                link: null,
                linkText: null,
              },
            ].map((layer) => (
              <div key={layer.label} className="flex items-center gap-3 bg-[#0c1605]/60 p-3 rounded">
                <span className={`w-2 h-2 rounded-full shrink-0 ${layer.status ? "bg-[#00FF9C] shadow-[0_0_6px_#00FF9C]" : "bg-[#414941]"}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold">{layer.label}</span>
                  <span className="text-[10px] text-[#c0c9be]/30 ml-2">{layer.detail}</span>
                </div>
                {layer.link && (
                  <a href={layer.link} target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-[#8ba3ff] hover:text-[#8ba3ff]/80 shrink-0">
                    {layer.linkText} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Feed */}
        {evidence.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#97d5a3]">Linked Evidence</p>
              <div className="flex gap-2 text-[10px] font-mono">
                <span className="text-[#00FF9C]">{passCount} PASS</span>
                {failCount > 0 && <span className="text-[#ff6b6b]">{failCount} FAIL</span>}
              </div>
            </div>
            {/* Adherence bar */}
            <div className="h-1.5 bg-[#414941]/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#00FF9C] rounded-full transition-all" style={{ width: `${adherenceRate}%` }} />
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {evidence.slice(-5).reverse().map((e, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-mono px-2 py-1.5 bg-[#0c1605]/40 rounded">
                  <span className={`w-1.5 h-1.5 rounded-full ${e.adherenceVerified ? "bg-[#00FF9C]" : "bg-[#ff6b6b]"}`} />
                  <span className="text-[#c0c9be]/40 truncate flex-1">{e.receiptCID.slice(0, 30)}...</span>
                  <span className={`font-bold ${e.adherenceVerified ? "text-[#00FF9C]" : "text-[#ff6b6b]"}`}>
                    {e.adherenceVerified ? "PASS" : "FAIL"}
                  </span>
                  <span className="text-[#c0c9be]/20">{e.metrics?.latency_ms}ms</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mint / Status */}
        {!hypercert ? (
          <div className="space-y-3">
            <p className="text-xs text-[#c0c9be]/40">
              Mint an impact claim to record this PolicyBundle&apos;s contribution on-chain as an ERC-1155 NFT on the HypercertMinter contract.
            </p>
            <button
              onClick={handleMint}
              disabled={minting}
              className="w-full bg-gradient-to-r from-[#255f38] to-[#00613d] text-[#d9e7c8] py-3 text-xs font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
            >
              {minting ? "Minting Hypercert..." : "Mint Impact Proof (Hypercert)"}
            </button>
            {minting && (
              <div className="flex items-center gap-3 justify-center">
                <span className="w-2 h-2 rounded-full bg-[#97d5a3] animate-pulse" />
                <span className="text-[10px] font-mono text-[#c0c9be]/40">On-chain mint 30-60s...</span>
                <ElapsedTimer />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="bg-[#0c1605] border border-[#00FF9C]/10 rounded-lg p-3 space-y-1 text-[10px] font-mono text-[#c0c9be]/40">
              <p>What this proves: This ERC-1155 NFT on HypercertMinter records the PolicyBundle as a verifiable impact claim.</p>
              <p>Evidence: {evidence.length} TEE receipts linked, each with ECDSA signature + Filecoin CID.</p>
              <p>Evaluation: {adherenceRate}% adherence rate across {evidence.length} executions.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a href={hypercert.explorerUrl} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#97d5a3]/10 border border-[#97d5a3]/20 text-[#97d5a3] text-[10px] font-mono font-bold hover:bg-[#97d5a3]/20 transition-all">
                Verify Tx on Basescan →
              </a>
              <a href="https://sepolia.basescan.org/address/0xC2d179166bc9dbB00A03686a5b17eCe2224c2704" target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#8ba3ff]/10 border border-[#8ba3ff]/20 text-[#8ba3ff] text-[10px] font-mono font-bold hover:bg-[#8ba3ff]/20 transition-all">
                HypercertMinter Contract →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
