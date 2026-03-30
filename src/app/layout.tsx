import "./globals.css";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Web3Provider from "@/components/providers/Web3Provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-headline" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "AgentCircle",
  description: "Private Policy Inheritance for Crypto Agents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark font-sans", inter.variable, spaceGrotesk.variable, geistMono.variable)}>
      <body className="bg-background text-foreground min-h-screen antialiased">
        <Web3Provider>
          {children}
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
