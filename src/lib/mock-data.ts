import type {
  ERC8004_Identity,
  PolicyBundle,
  ERC7857_AgentNFT,
} from "@/types/schema";

export interface KOLAgent {
  nft: ERC7857_AgentNFT;
  identity: ERC8004_Identity;
  policy: PolicyBundle;
}

export const MOCK_KOLS: KOLAgent[] = [
  {
    nft: {
      tokenId: "1",
      owner: "0xGarry000000000000000000000000000000000001",
      name: "Garry's Whale Tracker",
      description: "Monitors smart money wallets and large inflows across Hyperliquid and Uniswap V3.",
      policyBundleCID: "ipfs://bafybeigwhale001",
      teeEndpoint: "https://lit.agentcircle.xyz/action/garry-whale",
    },
    identity: {
      agentId: "1",
      operatorWallet: "0xGarry000000000000000000000000000000000001",
      reputationScore: 87,
      activeAdopters: 24,
      latestReceiptCID: "ipfs://bafybeigreceipt001",
    },
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
  {
    nft: {
      tokenId: "2",
      owner: "0xDegen00000000000000000000000000000000000002",
      name: "Degen Spartan Perps",
      description: "Aggressive perp OI tracking with tight risk guardrails. High conviction, low frequency.",
      policyBundleCID: "ipfs://bafybeigdegen002",
      teeEndpoint: "https://lit.agentcircle.xyz/action/degen-spartan",
    },
    identity: {
      agentId: "2",
      operatorWallet: "0xDegen00000000000000000000000000000000000002",
      reputationScore: 72,
      activeAdopters: 11,
      latestReceiptCID: "ipfs://bafybeigreceipt002",
    },
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
  {
    nft: {
      tokenId: "3",
      owner: "0xAlpha00000000000000000000000000000000000003",
      name: "Alpha Liquidity Scanner",
      description: "Detects new liquidity creation events and filters for high-safety tokens only.",
      policyBundleCID: "ipfs://bafybeigalpha003",
      teeEndpoint: "https://lit.agentcircle.xyz/action/alpha-liq",
    },
    identity: {
      agentId: "3",
      operatorWallet: "0xAlpha00000000000000000000000000000000000003",
      reputationScore: 93,
      activeAdopters: 42,
      latestReceiptCID: "ipfs://bafybeigreceipt003",
    },
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
];
