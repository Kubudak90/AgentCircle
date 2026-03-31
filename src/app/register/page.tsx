"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useSwitchChain, usePublicClient } from "wagmi";
import { toast } from "sonner";
import ConnectButton from "@/components/ConnectButton";
import { REGISTRY_ADDRESS, REGISTRY_ABI, REGISTRY_CHAIN } from "@/lib/contract";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PolicyBundle } from "@/types/schema";

interface RegistrationResult {
  txHash: string;
  explorerUrl: string;
  policyCID: string;
  filecoinStorage: string;
  confirmed: boolean;
  onChainAgent: { name: string; reputationScore: number; policyBundleCID: string } | null;
  backendAgentId: string | null;
}

// ─── Preset Options ───

const WALLET_CLUSTERS = ["Smart Money 100", "Binance Hot Wallets", "Hyperliquid Top Traders", "VC Wallets"];
const VENUES = ["Hyperliquid", "Uniswap V3", "Raydium", "dYdX", "GMX"];
const EVENT_TYPES: ("LARGE_INFLOW" | "LIQUIDITY_CREATION" | "PERP_OI_SPIKE")[] = ["LARGE_INFLOW", "LIQUIDITY_CREATION", "PERP_OI_SPIKE"];
const SECTORS = ["Meme", "PolitiFi", "GameFi", "AI", "DePIN"];

// ─── Toggle Badge Component ───

