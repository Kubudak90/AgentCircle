"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import ConnectButton from "@/components/ConnectButton";
import PolicySection from "@/components/PolicySection";
import ReceiptFeed from "@/components/ReceiptFeed";
import InheritDialog from "@/components/InheritDialog";
import ProofCard from "@/components/ProofCard";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import type { KOLAgent } from "@/lib/mock-data";

function ElapsedTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-[10px] font-mono text-[#97d5a3]/60">{seconds}s</span>;
}

export default function AgentDetailPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = use(params);
  const { address } = useAccount();
  const [agent, setAgent] = useState<KOLAgent | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInherit, setShowInherit] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // Fetch agent data + circle members + hypercert status
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [agentRes, circleRes] = await Promise.all([
          fetch(`/api/agents/${agentId}`),
          fetch(`/api/circles/${agentId}`),
        ]);

        if (agentRes.ok) {
          const data = await agentRes.json();
          setAgent(data.agent || data);
        }

        if (circleRes.ok) {
          const data = await circleRes.json();
          setMembers(data.members || []);
        }
      } catch (err) {
        console.error("Failed to load agent:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [agentId]);

  // Check if current user is a member
  useEffect(() => {
    if (address && members.length > 0) {
      setIsMember(members.includes(address.toLowerCase()) || members.includes(address));
    }
  }, [address, members]);

  const handleLeaveCircle = async () => {
    if (!address) return;
    try {
      const res = await fetch("/api/circles/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, followerWallet: address }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsMember(false);
        setMembers((prev) => prev.filter((m) => m !== address && m !== address.toLowerCase()));
        if (agent) {
          setAgent({ ...agent, identity: { ...agent.identity, activeAdopters: data.activeAdopters } });
        }
        toast.success("Left the circle");
      }
    } catch {
      toast.error("Failed to leave circle");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c1605] text-[#d9e7c8] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#97d5a3] animate-pulse" />
          <span className="font-mono text-sm text-[#97d5a3]">Loading agent...</span>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#0c1605] text-[#d9e7c8] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Agent Not Found</h1>
        <Link href="/circles" className="text-[#97d5a3] hover:underline">Back to Circles</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1605] text-[#d9e7c8] selection:bg-[#97d5a3] selection:text-[#003919]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#18230f]/80 backdrop-blur-xl shadow-[0_0_15px_rgba(37,95,56,0.1)]">
        <div className="flex justify-between items-center px-6 lg:px-8 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-[#97d5a3] tracking-tight uppercase">AgentCircle</Link>
            <div className="hidden md:flex gap-6 text-xs font-medium uppercase tracking-widest">
              <Link href="/" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-all">Discover</Link>
              <Link href="/circles" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-all">Policy Circles</Link>
              <Link href="/mcp" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-all">MCP</Link>
              <Link href="/#live-proofs" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-all">Live Proofs</Link>
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
          <Link href="/circles" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#97d5a3]/70 hover:text-[#97d5a3] transition-colors group">
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            Back to Circles
          </Link>
        </div>

        {/* Agent Header */}
        <header className="mb-12 border-b border-[#414941]/10 pb-12">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{agent.nft.name}</h1>
                <span className="text-[10px] bg-[#2d3822] px-2 py-0.5 text-[#97d5a3] border border-[#97d5a3]/20 uppercase tracking-tighter">TEE Verified</span>
              </div>
              <p className="text-[#c0c9be]/60 text-sm max-w-lg leading-relaxed mb-4">{agent.nft.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#c0c9be]/40">
                <span>Operator: {agent.identity.operatorWallet.slice(0, 8)}...{agent.identity.operatorWallet.slice(-4)}</span>
                <span>Agent ID: {agent.identity.agentId}</span>
                <span>CID: {agent.nft.policyBundleCID.slice(0, 20)}...</span>
              </div>
            </div>

            <div className="text-right space-y-4">
              <div>
                <div className="text-5xl font-bold text-[#97d5a3]">{agent.identity.reputationScore}</div>
                <div className="text-[10px] text-[#8a9389] uppercase tracking-widest">Rep Score</div>
              </div>
              <div className="flex gap-6 justify-end text-center">
                <div>
                  <div className="text-xl font-bold font-mono">{agent.identity.activeAdopters}</div>
                  <div className="text-[10px] text-[#8a9389] uppercase tracking-widest">Adopters</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#97d5a3]">{agent.recentReceipts.length}</div>
                  <div className="text-[10px] text-[#8a9389] uppercase tracking-widest">Receipts</div>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowInherit(true)}
                  className="bg-[#2d3822] text-[#d9e7c8] font-bold text-xs uppercase tracking-widest px-6 py-3 border border-[#414941]/30 hover:bg-[#97d5a3] hover:text-[#003919] transition-all active:scale-95"
                >
                  Inherit Policy
                </button>
                {isMember && (
                  <button
                    onClick={handleLeaveCircle}
                    className="bg-transparent text-red-400/60 font-bold text-xs uppercase tracking-widest px-4 py-3 border border-red-400/20 hover:bg-red-400/10 hover:text-red-400 transition-all active:scale-95"
                  >
                    Leave
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* PolicyBundle */}
        <section className="mb-12">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#d9e7c8]/80 mb-6">PolicyBundle</h2>
          <PolicySection policy={agent.policy} />
        </section>

        {/* TEE Receipts */}
        <section className="mb-12">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#d9e7c8]/80 mb-6">TEE Execution Receipts</h2>
          <div className="bg-[#111111]/80 rounded-xl border border-white/[0.06] overflow-hidden">
            <ReceiptFeed receipts={agent.recentReceipts} />
          </div>
        </section>

        {/* Circle Members */}
        <section className="mb-12">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#d9e7c8]/80 mb-6">
            Circle Members
            <span className="text-sm font-normal text-[#8a9389] ml-3">{members.length} active</span>
          </h2>
          {members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {members.map((m) => (
                <div key={m} className="bg-[#071102] p-3 font-mono text-xs text-[#c0c9be]/50 border border-[#414941]/10">
                  {m.slice(0, 10)}...{m.slice(-6)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#8a9389]">No members yet. Be the first to inherit this policy.</p>
          )}
        </section>

        {/* Impact Proof Certificate (ProofCard) */}
        <section className="mb-12">
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#d9e7c8]/80 mb-6">Impact Proof Certificate</h2>
          <ProofCard agentId={agentId} agent={agent} />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-[#414941]/10 text-center">
        <div className="text-2xl font-bold text-[#97d5a3]/20 uppercase tracking-tighter mb-4">AgentCircle</div>
        <div className="text-[10px] text-[#8a9389] uppercase tracking-[0.4em]">Private Policy Inheritance Protocol &bull; PL_Genesis 2026</div>
      </footer>

      {/* Inherit Dialog */}
      {showInherit && (
        <InheritDialog
          kol={agent}
          open={showInherit}
          onOpenChange={(open) => !open && setShowInherit(false)}
        />
      )}
    </div>
  );
}
