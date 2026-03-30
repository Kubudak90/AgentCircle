"use client";

import Link from "next/link";
import ConnectButton from "@/components/ConnectButton";
import ParticleBackground from "@/components/ParticleBackground";

const FEATURED_GROUPS = [
  {
    id: "1",
    name: "Garry's Whale Tracker",
    author: "@GarryAlpha",
    description: "Monitors smart money wallets and large inflows across Hyperliquid and Uniswap V3. Fully autonomous strategy with 24/7 on-chain proof of computation.",
    adopters: 24,
    executions: 142,
    repScore: 87,
    tags: ["TEE Verified", "ERC-8004"],
    featured: true,
  },
  {
    id: "2",
    name: "Degen Spartan Perps",
    author: "@DegenSpartan",
    description: "Aggressive perp OI tracking with tight risk guardrails. High conviction, low frequency.",
    adopters: 11,
    executions: 67,
    repScore: 72,
    tags: ["TEE Verified"],
  },
  {
    id: "3",
    name: "Alpha Liquidity Scanner",
    author: "@AlphaLabs",
    description: "Detects new liquidity creation events and filters for high-safety tokens only.",
    adopters: 42,
    executions: 318,
    repScore: 93,
    tags: ["TEE Verified"],
  },
  {
    id: "4",
    name: "L2 Bridge Optimizer",
    author: "@BridgeDAO",
    description: "Optimized cross-chain routing and bridge-fee arbitrage across L2 networks.",
    adopters: 89,
    executions: 512,
    repScore: 81,
    tags: ["TEE Verified"],
  },
  {
    id: "5",
    name: "Yield Sentinel",
    author: "@YieldCore",
    description: "AI-driven yield farming with auto-rebalancing across lending protocols and LP positions.",
    adopters: 156,
    executions: 2103,
    repScore: 91,
    tags: ["TEE Verified", "ERC-8004"],
  },
];

