"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAccount, useWriteContract, useSwitchChain } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import type { KOLAgent } from "@/lib/mock-data";
import type { AgentLogReceipt } from "@/types/schema";
import { REGISTRY_ADDRESS, REGISTRY_ABI, REGISTRY_CHAIN } from "@/lib/contract";

interface Props {
  kol: KOLAgent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type LogLine = { text: string; color: "green" | "red" | "yellow" | "cyan" | "white" };

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Typewriter Line Component ───
function TypewriterLine({ line, onDone }: { line: LogLine; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const speed = Math.max(8, Math.min(20, 600 / line.text.length)); // adaptive speed
    const interval = setInterval(() => {
      i++;
      setDisplayed(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(interval);
        setDone(true);
        onDone();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [line.text, onDone]);

  const colorMap: Record<LogLine["color"], string> = {
    green: "text-[#10f5a0]",
    red: "text-[#ff6b6b]",
    yellow: "text-[#FFBA20]",
    cyan: "text-[#8ba3ff]",
    white: "text-zinc-400",
  };

  const glowMap: Record<LogLine["color"], string> = {
    green: "drop-shadow-[0_0_6px_rgba(16,245,160,0.3)]",
    red: "drop-shadow-[0_0_6px_rgba(255,107,107,0.3)]",
    yellow: "drop-shadow-[0_0_4px_rgba(255,186,32,0.2)]",
    cyan: "drop-shadow-[0_0_6px_rgba(139,163,255,0.3)]",
    white: "",
  };

  return (
    <div className={`${colorMap[line.color]} ${done ? glowMap[line.color] : ""} transition-all duration-300`}>
      {displayed}
      {!done && <span className="text-[#10f5a0] animate-pulse ml-0.5 opacity-70">|</span>}
    </div>
  );
}

// ─── TEE Pulse Scanline ───
function TeePulse() {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-[2px] overflow-hidden">
      <div className="w-full h-8 bg-gradient-to-b from-transparent via-[#10f5a0]/40 to-transparent animate-tee-scan" />
    </div>
  );
}

export default function InheritDialog({ kol, open, onOpenChange }: Props) {
  const maxLoss = kol.policy.riskGuardrails.dailyLossLimitPercent;
  const [lossOverride, setLossOverride] = useState(maxLoss);
  const { isConnected, chainId, address } = useAccount();
  const [wallet, setWallet] = useState("");
  const [phase, setPhase] = useState<"form" | "terminal">("form");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [resultCID, setResultCID] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();

  // Auto-fill wallet from connected address
  useEffect(() => {
    if (address && !wallet) setWallet(address);
  }, [address, wallet]);

  const log = useCallback((text: string, color: LogLine["color"] = "green") => {
    setLogs((prev) => {
      const next = [...prev, { text, color }];
      // Auto-reveal after a tiny delay for typewriter sequencing
      setTimeout(() => setVisibleCount((c) => c + 1), 50);
      return next;
    });
    setTimeout(() => termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" }), 100);
  }, []);

  const handleLineTyped = useCallback(() => {
    setTimeout(() => termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" }), 50);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  const execute = async () => {
    setPhase("terminal");
    setLogs([]);
    setVisibleCount(0);
    setResultCID(null);
    setTxHash(null);

    log("> Connecting to AgentCircle Protocol...");
    await delay(700);

    log(`> Agent: ${kol.nft.name} (ID: ${kol.identity.agentId})`);
    await delay(500);

    log("> [MOCK] ERC-8183 Escrow: Locking membership fee...", "yellow");
    await delay(1500);
    log("> [MOCK] Escrow locked. Status: ACTIVE", "yellow");
    await delay(400);

    log("> [MOCK] ERC-8126 Risk Scan: Running ZK verification...", "yellow");
    await delay(1800);
    log("> [MOCK] Risk Score: 12 / 100 (LOW RISK). Cleared.", "yellow");
    await delay(500);

    log("> Initializing Lit Protocol TEE Node...");
    await delay(900);

    log(`> Inheriting PolicyBundle CID: ${kol.nft.policyBundleCID}`, "cyan");
    await delay(600);

    log(`> Injecting Follower Overrides: dailyLossLimit=${lossOverride}%`);
    await delay(500);

    log("> Executing hidden strategy logic inside TEE...", "cyan");
    await delay(2200);

    log("> Result: Trade complete. Verifying Policy Adherence...");
    await delay(900);

    log("> TEE signing receipt with ECDSA (Lit PKP)...", "cyan");

    try {
      const execRes = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: {
            followerWallet: wallet,
            inheritedPolicyId: kol.nft.tokenId,
            targetTxHash: null,
            customRiskOverrides: { dailyLossLimitPercent: lossOverride },
          },
          policy: kol.policy,
          mockTradeResult: {
            pnlPercent: -6.0,
            slippageBps: 45,
            latencyMs: 320,
            txHash: "0xabc123def456...mock",
          },
        }),
      });

      if (!execRes.ok) throw new Error(`TEE API returned ${execRes.status}`);

      const { receipt, violations, receiptCID, mockPkpAddress } = (await execRes.json()) as {
        receipt: AgentLogReceipt;
        violations: string[];
        receiptCID: string;
        mockPkpAddress: string;
      };

      await delay(400);

      if (!receipt.policyAdherenceVerified) {
        log("> [BLOCKED] TEE detected Risk Guardrail Violation:", "red");
        for (const v of violations) {
          log(`>   ${v}`, "red");
        }
        log("> Violation receipt will still be logged for transparency.", "yellow");
      } else {
        log("> Policy Adherence: VERIFIED", "green");
      }

      log(`> TEE Signature: ${receipt.teeSignature.slice(0, 22)}...`, "white");
      log(`> Mock PKP Address: ${mockPkpAddress}`, "white");
      log(`> Receipt CID: ${receiptCID}`, "cyan");

      setResultCID(receiptCID);

      log("> Uploading receipt to Filecoin...", "yellow");
      let uploadCID = receiptCID;
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ receipt }),
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.cid) {
            uploadCID = uploadData.cid;
            log(`> Filecoin CID: ${uploadCID}`, "cyan");
          }
        }
      } catch (err) {
        console.error("Upload failed:", err);
        log("> Upload failed, using deterministic CID.", "yellow");
      }

      await delay(500);

      log("> Submitting to ERC-8004 Registry on-chain...", "cyan");

      if (!isConnected || !receipt.teeSignature?.startsWith("0x")) {
        if (!isConnected) {
          log("> Wallet not connected. Skipping on-chain tx.", "yellow");
        }
        if (!receipt.teeSignature?.startsWith("0x")) {
          log("> Invalid TEE signature format.", "red");
        }
        log("> Done (off-chain only).", "green");
        toast.success("Receipt generated (off-chain)", { description: receiptCID });
        return;
      }

      try {
        if (chainId !== REGISTRY_CHAIN.id) {
          log(`> Switching to ${REGISTRY_CHAIN.name}...`, "yellow");
          await switchChainAsync({ chainId: REGISTRY_CHAIN.id });
          log(`> Switched to ${REGISTRY_CHAIN.name}`, "green");
          await delay(300);
        }

        log("> Requesting wallet signature...", "cyan");

        const hash = await writeContractAsync({
          address: REGISTRY_ADDRESS,
          abi: REGISTRY_ABI,
          functionName: "submitExecutionReceipt",
          args: [
            BigInt(kol.identity.agentId),
            uploadCID,
            receipt.policyAdherenceVerified,
            receipt.teeSignature as `0x${string}`,
          ],
          chainId: REGISTRY_CHAIN.id,
        });

        setTxHash(hash);
        setResultCID(uploadCID);
        log(`> Tx: ${hash}`, "cyan");
        log("> Receipt logged to ERC-8004 Registry.", "green");
        log("> Done.", "green");

        toast.success("Receipt logged to ERC-8004", { description: `Tx: ${hash.slice(0, 14)}...` });
      } catch (txErr: any) {
        const msg = txErr?.shortMessage || txErr?.message || "Transaction failed";
        log(`> Tx failed: ${msg}`, "red");
        log("> Done (off-chain only).", "green");
        toast.error("On-chain tx failed", { description: msg });
      }
    } catch (err: any) {
      log(`> ERROR: ${err.message}`, "red");
      toast.error("Execution failed");
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setPhase("form");
      setLogs([]);
      setVisibleCount(0);
      setResultCID(null);
      setTxHash(null);
      setLossOverride(maxLoss);
      setCopied(false);
    }
    onOpenChange(next);
  };

  const explorerUrl = txHash ? `${REGISTRY_CHAIN.blockExplorers?.default.url}/tx/${txHash}` : null;
  const isDone = logs.length > 0 && (logs[logs.length - 1]?.text === "> Done." || logs[logs.length - 1]?.text === "> Done (off-chain only).");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col bg-[#080808] border-white/[0.06] p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#10f5a0] animate-pulse-subtle" />
            <DialogTitle className="font-mono text-sm tracking-tight">{kol.nft.name}</DialogTitle>
          </div>
          <DialogDescription className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
            {phase === "form" ? "Configure overrides and deploy via TEE" : "TEE Execution Terminal"}
          </DialogDescription>
        </DialogHeader>

        {phase === "form" ? (
          <div className="space-y-6 px-6 py-5">
            <div className="space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cobalt">Inherited Policy</p>
              <div className="flex flex-wrap gap-1.5">
                {kol.policy.sourceGraph.monitoredVenues.map((v) => (
                  <Badge key={v} variant="secondary" className="font-mono text-[10px] bg-cobalt/10 text-cobalt border-cobalt/20">{v}</Badge>
                ))}
                {kol.policy.sourceGraph.eventTypes.map((e) => (
                  <Badge key={e} variant="outline" className="font-mono text-[10px] border-white/[0.06]">{e.replace(/_/g, " ")}</Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-muted-foreground/60">
                <span>Min Liq: ${kol.policy.candidateFilters.minLiquidityUSD.toLocaleString()}</span>
                <span>Safety: {kol.policy.candidateFilters.requireContractSafetyScore}+</span>
                <span>Max Lev: {kol.policy.riskGuardrails.maxLeverage}x</span>
                <span>Max Pos: ${kol.policy.riskGuardrails.maxPositionSizeUSDC.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-mono">
                Daily Loss Limit:{" "}
                <span className="text-[#10f5a0] font-semibold">{lossOverride}%</span>
                <span className="text-[10px] text-muted-foreground/40 ml-2">(max: {maxLoss}%)</span>
              </p>
              <Slider
                value={[lossOverride]}
                onValueChange={(val) => setLossOverride(Array.isArray(val) ? val[0] : val)}
                min={0.5}
                max={maxLoss}
                step={0.5}
              />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">Follower Wallet</p>
              <Input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="font-mono text-xs bg-[#0a0a0a] border-white/[0.06]"
              />
            </div>

            <button
              onClick={execute}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#10f5a0] to-[#00e68a] text-[#0a0a0a] text-xs font-mono font-bold tracking-wide hover:shadow-[0_0_25px_-5px_rgba(16,245,160,0.5)] active:scale-[0.98] transition-all"
            >
              Deploy &amp; Execute via TEE
            </button>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            {/* Terminal */}
            <div className="relative flex-1 min-h-0">
              <TeePulse />
              <div
                ref={termRef}
                className="h-full overflow-y-auto px-6 py-4 font-mono text-xs leading-[1.8] min-h-[350px] max-h-[450px]"
              >
                {logs.slice(0, visibleCount).map((l, i) => (
                  <TypewriterLine key={`${i}-${l.text.slice(0, 20)}`} line={l} onDone={handleLineTyped} />
                ))}
                {!isDone && visibleCount >= logs.length && logs.length > 0 && (
                  <span className="text-[#10f5a0]/50 animate-pulse text-lg">_</span>
                )}
              </div>
            </div>

            {/* Result Panel */}
            {(resultCID || txHash) && isDone && (
              <div className="mx-6 mb-4 rounded-lg bg-[#0d0d0d] border border-white/[0.04] p-4 space-y-3">
                {resultCID && (
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">Filecoin Receipt CID</p>
                      <p className="font-mono text-xs break-all text-[#8ba3ff]">{resultCID}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(resultCID)}
                      className="text-[10px] font-mono text-muted-foreground/40 hover:text-[#10f5a0] transition-colors shrink-0 mt-3"
                    >
                      {copied ? "copied" : "copy"}
                    </button>
                  </div>
                )}
                {txHash && (
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">On-Chain Transaction</p>
                    {explorerUrl ? (
                      <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs break-all text-[#8ba3ff] hover:text-[#10f5a0] transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-[#10f5a0]/30"
                      >
                        {txHash}
                      </a>
                    ) : (
                      <p className="font-mono text-xs break-all text-[#8ba3ff]">{txHash}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Close Button */}
            <div className="px-6 pb-5">
              <button
                onClick={() => handleOpenChange(false)}
                className="w-full py-3 rounded-lg border border-white/[0.06] bg-transparent text-xs font-mono text-muted-foreground/60 hover:text-[#10f5a0] hover:border-[#10f5a0]/20 transition-all"
              >
                Close Terminal
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
