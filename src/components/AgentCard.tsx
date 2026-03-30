import type { KOLAgent } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PolicySection from "@/components/PolicySection";
import ReceiptFeed from "@/components/ReceiptFeed";

function ReputationBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Rep</span>
      <div className="h-1.5 w-28 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-cobalt" style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-sm text-cobalt">{score}</span>
    </div>
  );
}

interface AgentCardProps {
  kol: KOLAgent;
  onInherit: (kol: KOLAgent) => void;
}

export default function AgentCard({ kol, onInherit }: AgentCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div className="space-y-1 flex-1">
          <h3 className="text-lg font-mono font-semibold">{kol.nft.name}</h3>
          <p className="text-xs font-mono text-muted-foreground">{kol.nft.description}</p>
        </div>
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex items-center gap-4">
            <ReputationBar score={kol.identity.reputationScore} />
            <span className="text-xs font-mono text-muted-foreground">{kol.identity.activeAdopters} adopters</span>
          </div>
          <Button onClick={() => onInherit(kol)} size="sm" className="font-mono">
            Inherit Policy
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <PolicySection policy={kol.policy} />
      </CardContent>
      <CardFooter className="p-0">
        <ReceiptFeed receipts={kol.recentReceipts} />
      </CardFooter>
    </Card>
  );
}
