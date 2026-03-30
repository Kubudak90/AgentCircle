"use client";

import { useState } from "react";
import { MOCK_KOLS, type KOLAgent } from "@/lib/mock-data";
import { REGISTRY_ADDRESS, REGISTRY_CHAIN } from "@/lib/contract";
import { Button } from "@/components/ui/button";
import AgentCard from "@/components/AgentCard";
import MCPSection from "@/components/MCPSection";
import InheritDialog from "@/components/InheritDialog";
import ConnectButton from "@/components/ConnectButton";
import ParticleBackground from "@/components/ParticleBackground";
import Link from "next/link";

export default function Home() {
  const [selected, setSelected] = useState<KOLAgent | null>(null);

  const explorerBase = REGISTRY_CHAIN.blockExplorers?.default.url;

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/70 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm tracking-tight text-receipt-green font-bold">AgentCircle</span>
            <span className="hidden sm:inline-block w-px h-4 bg-white/10" />
            <span className="hidden sm:block text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.15em]">Policy Inheritance Protocol</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button variant="ghost" size="sm" className="font-mono text-[10px] text-muted-foreground/60 hover:text-receipt-green uppercase tracking-wider">Register</Button>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Agent Listings */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-6 flex-1 w-full relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-medium tracking-tight">Policy Circles</h1>
            <p className="text-[10px] font-mono text-muted-foreground/40 mt-1 uppercase tracking-[0.15em]">{MOCK_KOLS.length} agents with TEE-verified execution</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-receipt-green animate-pulse-subtle" />
            <span className="text-[10px] font-mono text-receipt-green/70 uppercase tracking-wider">Live</span>
          </div>
        </div>

        {MOCK_KOLS.map((kol) => (
          <AgentCard key={kol.nft.tokenId} kol={kol} onInherit={setSelected} />
        ))}
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/[0.04] w-full relative z-10">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cobalt/70 mb-8">How It Works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-mono text-receipt-green text-sm mb-2">01</p>
            <h3 className="text-base font-medium mb-1 tracking-tight">Inherit Policy</h3>
            <p className="text-sm text-muted-foreground/50 leading-relaxed">Choose an agent&apos;s PolicyBundle. Configure your risk overrides. Your agent adopts the Source Graph, Filters, and Guardrails.</p>
          </div>
          <div>
            <p className="font-mono text-receipt-green text-sm mb-2">02</p>
            <h3 className="text-base font-medium mb-1 tracking-tight">TEE Verifies</h3>
            <p className="text-sm text-muted-foreground/50 leading-relaxed">Lit Protocol TEE enforces the guardrails inside an enclave. Signs every result with ECDSA. You can&apos;t fake the proof.</p>
          </div>
          <div>
            <p className="font-mono text-receipt-green text-sm mb-2">03</p>
            <h3 className="text-base font-medium mb-1 tracking-tight">On-Chain Receipt</h3>
            <p className="text-sm text-muted-foreground/50 leading-relaxed">Receipt submitted to Base Sepolia via ecrecover. Reputation updates. Full log on Filecoin. Anyone can audit.</p>
          </div>
        </div>
      </section>

      {/* MCP Integration */}
      <div className="relative z-10">
        <MCPSection />
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] w-full flex items-center justify-between text-[10px] text-muted-foreground/30 font-mono relative z-10">
        <span>AgentCircle v1.0 — Base Sepolia</span>
        {explorerBase && (
          <a
            href={`${explorerBase}/address/${REGISTRY_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cobalt transition-colors"
          >
            View Contract
          </a>
        )}
      </footer>

      {/* Inherit Dialog (untouched) */}
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