const MOCK_PROOFS = [
  { chain: "FILECOIN", type: "TEE Enclave Exec Proof", hash: "0x4a8...f92e", time: "2 mins ago" },
  { chain: "BASE", type: "ERC-8004 Receipt Logged", hash: "0x92b...31cc", time: "5 mins ago" },
  { chain: "FILECOIN", type: "PolicyBundle CID Updated", hash: "0x112...a38b", time: "12 mins ago" },
];

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      {/* Top Nav */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 h-14 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06] z-50">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-[#8ba3ff] to-[#4B8EFF] bg-clip-text text-transparent">AgentCircle</span>
          <nav className="hidden md:flex gap-6 items-center">
            <span className="text-[#8ba3ff] border-b border-[#8ba3ff] pb-0.5 text-xs font-medium">Discover</span>
            <Link href="/circles" className="text-white/40 hover:text-white/80 transition-colors text-xs font-medium">Policy Circles</Link>
            <span className="text-white/40 hover:text-white/80 transition-colors text-xs font-medium cursor-pointer">Live Proofs</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/circles" className="hidden sm:block px-3 py-1.5 rounded-lg bg-[#10f5a0]/10 border border-[#10f5a0]/20 text-[#10f5a0] text-[10px] font-bold uppercase tracking-wider hover:bg-[#10f5a0]/15 transition-all">
            TEE Verified
          </Link>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 min-h-screen relative z-10">
        <div className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-12">

          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl bg-[#111111]/60 p-8 md:p-16 border border-white/[0.04]">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
              <div className="w-[500px] h-[500px] rounded-full bg-[#4B8EFF]/15 blur-[120px] absolute -right-20 top-10" />
              <div className="w-[300px] h-[300px] rounded-full bg-[#10f5a0]/10 blur-[100px] absolute right-40 bottom-10" />
            </div>
            <div className="relative z-20 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10f5a0]/10 border border-[#10f5a0]/20 text-[#10f5a0] text-[10px] font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10f5a0] animate-pulse" />
                Private Policy Inheritance Protocol
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Inherit Strategies from{" "}
                <span className="bg-gradient-to-r from-[#8ba3ff] to-[#4B8EFF] bg-clip-text text-transparent">Trusted Agents.</span>
              </h1>
              <p className="text-base text-white/50 leading-relaxed mb-4 max-w-xl">
                AgentCircle lets your AI agent inherit operational policies — source graphs, candidate filters, and risk guardrails — from verified operators. TEE-enforced. ECDSA-signed. On-chain receipts on Filecoin + Base.
              </p>
              <p className="text-sm font-mono text-[#10f5a0]/70 mb-10">
                You&apos;re not copying trades. You&apos;re inheriting the decision framework that produces them.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/circles" className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#10f5a0] to-[#00e68a] text-[#0a0a0a] font-bold text-sm shadow-[0_10px_30px_-10px_rgba(16,245,160,0.3)] hover:shadow-[0_10px_30px_-5px_rgba(16,245,160,0.4)] hover:-translate-y-0.5 transition-all">
                  Browse Policy Circles
                </Link>
                <Link href="/register" className="px-8 py-3.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/80 font-bold text-sm hover:bg-white/[0.06] transition-all">
                  Register Your Agent
                </Link>
              </div>
            </div>
          </section>

          {/* Discover Groups */}
          <section>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Discover Policy Circles</h2>
                <p className="text-sm text-white/40">Top performing TEE-verified agent groups</p>
              </div>
              <Link href="/circles" className="text-[#8ba3ff] text-xs font-bold uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* Featured Card */}
              <div className="col-span-1 md:col-span-2 row-span-2 group glass-card rounded-2xl bg-[#111111]/70 border border-white/[0.06] p-8 hover:border-[#8ba3ff]/20 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[80px] font-bold text-white/[0.02] leading-none select-none">01</div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{FEATURED_GROUPS[0].name}</h3>
                      <span className="text-xs text-white/40 font-mono">{FEATURED_GROUPS[0].author}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {FEATURED_GROUPS[0].tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-[#10f5a0]/10 border border-[#10f5a0]/20 text-[#10f5a0] text-[8px] font-bold uppercase">{t}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">{FEATURED_GROUPS[0].description}</p>
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-6">
                    <div className="text-center">
                      <p className="text-[10px] text-white/30 uppercase font-bold mb-1">Rep Score</p>
                      <p className="text-lg font-bold text-[#10f5a0] font-mono">{FEATURED_GROUPS[0].repScore}</p>
                    </div>
                    <div className="text-center border-x border-white/[0.04]">
                      <p className="text-[10px] text-white/30 uppercase font-bold mb-1">Adopters</p>
                      <p className="text-lg font-bold font-mono">{FEATURED_GROUPS[0].adopters}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-white/30 uppercase font-bold mb-1">Executions</p>
                      <p className="text-lg font-bold text-[#8ba3ff] font-mono">{FEATURED_GROUPS[0].executions}</p>
                    </div>
                  </div>
                  <Link href="/circles" className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#10f5a0] to-[#00e68a] text-[#0a0a0a] font-bold text-sm text-center hover:shadow-[0_0_20px_-5px_rgba(16,245,160,0.4)] transition-all block">
                    View PolicyBundle
                  </Link>
                </div>
              </div>

              {/* Smaller Cards */}
              {FEATURED_GROUPS.slice(1).map((g) => (
                <Link href="/circles" key={g.id} className="group glass-card rounded-2xl bg-[#111111]/70 border border-white/[0.06] p-5 hover:border-[#8ba3ff]/20 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono text-[#10f5a0] font-bold">REP {g.repScore}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#10f5a0]/10 border border-[#10f5a0]/20 text-[#10f5a0] text-[8px] font-bold uppercase">Verified</span>
                  </div>
                  <h3 className="text-base font-bold mb-1">{g.name}</h3>
                  <p className="text-xs text-white/35 line-clamp-2 mb-5">{g.description}</p>
                  <div className="flex justify-between items-center mb-5 text-[10px] font-mono text-white/30 uppercase">
                    <span>{g.adopters} adopters</span>
                    <span className="text-[#8ba3ff]">{g.executions} executions</span>
                  </div>
                  <div className="w-full py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#8ba3ff] text-xs font-bold text-center group-hover:bg-[#10f5a0] group-hover:text-[#0a0a0a] group-hover:border-transparent transition-all">
                    View Circle
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Dashboard + Proofs */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* How It Works */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">How AgentCircle Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="glass-card rounded-2xl bg-[#111111]/70 border border-white/[0.06] p-6">
                  <p className="font-mono text-[#10f5a0] text-sm mb-3">01</p>
                  <h3 className="text-base font-bold mb-2">Inherit Policy</h3>
                  <p className="text-xs text-white/35 leading-relaxed">Choose an agent&apos;s PolicyBundle. Your agent adopts Source Graph, Filters, and Risk Guardrails — not individual trades.</p>
                </div>
                <div className="glass-card rounded-2xl bg-[#111111]/70 border border-white/[0.06] p-6">
                  <p className="font-mono text-[#10f5a0] text-sm mb-3">02</p>
                  <h3 className="text-base font-bold mb-2">TEE Verifies</h3>
                  <p className="text-xs text-white/35 leading-relaxed">Lit Protocol TEE enforces guardrails inside an enclave. Signs every result with ECDSA. The proof is unfakeable.</p>
                </div>
                <div className="glass-card rounded-2xl bg-[#111111]/70 border border-white/[0.06] p-6">
                  <p className="font-mono text-[#10f5a0] text-sm mb-3">03</p>
                  <h3 className="text-base font-bold mb-2">On-Chain Receipt</h3>
                  <p className="text-xs text-white/35 leading-relaxed">Receipt submitted to Base Sepolia via ecrecover. Reputation updates on-chain. Full log stored on Filecoin.</p>
                </div>
              </div>
              {/* MCP Teaser */}
              <div className="glass-card rounded-2xl bg-[#111111]/70 border border-white/[0.06] p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#10f5a0] mb-2">Agent-Native</p>
                    <h3 className="text-base font-bold mb-2">MCP Integration</h3>
                    <p className="text-xs text-white/35 leading-relaxed">Connect from Claude Code, Cursor, or any MCP client. Your agent inherits policies programmatically — no browser needed.</p>
                  </div>
                  <pre className="hidden md:block bg-[#0a0a0a] rounded-lg border border-white/[0.04] p-3 font-mono text-[10px] text-white/30 leading-relaxed shrink-0">{`"agentcircle": {
  "command": "npx",
  "args": ["tsx",
    "mcp-server.ts"]
}`}</pre>
                </div>
              </div>
            </div>

            {/* Live Proofs */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 glass-card rounded-2xl bg-[#111111]/70 border border-white/[0.06] flex flex-col h-[520px] overflow-hidden">
                <div className="p-5 border-b border-white/[0.04]">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10f5a0] animate-pulse" />
                    Live Proofs
                  </h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] mt-1 font-mono">On-chain verification feed</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {MOCK_PROOFS.map((p, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#8ba3ff]/20 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#8ba3ff]/10 text-[#8ba3ff] font-bold font-mono">{p.chain}</span>
                        <span className="text-[9px] text-white/25">{p.time}</span>
                      </div>
                      <p className="text-xs font-semibold mb-1">{p.type}</p>
                      <p className="text-[10px] text-white/30 font-mono">{p.hash}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10f5a0]" />
                        <span className="text-[9px] font-bold text-[#10f5a0] uppercase tracking-wider">Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/[0.04]">
                  <Link href="/circles" className="w-full py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-white/40 text-[10px] font-bold uppercase tracking-widest transition-all text-center block">
                    View Full Explorer
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-10 px-6 border-t border-white/[0.04]">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-base font-bold tracking-tight bg-gradient-to-r from-[#8ba3ff] to-[#4B8EFF] bg-clip-text text-transparent">AgentCircle</span>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">PL_Genesis Hackathon 2026</span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/25">
              <Link href="/circles" className="hover:text-[#8ba3ff] transition-colors">Policy Circles</Link>
              <a href="https://github.com/PL-Genesis-AgentCircle/AgentCircle" target="_blank" rel="noopener noreferrer" className="hover:text-[#8ba3ff] transition-colors">Github</a>
              <Link href="/register" className="hover:text-[#8ba3ff] transition-colors">Register</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
