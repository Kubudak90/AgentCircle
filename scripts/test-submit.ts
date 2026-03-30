import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createWalletClient, createPublicClient, http, keccak256, encodePacked, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const REGISTRY_ABI = [
  {
    type: "function",
    name: "submitExecutionReceipt",
    inputs: [
      { name: "agentId", type: "uint256" },
      { name: "receiptCID", type: "string" },
      { name: "policyAdherenceVerified", type: "bool" },
      { name: "teeSignature", type: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

async function main() {
  const teePk = process.env.TEE_PRIVATE_KEY as `0x${string}`;
  const deployerPk = process.env.PRIVATE_KEY || "";
  const deployerPkHex = (deployerPk.startsWith("0x") ? deployerPk : `0x${deployerPk}`) as `0x${string}`;
  const registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`;

  const teeAccount = privateKeyToAccount(teePk);
  const deployerAccount = privateKeyToAccount(deployerPkHex);

  console.log("TEE address:", teeAccount.address);
  console.log("Deployer:", deployerAccount.address);
  console.log("Registry:", registryAddress);

  const agentId = 1n;
  const receiptCID = "ipfs://test_cid_script";
  const adherence = false;
  const chainId = 84532n;

  // Construct the SAME hash the contract does:
  // keccak256(abi.encodePacked(block.chainid, address(this), agentId, policyAdherenceVerified, receiptCID))
  const messageHash = keccak256(
    encodePacked(
      ["uint256", "address", "uint256", "bool", "string"],
      [chainId, registryAddress, agentId, adherence, receiptCID]
    )
  );

  console.log("Message hash:", messageHash);

  // Sign with personal_sign (adds Ethereum Signed Message prefix)
  const signature = await teeAccount.signMessage({
    message: { raw: messageHash as Hex },
  });

  console.log("Signature:", signature);
  console.log("Signature length:", signature.length, "(should be 132 = 0x + 130 hex chars = 65 bytes)");

  // Submit via deployer account (anyone can submit)
  const client = createWalletClient({
    account: deployerAccount,
    chain: baseSepolia,
    transport: http(),
  });

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  // First simulate
  console.log("\nSimulating...");
  try {
    const { request } = await publicClient.simulateContract({
      address: registryAddress,
      abi: REGISTRY_ABI,
      functionName: "submitExecutionReceipt",
      args: [agentId, receiptCID, adherence, signature as `0x${string}`],
      account: deployerAccount,
    });
    console.log("Simulation PASSED. Sending tx...");

    const hash = await client.writeContract(request);
    console.log("Tx hash:", hash);

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log("Status:", receipt.status);
    console.log("Block:", receipt.blockNumber);
  } catch (err: any) {
    console.error("FAILED:", err.shortMessage || err.message);
    if (err.cause?.data) {
      console.error("Revert data:", err.cause.data);
    }
  }
}

main().catch(console.error);
