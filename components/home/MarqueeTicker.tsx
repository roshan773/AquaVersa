import { Sparkles } from 'lucide-react';

export default function MarqueeTicker() {
  const items = [
    "FRESHWATER COMMUNITY SPECIES",
    "AQUARIUM NITROGEN CYCLE",
    "LIVE AQUATIC PLANTS & MOSSES",
    "SPECIES COMPATIBILITY CHECKER",
    "FILTRATION & CANISTER HARDWARE",
    "SALTWATER REEF KEEPING",
    "WATER CHEMISTRY & STABILITY",
    "TANK DIMENSIONS & CAPACITIES",
    "FEEDING & NUTRITION BASICS",
    "ROUTINE TANK MAINTENANCE",
  ];

  return (
    <div className="w-full bg-[#0d0630] border-y border-[#27187E] py-3.5 overflow-hidden relative select-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0630] via-transparent to-[#0d0630] z-10 pointer-events-none w-full" />
      
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="font-condensed text-sm sm:text-base font-bold uppercase tracking-wider text-[#F7F7FF]/80 hover:text-[#F7F7FF] transition-colors">
              {text}
            </span>
            <Sparkles className="w-3 h-3 text-[#aca1f7] shrink-0" strokeWidth={2} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
