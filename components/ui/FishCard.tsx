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
        <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold border border-white/20 shadow-sm">
          {fish.difficulty}
        </div>
        <div className="absolute top-3 left-3 bg-black/60 text-white backdrop-blur-md p-1.5 rounded-md border border-white/20 shadow-sm">
          <Droplets className={`w-4 h-4 ${fish.category?.toLowerCase() === 'freshwater' ? 'text-cyan-400' : 'text-blue-400'}`} />
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">{fish.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2" title={fish.description}>{fish.description}</p>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Size</span>
            <span className="font-medium truncate">{fish.adultSize || (fish.maxSize ? `${fish.maxSize} inches` : 'Varies')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Tank</span>
            <span className="font-medium truncate">{fish.minimumTankSize || (fish.minTankSize ? `${fish.minTankSize} gal` : 'Varies')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Temperament</span>
            <span className="font-medium truncate">{fish.temperament || 'Unknown'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Water</span>
            <span className="font-medium truncate capitalize">{fish.category || 'Unknown'}</span>
          </div>
        </div>
        
        <Link 
          href={`/fish/${fish.category?.toLowerCase() || 'unknown'}/${fish.slug}`}
          className="w-full py-2.5 bg-muted hover:bg-primary hover:text-primary-foreground rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Info className="w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );
}
