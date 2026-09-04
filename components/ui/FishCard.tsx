import Image from "next/image";
import Link from "next/link";
import { Fish as FishType } from "@/lib/types";
import { ArrowRight, Droplets } from "lucide-react";

interface FishCardProps {
  fish: FishType;
}

export default function FishCard({ fish }: FishCardProps) {
  const isFreshwater = fish.category?.toLowerCase() === "freshwater";
  const badgeColor = 
    fish.difficulty === "Beginner" ? "bg-emerald-950/70 text-emerald-300 border-emerald-800/40" :
    fish.difficulty === "Advanced Beginner" ? "bg-teal-950/70 text-teal-300 border-teal-800/40" :
    fish.difficulty === "Intermediate" ? "bg-blue-950/70 text-blue-300 border-blue-800/40" :
    "bg-amber-950/70 text-amber-300 border-amber-800/40";

  return (
    <div className="group rounded-2xl border border-slate-800 bg-[#061224] overflow-hidden hover:border-slate-700 transition-all duration-200 flex flex-col text-left">
      {/* Photo Header */}
      <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
        <Image
          src={fish.image}
          alt={`${fish.name} (${fish.scientificName || 'Fish species'})`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[10px] font-semibold border shadow-sm ${badgeColor}">
          <span className={badgeColor.split(' ')[1]}>{fish.difficulty}</span>
        </div>
        <div className="absolute top-3 left-3 bg-[#030712]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-slate-800 text-[10px] font-semibold text-slate-300">
          {fish.category}
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1 font-poppins">
            {fish.name}
          </h3>
          {fish.scientificName && (
            <p className="text-xs text-slate-400 italic font-normal">{fish.scientificName}</p>
          )}
        </div>

        {/* Quick parameters readout */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-[11px]">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
            <span className="text-slate-500 block text-[9px] uppercase font-medium">Min Tank</span>
            <span className="font-semibold text-white">
              {fish.minTankSize ? `${fish.minTankSize} gal` : fish.minimumTankSize || 'Varies'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
            <span className="text-slate-500 block text-[9px] uppercase font-medium">Temperament</span>
            <span className="font-semibold text-white truncate block">
              {fish.temperament || 'Community'}
            </span>
          </div>
        </div>
        
        <p className="text-xs text-slate-400 font-normal mb-5 line-clamp-2 flex-grow leading-relaxed">
          {fish.description}
        </p>
        
        <Link 
          href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 mt-auto"
        >
          <span>View Care Profile</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
        </Link>
      </div>
    </div>
  );
}
