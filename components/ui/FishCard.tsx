import Image from "next/image";
import Link from "next/link";
import { Fish as FishType } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface FishCardProps {
  fish: FishType;
}

export default function FishCard({ fish }: FishCardProps) {
  const badgeColor = 
    fish.difficulty === "Beginner" ? "bg-[#F7F7FF] text-[#27187E] font-bold" :
    fish.difficulty === "Advanced Beginner" ? "bg-[#d0cbfb] text-[#14094a] font-bold" :
    fish.difficulty === "Intermediate" ? "bg-[#3622a6] text-[#F7F7FF] font-semibold" :
    "bg-[#ffbe3b] text-[#14094a] font-bold";

  return (
    <div className="group rounded-2xl border border-[#27187E] bg-[#1c0e64] overflow-hidden hover:border-[#F7F7FF] transition-all duration-200 flex flex-col text-left shadow-lg">
      {/* Photo Header */}
      <div className="relative h-48 w-full bg-[#0d0630] overflow-hidden">
        <Image
          src={fish.image}
          alt={`${fish.name} (${fish.scientificName || 'Fish species'})`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-condensed uppercase tracking-wider shadow-sm ${badgeColor}`}>
          {fish.difficulty}
        </div>
        <div className="absolute top-3 left-3 bg-[#0d0630]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-[#27187E] text-[10px] font-condensed uppercase tracking-wider font-semibold text-[#F7F7FF]">
          {fish.category}
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-xl font-display font-normal tracking-wide text-[#F7F7FF] group-hover:text-white transition-colors line-clamp-1">
            {fish.name}
          </h3>
          {fish.scientificName && (
            <p className="text-xs text-[#F7F7FF]/70 italic font-normal font-sans">{fish.scientificName}</p>
          )}
        </div>

        {/* Quick parameters readout */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-[11px]">
          <div className="p-2 rounded-xl bg-[#27187E]/60 border border-[#3622a6]">
            <span className="text-[#F7F7FF]/60 block text-[9px] uppercase font-condensed tracking-wider">Min Tank</span>
            <span className="font-bold text-[#F7F7FF] font-condensed text-sm">
              {fish.minTankSize ? `${fish.minTankSize} GAL` : fish.minimumTankSize || 'VARIES'}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-[#27187E]/60 border border-[#3622a6]">
            <span className="text-[#F7F7FF]/60 block text-[9px] uppercase font-condensed tracking-wider">Temperament</span>
            <span className="font-bold text-[#F7F7FF] font-condensed text-sm truncate block">
              {fish.temperament || 'COMMUNITY'}
            </span>
          </div>
        </div>
        
        <p className="text-xs text-[#F7F7FF]/75 font-normal mb-5 line-clamp-2 flex-grow leading-relaxed font-sans">
          {fish.description}
        </p>
        
        <Link 
          href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`}
          className="w-full py-2.5 bg-[#27187E] hover:bg-[#3622a6] text-[#F7F7FF] hover:text-white border border-[#4a34c9] rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 mt-auto shadow-sm"
        >
          <span>View Care Profile</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#aca1f7]" />
        </Link>
      </div>
    </div>
  );
}
