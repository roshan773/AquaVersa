'use client';

export default function MarqueeTicker() {
  const items = [
    "Freshwater Community Fish",
    "Aquarium Nitrogen Cycle",
    "Live Aquatic Plants",
    "Species Compatibility Guides",
    "Filtration & Water Flow",
    "Marine & Reef Keeping",
    "Water Chemistry & Testing",
    "Aquarium Tank Sizing",
    "Feeding & Nutrition Basics",
    "Routine Tank Maintenance",
  ];

  return (
    <div className="w-full bg-[#020610] border-y border-slate-800/80 py-3.5 overflow-hidden relative select-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[#020610] via-transparent to-[#020610] z-10 pointer-events-none w-full" />
      
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="font-poppins text-xs font-semibold text-slate-400 hover:text-teal-300 transition-colors">
              {text}
            </span>
            <span className="text-teal-500/50 text-[10px]">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
