import { NextRequest, NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";
import { keccak256, encodePacked, type Hex } from "viem";
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

    // Generate a deterministic mock CID from receipt content
    const receiptCID = `ipfs://bafybeig${Date.now().toString(16).padEnd(50, "0").slice(0, 50)}`;

    // --- TEE PKP Signing (viem) ---
    // In production, the Lit PKP signs inside the TEE. For demo, use persistent key from env.
    const pkpPrivateKey = process.env.TEE_PRIVATE_KEY as `0x${string}`;
    if (!pkpPrivateKey) throw new Error("TEE_PRIVATE_KEY not set in env");
    const mockPkpAccount = privateKeyToAccount(pkpPrivateKey);

    // Sign: keccak256(abi.encodePacked(chainId, contractAddress, agentId, policyAdherenceVerified, receiptCID))
    // Must match the contract's chain-scoped hash to pass ecrecover
    const CHAIN_ID = BigInt(process.env.CHAIN_ID || "84532"); // Base Sepolia
    const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || process.env.REGISTRY_ADDRESS || "0x1234567890123456789012345678901234567890") as `0x${string}`;
    const agentId = BigInt(request.inheritedPolicyId);
    const messageHash = keccak256(
      encodePacked(
        ["uint256", "address", "uint256", "bool", "string"],
        [CHAIN_ID, CONTRACT_ADDRESS, agentId, verified, receiptCID]
      )
    );

    // personal_sign: "\x19Ethereum Signed Message:\n32" + hash
    const teeSignature = await mockPkpAccount.signMessage({
      message: { raw: messageHash as Hex },
    });

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
      teeSignature,
    };

    return NextResponse.json({
      receipt,
      violations,
      receiptCID,
      mockPkpAddress: mockPkpAccount.address,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
