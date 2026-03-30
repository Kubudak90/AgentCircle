import type { PolicyBundle } from "@/types/schema";
import { Badge } from "@/components/ui/badge";

export default function PolicySection({ policy }: { policy: PolicyBundle }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-lg overflow-hidden">
      {/* Source Graph */}
      <div className="bg-[#0d0d0d] p-4 space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cobalt">Source Graph</p>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {policy.sourceGraph.monitoredVenues.map((v) => (
              <Badge key={v} variant="secondary" className="font-mono text-[10px] bg-cobalt/10 text-cobalt border-cobalt/20 hover:bg-cobalt/15">{v}</Badge>
            ))}
          </div>
          {policy.sourceGraph.trackedWalletClusters.map((c) => (
            <p key={c} className="text-xs font-mono text-muted-foreground/60"><span className="text-cobalt/60">&gt;</span> {c}</p>
          ))}
          <div className="flex flex-wrap gap-1.5">
            {policy.sourceGraph.eventTypes.map((e) => (
              <Badge key={e} variant="outline" className="font-mono text-[10px] border-white/[0.06] text-muted-foreground/70">{e.replace(/_/g, " ")}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Filters */}
      <div className="bg-[#0d0d0d] p-4 space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cobalt">Candidate Filters</p>
        <dl className="space-y-2.5">
          <div className="flex justify-between items-baseline">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Min Liquidity</dt>
            <dd className="font-mono text-sm">${policy.candidateFilters.minLiquidityUSD.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between items-baseline">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Token Age</dt>
            <dd className="font-mono text-sm">{policy.candidateFilters.minTokenAgeHours}h</dd>
          </div>
          <div className="flex justify-between items-baseline">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Max FDV</dt>
            <dd className="font-mono text-sm">{policy.candidateFilters.maxFDV ? `$${(policy.candidateFilters.maxFDV / 1e6).toFixed(0)}M` : "No cap"}</dd>
          </div>
          <div className="flex justify-between items-baseline">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Safety</dt>
            <dd className="font-mono text-sm text-receipt-green">{policy.candidateFilters.requireContractSafetyScore}+</dd>
          </div>
          {policy.candidateFilters.blacklistedSectors.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {policy.candidateFilters.blacklistedSectors.map((s) => (
                <Badge key={s} variant="outline" className="font-mono text-[10px] text-receipt-red/80 border-receipt-red/20 bg-receipt-red/5">{s}</Badge>
              ))}
            </div>
          )}
        </dl>
      </div>

      {/* Risk Guardrails */}
      <div className="bg-[#0d0d0d] p-4 space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber">Risk Guardrails</p>
        <dl className="space-y-2.5">
          <div className="flex justify-between items-baseline">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Max Position</dt>
            <dd className="font-mono text-sm">${policy.riskGuardrails.maxPositionSizeUSDC.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between items-baseline">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Max Leverage</dt>
            <dd className="font-mono text-sm">{policy.riskGuardrails.maxLeverage}x</dd>
          </div>
          <div className="flex justify-between items-baseline">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Daily Loss</dt>
            <dd className="font-mono text-sm text-amber">{policy.riskGuardrails.dailyLossLimitPercent}%</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Kill Switch</dt>
            <dd>
              {policy.riskGuardrails.killSwitchEnabled ? (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-receipt-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-receipt-green animate-pulse-subtle" />
                  ACTIVE
                </span>
              ) : (
                <span className="font-mono text-[10px] text-receipt-red">OFF</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
