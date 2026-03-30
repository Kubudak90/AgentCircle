import { type Abi } from "viem";
import { baseSepolia } from "wagmi/chains";

// Will be updated after redeployment with escrow + risk functions
export const REGISTRY_ADDRESS = "0x899bd273ad6c1e1191df43a3e8756e773517a20b" as const;

export const REGISTRY_CHAIN = baseSepolia;

export const REGISTRY_ABI = [
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
  {
    type: "function",
    name: "getAgent",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
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
          { name: "riskScore", type: "uint8" },
          { name: "isVerified", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
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
    type: "function",
    name: "getAgentVerification",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [
      { name: "isVerified", type: "bool" },
      { name: "overallRiskScore", type: "uint8" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createAndFundJob",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [{ name: "jobId", type: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getJob",
    inputs: [{ name: "jobId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "agentId", type: "uint256" },
          { name: "client", type: "address" },
          { name: "evaluator", type: "address" },
          { name: "fundedAmount", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "expiredAt", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkReceiptUsed",
    inputs: [{ name: "teeSignature", type: "bytes" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
] as const satisfies Abi;
