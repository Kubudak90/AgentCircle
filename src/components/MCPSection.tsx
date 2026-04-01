import { Badge } from "@/components/ui/badge";

const mcpConfig = `{
  "mcpServers": {
    "agentcircle": {
      "command": "npx",
      "args": ["tsx", "scripts/mcp-server.ts"],
      "env": {
        "API_BASE": "http://localhost:3000"
      }
    }
  }
}`;

export default function MCPSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/[0.04] w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="font-mono text-receipt-green text-[10px] uppercase tracking-[0.2em]">Agent-Native Interface</p>
          <h2 className="text-2xl font-medium tracking-tight">MCP Integration</h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed">
            Any MCP-compatible agent — Claude Code, Cursor, or custom — can subscribe to strategies
            programmatically without a browser. Your agent calls the tool, the TEE verifies,
            the receipt goes on-chain.
          </p>
          <div className="flex gap-2 pt-2">
            <Badge variant="outline" className="font-mono text-[10px] border-receipt-green/20 text-receipt-green/80 bg-receipt-green/5">list_circles</Badge>
            <Badge variant="outline" className="font-mono text-[10px] border-receipt-green/20 text-receipt-green/80 bg-receipt-green/5">inherit_agent_policy</Badge>
          </div>
        </div>
        <div>
          <pre className="bg-[#0a0a0a] rounded-lg border border-white/[0.06] p-5 overflow-x-auto font-mono text-xs leading-relaxed text-muted-foreground/70">
            {mcpConfig}
          </pre>
          <p className="text-[10px] text-muted-foreground/40 font-mono mt-2">
            Add to claude_desktop_config.json or .cursor/mcp.json
          </p>
        </div>
      </div>
    </section>
  );
}
