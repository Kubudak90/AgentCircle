import { NextRequest, NextResponse } from "next/server";
import { getAllAgents, getAgent } from "@/lib/agent-store";
import { addEvidence, getEvidence } from "@/lib/evidence-store";

export async function POST(req: NextRequest) {
  try {
    const { tool, arguments: args } = await req.json();

    if (tool === "list_circles") {
      const agents = getAllAgents();
      const circles = agents.map((a) => ({
        id: a.identity.agentId,
        name: a.nft.name,
        reputationScore: a.identity.reputationScore,
        activeAdopters: a.identity.activeAdopters,
        venues: a.policy.sourceGraph.monitoredVenues,
        riskSummary: {
          maxLeverage: `${a.policy.riskGuardrails.maxLeverage}x`,
          dailyLossLimit: `${a.policy.riskGuardrails.dailyLossLimitPercent}%`,
          killSwitch: a.policy.riskGuardrails.killSwitchEnabled ? "ON" : "OFF",
        },
      }));
      return NextResponse.json({ result: circles });
    }

    if (tool === "inherit_agent_policy") {
      const { kolAgentId, followerWallet } = args || {};

      if (!kolAgentId || !followerWallet) {
        return NextResponse.json({ error: "kolAgentId and followerWallet required" }, { status: 400 });
      }

      const agent = getAgent(kolAgentId);
      if (!agent) {
        return NextResponse.json({ error: `No agent found with ID ${kolAgentId}` }, { status: 404 });
      }

      // Call the real /api/execute endpoint
      const origin = req.nextUrl.origin;
      const execRes = await fetch(`${origin}/api/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request: {
            followerWallet,
            inheritedPolicyId: kolAgentId,
            targetTxHash: null,
          },
          policy: agent.policy,
          mockTradeResult: {
            pnlPercent: -6.0,
            slippageBps: 45,
            latencyMs: 320,
            txHash: null,
          },
        }),
      });

      if (!execRes.ok) {
        return NextResponse.json({ error: `Execute API returned ${execRes.status}` }, { status: 500 });
      }

      const { receipt, violations, receiptCID, mockPkpAddress } = await execRes.json();

      // Auto-post evidence to hypercert
      addEvidence(kolAgentId, {
        receiptCID,
        teeSignature: receipt.teeSignature,
        adherenceVerified: receipt.policyAdherenceVerified,
        followerWallet,
        timestamp: Date.now(),
        metrics: receipt.metrics,
      });

      return NextResponse.json({
        result: {
          kol: agent.nft.name,
          kolId: kolAgentId,
          follower: followerWallet,
          policyAdherenceVerified: receipt.policyAdherenceVerified,
          violations,
          teeSignature: receipt.teeSignature,
          mockPkpAddress,
          receiptCID,
          metrics: receipt.metrics,
        },
      });
    }

    if (tool === "evaluate_impact") {
      const { agentId } = args || {};
      if (!agentId) {
        return NextResponse.json({ error: "agentId required" }, { status: 400 });
      }

      const agent = getAgent(agentId);
      if (!agent) {
        return NextResponse.json({ error: `Agent ${agentId} not found` }, { status: 404 });
      }

      // Fetch hypercert via HTTP to work across Vercel lambda instances
      const origin = req.nextUrl.origin;
      let hypercert: { txHash?: string; claimId?: string } | null = null;
      try {
        const hcRes = await fetch(`${origin}/api/hypercert/${agentId}`);
        const hcData = await hcRes.json();
        hypercert = hcData.hypercert || null;
      } catch {
        // Non-critical
      }

      // Fetch evidence via HTTP for same reason
      let evidence: { receiptCID: string; adherenceVerified: boolean; timestamp: number; followerWallet: string }[] = [];
      try {
        const evRes = await fetch(`${origin}/api/hypercert/${agentId}/evidence`);
        const evData = await evRes.json();
        evidence = evData.evidence || [];
      } catch {
        // Non-critical — fall back to local store
        evidence = getEvidence(agentId).map((e) => ({
          receiptCID: e.receiptCID,
          adherenceVerified: e.adherenceVerified,
          timestamp: e.timestamp,
          followerWallet: e.followerWallet,
        }));
      }

      const totalExecutions = evidence.length;
      const passCount = evidence.filter((e) => e.adherenceVerified).length;
      const adherenceRate = totalExecutions > 0 ? Math.round((passCount / totalExecutions) * 100) : 0;
      const repScore = agent.identity.reputationScore;
      const adopters = agent.identity.activeAdopters;
      const hasHypercert = !!hypercert;

      // Weighted score: 40% adherence + 30% rep + 20% evidence density + 10% hypercert
      const overallScore = Math.round(
        adherenceRate * 0.4 +
        repScore * 0.3 +
        Math.min(totalExecutions * 10, 100) * 0.2 +
        (hasHypercert ? 100 : 0) * 0.1
      );

      return NextResponse.json({
        result: {
          agent: agent.nft.name,
          agentId,
          evaluation: {
            overallScore,
            adherenceRate,
            reputationScore: repScore,
            totalExecutions,
            passCount,
            failCount: totalExecutions - passCount,
            activeAdopters: adopters,
            hypercertMinted: hasHypercert,
            claimId: hypercert?.claimId || null,
          },
          evidence: evidence.map((e) => ({
            receiptCID: e.receiptCID,
            adherenceVerified: e.adherenceVerified,
            timestamp: e.timestamp,
            follower: e.followerWallet,
          })),
          verification: {
            contract: "0x899bd273ad6c1e1191df43a3e8756e773517a20b",
            chain: "Base Sepolia (84532)",
            hypercertMinter: hasHypercert ? "0xC2d179166bc9dbB00A03686a5b17eCe2224c2704" : null,
            hypercertTx: hypercert?.txHash || null,
          },
        },
      });
    }

    return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
