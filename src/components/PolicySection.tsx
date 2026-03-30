import type { PolicyBundle } from "@/types/schema";
import { Badge } from "@/components/ui/badge";

export default function PolicySection({ policy }: { policy: PolicyBundle }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
      {/* Source Graph */}
      <div className="bg-card p-4 space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-cobalt">Source Graph</p>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {policy.sourceGraph.monitoredVenues.map((v) => (
              <Badge key={v} variant="secondary" className="font-mono text-xs">{v}</Badge>
            ))}
          </div>
          {policy.sourceGraph.trackedWalletClusters.map((c) => (
            <p key={c} className="text-xs font-mono text-muted-foreground">&gt; {c}</p>
          ))}
          <div className="flex flex-wrap gap-1.5">
            {policy.sourceGraph.eventTypes.map((e) => (
              <Badge key={e} variant="outline" className="font-mono text-[10px]">{e.replace(/_/g, " ")}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Filters */}
      <div className="bg-card p-4 space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-cobalt">Candidate Filters</p>
        <dl className="space-y-2">
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Min Liquidity</dt>
            <dd className="font-mono text-sm">${policy.candidateFilters.minLiquidityUSD.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Min Token Age</dt>
            <dd className="font-mono text-sm">{policy.candidateFilters.minTokenAgeHours}h</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Max FDV</dt>
            <dd className="font-mono text-sm">{policy.candidateFilters.maxFDV ? `$${(policy.candidateFilters.maxFDV / 1e6).toFixed(0)}M` : "No cap"}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Safety Score</dt>
            <dd className="font-mono text-sm">{policy.candidateFilters.requireContractSafetyScore}+</dd>
          </div>
          {policy.candidateFilters.blacklistedSectors.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {policy.candidateFilters.blacklistedSectors.map((s) => (
                <Badge key={s} variant="outline" className="font-mono text-[10px] text-receipt-red border-receipt-red/30">{s}</Badge>
              ))}
            </div>
          )}
        </dl>
      </div>

      {/* Risk Guardrails */}
      <div className="bg-card p-4 space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber">Risk Guardrails</p>
        <dl className="space-y-2">
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Max Position</dt>
            <dd className="font-mono text-sm">${policy.riskGuardrails.maxPositionSizeUSDC.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Max Leverage</dt>
            <dd className="font-mono text-sm">{policy.riskGuardrails.maxLeverage}x</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Daily Loss Limit</dt>
            <dd className="font-mono text-sm text-amber">{policy.riskGuardrails.dailyLossLimitPercent}%</dd>
          </div>
          <div>
            <dt className="text-[10px] text-muted-foreground uppercase">Kill Switch</dt>
            <dd>
              <Badge variant={policy.riskGuardrails.killSwitchEnabled ? "default" : "destructive"} className="font-mono text-[10px]">
                {policy.riskGuardrails.killSwitchEnabled ? "ACTIVE" : "OFF"}
              </Badge>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
