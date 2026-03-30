import type { MockReceipt } from "@/lib/mock-data";
import { REGISTRY_CHAIN } from "@/lib/contract";

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ReceiptFeed({ receipts }: { receipts: MockReceipt[] }) {
  if (!receipts.length) return null;

  const explorerBase = REGISTRY_CHAIN.blockExplorers?.default.url;

  return (
    <div className="w-full border-t border-white/[0.04] px-4 py-3">
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Recent Executions</p>
      <div className="space-y-0.5">
        {receipts.map((r) => (
          <div
            key={r.id}
            className={`flex items-center gap-3 text-xs font-mono px-2 py-1.5 rounded ${
              r.adherent ? "bg-receipt-green/[0.03]" : "bg-receipt-red/[0.04]"
            }`}
          >
            <span className={`font-bold w-8 ${r.adherent ? "text-receipt-green" : "text-receipt-red"}`}>
              {r.adherent ? "PASS" : "FAIL"}
            </span>
            <span className="text-muted-foreground/60 truncate flex-1">{r.action}</span>
            <span className={`w-14 text-right font-semibold ${r.pnlPercent >= 0 ? "text-receipt-green" : "text-receipt-red"}`}>
              {r.pnlPercent >= 0 ? "+" : ""}{r.pnlPercent.toFixed(1)}%
            </span>
            <span className="text-muted-foreground/30 w-14 text-right">{timeAgo(r.timestamp)}</span>
            {r.txHash && explorerBase && (
              <a
                href={`${explorerBase}/tx/${r.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cobalt/40 hover:text-cobalt transition-colors text-[10px]"
              >
                tx
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
