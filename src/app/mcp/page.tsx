"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";

type TermLine = { text: string; color: "green" | "cyan" | "white" | "yellow" | "red"; isInput?: boolean };

const HELP_TEXT = [
  "Available commands:",
  "",
  "  list_circles              List all available agent circles",
  "  inherit <kolId> <wallet>  Subscribe to a strategy via TEE execution",
  "  evaluate <agentId>        Evaluate agent impact (hypercert + evidence)",
  "  help                      Show this message",
  "  clear                     Clear terminal",
];

const WELCOME: TermLine[] = [
  { text: "AgentCircle MCP Playground", color: "green" },
  { text: "Connected to /api/mcp — real data, real TEE execution", color: "white" },
  { text: 'Type "help" for available commands.', color: "white" },
  { text: "", color: "white" },
];

export default function MCPPlaygroundPage() {
  const [lines, setLines] = useState<TermLine[]>(WELCOME);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" }), 50);
  }, []);

  useEffect(scrollToBottom, [lines, scrollToBottom]);

  const addLines = (newLines: TermLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLines([{ text: `> ${trimmed}`, color: "cyan", isInput: true }]);

    if (trimmed === "help") {
      addLines(HELP_TEXT.map((t) => ({ text: t, color: "white" as const })));
      return;
    }

    if (trimmed === "clear") {
      setLines(WELCOME);
      return;
    }

    if (trimmed === "list_circles" || trimmed === "list") {
      setLoading(true);
      try {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: "list_circles" }),
        });
        const data = await res.json();

        if (data.error) {
          addLines([{ text: `Error: ${data.error}`, color: "red" }]);
        } else {
          addLines([{ text: "", color: "white" }]);
          for (const c of data.result) {
            addLines([
              { text: `[ID: ${c.id}] ${c.name}`, color: "green" },
              { text: `  Rep: ${c.reputationScore} | Subscribers: ${c.activeAdopters} | Venues: ${c.venues.join(", ")}`, color: "white" },
              { text: `  Risk: ${c.riskSummary.maxLeverage} leverage | ${c.riskSummary.dailyLossLimit} loss limit | Kill Switch: ${c.riskSummary.killSwitch}`, color: "yellow" },
            ]);
          }
          addLines([{ text: "", color: "white" }, { text: 'Use "inherit <kolId> <wallet>" to subscribe to a strategy.', color: "white" }]);
        }
      } catch (err: any) {
        addLines([{ text: `Error: ${err.message}`, color: "red" }]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Parse inherit command
    const inheritMatch = trimmed.match(/^inherit(?:_agent_policy)?\s+(\S+)\s+(\S+)/);
    if (inheritMatch) {
      const [, kolId, wallet] = inheritMatch;
      setLoading(true);
      addLines([{ text: `Subscribing to strategy from agent ${kolId}...`, color: "yellow" }]);

      try {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tool: "inherit_agent_policy",
            arguments: { kolAgentId: kolId, followerWallet: wallet },
          }),
        });
        const data = await res.json();

        if (data.error) {
          addLines([{ text: `Error: ${data.error}`, color: "red" }]);
        } else {
          const r = data.result;
          addLines([
            { text: "", color: "white" },
            { text: `KOL: ${r.kol} (ID: ${r.kolId})`, color: "green" },
            { text: `Follower: ${r.follower}`, color: "white" },
            { text: `Policy Adherence: ${r.policyAdherenceVerified ? "VERIFIED" : "VIOLATION"}`, color: r.policyAdherenceVerified ? "green" : "yellow" },
          ]);
          if (r.violations?.length > 0) {
            for (const v of r.violations) {
              addLines([{ text: `  ${v}`, color: "red" }]);
            }
          }
          addLines([
            { text: `TEE Signature: ${r.teeSignature?.slice(0, 22)}...`, color: "white" },
            { text: `Receipt CID: ${r.receiptCID}`, color: "cyan" },
            { text: `Latency: ${r.metrics?.latency_ms}ms | Slippage: ${r.metrics?.slippage_bps} bps`, color: "white" },
            { text: "", color: "white" },
            { text: r.policyAdherenceVerified ? "Receipt ready for on-chain submission to ERC-8004." : "Violation receipt logged for transparency.", color: "green" },
          ]);
        }
      } catch (err: any) {
        addLines([{ text: `Error: ${err.message}`, color: "red" }]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Parse evaluate command
    const evalMatch = trimmed.match(/^evaluate(?:_impact)?\s+(\S+)/);
    if (evalMatch) {
      const [, evalAgentId] = evalMatch;
      setLoading(true);
      addLines([{ text: `Evaluating agent ${evalAgentId}...`, color: "yellow" }]);

      try {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: "evaluate_impact", arguments: { agentId: evalAgentId } }),
        });
        const data = await res.json();

        if (data.error) {
          addLines([{ text: `Error: ${data.error}`, color: "red" }]);
        } else {
          const e = data.result.evaluation;
          const v = data.result.verification;
          addLines([
            { text: "", color: "white" },
            { text: `Agent: ${data.result.agent} (ID: ${data.result.agentId})`, color: "green" },
            { text: "", color: "white" },
            { text: `Overall Impact Score: ${e.overallScore}/100`, color: e.overallScore >= 50 ? "green" : "yellow" },
            { text: `Reputation: ${e.reputationScore}/100 | Adherence: ${e.adherenceRate}%`, color: "white" },
            { text: `Executions: ${e.totalExecutions} (${e.passCount} pass, ${e.failCount} fail)`, color: "white" },
            { text: `Subscribers: ${e.activeAdopters} | Hypercert: ${e.hypercertMinted ? "MINTED" : "NOT MINTED"}`, color: e.hypercertMinted ? "green" : "yellow" },
          ]);
          if (e.claimId) {
            addLines([{ text: `Claim ID: ${e.claimId}`, color: "cyan" }]);
          }
          if (data.result.evidence?.length > 0) {
            addLines([{ text: "", color: "white" }, { text: `Evidence (${data.result.evidence.length} receipts):`, color: "white" }]);
            for (const ev of data.result.evidence.slice(-3)) {
              addLines([{ text: `  ${ev.receiptCID.slice(0, 30)}... | ${ev.adherenceVerified ? "PASS" : "FAIL"}`, color: ev.adherenceVerified ? "green" : "red" }]);
            }
          }
          addLines([
            { text: "", color: "white" },
            { text: `Contract: ${v.contract}`, color: "white" },
          ]);
        }
      } catch (err: any) {
        addLines([{ text: `Error: ${err.message}`, color: "red" }]);
      } finally {
        setLoading(false);
      }
      return;
    }

    addLines([{ text: `Unknown command: ${trimmed}. Type "help" for available commands.`, color: "red" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    handleCommand(input);
    setInput("");
  };

  const colorMap: Record<string, string> = {
    green: "text-[#00FF9C]",
    cyan: "text-[#8ba3ff]",
    white: "text-[#c0c9be]/60",
    yellow: "text-[#FFBA20]",
    red: "text-[#ff6b6b]",
  };

  return (
    <div className="min-h-screen bg-[#0c1605] text-[#d9e7c8]" onClick={() => inputRef.current?.focus()}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#18230f]/90 backdrop-blur-xl border-b border-[#00FF9C]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center px-6 lg:px-8 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-[#00FF9C] tracking-tight neon-text-glow">AgentCircle</Link>
            <div className="hidden md:flex gap-6 text-xs font-medium uppercase tracking-widest">
              <Link href="/" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors">Discover</Link>
              <Link href="/circles" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors">Agent Circles</Link>
              <span className="text-[#00FF9C] border-b border-[#00FF9C] pb-0.5">MCP</span>
              <Link href="/register" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors">Register</Link>
            </div>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/40 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00FF9C] status-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#00FF9C]">Agent-Native Interface</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">MCP Playground</h1>
            <p className="text-sm text-[#c0c9be]/50">
              Interact with AgentCircle via Model Context Protocol. Same tools available in Claude Code, Cursor, or any MCP client.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1.5 bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[10px] font-mono text-[#00FF9C]">list_circles</span>
            <span className="px-3 py-1.5 bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[10px] font-mono text-[#00FF9C]">inherit_agent_policy</span>
            <span className="px-3 py-1.5 bg-[#FFBA20]/10 border border-[#FFBA20]/20 text-[10px] font-mono text-[#FFBA20]">evaluate_impact</span>
          </div>
        </div>

        {/* Terminal */}
        <div className="bg-[#080808] rounded-xl border border-white/[0.06] overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04] bg-[#0d0d0d]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C]/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#8ba3ff]/40" />
            </div>
            <span className="text-[10px] font-mono text-[#c0c9be]/20 uppercase tracking-widest">agentcircle — mcp</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00FF9C]/60">connected</span>
            </div>
          </div>

          {/* Terminal body */}
          <div ref={termRef} className="p-4 font-mono text-xs leading-[1.8] h-[500px] overflow-y-auto">
            {lines.map((line, i) => (
              <div key={i} className={colorMap[line.color]}>
                {line.text || "\u00A0"}
              </div>
            ))}
            {loading && (
              <div className="text-[#00FF9C]/50 animate-pulse">Processing...</div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-white/[0.04] flex items-center px-4 py-3 bg-[#0a0a0a]">
            <span className="text-[#00FF9C] font-mono text-sm mr-2">&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={loading ? "processing..." : "type a command..."}
              autoFocus
              className="flex-1 bg-transparent font-mono text-sm text-[#d9e7c8] placeholder:text-[#c0c9be]/15 focus:outline-none"
            />
          </form>
        </div>

        {/* MCP Config */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF9C] mb-3">Add to Claude Code / Cursor</p>
            <pre className="bg-[#0c1605] rounded-lg border border-[#00FF9C]/10 p-3 font-mono text-[10px] text-[#c0c9be]/40 leading-relaxed">{`"agentcircle": {
  "command": "npx",
  "args": ["tsx", "scripts/mcp-server.ts"],
  "env": { "API_BASE": "http://localhost:3000" }
}`}</pre>
          </div>
          <div className="glass-panel rounded-xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF9C] mb-3">How It Works</p>
            <div className="space-y-2 text-xs text-[#c0c9be]/40">
              <p>1. Your agent calls <span className="text-[#00FF9C]">list_circles</span> to discover strategies</p>
              <p>2. Agent calls <span className="text-[#00FF9C]">inherit_agent_policy</span> with a KOL ID</p>
              <p>3. TEE executes + signs receipt with ECDSA</p>
              <p>4. Receipt goes on-chain to ERC-8004 Registry</p>
              <p>5. Full log stored on Filecoin for auditing</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
