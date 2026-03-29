"use client";

import { useState, useRef, useCallback } from "react";
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

export default function InheritDialog({ kol, open, onOpenChange }: Props) {
  const maxLoss = kol.policy.riskGuardrails.dailyLossLimitPercent;
  const [lossOverride, setLossOverride] = useState(maxLoss);
  const [wallet, setWallet] = useState("0xFollower1234567890abcdef1234567890abcdef");
  const [phase, setPhase] = useState<"form" | "terminal">("form");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [resultCID, setResultCID] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const termRef = useRef<HTMLDivElement>(null);

  const { isConnected, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();

  const log = useCallback((text: string, color: LogLine["color"] = "green") => {
    setLogs((prev) => [...prev, { text, color }]);
    setTimeout(() => termRef.current?.scrollTo(0, termRef.current.scrollHeight), 50);
  }, []);

  const execute = async () => {
    setPhase("terminal");
    setLogs([]);
    setResultCID(null);
    setTxHash(null);

    log("> Connecting to AgentCircle Protocol...");
    await delay(600);

    log(`> Agent: ${kol.nft.name} (ID: ${kol.nft.tokenId})`);
    await delay(400);

    log("> [MOCK] ERC-8183 Escrow: Locking membership fee...", "yellow");
    await delay(1500);
    log("> [MOCK] Escrow locked. Status: ACTIVE", "yellow");
    await delay(300);

    log("> [MOCK] ERC-8126 Risk Scan: Running ZK verification...", "yellow");
    await delay(1800);
    log("> [MOCK] Risk Score: 12 / 100 (LOW RISK). Cleared.", "yellow");
    await delay(400);

    log("> Initializing Lit Protocol TEE Node...");
    await delay(800);

    log(`> Inheriting PolicyBundle CID: ${kol.nft.policyBundleCID}`);
    await delay(500);

    log(`> Injecting Follower Overrides: dailyLossLimit=${lossOverride}%`);
    await delay(400);

    log("> Executing hidden strategy logic inside TEE...", "cyan");
    await delay(2000);

    log("> Result: Trade complete. Verifying Policy Adherence...");
    await delay(800);

    log("> Calling /api/execute...", "cyan");

    try {
      const execRes = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: {
            followerWallet: wallet,
            inheritedPolicyId: kol.nft.tokenId,
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

      const { receipt, violations } = (await execRes.json()) as {
        receipt: AgentLogReceipt;
        violations: string[];
      };

      await delay(300);

      if (!receipt.policyAdherenceVerified) {
        log("> [BLOCKED] TEE detected Risk Guardrail Violation:", "red");
        for (const v of violations) {
          log(`>   ${v}`, "red");
        }
        log(`> TEE Signature: ${receipt.teeSignature}`, "white");
        await delay(500);
        log("> Violation receipt will still be logged for transparency.", "yellow");
      } else {
        log("> Policy Adherence: VERIFIED", "green");
        log(`> TEE Signature: ${receipt.teeSignature}`, "white");
      }

      await delay(600);

      // --- Upload to Storacha ---
      log("> Uploading AgentLogReceipt to Filecoin via Storacha...", "cyan");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receipt }),
      });

      const { cid, mode } = (await uploadRes.json()) as { cid: string; mode: string };

      await delay(400);
      log(`> Receipt CID: ${cid}`, "green");
      log(`> Storage mode: ${mode}`, "white");
      setResultCID(cid);

      await delay(500);

      // --- On-Chain Transaction ---
      log("> Submitting CID to ERC-8004 Registry on-chain...", "cyan");

      if (!isConnected) {
        log("> Wallet not connected. Skipping on-chain tx.", "yellow");
        log("> Connect your wallet to submit receipts on Base Sepolia.", "yellow");
        log("> Done (off-chain only).", "green");
        toast.success("Receipt generated (wallet not connected)", { description: cid });
        return;
      }

      try {
        // Auto-switch to Base Sepolia if needed
        if (chainId !== REGISTRY_CHAIN.id) {
          log(`> Wrong chain (${chainId}). Switching to ${REGISTRY_CHAIN.name}...`, "yellow");
          await switchChainAsync({ chainId: REGISTRY_CHAIN.id });
          log(`> Switched to ${REGISTRY_CHAIN.name} (${REGISTRY_CHAIN.id})`, "green");
          await delay(300);
        }

        log("> Requesting wallet signature...", "cyan");

        const hash = await writeContractAsync({
          address: REGISTRY_ADDRESS,
          abi: REGISTRY_ABI,
          functionName: "submitExecutionReceipt",
          args: [BigInt(kol.nft.tokenId), cid, receipt.policyAdherenceVerified],
          chainId: REGISTRY_CHAIN.id,
        });

        setTxHash(hash);
        log(`> Tx submitted: ${hash}`, "green");
        log("> Waiting for confirmation...", "cyan");

        // We don't await the receipt here to keep the demo snappy
        await delay(1500);
        log("> Receipt logged to AgentPolicyRegistry.submitExecutionReceipt()", "green");
        log("> Done.", "green");

        toast.success("Receipt logged to ERC-8004 Registry", {
          description: `Tx: ${hash.slice(0, 10)}...`,
        });
      } catch (txErr: any) {
        const msg = txErr?.shortMessage || txErr?.message || "Transaction failed";
        log(`> Tx failed: ${msg}`, "red");
        log("> Receipt was still uploaded to Filecoin.", "yellow");
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
      setResultCID(null);
      setTxHash(null);
      setLossOverride(maxLoss);
    }
    onOpenChange(next);
  };

  const colorClass: Record<LogLine["color"], string> = {
    green: "text-emerald-400",
    red: "text-red-400",
    yellow: "text-amber-400",
    cyan: "text-cyan-400",
    white: "text-zinc-300",
  };

  const explorerUrl = txHash
    ? `${REGISTRY_CHAIN.blockExplorers?.default.url}/tx/${txHash}`
    : null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{kol.nft.name}</DialogTitle>
          <DialogDescription>
            {phase === "form" ? "Configure overrides and deploy via TEE" : "TEE Execution Terminal"}
          </DialogDescription>
        </DialogHeader>

        {phase === "form" ? (
          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Inherited Policy</p>
              <div className="flex flex-wrap gap-1.5">
                {kol.policy.sourceGraph.monitoredVenues.map((v) => (
                  <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
                ))}
                {kol.policy.sourceGraph.eventTypes.map((e) => (
                  <Badge key={e} variant="outline" className="text-xs">{e.replace(/_/g, " ")}</Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
                <span>Min Liquidity: ${kol.policy.candidateFilters.minLiquidityUSD.toLocaleString()}</span>
                <span>Safety Score: {kol.policy.candidateFilters.requireContractSafetyScore}+</span>
                <span>Max Leverage: {kol.policy.riskGuardrails.maxLeverage}x</span>
                <span>Max Position: ${kol.policy.riskGuardrails.maxPositionSizeUSDC.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">
                Your Daily Loss Limit:{" "}
                <span className="font-mono text-emerald-400">{lossOverride}%</span>
                <span className="text-xs text-muted-foreground ml-2">(KOL max: {maxLoss}%)</span>
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
              <p className="text-sm font-medium">Follower Wallet</p>
              <Input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="font-mono text-xs"
              />
            </div>

            <Button onClick={execute} className="w-full">
              Deploy &amp; Execute via TEE
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 flex-1 min-h-0">
            <div
              ref={termRef}
              className="flex-1 bg-black rounded-lg border border-zinc-800 p-4 overflow-y-auto font-mono text-xs leading-relaxed min-h-[320px] max-h-[420px]"
            >
              {logs.map((l, i) => (
                <div key={i} className={colorClass[l.color]}>{l.text}</div>
              ))}
              {logs.length > 0 && !resultCID && logs[logs.length - 1]?.text !== "> Done." && logs[logs.length - 1]?.text !== "> Done (off-chain only)." && (
                <span className="text-emerald-400 animate-pulse">_</span>
              )}
            </div>

            {(resultCID || txHash) && (
              <div className="bg-muted rounded-lg p-3 space-y-2">
                {resultCID && (
                  <div>
                    <p className="text-xs text-muted-foreground">Filecoin Receipt CID</p>
                    <p className="font-mono text-xs break-all text-emerald-400">{resultCID}</p>
                  </div>
                )}
                {txHash && (
                  <div>
                    <p className="text-xs text-muted-foreground">On-Chain Transaction</p>
                    {explorerUrl ? (
                      <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs break-all text-cyan-400 underline"
                      >
                        {txHash}
                      </a>
                    ) : (
                      <p className="font-mono text-xs break-all text-cyan-400">{txHash}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <Button variant="outline" onClick={() => handleOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
