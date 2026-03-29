// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title AgentPolicyRegistry
/// @notice ERC-8004 Identity + Reputation with ECDSA-verified TEE receipts.
///         Anyone can submit receipts — signature proves TEE authenticity, not msg.sender.
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
    event ReceiptSubmitted(uint256 indexed agentId, string receiptCID, bool policyAdherenceVerified, address submitter);
    event AdopterJoined(uint256 indexed agentId, address indexed adopter);
    event AdopterLeft(uint256 indexed agentId, address indexed adopter);

    // ──────────────────── Errors ────────────────────

    error NotOwner();
    error InvalidSignature();
    error AgentNotFound();
    error AlreadyAdopter();
    error NotAdopter();

    // ──────────────────── Modifiers ────────────────────

    modifier onlyOwner(uint256 agentId) {
        if (agents[agentId].owner != msg.sender) revert NotOwner();
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
            reputationScore: 50,
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

    // ──────────────────── Receipt Submission (ECDSA verified → ERC-8004 Reputation) ────────────────────

    /// @notice Submit a TEE-signed execution receipt. Anyone can call this — the TEE signature is the proof.
    /// @param agentId The agent whose reputation is updated.
    /// @param receiptCID The Filecoin CID of the full execution log.
    /// @param policyAdherenceVerified Whether the trade stayed within risk guardrails.
    /// @param teeSignature ECDSA signature by the Lit PKP over keccak256(agentId, policyAdherenceVerified, receiptCID).
    function submitExecutionReceipt(
        uint256 agentId,
        string calldata receiptCID,
        bool policyAdherenceVerified,
        bytes calldata teeSignature
    ) external exists(agentId) {
        // Reconstruct the message the TEE signed
        bytes32 messageHash = keccak256(abi.encodePacked(agentId, policyAdherenceVerified, receiptCID));
        bytes32 ethSignedHash = _toEthSignedMessageHash(messageHash);

        // Recover signer from ECDSA signature
        address recovered = _recover(ethSignedHash, teeSignature);
        if (recovered != agents[agentId].teePublicKey) revert InvalidSignature();

        // Update state
        Agent storage agent = agents[agentId];
        agent.totalExecutions++;
        agent.latestReceiptCID = receiptCID;

        if (policyAdherenceVerified) {
            uint256 gap = 100 - agent.reputationScore;
            uint256 boost = gap / 10;
            if (boost == 0 && gap > 0) boost = 1;
            agent.reputationScore += boost;
        } else {
            if (agent.reputationScore > 20) {
                agent.reputationScore -= 20;
            } else {
                agent.reputationScore = 0;
            }
        }

        emit ReceiptSubmitted(agentId, receiptCID, policyAdherenceVerified, msg.sender);
    }

    // ──────────────────── ECDSA Helpers (inline, no OZ dependency) ────────────────────

    function _toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function _recover(bytes32 hash, bytes calldata sig) internal pure returns (address) {
        if (sig.length != 65) revert InvalidSignature();
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := calldataload(sig.offset)
            s := calldataload(add(sig.offset, 32))
            v := byte(0, calldataload(add(sig.offset, 64)))
        }
        if (v < 27) v += 27;
        address recovered = ecrecover(hash, v, r, s);
        if (recovered == address(0)) revert InvalidSignature();
        return recovered;
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
