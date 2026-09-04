import { Waves } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full bg-[#030712] text-slate-100 flex flex-col items-center justify-center gap-4 font-sans">
      <div className="w-12 h-12 rounded-2xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
        <Waves className="w-6 h-6 animate-pulse text-teal-300" />
      </div>
      <div className="space-y-1 text-center">
        <h3 className="text-sm font-semibold tracking-wide font-poppins text-white">{siteConfig.name}</h3>
        <p className="text-xs text-slate-400 font-normal">Preparing your aquarium guide…</p>
      </div>
    </div>
  );
}
