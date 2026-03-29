"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import ConnectButton from "@/components/ConnectButton";
import { REGISTRY_ADDRESS, REGISTRY_CHAIN } from "@/lib/contract";
import Link from "next/link";

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
] as const;

export default function RegisterPage() {
  const { address, isConnected, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();

  const [name, setName] = useState("");
  const [policyCID, setPolicyCID] = useState("");
  const [teeKey, setTeeKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!isConnected || !address) {
      toast.error("Connect your wallet first");
      return;
    }
    if (!name) {
      toast.error("Agent name is required");
      return;
    }

    setLoading(true);
    try {
      if (chainId !== REGISTRY_CHAIN.id) {
        await switchChainAsync({ chainId: REGISTRY_CHAIN.id });
      }

      const hash = await writeContractAsync({
        address: REGISTRY_ADDRESS,
        abi: REGISTER_ABI,
        functionName: "registerAgent",
        args: [
          name,
          address,
          policyCID || "ipfs://pending",
          (teeKey || address) as `0x${string}`,
        ],
        chainId: REGISTRY_CHAIN.id,
      });

      toast.success("Agent registered!", { description: `Tx: ${hash.slice(0, 14)}...` });
    } catch (e: any) {
      toast.error("Registration failed", { description: e?.shortMessage || e?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back to Dashboard
        </Link>
        <ConnectButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Register Agent</CardTitle>
          <CardDescription>
            Register your agent on-chain to the ERC-8004 Identity Registry.
            Your agent will start with a reputation score of 50.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Agent Name</label>
            <Input
              placeholder="e.g., My Whale Tracker"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Operator Wallet</label>
            <Input
              value={address || "Connect wallet first"}
              disabled
              className="font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">PolicyBundle CID (optional)</label>
            <Input
              placeholder="ipfs://bafybeig..."
              value={policyCID}
              onChange={(e) => setPolicyCID(e.target.value)}
              className="font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">TEE Public Key (optional, defaults to your wallet)</label>
            <Input
              placeholder="0x..."
              value={teeKey}
              onChange={(e) => setTeeKey(e.target.value)}
              className="font-mono text-xs"
            />
          </div>

          <Button onClick={handleRegister} disabled={loading || !isConnected} className="w-full">
            {loading ? "Registering..." : "Register on Base Sepolia"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
