AgentCircle
A Trustless Agent Copy-Trading Protocol with Objective On-Chain Reputation. Built for the PL_Genesis: Frontiers of Collaboration Hackathon.

🛑 The Problem
The current AI Agent copy-trading ecosystem is fundamentally broken:

The Edge Decay Problem: If a KOL (Key Opinion Leader) shares their Agent's workflow or API routes, it gets copy-pasted, and their alpha is instantly destroyed.

The "Trust Me Bro" Problem: If the strategy is hidden behind a centralized server, followers have no cryptographic guarantee that the Agent actually executed what it claimed, or if the reported ROI is faked.

The Sybil Reputation Problem: Agent leaderboards are easily manipulated by bot farms submitting fake 5-star reviews.

💡 The Solution: AgentCircle
AgentCircle introduces Blackbox Routing with Objective Reputation. We wrap high-value agent trading logic inside a Trusted Execution Environment (TEE). Users subscribe to the execution rights, not the code.

After execution, the TEE generates a mathematically verifiable receipt, stores it on Filecoin, and updates the agent's reputation on-chain via the ERC-8004 standard. No fake reviews, no stolen alpha.

🏆 Hackathon Tracks & Sponsor Integrations
This project is architected specifically to demonstrate the power of the following protocols:

Ethereum Foundation (Agents With Receipts - 8004): Core architecture. Reputation is calculated purely from TEE-signed execution logs (agent_log.json), completely removing human subjectivity from the trust framework.

Lit Protocol (NextGen AI Apps): KOL Agent strategies and execution parameters are encapsulated within Lit Protocol's TEE Nodes. Followers can trigger the execution, but cannot read the underlying proprietary logic.

Filecoin Foundation (Agent Infrastructure): Execution receipts (agent_log.json) are pinned to decentralized storage using the Storacha/Filecoin SDK. Only the resulting CID is committed to the blockchain, ensuring scalable on-chain agent memory without EVM state bloat.

⚙️ System Architecture & Data Flow
Code snippet
sequenceDiagram
    participant F as Follower (Client)
    participant T as Lit Protocol (TEE Blackbox)
    participant S as Storacha (Filecoin)
    participant C as ERC-8004 Registry (Base/Arb)

    F->>T: 1. Send Execution Intent & Payment
    Note over T: TEE blindly executes KOL's hidden strategy
    T-->>F: 2. Return Signed `agent_log.json`
    F->>S: 3. Upload Receipt JSON
    S-->>F: 4. Return Storage CID
    F->>C: 5. Submit Tx: `logReceipt(agentId, CID)`
    Note over C: Contract updates Agent's Objective Reputation
1. Identity & Asset Layer (ERC-7857 & ERC-8004)
Agents are minted as ERC-7857 NFTs. The ERC-8004 Registry tracks the operatorWallet, teePublicKey, and dynamically updates the reputationScore based on successful execution logs.

2. Execution Layer (Lit Protocol)
The actual trading logic (routing, slippage tolerance, prompt structure) runs inside a Lit Action. It securely signs the outcome.

3. Data Availability Layer (Storacha)
Detailed metrics (latency, exact slippage, tool call sequences) are offloaded to Filecoin via Storacha.

🛠️ Tech Stack
Frontend: Next.js 14 (App Router), Tailwind CSS, shadcn/ui

Web3 Client: viem, wagmi

Smart Contracts: Solidity (v0.8.24), Foundry

Decentralized Infra: Lit Protocol SDK, Storacha SDK

Package Manager: pnpm

🚀 Quickstart (Local Development)
Prerequisites
Node.js >= 20.0.0

pnpm >= 8.0.0

Foundry (forge/cast)

1. Clone & Install
Bash
git clone https://github.com/your-org/agentcircle.git
cd agentcircle
pnpm install
2. Environment Variables
Copy the template and fill in your keys (Lit Protocol, Storacha Space DID, Wallet Private Key for deployment).

Bash
cp .env.example .env.local
3. Smart Contract Deployment
Bash
cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url <YOUR_RPC_URL> --broadcast
4. Run the Web App
Bash
pnpm dev