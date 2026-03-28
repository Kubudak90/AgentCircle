import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@lit-protocol/lit-node-client-nodejs",
    "@lit-protocol/constants",
    "@web3-storage/w3up-client",
  ],
};

export default nextConfig;
