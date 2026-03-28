// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title AgentPolicyRegistry
/// @notice ERC-8004 Identity + Reputation combined with ERC-7857 Agent NFT concept.
///         Lean hackathon MVP for Enclave_8004 / AgentCircle.
contract AgentPolicyRegistry {
    // ──────────────────── Types ────────────────────

    struct Agent {
        address owner;
        address operatorWallet;
        address teePublicKey;
        string name;
        string policyBundleCID;
        uint256 reputationScore; // 0-100
        uint256 totalExecutions;
        uint256 activeAdopters;
        string latestReceiptCID;
    }

    // ──────────────────── State ────────────────────

    uint256 public nextAgentId = 1;
    mapping(uint256 => Agent) public agents;
    mapping(uint256 => mapping(address => bool)) public isAdopter;

    // ──────────────────── Events (ERC-8004 aligned) ────────────────────

    event AgentRegistered(uint256 indexed agentId, address indexed owner, string name);
    event PolicyUpdated(uint256 indexed agentId, string newCID);
    event ReceiptSubmitted(uint256 indexed agentId, string receiptCID, bool policyAdherenceVerified);
    event AdopterJoined(uint256 indexed agentId, address indexed adopter);
    event AdopterLeft(uint256 indexed agentId, address indexed adopter);

    // ──────────────────── Errors ────────────────────

    error NotOwner();
    error NotTEE();
    error AgentNotFound();
    error AlreadyAdopter();
    error NotAdopter();

    // ──────────────────── Modifiers ────────────────────

    modifier onlyOwner(uint256 agentId) {
        if (agents[agentId].owner != msg.sender) revert NotOwner();
        _;
    }

    modifier onlyTEE(uint256 agentId) {
        if (agents[agentId].teePublicKey != msg.sender) revert NotTEE();
        _;
    }

    modifier exists(uint256 agentId) {
        if (agents[agentId].owner == address(0)) revert AgentNotFound();
        _;
    }

    // ──────────────────── Registration (ERC-7857 + ERC-8004 Identity) ────────────────────

    function registerAgent(
        string calldata name,
        address operatorWallet,
        string calldata policyBundleCID,
        address teePublicKey
    ) external returns (uint256 agentId) {
        agentId = nextAgentId++;
        agents[agentId] = Agent({
            owner: msg.sender,
            operatorWallet: operatorWallet,
            teePublicKey: teePublicKey,
            name: name,
            policyBundleCID: policyBundleCID,
            reputationScore: 50, // start neutral
            totalExecutions: 0,
            activeAdopters: 0,
            latestReceiptCID: ""
        });
        emit AgentRegistered(agentId, msg.sender, name);
    }

    // ──────────────────── Policy Management ────────────────────

    function updatePolicyBundle(uint256 agentId, string calldata newCID)
        external
        exists(agentId)
        onlyOwner(agentId)
    {
        agents[agentId].policyBundleCID = newCID;
        emit PolicyUpdated(agentId, newCID);
    }

    // ──────────────────── Receipt Submission (TEE only → ERC-8004 Reputation) ────────────────────

    function submitExecutionReceipt(
        uint256 agentId,
        string calldata receiptCID,
        bool policyAdherenceVerified
    ) external exists(agentId) onlyTEE(agentId) {
        Agent storage agent = agents[agentId];

        agent.totalExecutions++;
        agent.latestReceiptCID = receiptCID;

        if (policyAdherenceVerified) {
            // Reputation increases: move toward 100, diminishing returns
            uint256 gap = 100 - agent.reputationScore;
            uint256 boost = gap / 10;
            if (boost == 0 && gap > 0) boost = 1;
            agent.reputationScore += boost;
        } else {
            // Reputation drops heavily: lose 20 points (floor at 0)
            if (agent.reputationScore > 20) {
                agent.reputationScore -= 20;
            } else {
                agent.reputationScore = 0;
            }
        }

        emit ReceiptSubmitted(agentId, receiptCID, policyAdherenceVerified);
    }

    // ──────────────────── Adopter Tracking ────────────────────

    function joinCircle(uint256 agentId) external exists(agentId) {
        if (isAdopter[agentId][msg.sender]) revert AlreadyAdopter();
        isAdopter[agentId][msg.sender] = true;
        agents[agentId].activeAdopters++;
        emit AdopterJoined(agentId, msg.sender);
    }

    function leaveCircle(uint256 agentId) external exists(agentId) {
        if (!isAdopter[agentId][msg.sender]) revert NotAdopter();
        isAdopter[agentId][msg.sender] = false;
        agents[agentId].activeAdopters--;
        emit AdopterLeft(agentId, msg.sender);
    }

    // ──────────────────── Views ────────────────────

    function getAgent(uint256 agentId) external view returns (Agent memory) {
        return agents[agentId];
    }

    function getReputation(uint256 agentId) external view returns (uint256) {
        return agents[agentId].reputationScore;
    }
}
