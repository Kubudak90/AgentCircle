import type {
  ERC8004_Identity,
  PolicyBundle,
  ERC7857_AgentNFT,
} from "@/types/schema";

export interface MockReceipt {
  id: string;
  timestamp: number;
  adherent: boolean;
  action: string;
  pnlPercent: number;
  txHash: string | null;
}

export interface KOLAgent {
  nft: ERC7857_AgentNFT;
  identity: ERC8004_Identity;
  policy: PolicyBundle;
  recentReceipts: MockReceipt[];
}

export const MOCK_KOLS: KOLAgent[] = [
  {
    nft: {
      tokenId: "1",
      owner: "0xGarry000000000000000000000000000000000001",
      name: "Garry's Whale Tracker",
      description: "Monitors smart money wallets and large inflows across Hyperliquid and Uniswap V3.",
      policyBundleCID: "ipfs://bafybeimockpolicybundle",
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
    recentReceipts: [
      { id: "r1-1", timestamp: Date.now() - 1800000, adherent: true, action: "BUY ETH/USDC via Uniswap V3", pnlPercent: 2.3, txHash: "0x598a9a2a7507e335aecf2685c2c1096b4eb69a61" },
      { id: "r1-2", timestamp: Date.now() - 5400000, adherent: true, action: "BUY ARB/USDC via Hyperliquid", pnlPercent: -0.8, txHash: "0x7b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c" },
      { id: "r1-3", timestamp: Date.now() - 14400000, adherent: false, action: "SELL DEGEN/USDC via Hyperliquid", pnlPercent: -6.1, txHash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0" },
    ],
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
    recentReceipts: [
      { id: "r2-1", timestamp: Date.now() - 900000, adherent: true, action: "LONG ETH via Hyperliquid", pnlPercent: 4.7, txHash: "0xd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0" },
      { id: "r2-2", timestamp: Date.now() - 3600000, adherent: false, action: "LONG SOL via Hyperliquid", pnlPercent: -3.2, txHash: "0xe2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1" },
      { id: "r2-3", timestamp: Date.now() - 10800000, adherent: true, action: "SHORT BTC via Hyperliquid", pnlPercent: 1.1, txHash: "0xf3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2" },
    ],
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
    recentReceipts: [
      { id: "r3-1", timestamp: Date.now() - 600000, adherent: true, action: "BUY ONDO/USDC via Uniswap V3", pnlPercent: 1.8, txHash: "0xa4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3" },
      { id: "r3-2", timestamp: Date.now() - 2400000, adherent: true, action: "BUY PENDLE/USDC via Raydium", pnlPercent: 3.4, txHash: "0xb5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4" },
      { id: "r3-3", timestamp: Date.now() - 7200000, adherent: true, action: "SELL AAVE/USDC via Uniswap V3", pnlPercent: 0.6, txHash: "0xc6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5" },
    ],
  },
];