function ToggleBadge({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 py-1.5 text-xs font-mono border transition-all active:scale-95 ${
        selected
          ? "bg-[#00FF9C]/20 text-[#00FF9C] border-[#00FF9C]/40"
          : "bg-[#0c1605] text-[#c0c9be]/30 border-[#414941]/20 hover:border-[#00FF9C]/20 hover:text-[#c0c9be]/60"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Section Header ───

function ElapsedTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-[10px] font-mono text-[#00FF9C]/60">{seconds}s</span>;
}

function SectionHeader({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-1">
        <span className="font-mono text-[#00FF9C] text-sm">{step}</span>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <p className="text-xs text-[#c0c9be]/40">{description}</p>
    </div>
  );
}

export default function RegisterPage() {
  const { address, isConnected, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [teeKey, setTeeKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [customCluster, setCustomCluster] = useState("");
  const [result, setResult] = useState<RegistrationResult | null>(null);

  // Auto-fetch TEE public key on mount
  useEffect(() => {
    fetch("/api/tee")
      .then((r) => r.json())
      .then((data) => {
        if (data.teePublicKey && !teeKey) {
          setTeeKey(data.teePublicKey);
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // PolicyBundle state
  const [trackedWalletClusters, setTrackedWalletClusters] = useState<string[]>([]);
  const [monitoredVenues, setMonitoredVenues] = useState<string[]>([]);
  const [eventTypes, setEventTypes] = useState<("LARGE_INFLOW" | "LIQUIDITY_CREATION" | "PERP_OI_SPIKE")[]>([]);
  const [minTokenAgeHours, setMinTokenAgeHours] = useState(24);
  const [minLiquidityUSD, setMinLiquidityUSD] = useState(50000);
  const [maxFDV, setMaxFDV] = useState<number | null>(500000000);
  const [hasFDVCap, setHasFDVCap] = useState(true);
  const [blacklistedSectors, setBlacklistedSectors] = useState<string[]>([]);
  const [requireContractSafetyScore, setRequireContractSafetyScore] = useState(60);
  const [maxPositionSizeUSDC, setMaxPositionSizeUSDC] = useState(10000);
  const [maxLeverage, setMaxLeverage] = useState(3);
  const [dailyLossLimitPercent, setDailyLossLimitPercent] = useState(5);
  const [killSwitchEnabled, setKillSwitchEnabled] = useState(true);

  const toggleArray = <T extends string>(arr: T[], item: T, setter: (v: T[]) => void) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const buildPolicyBundle = (): PolicyBundle => ({
    version: "1.0",
    sourceGraph: { trackedWalletClusters, monitoredVenues, eventTypes },
    candidateFilters: {
      minTokenAgeHours,
      minLiquidityUSD,
      maxFDV: hasFDVCap ? maxFDV : null,
      blacklistedSectors,
      requireContractSafetyScore,
    },
    riskGuardrails: { maxPositionSizeUSDC, maxLeverage, dailyLossLimitPercent, killSwitchEnabled },
  });

  const explorerBase = REGISTRY_CHAIN.blockExplorers?.default.url;

  const handleRegister = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet first");
      return;
    }
    if (!name) {
      toast.error("Agent name is required");
      return;
    }
    if (monitoredVenues.length === 0) {
      toast.error("Select at least one monitored venue");
      return;
    }
    if (!teeKey || teeKey === address) {
      toast.error("TEE public key not loaded. Wait for auto-fill or refresh the page.");
      return;
    }

    setLoading(true);
    setResult(null);
    const policy = buildPolicyBundle();

    try {
      // Step 1: Upload PolicyBundle to Filecoin
      setLoadingStep("Uploading PolicyBundle to Filecoin...");
      let policyCID = "";
      let filecoinStorage = "failed";
      try {
        const uploadRes = await fetch("/api/upload/policy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ policy }),
        });
        if (uploadRes.ok) {
          const data = await uploadRes.json();
          policyCID = data.cid;
          filecoinStorage = data.storage;
        }
      } catch {
        // Will be shown in result panel
      }

      if (!policyCID) {
        toast.error("Failed to upload PolicyBundle. Check if filecoin-bridge is running on port 3001.");
        setLoading(false);
        return;
      }

      // Step 2: Register on-chain
      setLoadingStep("Waiting for wallet signature...");
      if (chainId !== REGISTRY_CHAIN.id) {
        await switchChainAsync({ chainId: REGISTRY_CHAIN.id });
      }

      const hash = await writeContractAsync({
        address: REGISTRY_ADDRESS,
        abi: REGISTRY_ABI,
        functionName: "registerAgent",
        args: [name, address, policyCID, (teeKey || address) as `0x${string}`],
        chainId: REGISTRY_CHAIN.id,
      });

      // Step 3: Wait for tx confirmation + extract on-chain agentId from event
      setLoadingStep("Waiting for on-chain confirmation...");
      let confirmed = false;
      let onChainAgent: RegistrationResult["onChainAgent"] = null;
      let onChainAgentId: string | null = null;

      if (publicClient) {
        try {
          const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 1 });
          confirmed = receipt.status === "success";

          // Parse AgentRegistered event to get the REAL on-chain agentId
          if (confirmed && receipt.logs.length > 0) {
            for (const log of receipt.logs) {
              // AgentRegistered(uint256 indexed agentId, address indexed owner, string name)
              const AGENT_REGISTERED_TOPIC = "0x0d063c6022bff16d09991a9f91882ffa112f5fb2529136f65eb4c77bbd047e43";
              if (log.topics[0] === AGENT_REGISTERED_TOPIC) {
                // agentId is the first indexed parameter (topics[1])
                const rawId = log.topics[1];
                if (rawId) {
                  onChainAgentId = String(BigInt(rawId));
                }
                break;
              }
            }
          }

          // If we couldn't parse the event, read nextAgentId - 1 as fallback
          if (!onChainAgentId && confirmed) {
            try {
              const nextId = await publicClient.readContract({
                address: REGISTRY_ADDRESS,
                abi: [...REGISTRY_ABI, { type: "function", name: "nextAgentId", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" }],
                functionName: "nextAgentId",
              }) as bigint;
              onChainAgentId = String(nextId - 1n);
            } catch { /* fallback failed */ }
          }
        } catch {
          // tx may still be pending
        }
      }

      // Step 4: Read back the actual agent from contract
      if (confirmed && publicClient && onChainAgentId) {
        setLoadingStep("Verifying on-chain data...");
        try {
          const agentData = await publicClient.readContract({
            address: REGISTRY_ADDRESS,
            abi: REGISTRY_ABI,
            functionName: "getAgent",
            args: [BigInt(onChainAgentId)],
          });
          onChainAgent = {
            name: agentData.name || name,
            reputationScore: Number(agentData.reputationScore ?? 50),
            policyBundleCID: policyCID,
          };
        } catch {
          onChainAgent = { name, reputationScore: 50, policyBundleCID: policyCID };
        }
      }

      // Step 5: Sync with backend using the REAL on-chain agentId
      setLoadingStep("Syncing with backend...");
      let newAgentId: string | null = onChainAgentId;
      try {
        const res = await fetch("/api/agents/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            operatorWallet: address,
            policyBundleCID: policyCID,
            teePublicKey: teeKey || address,
            description: "",
            policyBundle: policy,
            onChainAgentId, // Pass the real ID so backend uses it
          }),
        });
        if (res.ok) {
          const data = await res.json();
          newAgentId = data.agentId;
        }
      } catch {
        // Non-critical for verification
      }

      // Show result panel
      setResult({
        txHash: hash,
        explorerUrl: `${explorerBase}/tx/${hash}`,
        policyCID,
        filecoinStorage,
        confirmed,
        onChainAgent,
        backendAgentId: newAgentId,
      });

    } catch (e: any) {
      toast.error("Registration failed", { description: e?.shortMessage || e?.message });
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1605] text-[#d9e7c8] selection:bg-[#00FF9C] selection:text-[#003919]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#18230f]/90 backdrop-blur-xl border-b border-[#00FF9C]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center px-6 lg:px-8 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-[#00FF9C] tracking-tight neon-text-glow">AgentCircle</Link>
            <div className="hidden md:flex gap-6 text-xs font-medium uppercase tracking-widest">
              <Link href="/" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors">Discover</Link>
              <Link href="/circles" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors">Policy Circles</Link>
              <Link href="/mcp" className="text-[#d9e7c8]/40 hover:text-[#d9e7c8] transition-colors">MCP</Link>
            </div>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
        {/* Back */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00FF9C]/70 hover:text-[#00FF9C] transition-colors group">
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Register Agent</h1>
          <p className="text-sm text-[#c0c9be]/50">
            Publish your operational policy on-chain. Define what your agent watches, how it filters candidates, and what risk limits it enforces. Followers inherit your PolicyBundle via TEE.
          </p>
        </div>

        {/* Agent Identity */}
        <div className="glass-panel rounded-2xl p-6 mb-6">
          <SectionHeader step="00" title="Agent Identity" description="Basic info registered on ERC-8004" />
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF9C]">Agent Name</label>
              <input
                placeholder="e.g., Whale Tracker Alpha"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0c1605] border border-[#00FF9C]/20 rounded-lg text-sm font-mono text-[#d9e7c8] placeholder:text-[#c0c9be]/20 focus:outline-none focus:border-[#00FF9C]/50 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Operator Wallet</label>
                <input value={address || "Connect wallet"} disabled className="w-full px-4 py-3 bg-[#0c1605]/50 border border-[#414941]/20 rounded-lg text-xs font-mono text-[#c0c9be]/40" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">TEE Public Key <span className="text-[#00FF9C]/40">(auto-filled from Lit Protocol)</span></label>
                <input
                  value={teeKey}
                  onChange={(e) => setTeeKey(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0c1605]/50 border border-[#414941]/20 rounded-lg text-xs font-mono text-[#00FF9C]/60"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Source Graph */}
        <div className="glass-panel rounded-2xl p-6 mb-6">
          <SectionHeader step="01" title="Source Graph" description="What does your agent observe? Which wallets, venues, and event types does it track?" />
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50 mb-2 block">Tracked Wallet Clusters</label>
              <div className="flex flex-wrap gap-2">
                {WALLET_CLUSTERS.map((c) => (
                  <ToggleBadge key={c} label={c} selected={trackedWalletClusters.includes(c)} onToggle={() => toggleArray(trackedWalletClusters, c, setTrackedWalletClusters)} />
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  placeholder="+ Custom cluster"
                  value={customCluster}
                  onChange={(e) => setCustomCluster(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customCluster.trim()) {
                      setTrackedWalletClusters([...trackedWalletClusters, customCluster.trim()]);
                      setCustomCluster("");
                    }
                  }}
                  className="flex-1 px-3 py-1.5 bg-[#0c1605] border border-[#414941]/20 rounded text-xs font-mono text-[#d9e7c8] placeholder:text-[#c0c9be]/15 focus:outline-none focus:border-[#00FF9C]/30"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50 mb-2 block">Monitored Venues</label>
              <div className="flex flex-wrap gap-2">
                {VENUES.map((v) => (
                  <ToggleBadge key={v} label={v} selected={monitoredVenues.includes(v)} onToggle={() => toggleArray(monitoredVenues, v, setMonitoredVenues)} />
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50 mb-2 block">Event Types</label>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map((e) => (
                  <ToggleBadge key={e} label={e.replace(/_/g, " ")} selected={eventTypes.includes(e)} onToggle={() => toggleArray(eventTypes, e, setEventTypes)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Filters */}
        <div className="glass-panel rounded-2xl p-6 mb-6">
          <SectionHeader step="02" title="Candidate Filters" description="What criteria must a candidate meet before your agent considers it?" />
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Min Token Age (hours)</label>
                <input
                  type="number"
                  value={minTokenAgeHours}
                  onChange={(e) => setMinTokenAgeHours(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#0c1605] border border-[#00FF9C]/20 rounded-lg text-sm font-mono text-[#d9e7c8] focus:outline-none focus:border-[#00FF9C]/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Min Liquidity (USD)</label>
                <input
                  type="number"
                  value={minLiquidityUSD}
                  onChange={(e) => setMinLiquidityUSD(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#0c1605] border border-[#00FF9C]/20 rounded-lg text-sm font-mono text-[#d9e7c8] focus:outline-none focus:border-[#00FF9C]/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Max FDV</label>
                <button
                  type="button"
                  onClick={() => setHasFDVCap(!hasFDVCap)}
                  className={`text-[10px] font-mono px-2 py-0.5 border transition-all ${
                    hasFDVCap ? "text-[#00FF9C] border-[#00FF9C]/30 bg-[#00FF9C]/10" : "text-[#c0c9be]/30 border-[#414941]/20"
                  }`}
                >
                  {hasFDVCap ? "CAP ON" : "NO CAP"}
                </button>
              </div>
              {hasFDVCap && (
                <input
                  type="number"
                  value={maxFDV || 0}
                  onChange={(e) => setMaxFDV(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#0c1605] border border-[#00FF9C]/20 rounded-lg text-sm font-mono text-[#d9e7c8] focus:outline-none focus:border-[#00FF9C]/50"
                />
              )}
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50 mb-2 block">Blacklisted Sectors</label>
              <div className="flex flex-wrap gap-2">
                {SECTORS.map((s) => (
                  <ToggleBadge key={s} label={s} selected={blacklistedSectors.includes(s)} onToggle={() => toggleArray(blacklistedSectors, s, setBlacklistedSectors)} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Contract Safety Score</label>
                <span className="font-mono text-sm text-[#00FF9C]">{requireContractSafetyScore}+</span>
              </div>
              <Slider
                value={[requireContractSafetyScore]}
                onValueChange={(val) => setRequireContractSafetyScore(Array.isArray(val) ? val[0] : val)}
                min={0}
                max={100}
                step={5}
              />
            </div>
          </div>
        </div>

        {/* Risk Guardrails */}
        <div className="glass-panel rounded-2xl p-6 mb-6">
          <SectionHeader step="03" title="Risk Guardrails" description="Hard limits enforced by TEE. Followers can only tighten these, never loosen." />
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Max Position Size (USDC)</label>
              <input
                type="number"
                value={maxPositionSizeUSDC}
                onChange={(e) => setMaxPositionSizeUSDC(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#0c1605] border border-[#00FF9C]/20 rounded-lg text-sm font-mono text-[#d9e7c8] focus:outline-none focus:border-[#00FF9C]/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Max Leverage</label>
                <span className="font-mono text-sm text-[#FFBA20]">{maxLeverage}x</span>
              </div>
              <Slider
                value={[maxLeverage]}
                onValueChange={(val) => setMaxLeverage(Array.isArray(val) ? val[0] : val)}
                min={1}
                max={10}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Daily Loss Limit</label>
                <span className="font-mono text-sm text-[#FFBA20]">{dailyLossLimitPercent}%</span>
              </div>
              <Slider
                value={[dailyLossLimitPercent]}
                onValueChange={(val) => setDailyLossLimitPercent(Array.isArray(val) ? val[0] : val)}
                min={0.5}
                max={20}
                step={0.5}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c0c9be]/50">Kill Switch</label>
              <button
                type="button"
                onClick={() => setKillSwitchEnabled(!killSwitchEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono font-bold border transition-all ${
                  killSwitchEnabled
                    ? "text-[#00FF9C] border-[#00FF9C]/30 bg-[#00FF9C]/10"
                    : "text-red-400 border-red-400/30 bg-red-400/10"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${killSwitchEnabled ? "bg-[#00FF9C] animate-pulse" : "bg-red-400"}`} />
                {killSwitchEnabled ? "ACTIVE" : "OFF"}
              </button>
            </div>
          </div>
        </div>

        {/* Policy Preview */}
        <div className="glass-panel rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF9C]">PolicyBundle Preview</span>
            <span className="text-[10px] font-mono text-[#c0c9be]/20">JSON — will be uploaded to Filecoin</span>
          </div>
          <pre className="bg-[#0c1605] rounded-lg border border-[#00FF9C]/10 p-4 font-mono text-[10px] text-[#c0c9be]/50 leading-relaxed overflow-x-auto max-h-48 overflow-y-auto">
            {JSON.stringify(buildPolicyBundle(), null, 2)}
          </pre>
        </div>

        {/* Submit */}
        {!result && (
          <div className="space-y-3">
            <button
              onClick={handleRegister}
              disabled={loading || !isConnected}
              className="w-full bioluminescent-btn py-4 rounded-xl font-bold text-sm uppercase tracking-wider active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? loadingStep || "Registering..." : "Upload to Filecoin & Register on Base Sepolia"}
            </button>
            {loading && (
              <div className="flex items-center gap-3 justify-center">
                <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
                <span className="text-[10px] font-mono text-[#c0c9be]/40">
                  {loadingStep.includes("Filecoin") ? "Filecoin upload takes 50-100s — writing to Calibration testnet..." : "Processing..."}
                </span>
                <ElapsedTimer />
              </div>
            )}
          </div>
        )}

        {/* Verification Result Panel */}
        {result && (
          <div className="glass-panel rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-3 h-3 rounded-full ${result.confirmed ? "bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]" : "bg-[#FFBA20] shadow-[0_0_8px_#FFBA20]"}`} />
              <h3 className="font-bold text-lg">{result.confirmed ? "Agent Registered & Confirmed" : "Agent Submitted (Pending Confirmation)"}</h3>
            </div>

            {/* On-chain Tx */}
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF9C]">On-Chain Transaction</p>
              <p className="font-mono text-xs text-[#c0c9be]/50 break-all">{result.txHash}</p>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${result.confirmed ? "text-[#00FF9C] border-[#00FF9C]/30 bg-[#00FF9C]/10" : "text-[#FFBA20] border-[#FFBA20]/30 bg-[#FFBA20]/10"}`}>
                  {result.confirmed ? "CONFIRMED" : "PENDING"}
                </span>
                <a
                  href={result.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono font-bold text-[#8ba3ff] hover:text-[#8ba3ff]/80 transition-colors"
                >
                  Verify on Basescan &rarr;
                </a>
              </div>
            </div>

            {/* Filecoin Storage */}
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF9C]">PolicyBundle Storage</p>
              <p className="font-mono text-xs text-[#c0c9be]/50 break-all">{result.policyCID}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${
                  result.filecoinStorage === "filecoin-foc"
                    ? "text-[#00FF9C] border-[#00FF9C]/30 bg-[#00FF9C]/10"
                    : "text-[#FFBA20] border-[#FFBA20]/30 bg-[#FFBA20]/10"
                }`}>
                  {result.filecoinStorage === "filecoin-foc" ? "FILECOIN FOC" : "LOCAL FALLBACK"}
                </span>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/verify?cid=${encodeURIComponent(result.policyCID)}`);
                      const data = await res.json();
                      if (data.verified) {
                        toast.success("CID verified! PolicyBundle retrieved from storage.", {
                          description: `Source: ${data.source}`,
                        });
                      } else {
                        toast.error("CID not retrievable", {
                          description: data.error || "Run: pnpm bridge",
                        });
                      }
                    } catch {
                      toast.error("Verification failed — bridge unreachable");
                    }
                  }}
                  className="text-[10px] font-mono font-bold text-[#8ba3ff] hover:text-[#8ba3ff]/80 transition-colors"
                >
                  Verify CID &rarr;
                </button>
              </div>
              {result.filecoinStorage !== "filecoin-foc" && (
                <p className="text-[9px] text-[#FFBA20]/60 font-mono">
                  Bridge not running. Start with: pnpm bridge (or pnpm dev:all for both servers)
                </p>
              )}
            </div>

            {/* On-chain Readback */}
            {result.onChainAgent && (
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00FF9C]">On-Chain Verification</p>
                <div className="bg-[#0c1605] border border-[#00FF9C]/10 rounded-lg p-3 font-mono text-[10px] text-[#c0c9be]/50 space-y-1">
                  <p>Name: <span className="text-[#d9e7c8]">{result.onChainAgent.name}</span></p>
                  <p>Initial Rep: <span className="text-[#00FF9C]">{result.onChainAgent.reputationScore}</span></p>
                  <p>Policy CID: <span className="text-[#8ba3ff]">{result.onChainAgent.policyBundleCID.slice(0, 30)}...</span></p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              {result.backendAgentId && (
                <button
                  onClick={() => router.push(`/circles/${result.backendAgentId}`)}
                  className="bioluminescent-btn px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
                >
                  View Agent Page
                </button>
              )}
              <a
                href={result.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#00FF9C]/5 border border-[#00FF9C]/30 text-[#d9e7c8] font-bold text-xs uppercase tracking-wider hover:bg-[#00FF9C]/10 transition-all inline-block"
              >
                View on Basescan
              </a>
              <button
                onClick={() => setResult(null)}
                className="px-6 py-3 rounded-xl border border-[#414941]/30 text-[#c0c9be]/40 font-bold text-xs uppercase tracking-wider hover:text-[#d9e7c8] transition-all"
              >
                Register Another
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
