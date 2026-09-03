'use client';

export default function MarqueeTicker() {
  const items = [
    "COMPREHENSIVE SPECIES DATABASE",
    "NITROGEN CYCLE BIOLOGY",
    "PLANTED AQUASCAPES",
    "ZERO-RISK COMPATIBILITY",
    "HARDWARE SPECS & SIZING",
    "LIVING ECOSYSTEM ARCHITECTURE",
    "WATER PARAMETER ANALYZER",
    "ADVANCED DISEASE DIAGNOSTICS",
    "COMMUNITY STOCKING CALCULATOR",
    "AQUASCAPE CANVAS PLANNER",
  ];

  return (
    <div className="w-full bg-[#030812] border-y border-cyan-500/20 py-4 overflow-hidden relative select-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[#030812] via-transparent to-[#030812] z-10 pointer-events-none w-full" />
      
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {/* Repeating twice for smooth infinite loop */}
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="font-poppins text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-300 hover:text-cyan-300 transition-colors">
              {text}
            </span>
            <span className="text-rose-400 text-xs animate-pulse">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
