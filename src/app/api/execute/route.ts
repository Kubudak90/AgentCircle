import { NextRequest, NextResponse } from "next/server";
import type {
  TEE_ExecutionRequest,
  PolicyBundle,
  AgentLogReceipt,
  RiskGuardrailPolicy,
} from "@/types/schema";

interface ExecuteBody {
  request: TEE_ExecutionRequest;
  policy: PolicyBundle;
  mockTradeResult?: {
    pnlPercent: number;
    slippageBps: number;
    latencyMs: number;
    txHash: string | null;
  };
}

function evaluateAdherence(
  trade: { pnlPercent: number },
  guardrails: RiskGuardrailPolicy,
  overrides?: Partial<RiskGuardrailPolicy>
): { verified: boolean; violations: string[] } {
  const effective: RiskGuardrailPolicy = {
    ...guardrails,
    ...(overrides
      ? {
          // Follower can only tighten, never loosen
          maxPositionSizeUSDC: Math.min(
            guardrails.maxPositionSizeUSDC,
            overrides.maxPositionSizeUSDC ?? guardrails.maxPositionSizeUSDC
          ),
          maxLeverage: Math.min(
            guardrails.maxLeverage,
            overrides.maxLeverage ?? guardrails.maxLeverage
          ),
          dailyLossLimitPercent: Math.min(
            guardrails.dailyLossLimitPercent,
            overrides.dailyLossLimitPercent ?? guardrails.dailyLossLimitPercent
          ),
          killSwitchEnabled:
            guardrails.killSwitchEnabled || (overrides.killSwitchEnabled ?? false),
        }
      : {}),
  };

  const violations: string[] = [];

  if (trade.pnlPercent < 0 && Math.abs(trade.pnlPercent) > effective.dailyLossLimitPercent) {
    violations.push(
      `DAILY_LOSS_EXCEEDED: loss ${Math.abs(trade.pnlPercent).toFixed(1)}% > limit ${effective.dailyLossLimitPercent}%`
    );
  }

  return { verified: violations.length === 0, violations };
}

export async function POST(req: NextRequest) {
  try {
    const body: ExecuteBody = await req.json();
    const { request, policy, mockTradeResult } = body;

    if (!request || !policy) {
      return NextResponse.json({ error: "Missing request or policy" }, { status: 400 });
    }

    // Simulate trade result (in production, Lit TEE executes real logic)
    const trade = mockTradeResult ?? {
      pnlPercent: -6.0,
      slippageBps: 45,
      latencyMs: 320,
      txHash: null,
    };

    const { verified, violations } = evaluateAdherence(
      trade,
      policy.riskGuardrails,
      request.customRiskOverrides
    );

    const receipt: AgentLogReceipt = {
      followerWallet: request.followerWallet,
      providerAgentId: request.inheritedPolicyId,
      timestamp: Date.now(),
      policyAdherenceVerified: verified,
      executionSuccess: true,
      metrics: {
        latency_ms: trade.latencyMs,
        slippage_bps: trade.slippageBps,
      },
      onChainTxHash: trade.txHash,
      teeSignature: `0xTEE_SIG_${Date.now().toString(36)}`,
    };

    return NextResponse.json({ receipt, violations });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
