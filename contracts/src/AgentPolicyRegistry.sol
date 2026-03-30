// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title AgentPolicyRegistry
/// @notice ERC-8004 Identity + Reputation + ERC-8183 Escrow + ERC-8126 Risk Check.
///         All-in-one contract for AgentCircle hackathon. No mocks.
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
        uint8 riskScore;         // ERC-8126: 0-100 (set by admin)
        bool isVerified;         // ERC-8126: verification status
    }

    enum JobStatus { Open, Funded, Submitted, Completed, Rejected }

    struct Job {
        uint256 agentId;
        address client;
        address evaluator;       // TEE public key = evaluator
        uint256 fundedAmount;    // ETH amount locked
        JobStatus status;
        uint256 expiredAt;
    }

    // ──────────────────── State ────────────────────

    uint256 public nextAgentId = 1;
    uint256 public nextJobId = 1;
    mapping(uint256 => Agent) public agents;
    mapping(uint256 => mapping(address => bool)) public isAdopter;
    mapping(bytes32 => bool) public usedReceipts;
    mapping(uint256 => Job) public jobs;

    // ──────────────────── Events ────────────────────

    event AgentRegistered(uint256 indexed agentId, address indexed owner, string name);
    event PolicyUpdated(uint256 indexed agentId, string newCID);
    event ReceiptSubmitted(uint256 indexed agentId, string receiptCID, bool policyAdherenceVerified, address submitter);
    event AdopterJoined(uint256 indexed agentId, address indexed adopter);
    event AdopterLeft(uint256 indexed agentId, address indexed adopter);
    event RiskScoreUpdated(uint256 indexed agentId, uint8 riskScore, bool isVerified);
    event JobCreated(uint256 indexed jobId, uint256 indexed agentId, address client);
    event JobFunded(uint256 indexed jobId, uint256 amount);
    event JobCompleted(uint256 indexed jobId);
    event JobRejected(uint256 indexed jobId);
    event JobRefunded(uint256 indexed jobId, address client, uint256 amount);

    // ──────────────────── Errors ────────────────────

    error NotOwner();
    error InvalidSignature();
    error AgentNotFound();
    error AlreadyAdopter();
    error NotAdopter();
    error ReceiptAlreadyUsed();
    error JobNotFound();
    error WrongStatus();
    error RiskTooHigh();
    error Unauthorized();

    // ──────────────────── Modifiers ────────────────────

    modifier onlyOwner(uint256 agentId) {
        if (agents[agentId].owner != msg.sender) revert NotOwner();
        _;
    }

    modifier exists(uint256 agentId) {
        if (agents[agentId].owner == address(0)) revert AgentNotFound();
        _;
    }

    // ──────────────────── Registration (ERC-8004 Identity) ────────────────────

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
            latestReceiptCID: "",
            riskScore: 15,
            isVerified: true
        });
        emit AgentRegistered(agentId, msg.sender, name);
    }

    // ──────────────────── Policy Management ────────────────────

    function updatePolicyBundle(uint256 agentId, string calldata newCID)
        external exists(agentId) onlyOwner(agentId)
    {
        agents[agentId].policyBundleCID = newCID;
        emit PolicyUpdated(agentId, newCID);
    }

    // ──────────────────── ERC-8126: Risk Verification ────────────────────

    /// @notice Set risk score for an agent. Owner or agent owner can call.
    function setRiskScore(uint256 agentId, uint8 score, bool verified)
        external exists(agentId)
    {
        // For MVP: agent owner or contract deployer can set risk scores
        // In production: only whitelisted verification providers
        Agent storage agent = agents[agentId];
        if (msg.sender != agent.owner && msg.sender != agent.operatorWallet) revert Unauthorized();
        agent.riskScore = score;
        agent.isVerified = verified;
        emit RiskScoreUpdated(agentId, score, verified);
    }

    /// @notice Read risk verification status (ERC-8126 aligned)
    function getAgentVerification(uint256 agentId) external view returns (
        bool isVerified,
        uint8 overallRiskScore
    ) {
        Agent storage agent = agents[agentId];
        return (agent.isVerified, agent.riskScore);
    }

    // ──────────────────── ERC-8183: Escrow (Simplified) ────────────────────

    /// @notice Create and fund a job in one tx. Client sends ETH as escrow.
    function createAndFundJob(uint256 agentId) external payable exists(agentId) returns (uint256 jobId) {
        // ERC-8126 risk gate: reject if agent risk is too high
        if (agents[agentId].riskScore > 80) revert RiskTooHigh();

        jobId = nextJobId++;
        jobs[jobId] = Job({
            agentId: agentId,
            client: msg.sender,
            evaluator: agents[agentId].teePublicKey,
            fundedAmount: msg.value,
            status: JobStatus.Funded,
            expiredAt: block.timestamp + 1 hours
        });
        emit JobCreated(jobId, agentId, msg.sender);
        emit JobFunded(jobId, msg.value);
    }

    /// @notice TEE (evaluator) marks job as completed. Releases escrow to agent owner.
    function completeJob(uint256 jobId) external {
        Job storage job = jobs[jobId];
        if (job.client == address(0)) revert JobNotFound();
        if (job.status != JobStatus.Funded && job.status != JobStatus.Submitted) revert WrongStatus();
        if (msg.sender != job.evaluator) revert Unauthorized();

        job.status = JobStatus.Completed;

        // Release escrow to agent owner
        if (job.fundedAmount > 0) {
            address payable agentOwner = payable(agents[job.agentId].owner);
            (bool ok,) = agentOwner.call{value: job.fundedAmount}("");
            require(ok, "Transfer failed");
        }
        emit JobCompleted(jobId);
    }

    /// @notice Client can claim refund after expiry
    function claimRefund(uint256 jobId) external {
        Job storage job = jobs[jobId];
        if (job.client == address(0)) revert JobNotFound();
        if (job.status != JobStatus.Funded) revert WrongStatus();
        if (block.timestamp < job.expiredAt) revert WrongStatus();

        job.status = JobStatus.Rejected;
        if (job.fundedAmount > 0) {
            (bool ok,) = payable(job.client).call{value: job.fundedAmount}("");
            require(ok, "Refund failed");
        }
        emit JobRefunded(jobId, job.client, job.fundedAmount);
    }

    /// @notice Read job details
    function getJob(uint256 jobId) external view returns (Job memory) {
        return jobs[jobId];
    }

    // ──────────────────── Receipt Submission (ECDSA → Reputation) ────────────────────

    function submitExecutionReceipt(
        uint256 agentId,
        string calldata receiptCID,
        bool policyAdherenceVerified,
        bytes calldata teeSignature
    ) external exists(agentId) {
        bytes32 sigHash = keccak256(teeSignature);
        if (usedReceipts[sigHash]) revert ReceiptAlreadyUsed();
        usedReceipts[sigHash] = true;

        bytes32 messageHash = keccak256(abi.encodePacked(block.chainid, address(this), agentId, policyAdherenceVerified, receiptCID));
        bytes32 ethSignedHash = _toEthSignedMessageHash(messageHash);

        address recovered = _recover(ethSignedHash, teeSignature);
        if (recovered != agents[agentId].teePublicKey) revert InvalidSignature();

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

    // ──────────────────── ECDSA Helpers ────────────────────

    function _toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function _recover(bytes32 hash, bytes calldata sig) internal pure returns (address) {
        if (sig.length != 65) revert InvalidSignature();
        bytes32 r; bytes32 s; uint8 v;
        assembly {
            r := calldataload(sig.offset)
            s := calldataload(add(sig.offset, 32))
            v := byte(0, calldataload(add(sig.offset, 64)))
        }
        if (v < 27) v += 27;
        if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) revert InvalidSignature();
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

    function checkReceiptUsed(bytes calldata teeSignature) external view returns (bool) {
        return usedReceipts[keccak256(teeSignature)];
    }
}
