import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Droplets, Anchor } from "lucide-react";

export default function FishLandingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">Meet Your Future Fish</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore species by habitat, temperament, size, and care requirements. Choose the right environment to start your journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Freshwater Card */}
        <Link 
          href="/fish/freshwater"
          className="group relative rounded-3xl overflow-hidden aspect-[4/3] flex flex-col justify-end p-8 border border-border"
        >
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/betta.png" 
              alt="Freshwater Aquarium" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 mb-4">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-50">150+ Species</span>
            </div>
            <h2 className="text-3xl font-poppins font-bold mb-2 group-hover:text-cyan-400 transition-colors">Freshwater Fish</h2>
            <p className="text-slate-300 mb-6 max-w-md">
              Perfect for planted aquariums and beginner setups. Discover Bettas, Tetras, Cichlids, and more.
            </p>
            <div className="inline-flex items-center gap-2 font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
              Explore Freshwater <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Saltwater Card */}
        <Link 
          href="/fish/saltwater"
          className="group relative rounded-3xl overflow-hidden aspect-[4/3] flex flex-col justify-end p-8 border border-border"
        >
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1200&auto=format&fit=crop" 
              alt="Saltwater Reef" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 backdrop-blur-md border border-blue-500/30 mb-4">
              <Anchor className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-50">80+ Species</span>
            </div>
            <h2 className="text-3xl font-poppins font-bold mb-2 group-hover:text-blue-400 transition-colors">Saltwater Fish</h2>
            <p className="text-slate-300 mb-6 max-w-md">
              Vibrant marine life for advanced hobbyists. Build your own spectacular reef ecosystem.
            </p>
            <div className="inline-flex items-center gap-2 font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
              Explore Saltwater <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
