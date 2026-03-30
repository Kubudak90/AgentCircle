"use client";

import { useState } from "react";
import { MOCK_KOLS, type KOLAgent } from "@/lib/mock-data";
import InheritDialog from "@/components/InheritDialog";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";

export default function CirclesPage() {
  const [selected, setSelected] = useState<KOLAgent | null>(null);

  return (
    <div className="min-h-screen bg-[#0c1605] text-[#d9e7c8] selection:bg-[#97d5a3] selection:text-[#003919]">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#18230f]/80 backdrop-blur-xl shadow-[0_0_15px_rgba(37,95,56,0.1)]">
        <div className="flex justify-between items-center px-6 lg:px-8 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-[#97d5a3] tracking-tight uppercase">AgentCircle</Link>
            <div className="hidden md:flex gap-6 text-xs font-medium uppercase tracking-widest">
              <Link href="/" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-all">Discover</Link>
              <span className="text-[#97d5a3] border-b border-[#255f38] pb-0.5">Policy Circles</span>
              <span className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-all cursor-pointer">Live Proofs</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:block bg-[#2d3822] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#97d5a3] border border-[#414941]/30">Lit TEE Verified</span>
            <ConnectButton />
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#2d3822] to-transparent h-px w-full" />
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        {/* Back */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#97d5a3]/70 hover:text-[#97d5a3] transition-colors group">
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            Back to Discover
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16 grid md:grid-cols-[1fr_auto] gap-8 items-end border-b border-[#414941]/10 pb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Policy <span className="text-[#97d5a3]">Circles</span>
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-[#c0c9be] font-medium flex items-center gap-2">
                {MOCK_KOLS.length} agents with TEE-verified execution
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-[#00613d]/20 text-[#80d8a7] rounded-full text-xs font-bold uppercase tracking-wider border border-[#80d8a7]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80d8a7] animate-pulse" />
                Lit TEE Secured
              </span>
            </div>
          </div>
          <Link href="/register" className="bg-gradient-to-r from-[#255f38] to-[#00613d] text-[#d9e7c8] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3 shadow-[0_0_20px_rgba(37,95,56,0.3)] hover:brightness-110 transition-all active:scale-95">
            Register Your Agent
          </Link>
        </header>

        {/* Strategy Feed */}
        <section className="space-y-8 mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-[#d9e7c8]/80">Active Strategies</h2>
            <div className="h-px flex-grow mx-8 bg-[#414941]/20" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#97d5a3] animate-pulse shadow-[0_0_8px_#97d5a3]" />
              <span className="text-[10px] font-mono text-[#8a9389] uppercase">Live Sync</span>
            </div>
          </div>

          {MOCK_KOLS.map((kol, i) => (
            <div key={kol.nft.tokenId} className="bg-[#2d3822]/60 backdrop-blur-xl p-8 border-l-4 border-[#97d5a3] shadow-2xl relative overflow-hidden group hover:bg-[#2d3822]/80 transition-all">
              {/* Background Number */}
              <div className="absolute top-0 right-0 text-[10rem] font-bold text-[#97d5a3]/[0.03] leading-none select-none pointer-events-none -top-12 -right-4">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="grid md:grid-cols-[1fr_240px] gap-8 relative z-10">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-bold">{kol.nft.name}</h3>
                      <span className="text-[10px] bg-[#2d3822] px-2 py-0.5 text-[#97d5a3] border border-[#97d5a3]/20 uppercase tracking-tighter">TEE Verified</span>
                    </div>
                    <p className="text-[#c0c9be]/60 text-sm max-w-lg leading-relaxed">{kol.nft.description}</p>
                  </div>

                  {/* Policy Tags */}
                  <div className="flex flex-wrap gap-2">
                    {kol.policy.sourceGraph.monitoredVenues.map((v) => (
                      <span key={v} className="px-3 py-1 bg-[#18230f] text-xs text-[#c0c9be]/60 border border-[#414941]/20">Source: {v}</span>
                    ))}
                    <span className="px-3 py-1 bg-[#18230f] text-xs text-[#c0c9be]/60 border border-[#414941]/20">
                      Filters: Safety {kol.policy.candidateFilters.requireContractSafetyScore}+
                    </span>
                    <span className="px-3 py-1 bg-[#18230f] text-xs text-[#ffba20]/60 border border-[#ffba20]/10">
                      Risk: {kol.policy.riskGuardrails.dailyLossLimitPercent}% max loss, {kol.policy.riskGuardrails.maxLeverage}x lev
                    </span>
                  </div>

                  {/* TEE Receipts */}
                  <div className="pt-4 border-t border-[#414941]/10">
                    <div className="text-[10px] text-[#8a9389] uppercase tracking-widest mb-3">Recent TEE Receipts</div>
                    <div className="space-y-1.5">
                      {kol.recentReceipts.map((r) => (
                        <div key={r.id} className="flex items-center justify-between bg-[#071102] p-3 cursor-pointer hover:bg-[#141f0b] transition-colors">
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${r.adherent ? "bg-[#97d5a3] shadow-[0_0_8px_#97d5a3]" : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.4)]"}`} />
                            <span className="font-mono text-[10px] text-[#c0c9be]/40">{r.txHash?.slice(0, 8)}...{r.txHash?.slice(-4)}</span>
                            <span className={`font-mono text-[10px] font-bold ${r.adherent ? "text-[#97d5a3]" : "text-red-400"}`}>
                              {r.adherent ? "PASS" : "FAIL"}
                            </span>
                          </div>
                          <span className="text-[9px] font-bold text-[#97d5a3]/60 uppercase tracking-tighter">View on Filecoin</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Score + Button */}
                <div className="flex flex-col justify-between">
                  <div className="text-right">
                    <div className="text-4xl font-bold text-[#97d5a3]">{kol.identity.reputationScore}</div>
                    <div className="text-[10px] text-[#8a9389] uppercase tracking-widest">Rep Score</div>
                    <div className="text-sm text-[#c0c9be]/40 mt-1 font-mono">{kol.identity.activeAdopters} adopters</div>
                    {/* Sparkline */}
                    <div className="flex items-end justify-end gap-1 h-8 mt-4">
                      {[0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 1.0].map((h, j) => (
                        <div key={j} className="w-1 bg-[#97d5a3] rounded-t-sm transition-all" style={{ height: `${h * 100}%`, opacity: 0.2 + h * 0.8 }} />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(kol)}
                    className="w-full bg-[#2d3822] text-[#d9e7c8] font-bold text-xs uppercase tracking-widest py-4 border border-[#414941]/30 hover:bg-[#97d5a3] hover:text-[#003919] transition-all active:scale-95 mt-4"
                  >
                    Inherit Policy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MCP Integration */}
        <section className="bg-[#141f0b] p-12 border border-[#414941]/10 relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[120px] leading-none select-none pointer-events-none font-bold">MCP</div>
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#97d5a3] shadow-[0_0_8px_#97d5a3]" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Agent Integration (MCP)</h2>
            </div>
            <p className="text-[#c0c9be]/60 mb-8 leading-relaxed">
              Connect directly to your local operator terminal via Model Context Protocol. Your agent monitors proofs and inherits policies in real-time — no browser needed.
            </p>
            <div className="bg-[#071102] border border-[#414941]/20 p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#97d5a3]/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#80d8a7]/40" />
                </div>
                <div className="text-[10px] font-mono text-[#8a9389] uppercase tracking-widest">bash — node</div>
              </div>
              <code className="text-[#97d5a3] font-mono text-sm">npx tsx scripts/mcp-server.ts</code>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-[#414941]/10 text-center">
        <div className="text-2xl font-bold text-[#97d5a3]/20 uppercase tracking-tighter mb-4">AgentCircle</div>
        <div className="text-[10px] text-[#8a9389] uppercase tracking-[0.4em]">Private Policy Inheritance Protocol &bull; PL_Genesis 2026</div>
      </footer>

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
