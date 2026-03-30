"use client";

import { useState } from "react";
import { MOCK_KOLS, type KOLAgent } from "@/lib/mock-data";
import { REGISTRY_ADDRESS, REGISTRY_CHAIN } from "@/lib/contract";
import { Button } from "@/components/ui/button";
import AgentCard from "@/components/AgentCard";
import MCPSection from "@/components/MCPSection";
import InheritDialog from "@/components/InheritDialog";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";

export default function Home() {
  const [selected, setSelected] = useState<KOLAgent | null>(null);

  const explorerBase = REGISTRY_CHAIN.blockExplorers?.default.url;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="font-mono text-sm tracking-tight text-cobalt font-semibold">AgentCircle</span>
          <span className="hidden sm:block text-xs font-mono text-muted-foreground">Private Policy Inheritance Protocol</span>
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button variant="ghost" size="sm" className="font-mono text-xs">Register Agent</Button>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Agent Listings */}
      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6 flex-1 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium">Policy Circles</h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">{MOCK_KOLS.length} agents with TEE-verified execution</p>
          </div>
        </div>

        {MOCK_KOLS.map((kol) => (
          <AgentCard key={kol.nft.tokenId} kol={kol} onInherit={setSelected} />
        ))}
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border w-full">
        <p className="text-xs font-mono uppercase tracking-widest text-cobalt mb-6">How It Works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-mono text-cobalt text-sm mb-2">01</p>
            <h3 className="text-base font-medium mb-1">Inherit Policy</h3>
            <p className="text-sm text-muted-foreground">Choose an agent&apos;s PolicyBundle. Configure your risk overrides. Your agent adopts the Source Graph, Filters, and Guardrails.</p>
          </div>
          <div>
            <p className="font-mono text-cobalt text-sm mb-2">02</p>
            <h3 className="text-base font-medium mb-1">TEE Verifies</h3>
            <p className="text-sm text-muted-foreground">Lit Protocol TEE enforces the guardrails inside an enclave. Signs every result with ECDSA. You can&apos;t fake the proof.</p>
          </div>
          <div>
            <p className="font-mono text-cobalt text-sm mb-2">03</p>
            <h3 className="text-base font-medium mb-1">On-Chain Receipt</h3>
            <p className="text-sm text-muted-foreground">Receipt submitted to Base Sepolia via ecrecover. Reputation updates. Full log on Filecoin. Anyone can audit.</p>
          </div>
        </div>
      </section>

      {/* MCP Integration */}
      <MCPSection />

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-border w-full flex items-center justify-between text-xs text-muted-foreground font-mono">
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
