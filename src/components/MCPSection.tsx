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
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="font-mono text-cobalt text-xs uppercase tracking-widest">Agent-Native Interface</p>
          <h2 className="text-2xl font-medium">MCP Integration</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Any MCP-compatible agent — Claude Code, Cursor, or custom — can inherit policies
            programmatically without a browser. Your agent calls the tool, the TEE verifies,
            the receipt goes on-chain.
          </p>
          <div className="flex gap-2 pt-2">
            <Badge variant="outline" className="font-mono text-xs">list_circles</Badge>
            <Badge variant="outline" className="font-mono text-xs">inherit_agent_policy</Badge>
          </div>
        </div>
        <div>
          <pre className="bg-black rounded-lg border border-zinc-800 p-4 overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300">
            {mcpConfig}
          </pre>
          <p className="text-[10px] text-muted-foreground font-mono mt-2">
            Add to claude_desktop_config.json or .cursor/mcp.json
          </p>
        </div>
      </div>
    </section>
  );
}
