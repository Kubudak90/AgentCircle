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

const MOCK_POLICIES: Record<string, { name: string; policy: object }> = {
  "1": {
    name: "Garry's Whale Tracker",
    policy: {
      version: "1.0",
      sourceGraph: {
        trackedWalletClusters: ["Smart Money 100", "Binance Hot Wallets"],
        monitoredVenues: ["Hyperliquid", "Uniswap V3"],
        eventTypes: ["LARGE_INFLOW", "PERP_OI_SPIKE"],
      },
      candidateFilters: {
        minTokenAgeHours: 48,
        minLiquidityUSD: 100000,
        maxFDV: 500000000,
        blacklistedSectors: ["Meme", "PolitiFi"],
        requireContractSafetyScore: 75,
      },
      riskGuardrails: {
        maxPositionSizeUSDC: 10000,
        maxLeverage: 3,
        dailyLossLimitPercent: 5.0,
        killSwitchEnabled: true,
      },
    },
  },
  "2": {
    name: "Degen Spartan Perps",
    policy: {
      version: "1.0",
      sourceGraph: {
        trackedWalletClusters: ["Hyperliquid Top Traders"],
        monitoredVenues: ["Hyperliquid"],
        eventTypes: ["PERP_OI_SPIKE"],
      },
      candidateFilters: {
        minTokenAgeHours: 12,
        minLiquidityUSD: 50000,
        maxFDV: null,
        blacklistedSectors: [],
        requireContractSafetyScore: 60,
      },
      riskGuardrails: {
        maxPositionSizeUSDC: 5000,
        maxLeverage: 5,
        dailyLossLimitPercent: 3.0,
        killSwitchEnabled: true,
      },
    },
  },
  "3": {
    name: "Alpha Liquidity Scanner",
    policy: {
      version: "1.0",
      sourceGraph: {
        trackedWalletClusters: ["Smart Money 100", "VC Wallets"],
        monitoredVenues: ["Uniswap V3", "Raydium"],
        eventTypes: ["LIQUIDITY_CREATION", "LARGE_INFLOW"],
      },
      candidateFilters: {
        minTokenAgeHours: 72,
        minLiquidityUSD: 250000,
        maxFDV: 200000000,
        blacklistedSectors: ["Meme", "PolitiFi", "GameFi"],
        requireContractSafetyScore: 85,
      },
      riskGuardrails: {
        maxPositionSizeUSDC: 25000,
        maxLeverage: 2,
        dailyLossLimitPercent: 2.5,
        killSwitchEnabled: true,
      },
    },
  },
};

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
    const circles = Object.entries(MOCK_POLICIES).map(([id, { name, policy }]) => {
      const g = (policy as any).riskGuardrails;
      return `[ID: ${id}] ${name} | Max Loss: ${g.dailyLossLimitPercent}% | Max Leverage: ${g.maxLeverage}x | Kill Switch: ${g.killSwitchEnabled ? "ON" : "OFF"}`;
    });

    return {
      content: [
        {
          type: "text" as const,
          text: `Available AgentCircle Policy Circles:\n\n${circles.join("\n")}\n\nUse inherit_agent_policy with the KOL's ID to adopt their policy.`,
        },
      ],
    };
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

    const kol = MOCK_POLICIES[kolAgentId];
    if (!kol) {
      return {
        content: [{ type: "text" as const, text: `Error: No KOL found with ID ${kolAgentId}. Use list_circles to see available policies.` }],
        isError: true,
      };
    }

    console.error(`> AgentCircle MCP: Intercepted intent. Inheriting policy from ${kol.name}...`);
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
          policy: kol.policy,
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
              `KOL: ${kol.name} (ID: ${kolAgentId})`,
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
      console.error(`> AgentCircle MCP: API error — ${err.message}. Returning mock result.`);

      // Fallback: demo never crashes
      return {
        content: [
          {
            type: "text" as const,
            text: [
              `AgentCircle Policy Inheritance Complete (OFFLINE MODE)`,
              ``,
              `KOL: ${kol.name} (ID: ${kolAgentId})`,
              `Follower: ${followerWallet}`,
              `Policy Adherence Verified: false`,
              ``,
              `Risk Guardrail Violations:`,
              `  - DAILY_LOSS_EXCEEDED: loss 6.0% > limit ${(kol.policy as any).riskGuardrails.dailyLossLimitPercent}%`,
              ``,
              `TEE Signature: 0xMOCK_OFFLINE_SIG_${Date.now().toString(36)}`,
              `Receipt CID: ipfs://bafybeig_mock_offline_${Date.now().toString(16)}`,
              ``,
              `Note: Next.js server was unreachable. This is a mock result for demo purposes.`,
              `Start the server with 'pnpm dev' and retry for real TEE execution.`,
            ].join("\n"),
          },
        ],
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
