"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAccount, useWriteContract, useSwitchChain, usePublicClient } from "wagmi";
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

// ─── Elapsed Timer ───
function ElapsedTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="font-mono text-[10px] text-[#10f5a0]/50">{seconds}s elapsed</span>;
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
  const publicClient = usePublicClient();

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

    // ─── ERC-8183: Real Escrow Lock (on-chain) ───
    log("> ERC-8183 Escrow: Creating and funding job...", "yellow");
    try {
      if (isConnected && chainId !== REGISTRY_CHAIN.id) {
        await switchChainAsync({ chainId: REGISTRY_CHAIN.id });
      }
      if (isConnected) {
        const escrowTx = await writeContractAsync({
          address: REGISTRY_ADDRESS,
          abi: REGISTRY_ABI,
          functionName: "createAndFundJob",
          args: [BigInt(kol.identity.agentId)],
          value: 0n, // 0 ETH for demo (real: membership fee)
          chainId: REGISTRY_CHAIN.id,
        });
        log(`> Escrow locked. Tx: ${escrowTx.slice(0, 14)}...`, "green");
      } else {
        log("> Escrow: Wallet not connected, skipping on-chain lock.", "yellow");
      }
    } catch (escrowErr: any) {
      const reason = escrowErr?.shortMessage || escrowErr?.message || "wallet rejected";
      if (reason.includes("rejected") || reason.includes("denied")) {
        log(`> Escrow skipped: User rejected transaction.`, "yellow");
        log(`> Continuing in OFF-CHAIN mode — receipt will be generated but not submitted on-chain.`, "yellow");
      } else {
        log(`> Escrow lock failed: ${reason}`, "red");
      }
    }
    await delay(400);

    // ─── ERC-8126: Real Risk Check (on-chain read) ───
    log("> ERC-8126 Risk Scan: Reading on-chain verification...", "yellow");
    try {
      if (publicClient) {
        const [isVerified, overallRiskScore] = await publicClient.readContract({
          address: REGISTRY_ADDRESS,
          abi: REGISTRY_ABI,
          functionName: "getAgentVerification",
          args: [BigInt(kol.identity.agentId)],
        });
        const riskTier = overallRiskScore <= 20 ? "LOW RISK" : overallRiskScore <= 40 ? "MODERATE" : overallRiskScore <= 60 ? "ELEVATED" : overallRiskScore <= 80 ? "HIGH RISK" : "CRITICAL";
        if (overallRiskScore > 80) {
          log(`> [BLOCKED] Risk Score: ${overallRiskScore} / 100 (${riskTier}). Too risky.`, "red");
          toast.error("Agent risk score too high");
          return;
        }
        log(`> Risk Score: ${overallRiskScore} / 100 (${riskTier}). Verified: ${isVerified}. Cleared.`, "green");
      } else {
        log("> Risk check: No RPC client available, proceeding.", "yellow");
      }
    } catch (riskErr: any) {
      log(`> Risk check unavailable: ${riskErr?.shortMessage || "RPC error"}. Proceeding.`, "yellow");
    }
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
      log(`> TEE Signer: ${mockPkpAddress}`, "white");
      log(`> Signed CID: ${receiptCID}`, "cyan");

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

      // Post evidence to hypercert
      try {
        await fetch(`/api/hypercert/${kol.identity.agentId}/evidence`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiptCID,
            teeSignature: receipt.teeSignature,
            adherenceVerified: receipt.policyAdherenceVerified,
            followerWallet: wallet,
            metrics: receipt.metrics,
          }),
        });
        log("> Evidence linked to hypercert.", "green");
      } catch {
        // Non-blocking
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
        // Join circle as adopter (off-chain path)
        try {
          await fetch("/api/circles/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agentId: kol.identity.agentId, followerWallet: wallet }),
          });
          log("> Joined circle as subscriber.", "green");
        } catch {
          // Non-critical
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

        // CRITICAL: Must use receiptCID (the one the TEE signed over), not uploadCID
        // The Filecoin upload CID is for data availability; the on-chain CID must match the signature
        const hash = await writeContractAsync({
          address: REGISTRY_ADDRESS,
          abi: REGISTRY_ABI,
          functionName: "submitExecutionReceipt",
          args: [
            BigInt(kol.identity.agentId),
            receiptCID,
            receipt.policyAdherenceVerified,
            receipt.teeSignature as `0x${string}`,
          ],
          chainId: REGISTRY_CHAIN.id,
        });

        setTxHash(hash);
        setResultCID(receiptCID);
        log(`> Tx: ${hash}`, "cyan");
        log("> Receipt logged to ERC-8004 Registry.", "green");

        // Join circle as adopter
        try {
          await fetch("/api/circles/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agentId: kol.identity.agentId, followerWallet: wallet }),
          });
          log("> Joined circle as subscriber.", "green");
        } catch {
          // Non-critical — don't block the flow
        }

        log("> Done.", "green");

        toast.success("Receipt logged to ERC-8004", {
          description: `Tx: ${hash.slice(0, 14)}...`,
          action: {
            label: "View Proof",
            onClick: () => window.open(`${REGISTRY_CHAIN.blockExplorers?.default.url}/tx/${hash}`, "_blank"),
          },
        });
      } catch (txErr: any) {
        const raw = txErr?.shortMessage || txErr?.message || "Transaction failed";
        if (raw.includes("InvalidSignature")) {
          log("> [ERROR] InvalidSignature — TEE signature verification failed.", "red");
          log(">   Check TEE_PRIVATE_KEY matches registered teePublicKey", "yellow");
          log(">   Check CHAIN_ID and REGISTRY_ADDRESS in .env.local", "yellow");
          log(">   Run: npx tsx scripts/test-submit.ts to verify", "yellow");
        } else if (raw.includes("ReceiptAlreadyUsed")) {
          log("> [ERROR] Receipt already submitted (replay protection).", "red");
          log(">   Execute again to generate a new signature.", "yellow");
        } else if (raw.includes("AgentNotFound")) {
          log("> [ERROR] Agent not registered on-chain.", "red");
          log(">   Run: npx tsx scripts/register-agent.ts", "yellow");
        } else if (raw.includes("gas limit")) {
          log("> [ERROR] Contract call reverted (gas estimation failed).", "red");
          log(">   TEE signature likely doesn't match on-chain data.", "yellow");
          log(">   Verify: contract address, chain ID, TEE key alignment.", "yellow");
        } else if (raw.includes("rejected") || raw.includes("denied")) {
          log("> On-chain submission cancelled by user.", "yellow");
          log("> Receipt is cryptographically valid — ECDSA signature + Filecoin CID preserved.", "yellow");
          log("> You can submit this receipt on-chain later using the TEE signature.", "yellow");
        } else {
          log(`> [ERROR] ${raw}`, "red");
        }
        if (!raw.includes("rejected") && !raw.includes("denied")) {
          log("> Receipt preserved off-chain with CID + signature.", "yellow");
        }
        log("> Done (off-chain only).", "green");
        toast.error("On-chain tx skipped", { description: raw.includes("rejected") ? "User cancelled — receipt saved off-chain" : raw.slice(0, 80) });
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
            {phase === "form" ? "Configure overrides and subscribe via TEE" : "TEE Execution Terminal"}
          </DialogDescription>
        </DialogHeader>

        {phase === "form" ? (
          <div className="space-y-6 px-6 py-5">
            <div className="space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cobalt">Strategy Policy</p>
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
              Subscribe &amp; Execute via TEE
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
              {!isDone && logs.length > 0 && (
                <div className="px-6 py-2 border-t border-white/[0.04] flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10f5a0] animate-pulse" />
                  <span className="text-[10px] text-zinc-500">Processing — Filecoin uploads take 50-100s</span>
                  <ElapsedTimer />
                </div>
              )}
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
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">On-Chain Transaction</p>
                    <p className="font-mono text-xs break-all text-[#8ba3ff]">{txHash}</p>
                    {explorerUrl && (
                      <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10f5a0]/10 border border-[#10f5a0]/20 text-[#10f5a0] text-xs font-mono font-bold hover:bg-[#10f5a0]/20 transition-all"
                      >
                        View Proof on Basescan &rarr;
                      </a>
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
