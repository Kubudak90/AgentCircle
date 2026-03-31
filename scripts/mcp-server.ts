/**
 * AgentCircle MCP Server
 *
 * Exposes AgentCircle protocol as MCP tools for any compatible agent client
 * (Claude Code, Cursor, etc). Agents can inherit policies and submit receipts
 * via natural language without touching a browser.
 *
 * CRITICAL: All logging via console.error (stderr). console.log corrupts stdio JSON-RPC.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE = process.env.API_BASE || "http://localhost:3000";

const server = new Server(
  { name: "AgentCircle-MCP", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ─── List Tools ───

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_circles",
      description:
        "List all available AgentCircle policy circles. Returns KOL agent IDs, names, reputation scores, and policy summaries.",
      inputSchema: { type: "object" as const, properties: {} },
    },
    {
      name: "evaluate_impact",
      description: "Evaluate the impact of an AgentCircle KOL agent by analyzing their hypercert data, TEE execution evidence, adherence rate, and reputation metrics. Returns a comprehensive evaluation with verification links.",
      inputSchema: {
        type: "object" as const,
        properties: {
          agentId: {
            type: "string",
            description: "The ID of the agent to evaluate (e.g., '1' for Garry's Whale Tracker)",
          },
        },
        required: ["agentId"],
      },
    },
    {
      name: "inherit_agent_policy",
      description:
        "Inherit a trading policy from an AgentCircle KOL. Executes securely inside a TEE, verifies risk guardrails via ECDSA, and returns the cryptographic Filecoin receipt. The follower agent adopts the KOL's Source Graph, Candidate Filters, and Risk Guardrails.",
      inputSchema: {
        type: "object" as const,
        properties: {
          kolAgentId: {
            type: "string",
            description: "The ID of the KOL agent whose policy to inherit (e.g., '1' for Garry's Whale Tracker)",
          },
          followerWallet: {
            type: "string",
            description: "The Ethereum address of the follower agent (e.g., '0x1234...')",
          },
        },
        required: ["kolAgentId", "followerWallet"],
      },
    },
  ],
}));

// ─── Tool Handlers ───

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "list_circles") {
    try {
      const res = await fetch(`${API_BASE}/api/agents`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const { agents } = await res.json();

      const circles = agents.map((a: any) => {
        const g = a.policy.riskGuardrails;
        return `[ID: ${a.identity.agentId}] ${a.nft.name} | Rep: ${a.identity.reputationScore} | Max Loss: ${g.dailyLossLimitPercent}% | Max Leverage: ${g.maxLeverage}x | Kill Switch: ${g.killSwitchEnabled ? "ON" : "OFF"}`;
      });

      return {
        content: [{
          type: "text" as const,
          text: `Available AgentCircle Policy Circles:\n\n${circles.join("\n")}\n\nUse inherit_agent_policy with the KOL's ID to adopt their policy.`,
        }],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text" as const, text: `Error fetching circles: ${err.message}. Is the Next.js server running at ${API_BASE}?` }],
        isError: true,
      };
    }
  }

  if (name === "inherit_agent_policy") {
    const kolAgentId = (args as any)?.kolAgentId;
    const followerWallet = (args as any)?.followerWallet;

    if (!kolAgentId || !followerWallet) {
      return {
        content: [{ type: "text" as const, text: "Error: kolAgentId and followerWallet are required." }],
        isError: true,
      };
    }

    // Fetch real agent data from API
    let kolName: string;
    let kolPolicy: any;
    try {
      const agentRes = await fetch(`${API_BASE}/api/agents/${kolAgentId}`);
      if (!agentRes.ok) {
        return {
          content: [{ type: "text" as const, text: `Error: No KOL found with ID ${kolAgentId}. Use list_circles to see available policies.` }],
          isError: true,
        };
      }
      const agent = await agentRes.json();
      kolName = agent.nft?.name || `Agent ${kolAgentId}`;
      kolPolicy = agent.policy;
    } catch (err: any) {
      return {
        content: [{ type: "text" as const, text: `Error: API unreachable (${err.message}). Start the server with 'pnpm dev'.` }],
        isError: true,
      };
    }

    console.error(`> AgentCircle MCP: Intercepted intent. Inheriting policy from ${kolName}...`);
    console.error(`> Forwarding to TEE Enclave at ${API_BASE}/api/execute...`);

    try {
      const res = await fetch(`${API_BASE}/api/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: {
            followerWallet,
            inheritedPolicyId: kolAgentId,
            targetTxHash: null,
          },
          policy: kolPolicy,
          mockTradeResult: {
            pnlPercent: -6.0,
            slippageBps: 45,
            latencyMs: 320,
            txHash: null,
          },
        }),
      });

      if (!res.ok) throw new Error(`API returned ${res.status}`);

      const { receipt, violations, receiptCID, mockPkpAddress } = await res.json();

      console.error(`> TEE execution complete. Adherence: ${receipt.policyAdherenceVerified}`);

      const violationText =
        violations.length > 0
          ? `\nRisk Guardrail Violations:\n${violations.map((v: string) => `  - ${v}`).join("\n")}`
          : "";

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `AgentCircle Policy Inheritance Complete`,
              ``,
              `KOL: ${kolName} (ID: ${kolAgentId})`,
              `Follower: ${followerWallet}`,
              `Policy Adherence Verified: ${receipt.policyAdherenceVerified}`,
              violationText,
              ``,
              `TEE Signature: ${receipt.teeSignature}`,
              `Mock PKP Address: ${mockPkpAddress}`,
              `Receipt CID: ${receiptCID}`,
              ``,
              `Execution Metrics:`,
              `  Latency: ${receipt.metrics.latency_ms}ms`,
              `  Slippage: ${receipt.metrics.slippage_bps} bps`,
              ``,
              receipt.policyAdherenceVerified
                ? `The inherited policy was fully compliant. Receipt is ready for on-chain submission to ERC-8004 Registry.`
                : `WARNING: Policy violation detected. Receipt logged for transparency but the trade was blocked by TEE guardrails.`,
            ].join("\n"),
          },
        ],
      };
    } catch (err: any) {
      console.error(`> AgentCircle MCP: API error — ${err.message}`);
      return {
        content: [{
          type: "text" as const,
          text: [
            `AgentCircle Policy Inheritance Failed`,
            ``,
            `KOL: ${kolName} (ID: ${kolAgentId})`,
            `Follower: ${followerWallet}`,
            ``,
            `Error: ${err.message}`,
            ``,
            `The Next.js server may be unreachable.`,
            `Start with 'pnpm dev' and retry.`,
          ].join("\n"),
        }],
        isError: true,
      };
    }
  }

  if (name === "evaluate_impact") {
    const agentId = (args as any)?.agentId;
    if (!agentId) {
      return {
        content: [{ type: "text" as const, text: "Error: agentId is required." }],
        isError: true,
      };
    }

    console.error(`> AgentCircle MCP: Evaluating impact for agent ${agentId}...`);

    try {
      const [agentRes, hypercertRes, evidenceRes] = await Promise.all([
        fetch(`${API_BASE}/api/agents/${agentId}`),
        fetch(`${API_BASE}/api/hypercert/${agentId}`),
        fetch(`${API_BASE}/api/hypercert/${agentId}/evidence`),
      ]);

      const agent = agentRes.ok ? await agentRes.json() : null;
      const hypercertData = hypercertRes.ok ? await hypercertRes.json() : null;
      const evidenceData = evidenceRes.ok ? await evidenceRes.json() : null;

      if (!agent || !agent.nft) {
        return {
          content: [{ type: "text" as const, text: `Error: Agent ${agentId} not found.` }],
          isError: true,
        };
      }

      const evidence = evidenceData?.evidence || [];
      const hypercert = hypercertData?.hypercert;
      const totalExecutions = evidence.length;
      const passCount = evidence.filter((e: any) => e.adherenceVerified).length;
      const adherenceRate = totalExecutions > 0 ? Math.round((passCount / totalExecutions) * 100) : 0;
      const repScore = agent.identity?.reputationScore || 0;
      const adopters = agent.identity?.activeAdopters || 0;
      const hasHypercert = !!hypercert;

      const overallScore = Math.round(
        adherenceRate * 0.4 +
        repScore * 0.3 +
        Math.min(totalExecutions * 10, 100) * 0.2 +
        (hasHypercert ? 100 : 0) * 0.1
      );

      const evidenceList = evidence.length > 0
        ? evidence.map((e: any) => `  - CID: ${e.receiptCID?.slice(0, 30)}... | ${e.adherenceVerified ? "PASS" : "FAIL"} | ${new Date(e.timestamp).toISOString()}`).join("\n")
        : "  No evidence recorded yet.";

      return {
        content: [{
          type: "text" as const,
          text: [
            `AgentCircle Impact Evaluation`,
            ``,
            `Agent: ${agent.nft.name} (ID: ${agentId})`,
            `Operator: ${agent.identity?.operatorWallet || "unknown"}`,
            ``,
            `── Metrics ──`,
            `Overall Impact Score: ${overallScore}/100`,
            `Reputation Score: ${repScore}/100`,
            `Adherence Rate: ${adherenceRate}% (${passCount}/${totalExecutions} executions)`,
            `Active Adopters: ${adopters}`,
            `Total TEE Executions: ${totalExecutions}`,
            ``,
            `── Hypercert ──`,
            hasHypercert ? `Status: MINTED` : `Status: NOT MINTED`,
            hasHypercert ? `Claim ID: ${hypercert.claimId || "pending extraction"}` : ``,
            hasHypercert ? `Tx: ${hypercert.txHash}` : ``,
            hasHypercert ? `Explorer: ${hypercert.explorerUrl}` : ``,
            ``,
            `── Evidence (TEE Receipts) ──`,
            evidenceList,
            ``,
            `── Verification ──`,
            `Contract: 0x899bd273ad6c1e1191df43a3e8756e773517a20b (Base Sepolia)`,
            hasHypercert ? `HypercertMinter: 0xC2d179166bc9dbB00A03686a5b17eCe2224c2704` : ``,
            `PolicyBundle CID: ${agent.nft?.policyBundleCID || "none"}`,
          ].filter(Boolean).join("\n"),
        }],
      };
    } catch (err: any) {
      console.error(`> AgentCircle MCP: Evaluation error — ${err.message}`);
      return {
        content: [{ type: "text" as const, text: `Error evaluating agent ${agentId}: ${err.message}` }],
        isError: true,
      };
    }
  }

  return {
    content: [{ type: "text" as const, text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

// ─── Start Server ───

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AgentCircle MCP Server running on stdio");
}

main().catch((err) => {
  console.error("MCP Server fatal error:", err);
  process.exit(1);
});
