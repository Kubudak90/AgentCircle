"use client";

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Floating particles */}
      <div className="animate-float-1 absolute top-[10%] left-[15%] w-1 h-1 rounded-full bg-receipt-green/30" />
      <div className="animate-float-2 absolute top-[25%] left-[70%] w-0.5 h-0.5 rounded-full bg-cobalt/40" />
      <div className="animate-float-3 absolute top-[45%] left-[30%] w-1.5 h-1.5 rounded-full bg-receipt-green/20" />
      <div className="animate-float-1 absolute top-[60%] left-[80%] w-0.5 h-0.5 rounded-full bg-cobalt/30" />
      <div className="animate-float-2 absolute top-[75%] left-[45%] w-1 h-1 rounded-full bg-receipt-green/25" />
      <div className="animate-float-3 absolute top-[15%] left-[55%] w-0.5 h-0.5 rounded-full bg-amber/20" />
      <div className="animate-float-1 absolute top-[85%] left-[20%] w-1 h-1 rounded-full bg-cobalt/20" />
      <div className="animate-float-2 absolute top-[35%] left-[90%] w-1.5 h-1.5 rounded-full bg-receipt-green/15" />
      <div className="animate-float-3 absolute top-[55%] left-[10%] w-0.5 h-0.5 rounded-full bg-cobalt/25" />
      <div className="animate-float-1 absolute top-[90%] left-[65%] w-1 h-1 rounded-full bg-receipt-green/20" />
      {/* Subtle gradient orbs */}
      <div className="absolute top-[20%] left-[50%] w-[600px] h-[600px] rounded-full bg-receipt-green/[0.02] blur-[120px]" />
      <div className="absolute top-[60%] left-[20%] w-[400px] h-[400px] rounded-full bg-cobalt/[0.02] blur-[100px]" />
    </div>
  );
}
