"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type DemoLine = { text: string; color: "green" | "cyan" | "white" | "yellow"; delay: number };

const DEMO_SCRIPT: DemoLine[] = [
  { text: "> list_circles", color: "cyan", delay: 0 },
  { text: "", color: "white", delay: 400 },
  { text: "[ID: 1] Garry's Whale Tracker | Rep: 87", color: "green", delay: 800 },
  { text: "  Max Loss: 5% | Leverage: 3x | Kill Switch: ON", color: "white", delay: 1000 },
  { text: "[ID: 2] Degen Spartan Perps | Rep: 72", color: "green", delay: 1200 },
  { text: "  Max Loss: 3% | Leverage: 5x | Kill Switch: ON", color: "white", delay: 1400 },
  { text: "[ID: 3] Alpha Liquidity Scanner | Rep: 93", color: "green", delay: 1600 },
  { text: "  Max Loss: 2.5% | Leverage: 2x | Kill Switch: ON", color: "white", delay: 1800 },
  { text: "", color: "white", delay: 2200 },
  { text: "> inherit_agent_policy --kol 1 --wallet 0xF00d...", color: "cyan", delay: 2600 },
  { text: "", color: "white", delay: 3000 },
  { text: "TEE Execution: Lit Protocol Enclave", color: "yellow", delay: 3400 },
  { text: "Policy Adherence: false (VIOLATION)", color: "yellow", delay: 3800 },
  { text: "  DAILY_LOSS_EXCEEDED: 6.0% > limit 5%", color: "yellow", delay: 4100 },
  { text: "TEE Signature: 0x8a3f...c721 (ECDSA)", color: "green", delay: 4500 },
  { text: "Receipt CID: ipfs://bafybeig...4e2a", color: "green", delay: 4900 },
  { text: "Status: Logged to ERC-8004 Registry", color: "green", delay: 5300 },
];

export default function MCPDemoTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycle, setCycle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleLines(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    DEMO_SCRIPT.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
        }, line.delay)
      );
    });

    // Restart after last line
    timers.push(
      setTimeout(() => {
        setCycle((c) => c + 1);
      }, DEMO_SCRIPT[DEMO_SCRIPT.length - 1].delay + 4000)
    );

    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const colorMap: Record<string, string> = {
    green: "text-[#00FF9C]",
    cyan: "text-[#8ba3ff]",
    white: "text-[#c0c9be]/50",
    yellow: "text-[#FFBA20]",
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-[#0c1605] rounded-lg border border-[#00FF9C]/10 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#00FF9C]/10">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400/40" />
            <div className="w-2 h-2 rounded-full bg-[#00FF9C]/40" />
            <div className="w-2 h-2 rounded-full bg-[#8ba3ff]/40" />
          </div>
          <span className="text-[9px] font-mono text-[#c0c9be]/20 uppercase">mcp-server.ts</span>
        </div>
        {/* Terminal content */}
        <div ref={containerRef} className="p-3 font-mono text-[10px] leading-[1.8] h-48 overflow-y-auto">
          {DEMO_SCRIPT.slice(0, visibleLines).map((line, i) => (
            <div key={`${cycle}-${i}`} className={colorMap[line.color]}>
              {line.text || "\u00A0"}
            </div>
          ))}
          {visibleLines < DEMO_SCRIPT.length && (
            <span className="text-[#00FF9C]/50 animate-pulse">_</span>
          )}
        </div>
        {/* CTA */}
        <div className="px-3 py-2 border-t border-[#00FF9C]/10 text-center">
          <Link href="/mcp" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00FF9C] hover:neon-text-glow transition-all">
            Try MCP Playground &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
