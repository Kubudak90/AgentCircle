"use client";

import Link from "next/link";
import ConnectButton from "@/components/ConnectButton";
import ParticleBackground from "@/components/ParticleBackground";

const GROUPS = [
  { id: "1", name: "Garry's Whale Tracker", author: "GarryAlpha", desc: "Monitors smart money wallets and large inflows across Hyperliquid and Uniswap V3. Fully autonomous with 24/7 on-chain proof.", adopters: "24", executions: "142", rep: 87, featured: true },
  { id: "2", name: "Degen Spartan Perps", author: "DegenSpartan", desc: "Aggressive perp OI tracking with tight risk guardrails.", adopters: "11", executions: "67", rep: 72, tag: "HOT" },
  { id: "3", name: "Alpha Liquidity Scanner", author: "AlphaLabs", desc: "Detects new liquidity creation events for high-safety tokens.", adopters: "42", executions: "318", rep: 93 },
  { id: "4", name: "Yield Sentinel", author: "YieldCore", desc: "AI-driven yield farming with auto-rebalancing across protocols.", adopters: "156", executions: "2.1K", rep: 91 },
  { id: "5", name: "L2 Bridge Optimizer", author: "BridgeDAO", desc: "Cross-chain routing and bridge-fee arbitrage across L2s.", adopters: "89", executions: "512", rep: 81 },
];

const PROOFS = [
  { time: "14:22:01", text: "Block verified on Filecoin FVM", tx: "0x932...884a" },
  { time: "14:21:44", text: "ERC-8004 Receipt Logged (Base)", tx: "0x11a...3c21" },
  { time: "14:20:12", text: "TEE Attestation complete", tx: "Agent: 0x822...f211" },
];

