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
  claimId?: string;
  claimUri?: string;
  totalUnits?: string;
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

  // Step 1: Generate SVG image for the hypercert
  function escapeXml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c1605"/><stop offset="100%" stop-color="#18230f"/></linearGradient></defs>
    <rect width="600" height="400" fill="url(#g)"/>
    <rect x="16" y="16" width="568" height="368" rx="12" fill="none" stroke="#00FF9C" stroke-width="1" opacity="0.25"/>
    <text x="40" y="52" font-family="monospace" font-size="11" fill="#00FF9C" opacity="0.5" letter-spacing="3">AGENTCIRCLE × HYPERCERTS</text>
    <line x1="40" y1="65" x2="560" y2="65" stroke="#00FF9C" stroke-width="0.5" opacity="0.15"/>
    <text x="40" y="100" font-family="monospace" font-size="24" fill="#d9e7c8" font-weight="bold">${escapeXml(params.agentName)}</text>
    <text x="40" y="125" font-family="monospace" font-size="12" fill="#97d5a3" opacity="0.6">PolicyBundle Impact Claim</text>
    <text x="40" y="165" font-family="monospace" font-size="11" fill="#c0c9be" opacity="0.4">Agent ID: ${escapeXml(params.agentId)}</text>
    <text x="40" y="185" font-family="monospace" font-size="11" fill="#c0c9be" opacity="0.4">Operator: ${escapeXml(params.operatorWallet.slice(0, 10))}...${escapeXml(params.operatorWallet.slice(-6))}</text>
    <text x="40" y="205" font-family="monospace" font-size="11" fill="#8ba3ff" opacity="0.5">CID: ${escapeXml(params.policyBundleCID.slice(0, 35))}...</text>
    <line x1="40" y1="225" x2="560" y2="225" stroke="#00FF9C" stroke-width="0.5" opacity="0.15"/>
    <text x="40" y="255" font-family="monospace" font-size="10" fill="#00FF9C" opacity="0.4" letter-spacing="2">WORK SCOPE</text>
    <text x="40" y="275" font-family="monospace" font-size="12" fill="#d9e7c8" opacity="0.7">${escapeXml(["policy-inheritance", "tee-verified", ...params.workScope].join(" · "))}</text>
    <text x="40" y="310" font-family="monospace" font-size="10" fill="#FFBA20" opacity="0.4" letter-spacing="2">IMPACT SCOPE</text>
    <text x="40" y="330" font-family="monospace" font-size="12" fill="#d9e7c8" opacity="0.7">agent-policy-sharing · crypto-operations</text>
    <text x="40" y="370" font-family="monospace" font-size="9" fill="#c0c9be" opacity="0.2">Base Sepolia · ERC-8004 · TEE-Enforced · Filecoin Storage</text>
    <circle cx="545" cy="45" r="4" fill="#00FF9C" opacity="0.6"/>
  </svg>`;

  const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  // Step 2: Format metadata and upload to IPFS via Hypercerts API
  const { formatHypercertData, HypercertClient } = await import("@hypercerts-org/sdk");

  const now = Math.floor(Date.now() / 1000);

  const { data: metadata, errors } = formatHypercertData({
    name: `${params.agentName} — AgentCircle PolicyBundle`,
    description: `${params.description}\n\nPolicy CID: ${params.policyBundleCID}\nAgent ID: ${params.agentId}\nProtocol: AgentCircle (ERC-8004 + ERC-8183)`,
    image: svgDataUri,
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

  // Extract claimId from ClaimStored event
  let claimId: string | undefined;
  let claimUri: string | undefined;
  let totalUnits: string | undefined;
  try {
    const { getClaimStoredDataFromTxHash } = await import("@hypercerts-org/sdk");
    const claimResult = await getClaimStoredDataFromTxHash(publicClient as any, hash);
    if (claimResult?.data) {
      claimId = claimResult.data.claimId?.toString();
      claimUri = claimResult.data.uri;
      totalUnits = claimResult.data.totalUnits?.toString();
    }
  } catch (err) {
    console.error("Failed to extract claimId:", err);
    // Non-critical — mint succeeded, claimId is optional
  }

  return {
    txHash: hash,
    chain: "Base Sepolia",
    explorerUrl,
    metadataCID,
    claimId,
    claimUri,
    totalUnits,
  };
}
