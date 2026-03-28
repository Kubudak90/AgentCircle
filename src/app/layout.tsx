import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Web3Provider from "@/components/providers/Web3Provider";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "AgentCircle",
  description: "Private Policy Inheritance for Crypto Agents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body className="bg-background text-foreground min-h-screen antialiased">
        <Web3Provider>
          {children}
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
