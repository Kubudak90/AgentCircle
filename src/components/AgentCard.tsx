import type { KOLAgent } from "@/lib/mock-data";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import PolicySection from "@/components/PolicySection";
import ReceiptFeed from "@/components/ReceiptFeed";

function ReputationBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-receipt-green" : score >= 60 ? "bg-cobalt" : "bg-receipt-red";
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Rep</span>
      <div className="h-1.5 w-28 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className={`font-mono text-sm font-semibold ${score >= 80 ? "text-receipt-green" : score >= 60 ? "text-cobalt" : "text-receipt-red"}`}>{score}</span>
    </div>
  );
}

interface AgentCardProps {
  kol: KOLAgent;
  onInherit: (kol: KOLAgent) => void;
}

export default function AgentCard({ kol, onInherit }: AgentCardProps) {
  return (
    <div className="glass-card rounded-xl border border-white/[0.06] bg-[#111111]/80 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div className="space-y-1 flex-1">
          <h3 className="text-lg font-mono font-semibold tracking-tight">{kol.nft.name}</h3>
          <p className="text-xs font-mono text-muted-foreground/70">{kol.nft.description}</p>
        </div>
        <div className="flex flex-col sm:items-end gap-3">
          <div className="flex items-center gap-4">
            <ReputationBar score={kol.identity.reputationScore} />
            <span className="text-xs font-mono text-muted-foreground/60">{kol.identity.activeAdopters} adopters</span>
          </div>
          <button
            onClick={() => onInherit(kol)}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-receipt-green/90 to-[#00e68a]/90 text-[#0a0a0a] text-xs font-mono font-bold tracking-wide hover:shadow-[0_0_20px_-5px_rgba(16,245,160,0.4)] hover:brightness-110 active:scale-[0.97] transition-all"
          >
            Inherit Policy
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <PolicySection policy={kol.policy} />
      </CardContent>
      <CardFooter className="p-0">
        <ReceiptFeed receipts={kol.recentReceipts} />
      </CardFooter>
    </div>
  );
}
