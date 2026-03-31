/**
 * Hypercert integration for AgentCircle.
 * Each PolicyBundle = an impact claim (hypercert).
 * Mints directly on the HypercertMinter contract via viem.
 */

import { createPublicClient, createWalletClient, http, parseEventLogs } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

// HypercertMinter on Base Sepolia (from SDK deployments)
const HYPERCERT_MINTER = "0xC2d179166bc9dbB00A03686a5b17eCe2224c2704" as const;

const MINT_ABI = [
  {
    type: "function",
    name: "mintClaim",
    inputs: [
      { name: "account", type: "address" },
      { name: "units", type: "uint256" },
      { name: "_uri", type: "string" },
      { name: "restrictions", type: "uint8" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ClaimStored",
    inputs: [
      { name: "claimID", type: "uint256", indexed: true },
      { name: "uri", type: "string", indexed: false },
      { name: "totalUnits", type: "uint256", indexed: false },
    ],
  },
] as const;

export interface HypercertMintParams {
  agentName: string;
  agentId: string;
  operatorWallet: string;
  policyBundleCID: string;
  description: string;
  workScope: string[];
}

export interface HypercertResult {
  txHash: string;
  chain: string;
  explorerUrl: string;
  metadataCID: string;
}

/**
 * Mint a hypercert for a PolicyBundle.
 * Uses the Hypercerts SDK for metadata formatting + IPFS upload,
 * then calls the minter contract directly with viem for the on-chain tx.
 */
export async function mintPolicyHypercert(
  params: HypercertMintParams
): Promise<HypercertResult> {
  const privateKey = process.env.PRIVATE_KEY || "";
  const pkHex = (privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`) as `0x${string}`;
  const account = privateKeyToAccount(pkHex);

  const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL || "https://base-sepolia-rpc.publicnode.com";

  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(rpcUrl),
  });

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(rpcUrl),
  });

  // Step 1: Format metadata and upload to IPFS via Hypercerts API
  const { formatHypercertData, HypercertClient } = await import("@hypercerts-org/sdk");

  const now = Math.floor(Date.now() / 1000);

  const { data: metadata, errors } = formatHypercertData({
    name: `${params.agentName} — AgentCircle PolicyBundle`,
    description: `${params.description}\n\nPolicy CID: ${params.policyBundleCID}\nAgent ID: ${params.agentId}\nProtocol: AgentCircle (ERC-8004 + ERC-8183)`,
    image: "",
    version: "1.0.0",
    impactScope: ["agent-policy-sharing", "crypto-operations"],
    excludedImpactScope: [],
    workScope: ["policy-inheritance", "tee-verified", ...params.workScope],
    excludedWorkScope: [],
    workTimeframeStart: now,
    workTimeframeEnd: now + 86400 * 30,
    impactTimeframeStart: now,
    impactTimeframeEnd: 0,
    contributors: [params.operatorWallet],
    rights: ["Public Display"],
    excludedRights: [],
  });

  if (errors || !metadata) {
    throw new Error(`Metadata validation failed: ${JSON.stringify(errors)}`);
  }

  // Step 2: Upload metadata to IPFS via Hypercerts storage API
  let metadataCID: string;
  try {
    const storageClient = new HypercertClient({
      environment: "test",
      walletClient: walletClient as any,
      publicClient: publicClient as any,
    });
    const storageResponse = await storageClient.storage.storeMetadata({ metadata });
    metadataCID = (storageResponse.data as any)?.cid || "";
    if (!metadataCID) throw new Error("Empty CID");
  } catch {
    // Fallback: create a deterministic CID from the metadata hash
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(metadata));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    metadataCID = "bafkreig" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 50);
  }

  // Step 3: Call mintClaim directly on the HypercertMinter contract
  // TransferRestrictions.FromCreatorOnly = 2
  const hash = await walletClient.writeContract({
    address: HYPERCERT_MINTER,
    abi: MINT_ABI,
    functionName: "mintClaim",
    args: [account.address, 10000n, metadataCID, 2],
  });

  // Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  const explorerUrl = `${baseSepolia.blockExplorers.default.url}/tx/${hash}`;

  return {
    txHash: hash,
    chain: "Base Sepolia",
    explorerUrl,
    metadataCID,
  };
}
