import { BrandMark } from '@/components/ui/BrandLogo';
import { siteConfig } from '@/config/site';

export default function Loading() {
  return (
    <div className="min-h-[75vh] w-full bg-[#f7f7ff] text-[#27187e] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden font-sans">
      
      {/* Soft Ambient Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#cfcaf5]/40 via-[#edeafc]/60 to-[#27187e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm">
        
        {/* Animated Brand Emblem */}
        <div className="relative mb-5 p-3 rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] shadow-lg">
          <BrandMark size={56} theme="light" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl text-[#27187e] tracking-wider leading-none mb-1">
          {siteConfig.name}
        </h2>
        <span className="font-sans font-bold uppercase tracking-[0.22em] text-[10px] text-[#27187e]/70 mb-5">
          The Aquarium Atlas
        </span>

        {/* Shimmering Loading Bar */}
        <div className="w-48 h-1.5 bg-[#edeafc] rounded-full overflow-hidden border border-[#cfcaf5] relative mb-3">
          <div className="h-full bg-gradient-to-r from-[#27187e] via-[#3b28ab] to-[#27187e] rounded-full w-full animate-pulse" />
        </div>

        <p className="text-xs text-[#27187e]/75 font-medium">
          Loading species profiles &amp; data…
        </p>

      </div>
    </div>
  );
}
