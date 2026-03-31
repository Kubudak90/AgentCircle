import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createWalletClient, http, publicActions, parseEventLogs } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const REGISTER_ABI = [
  {
    type: "function",
    name: "registerAgent",
    inputs: [
      { name: "name", type: "string" },
      { name: "operatorWallet", type: "address" },
      { name: "policyBundleCID", type: "string" },
      { name: "teePublicKey", type: "address" },
    ],
    outputs: [{ name: "agentId", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AgentRegistered",
    inputs: [
      { name: "agentId", type: "uint256", indexed: true },
      { name: "owner", type: "address", indexed: true },
      { name: "name", type: "string", indexed: false },
    ],
  },
] as const;

async function main() {
  const rawKey = process.env.PRIVATE_KEY || "";
  const privateKey = (rawKey.startsWith("0x") ? rawKey : `0x${rawKey}`) as `0x${string}`;
  const teePublicKey = process.env.TEE_PUBLIC_KEY as `0x${string}`;
  const registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`;

  if (!privateKey) throw new Error("PRIVATE_KEY not set in .env.local");
  if (!teePublicKey) throw new Error("TEE_PUBLIC_KEY not set in .env.local");
  if (!registryAddress) throw new Error("NEXT_PUBLIC_REGISTRY_ADDRESS not set in .env.local");

  const account = privateKeyToAccount(privateKey);

  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(),
  }).extend(publicActions);

  console.log(`Deployer: ${account.address}`);
  console.log(`TEE Key:  ${teePublicKey}`);
  console.log(`Registry: ${registryAddress}`);
  console.log();

  const hash = await client.writeContract({
    address: registryAddress,
    abi: REGISTER_ABI,
    functionName: "registerAgent",
    args: [
      "Garry's Whale Tracker",
      account.address,
      "ipfs://bafybeimockpolicybundle",
      teePublicKey,
    ],
  });

  console.log(`Tx hash: ${hash}`);
  console.log("Waiting for confirmation...");

  const receipt = await client.waitForTransactionReceipt({ hash });
  console.log(`Status: ${receipt.status}`);
  console.log(`Block:  ${receipt.blockNumber}`);

  const logs = parseEventLogs({
    abi: REGISTER_ABI,
    logs: receipt.logs,
    eventName: "AgentRegistered",
  });

  if (logs.length > 0) {
    const { agentId, owner, name } = logs[0].args;
    console.log();
    console.log(`Agent registered!`);
    console.log(`  agentId: ${agentId}`);
    console.log(`  owner:   ${owner}`);
    console.log(`  name:    ${name}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
