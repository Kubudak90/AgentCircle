import { type Abi } from "viem";
import { baseSepolia } from "wagmi/chains";

// Replace with real deployed address after `forge script`
export const REGISTRY_ADDRESS = "0x1234567890123456789012345678901234567890" as const;

export const REGISTRY_CHAIN = baseSepolia;

export const REGISTRY_ABI = [
  {
    type: "function",
    name: "submitExecutionReceipt",
    inputs: [
      { name: "agentId", type: "uint256", internalType: "uint256" },
      { name: "receiptCID", type: "string", internalType: "string" },
      { name: "policyAdherenceVerified", type: "bool", internalType: "bool" },
      { name: "teeSignature", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAgent",
    inputs: [
      { name: "agentId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct AgentPolicyRegistry.Agent",
        components: [
          { name: "owner", type: "address" },
          { name: "operatorWallet", type: "address" },
          { name: "teePublicKey", type: "address" },
          { name: "name", type: "string" },
          { name: "policyBundleCID", type: "string" },
          { name: "reputationScore", type: "uint256" },
          { name: "totalExecutions", type: "uint256" },
          { name: "activeAdopters", type: "uint256" },
          { name: "latestReceiptCID", type: "string" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerAgent",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "operatorWallet", type: "address", internalType: "address" },
      { name: "policyBundleCID", type: "string", internalType: "string" },
      { name: "teePublicKey", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "agentId", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkReceiptUsed",
    inputs: [{ name: "teeSignature", type: "bytes", internalType: "bytes" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
] as const satisfies Abi;
