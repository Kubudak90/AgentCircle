"use client";

import { useState } from "react";
import { MOCK_KOLS, type KOLAgent } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InheritDialog from "@/components/InheritDialog";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";

function ReputationBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-mono text-muted-foreground">{score}</span>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<KOLAgent | null>(null);

  return (
    <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <Link href="/register">
            <Button variant="outline" size="sm">Register Agent</Button>
          </Link>
          <ConnectButton />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">AgentCircle</h1>
          <p className="text-muted-foreground text-lg">
            Private Policy Inheritance for Crypto Agents
          </p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_KOLS.map((kol) => (
          <Card key={kol.nft.tokenId} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{kol.nft.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {kol.nft.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Reputation
                </p>
                <ReputationBar score={kol.identity.reputationScore} />
              </div>

              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Adopters </span>
                  <span className="font-mono font-semibold">{kol.identity.activeAdopters}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Loss </span>
                  <span className="font-mono font-semibold">
                    {kol.policy.riskGuardrails.dailyLossLimitPercent}%
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {kol.policy.sourceGraph.monitoredVenues.map((v) => (
                  <Badge key={v} variant="secondary" className="text-xs">
                    {v}
                  </Badge>
                ))}
                {kol.policy.sourceGraph.eventTypes.map((e) => (
                  <Badge key={e} variant="outline" className="text-xs">
                    {e.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>

              <Button className="mt-auto w-full" onClick={() => setSelected(kol)}>
                Inherit Policy
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selected && (
        <InheritDialog
          kol={selected}
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        />
      )}
    </main>
  );
}
