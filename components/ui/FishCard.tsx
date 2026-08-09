import Image from "next/image";
import Link from "next/link";
import { Fish as FishType } from "@/lib/types";
import { Droplets, Info } from "lucide-react";

interface FishCardProps {
  fish: FishType;
}

export default function FishCard({ fish }: FishCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="relative h-48 w-full bg-muted overflow-hidden">
        <Image
          src={fish.image}
          alt={fish.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-foreground">
          {fish.difficulty}
        </div>
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md">
          <Droplets className={`w-4 h-4 ${fish.category === 'freshwater' ? 'text-cyan-500' : 'text-blue-500'}`} />
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1 group-hover:text-cyan-600 transition-colors">{fish.name}</h3>
        <p className="text-xs text-muted-foreground italic mb-4">{fish.scientificName}</p>
        
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-5 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Size</span>
            <span className="font-medium">{fish.adultSize}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Tank</span>
            <span className="font-medium">{fish.minimumTankSize}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Temperament</span>
            <span className="font-medium">{fish.temperament}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Temp</span>
            <span className="font-medium">{fish.temperature}</span>
          </div>
        </div>
        
        <Link 
          href={`/fish/${fish.category}/${fish.slug}`}
          className="w-full py-2.5 bg-muted hover:bg-cyan-500 hover:text-white dark:hover:text-black rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Info className="w-4 h-4" />
          View Fish Guide
        </Link>
      </div>
    </div>
  );
}
