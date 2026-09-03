import { Waves } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Loading() {
  return (
    <div className="min-h-[80vh] w-full bg-black text-slate-100 flex flex-col items-center justify-center gap-6 font-sans">
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring animation */}
        <div className="absolute w-20 h-20 rounded-full border border-blue-500/30 animate-ping opacity-60" />
        <div className="absolute w-24 h-24 rounded-full border border-cyan-500/10 animate-pulse" />
        
        {/* Main icon */}
        <div className="relative bg-blue-955/20 border border-blue-500/25 p-4.5 rounded-2xl text-blue-400">
          <Waves className="w-10 h-10 animate-pulse text-blue-500" />
        </div>
      </div>
      <div className="space-y-1.5 text-center">
        <h3 className="text-sm font-bold tracking-widest uppercase font-poppins text-white animate-pulse">Loading {siteConfig.name}</h3>
        <p className="text-xs text-slate-500 font-light">Creating a healthy environment for your query...</p>
      </div>
    </div>
  );
}
