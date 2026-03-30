"use client";

import { useState } from "react";
import { MOCK_KOLS, type KOLAgent } from "@/lib/mock-data";
import InheritDialog from "@/components/InheritDialog";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";

export default function CirclesPage() {
  const [selected, setSelected] = useState<KOLAgent | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1]">
      {/* Top Nav */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-[#c1c6d7] hover:text-[#adc6ff] transition-all text-sm font-medium">
            <span className="text-lg">&larr;</span>
            Back to Discover
          </Link>
          <div className="h-5 w-px bg-white/10" />
          <span className="text-lg font-bold tracking-tight text-[#adc6ff]">AgentCircle</span>
        </div>
        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Featured Group Header */}
        <section className="mb-16 relative overflow-hidden rounded-2xl p-10 bg-[#201f1f]/40 backdrop-blur-xl border border-[#8b90a0]/15">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#ffba20]/10 text-[#ffba20] text-[10px] font-bold uppercase tracking-widest border border-[#ffba20]/20">Verified Protocol</span>
                <span className="text-[#adc6ff] text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff]" />
                  Lit TEE Secured
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#adc6ff] to-[#4b8eff] bg-clip-text text-transparent">
                Policy Circles
              </h1>
              <p className="text-[#c1c6d7] text-lg max-w-2xl font-light leading-relaxed">
                {MOCK_KOLS.length} agents with TEE-verified execution. Inherit operational policies — source graphs, filters, and risk guardrails — from proven operators.
              </p>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Strategy Feed */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c1c6d7]">Live Strategy Feed</h2>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-medium text-green-500/80">LIVE SYNC</span>
              </div>
            </div>

            {MOCK_KOLS.map((kol) => (
              <div key={kol.nft.tokenId} className="bg-[#201f1f]/40 backdrop-blur-xl border border-[#8b90a0]/15 rounded-2xl p-6 transition-all hover:bg-[#2a2a2a]/60 group relative border-l-4 border-l-transparent hover:border-l-[#adc6ff]">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-[#adc6ff] text-lg flex items-center gap-2">
                      {kol.nft.name}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffba20]" title="TEE Verified" />
                    </h3>
                    <p className="text-xs text-[#c1c6d7]/60 mt-0.5">
                      {kol.identity.activeAdopters} adopters &middot; {kol.identity.reputationScore} rep &middot; TEE Verified
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#adc6ff] font-bold text-lg font-mono">{kol.identity.reputationScore}</div>
                    <div className="text-[10px] text-[#c1c6d7]/40 uppercase tracking-widest">Rep Score</div>
                  </div>
                </div>

                <p className="text-[#c1c6d7]/70 mb-5 text-sm leading-relaxed">{kol.nft.description}</p>

                {/* Policy Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {kol.policy.sourceGraph.monitoredVenues.map((v) => (
                    <span key={v} className="px-3 py-1 rounded-full bg-[#141414] text-xs text-[#c1c6d7]/70 border border-white/5">Source: {v}</span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-[#141414] text-xs text-[#c1c6d7]/70 border border-white/5">
                    Filters: Safety {kol.policy.candidateFilters.requireContractSafetyScore}+
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#141414] text-xs text-[#ffba20]/70 border border-[#ffba20]/10">
                    Guardrails: {kol.policy.riskGuardrails.dailyLossLimitPercent}% max loss
                  </span>
                </div>

                {/* Recent Receipts */}
                <div className="bg-[#0a0a0a]/50 rounded-xl p-4 mb-6">
                  <div className="text-[10px] font-bold text-[#c1c6d7]/30 uppercase tracking-widest mb-3">Recent TEE Receipts</div>
                  <div className="flex flex-col gap-1.5">
                    {kol.recentReceipts.map((r) => (
                      <div key={r.id} className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full ${r.adherent ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.4)]"}`} />
                          <span className="font-mono text-[#c1c6d7]/50">{r.txHash?.slice(0, 8)}...{r.txHash?.slice(-4)}</span>
                          <span className={`font-mono text-xs ${r.pnlPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {r.pnlPercent >= 0 ? "+" : ""}{r.pnlPercent.toFixed(1)}%
                          </span>
                        </div>
                        <span className={`text-xs font-bold ${r.adherent ? "text-green-400" : "text-red-400"}`}>
                          {r.adherent ? "PASS" : "FAIL"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelected(kol)}
                  className="w-full py-3.5 bg-[#4b8eff] hover:bg-[#adc6ff] text-[#00285c] font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#4b8eff]/10"
                >
                  Inherit Policy &rarr; My Agent
                </button>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* TEE Terminal */}
            <div className="bg-[#201f1f]/40 backdrop-blur-xl border border-[#8b90a0]/15 rounded-2xl overflow-hidden">
              <div className="bg-[#0a0a0a] p-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/40" />
                  <div className="w-3 h-3 rounded-full bg-[#ffba20]/40" />
                  <div className="w-3 h-3 rounded-full bg-[#adc6ff]/40" />
                </div>
                <span className="text-[10px] font-mono text-[#c1c6d7]/30">LIT-TEE-NODE-042</span>
              </div>
              <div className="p-5 font-mono text-[11px] h-[320px] overflow-y-auto bg-black/40 space-y-2 leading-relaxed">
                <div className="text-[#adc6ff]">&gt; Initializing enclave...</div>
                <div className="text-[#c1c6d7]/50">[SYSTEM] Loading PolicyBundle from Filecoin</div>
                <div className="text-[#c1c6d7]/50">[AUTH] Verifying TEE Signature via ecrecover</div>
                <div className="text-[#ffba20] animate-pulse">&gt; Executing in Lit TEE enclave...</div>
                <div className="text-[#c1c6d7]/50">[INFO] Evaluating Source Graph: Hyperliquid</div>
                <div className="text-[#c1c6d7]/50">[INFO] Applying Candidate Filters...</div>
                <div className="text-[#adc6ff]">&gt; Checking Risk Guardrails...</div>
                <div className="text-[#c1c6d7]/50">[GUARD] dailyLossLimit: 5.0% — OK</div>
                <div className="text-[#c1c6d7]/50">[GUARD] maxLeverage: 3x — OK</div>
                <div className="text-[#c1c6d7]/50">[GUARD] killSwitch: ACTIVE</div>
                <div className="text-green-400 font-bold mt-3">PASS — Policy Adherence Verified</div>
                <div className="text-[#adc6ff]">&gt; Signing receipt with ECDSA (Lit PKP)...</div>
                <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#c1c6d7]/40 uppercase">CID</span>
                    <span className="text-[#adc6ff]">bafybeig...a3f9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#c1c6d7]/40 uppercase">Chain</span>
                    <span className="text-[#adc6ff]">Base Sepolia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#c1c6d7]/40 uppercase">Block</span>
                    <span className="text-[#adc6ff]">#39536603</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MCP Section */}
            <div className="bg-[#201f1f]/40 backdrop-blur-xl border border-[#8b90a0]/15 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-2">Agent Integration (MCP)</h3>
              <p className="text-[#c1c6d7]/50 text-sm mb-6">Connect your agents directly via Model Context Protocol to inherit policies automatically.</p>
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5 mb-6 relative">
                <code className="text-[#adc6ff] text-xs font-mono">npx tsx scripts/mcp-server.ts</code>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#adc6ff]/5 border border-[#adc6ff]/10">
                <div className="text-xs">
                  <div className="font-bold">Universal Connector</div>
                  <div className="text-[#c1c6d7]/50">Works with Claude Code, Cursor &amp; any MCP client</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Inherit Dialog */}
      {selected && (
        <InheritDialog
          kol={selected}
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        />
      )}
    </div>
  );
}
