import { BrandMark } from '@/components/ui/BrandLogo';
import { siteConfig } from '@/config/site';

export default function Loading() {
  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-b from-[#1b1059] via-[#12093d] to-[#08031d] text-[#f7f7ff] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden font-sans">
      
      {/* Sunlight Beam & Ocean Caustics Glow */}
      <div className="absolute -top-10 left-1/3 w-40 h-[100vh] bg-gradient-to-b from-cyan-300/15 via-[#3b28ab]/10 to-transparent rotate-12 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#27187e]/40 via-cyan-600/20 to-[#3b28ab]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Ocean Bubble Accents */}
      <div className="absolute bottom-12 left-1/4 w-3 h-3 rounded-full border border-cyan-300/60 bg-cyan-400/20 animate-bounce" />
      <div className="absolute bottom-20 right-1/3 w-4 h-4 rounded-full border border-cyan-300/60 bg-cyan-400/20 animate-ping" />
      <div className="absolute bottom-16 right-1/4 w-2.5 h-2.5 rounded-full border border-cyan-300/60 bg-cyan-400/20 animate-bounce" />

      <div className="relative z-10 flex flex-col items-center max-w-sm">
        
        {/* Animated Bioluminescent Brand Emblem */}
        <div className="relative mb-5 p-4 rounded-3xl bg-[#12093d]/90 border-2 border-cyan-400/40 shadow-[0_0_25px_rgba(39,24,126,0.8)] backdrop-blur-md">
          <BrandMark size={64} theme="dark" />
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl text-[#ffffff] tracking-wider leading-none mb-2 drop-shadow-sm">
          {siteConfig.name}
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-cyan-300 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span>SUBMERGING INTO ATLAS</span>
        </div>

        {/* Shimmering Ocean Depth Bar */}
        <div className="w-56 sm:w-64 h-2 bg-[#1b1059] rounded-full overflow-hidden border border-cyan-400/40 relative mb-3 shadow-inner">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full w-full animate-pulse shadow-[0_0_8px_#38bdf8]" />
        </div>

        <p className="text-xs text-cyan-200/80 font-medium tracking-wide">
          Diving through species care sheets &amp; parameters…
        </p>

      </div>
    </div>
  );
}