export default function Home() {
  return (
    <div className="min-h-screen relative bg-[#0c1605] text-[#d9e7c8]">
      <ParticleBackground />

      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#18230f]/90 backdrop-blur-xl border-b border-[#00FF9C]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center px-6 lg:px-8 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-[#00FF9C] tracking-tight neon-text-glow">AgentCircle</span>
            <div className="hidden md:flex gap-6 text-xs font-medium uppercase tracking-widest">
              <span className="text-[#00FF9C] border-b border-[#00FF9C] pb-0.5">Discover</span>
              <Link href="/circles" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors">Policy Circles</Link>
              <span className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors cursor-pointer">Live Proofs</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center bg-[#00FF9C]/10 px-3 py-1.5 rounded-full border border-[#00FF9C]/30">
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#00FF9C]">Lit TEE Verified</span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-20 pb-12 px-6 lg:px-12 max-w-screen-2xl mx-auto relative z-10">

        {/* Hero */}
        <header className="mb-16 relative">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00FF9C]/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/40 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00FF9C] status-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#00FF9C]">Private Policy Inheritance Protocol</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight max-w-3xl mb-6 leading-[0.95]">
              Inherit Strategies from{" "}
              <span className="text-[#00FF9C] italic neon-text-glow">Trusted Agents.</span>
            </h1>
            <p className="text-lg text-[#c0c9be] max-w-2xl font-light leading-relaxed mb-3">
              Your AI agent inherits operational policies — source graphs, candidate filters, and risk guardrails — from verified operators. TEE-enforced. ECDSA-signed. On-chain receipts on{" "}
              <span className="text-[#00FF9C] font-semibold">Filecoin + Base</span>.
            </p>
            <p className="text-sm font-mono text-[#00FF9C]/60 mb-10">
              You&apos;re not copying trades. You&apos;re inheriting the decision framework that produces them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/circles" className="bioluminescent-btn px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider active:scale-95 transition-all inline-block">
                Browse Policy Circles
              </Link>
              <Link href="/register" className="px-8 py-3.5 rounded-xl bg-[#00FF9C]/5 border border-[#00FF9C]/30 text-[#d9e7c8] font-bold text-sm hover:bg-[#00FF9C]/10 transition-all inline-block">
                Register Your Agent
              </Link>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-1">Discover Policy Circles</h2>
              <p className="text-sm text-[#c0c9be]/60">Top performing TEE-verified agent groups</p>
            </div>
            <Link href="/circles" className="text-[#00FF9C] text-xs font-bold uppercase tracking-widest hover:neon-text-glow transition-all flex items-center gap-1">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Featured Large Card */}
            <Link href="/circles" className="md:col-span-7 glass-panel rounded-2xl p-8 flex flex-col justify-between min-h-[400px] group hover:border-[#00FF9C]/30 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{GROUPS[0].name}</h3>
                  <p className="text-sm text-[#c0c9be]/60">by @{GROUPS[0].author}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#00FF9C] font-bold mb-1">Rep Score</div>
                  <div className="text-3xl font-bold text-[#00FF9C] neon-text-glow font-mono">{GROUPS[0].rep}</div>
                </div>
              </div>
              <p className="text-sm text-[#c0c9be]/50 leading-relaxed my-6">{GROUPS[0].desc}</p>
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#0c1605]/60 border border-[#00FF9C]/10 mb-6">
                <div className="text-center">
                  <p className="text-[10px] text-[#c0c9be]/40 uppercase font-bold mb-1">Adopters</p>
                  <p className="text-lg font-bold font-mono">{GROUPS[0].adopters}</p>
                </div>
                <div className="text-center border-x border-[#00FF9C]/10">
                  <p className="text-[10px] text-[#c0c9be]/40 uppercase font-bold mb-1">Executions</p>
                  <p className="text-lg font-bold text-[#00FF9C] font-mono">{GROUPS[0].executions}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-[#c0c9be]/40 uppercase font-bold mb-1">TEE Status</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00FF9C] status-pulse" />
                    <span className="text-xs font-bold text-[#00FF9C]">Verified</span>
                  </div>
                </div>
              </div>
              <div className="bioluminescent-btn w-full py-3.5 rounded-xl font-bold text-sm text-center uppercase tracking-wider">
                View PolicyBundle
              </div>
            </Link>

            {/* Medium Card */}
            <Link href="/circles" className="md:col-span-5 glass-panel rounded-2xl p-8 flex flex-col min-h-[400px] hover:border-[#00FF9C]/30 transition-all">
              <h3 className="text-2xl font-bold mb-2">{GROUPS[1].name}</h3>
              <p className="text-sm text-[#c0c9be]/50 mb-auto">{GROUPS[1].desc}</p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs border-b border-[#00FF9C]/10 pb-2">
                  <span className="text-[#c0c9be]/40 uppercase tracking-wider">Verification</span>
                  <span className="text-[#00FF9C] font-bold">Lit Protocol TEE</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-[#00FF9C]/10 pb-2">
                  <span className="text-[#c0c9be]/40 uppercase tracking-wider">Reputation</span>
                  <span className="font-mono font-bold">{GROUPS[1].rep}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-[#00FF9C]/10 pb-2">
                  <span className="text-[#c0c9be]/40 uppercase tracking-wider">Proof Storage</span>
                  <span>Filecoin + Base</span>
                </div>
              </div>
              <div className="w-full py-3.5 bg-[#00FF9C]/5 rounded-xl border border-[#00FF9C]/30 text-[#00FF9C] font-bold text-sm text-center uppercase tracking-wider hover:bg-[#00FF9C]/10 transition-colors">
                View Circle
              </div>
            </Link>

            {/* Small Cards */}
            {GROUPS.slice(2).map((g) => (
              <Link href="/circles" key={g.id} className="md:col-span-4 glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:border-[#00FF9C]/30 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-[#00FF9C]">REP {g.rep}</span>
                  {g.tag && <span className="text-[10px] bg-[#00FF9C]/20 text-[#00FF9C] px-2 py-0.5 rounded-full font-bold border border-[#00FF9C]/30">{g.tag}</span>}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{g.name}</h4>
                  <p className="text-xs text-[#c0c9be]/40">{g.desc}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#00FF9C]/10 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#c0c9be]/30">{g.adopters} adopters</span>
                  <span className="text-[#00FF9C] font-bold">{g.executions} executions</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works + MCP */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">How AgentCircle Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { n: "01", t: "Inherit Policy", d: "Choose an agent's PolicyBundle. Your agent adopts Source Graph, Filters, and Risk Guardrails — not individual trades." },
                { n: "02", t: "TEE Verifies", d: "Lit Protocol TEE enforces guardrails inside an enclave. Signs every result with ECDSA. Proof is unfakeable." },
                { n: "03", t: "On-Chain Receipt", d: "Receipt submitted to Base via ecrecover. Reputation updates. Full log stored on Filecoin. Anyone can audit." },
              ].map((s) => (
                <div key={s.n} className="glass-panel rounded-2xl p-6">
                  <p className="font-mono text-[#00FF9C] text-sm mb-3">{s.n}</p>
                  <h3 className="font-bold mb-2">{s.t}</h3>
                  <p className="text-xs text-[#c0c9be]/40 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
            {/* MCP */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#00FF9C] font-bold mb-2">Agent-Native</p>
                  <h3 className="font-bold mb-2">MCP Integration</h3>
                  <p className="text-xs text-[#c0c9be]/40 leading-relaxed">Connect from Claude Code, Cursor, or any MCP client. Your agent inherits policies programmatically — no browser needed.</p>
                </div>
                <pre className="hidden md:block bg-[#0c1605] rounded-lg border border-[#00FF9C]/10 p-3 font-mono text-[10px] text-[#c0c9be]/30 leading-relaxed shrink-0">{`"agentcircle": {
  "command": "npx",
  "args": ["tsx",
    "mcp-server.ts"]
}`}</pre>
              </div>
            </div>
          </div>

          {/* Live Proofs */}
          <div className="lg:col-span-1">
            <div className="glass-panel rounded-2xl overflow-hidden sticky top-20">
              <div className="bg-[#00FF9C]/10 px-5 py-3 flex justify-between items-center border-b border-[#00FF9C]/20">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#00FF9C]">Live Proofs Terminal</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9C]/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9C]/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] status-pulse" />
                </div>
              </div>
              <div className="p-5 space-y-4 bg-[#0c1605]/80">
                {PROOFS.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="text-[10px] font-mono text-[#00FF9C] font-bold opacity-70 shrink-0">{p.time}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold leading-tight">{p.text}</p>
                      <p className="text-[9px] font-mono text-[#00FF9C]/40 mt-1">{p.tx}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[#00FF9C]/5 border-t border-[#00FF9C]/10 text-center">
                <Link href="/circles" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00FF9C] hover:neon-text-glow transition-all">
                  Open Full Explorer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#00FF9C]/5 py-8 px-6">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-base font-bold text-[#00FF9C] neon-text-glow">AgentCircle</span>
            <span className="text-[10px] text-[#c0c9be]/20 uppercase tracking-widest font-mono">PL_Genesis 2026</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[#c0c9be]/25">
            <Link href="/circles" className="hover:text-[#00FF9C] transition-colors">Circles</Link>
            <a href="https://github.com/PL-Genesis-AgentCircle/AgentCircle" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF9C] transition-colors">Github</a>
            <Link href="/register" className="hover:text-[#00FF9C] transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
