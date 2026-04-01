/**
 * PROJECT: AgentCircle (PL_Genesis Hackathon)
 * THE GOLDEN RULE FOR CLAUDE:
 * This file is the absolute source of truth for all data structures.
 * DO NOT invent new fields. All frontend forms and backend TEE logic MUST map to these interfaces.
 * CORE PITCH: We are building "Private Policy Inheritance" for crypto agents.
 * We share the upstream OS (Source, Filters, Risk) and hide the downstream execution edge in the TEE.
 */

// ==========================================
// 1. Core Identity & Asset Layer
// ==========================================

export type EthereumAddress = `0x${string}`;
export type CID = string; // IPFS / Filecoin Content Identifier

/**
 * ERC-7857: Agent NFT
 * Represents the ownership of the Policy Bundle.
 */
export interface ERC7857_AgentNFT {
  tokenId: string;
  owner: EthereumAddress; // The KOL / Creator
  name: string;
  description: string;
  policyBundleCID: CID; // Points to the public configuration of the policy
  teeEndpoint: string; // The URL/Identifier for the Lit Protocol TEE instance hiding the execution edge
}

/**
 * ERC-8004: Agent Identity & Reputation Registry
 * Reputation is now based on "Policy Adoption Cohort Satisfaction".
 */
export interface ERC8004_Identity {
  agentId: string; // Links to ERC-7857 tokenId
  operatorWallet: EthereumAddress;
  reputationScore: number; // 0-100, dynamically calculated from cohort adoption receipts
  activeAdopters: number; // How many follower agents are currently using this policy
  latestReceiptCID: CID | null;
}

// ==========================================
// 2. The Policy Inheritance Engine (THE MOAT)
// ==========================================

/**
 * The MVP Policy Bundle (3 out of 7 modules for the Hackathon)
 * This is what the follower agent inherits and configures.
 */
export interface PolicyBundle {
  version: string;
  sourceGraph: SourceGraphPolicy;
  candidateFilters: CandidateFilterPolicy;
  riskGuardrails: RiskGuardrailPolicy;
}

/**
 * Module 1: Source Graph Policy (What the agent observes)
 * UI Note: Render as multi-select badges or toggle switches.
 */
export interface SourceGraphPolicy {
  trackedWalletClusters: string[]; // e.g., ["Smart Money 100", "Binance Hot Wallets"]
  monitoredVenues: string[]; // e.g., ["Uniswap V3", "Hyperliquid"]
  eventTypes: ("LARGE_INFLOW" | "LIQUIDITY_CREATION" | "PERP_OI_SPIKE")[];
}

/**
 * Module 3: Candidate Filter Policy (What the agent keeps/discards)
 * UI Note: Render as sliders and min/max input fields.
 */
export interface CandidateFilterPolicy {
  minTokenAgeHours: number;
  minLiquidityUSD: number;
  maxFDV: number | null; // null means no cap
  blacklistedSectors: string[]; // e.g., ["Meme", "PolitiFi"]
  requireContractSafetyScore: number; // 0-100
}

/**
 * Module 4: Risk Guardrail Policy (What the agent is prohibited from doing)
 * UI Note: Render as strict threshold inputs. THIS IS ENFORCED BY THE TEE.
 */
export interface RiskGuardrailPolicy {
  maxPositionSizeUSDC: number;
  maxLeverage: number;
  dailyLossLimitPercent: number; // e.g., 5.0 for 5%
  killSwitchEnabled: boolean;
}

// ==========================================
// 3. Trust & Verification Layer (Mocked for UI)
// ==========================================

/**
 * ERC-8126: Agent Background Check (MOCKED)
 */
export interface ERC8126_RiskProfile {
  agentId: string;
  zkProofPayload: string;
  riskScore: number;
  isTornadoCashTainted: boolean;
}

/**
 * ERC-8183: Agentic Commerce Escrow (MOCKED)
 * Represents the membership fee paid to join the AgentCircle.
 */
export interface ERC8183_Escrow {
  subscriptionId: string;
  follower: EthereumAddress;
  kolAgentId: string;
  monthlyFeeUSDC: number;
  status: "ACTIVE" | "EXPIRED" | "SLASHED";
}

// ==========================================
// 4. The Execution & Receipt Layer (Real TEE & Filecoin Logic)
// ==========================================

/**
 * What the Follower's Agent sends to the KOL's TEE.
 *
 * PRODUCTION UPGRADE: The TEE does NOT trust client-supplied PnL.
 * Instead, the client provides `targetTxHash` — the on-chain tx hash
 * of the trade that was executed. The TEE fetches the real result
 * via RPC inside the enclave and calculates PnL independently.
 */
export interface TEE_ExecutionRequest {
  followerWallet: EthereumAddress;
  inheritedPolicyId: string; // The ERC-7857 Token ID
  targetTxHash: string | null; // On-chain tx hash for TEE to verify. null = dry run / paper trade.
  // Follower can optionally tighten the KOL's risk guardrails (but cannot loosen them)
  customRiskOverrides?: Partial<RiskGuardrailPolicy>;
}

/**
 * ERC-8004 Execution Log generated INSIDE the TEE.
 * Uploaded to Storacha, CID stored on Base/Arb.
 *
 * PRODUCTION UPGRADE: `teeSignature` is an ECDSA signature (bytes)
 * signed by the Lit PKP over the payload:
 *   keccak256(abi.encodePacked(agentId, policyAdherenceVerified, receiptCID))
 *
 * The smart contract uses `ecrecover` to verify this signature
 * against the registered `teePublicKey`, eliminating the need
 * for `msg.sender == teePublicKey` checks. This allows ANY address
 * to submit the receipt and pay gas (gasless for the TEE).
 */
export interface AgentLogReceipt {
  followerWallet: EthereumAddress;
  providerAgentId: string;
  timestamp: number;
  policyAdherenceVerified: boolean; // TEE mathematically proves the trade stayed within the Risk Guardrails
  executionSuccess: boolean;
  metrics: {
    latency_ms: number;
    slippage_bps: number;
  };
  onChainTxHash: string | null;
  teeSignature: string; // ECDSA sig by Lit PKP over (agentId, policyAdherenceVerified, receiptCID)
}
