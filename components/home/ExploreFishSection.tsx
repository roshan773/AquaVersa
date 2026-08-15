'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Droplets, Waves } from 'lucide-react';

export default function ExploreFishSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Explore the Aquatic World
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're looking for the vibrant colors of a tropical freshwater tank or the exotic beauty of a marine reef, we have the perfect guides for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Freshwater Card */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[400px] flex flex-col justify-end p-8 border border-border bg-slate-955">
            <Image 
              src="/images/neon_tetra.png" 
              alt="Freshwater Aquarium" 
              fill 
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="relative z-10 text-white">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-md flex items-center justify-center mb-6 border border-cyan-500/30">
                <Droplets className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Freshwater Fish</h3>
              <p className="text-white/80 mb-8 max-w-md">
                Beginner-friendly, diverse, and vibrant. Discover tetras, cichlids, bettas, and more for your home aquarium.
              </p>
              <Link 
                href="/fish/freshwater" 
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Browse Freshwater <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Saltwater Card */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[400px] flex flex-col justify-end p-8 border border-border bg-slate-955">
            <Image 
              src="/images/clownfish.png" 
              alt="Saltwater Aquarium" 
              fill 
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="relative z-10 text-white">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center mb-6 border border-blue-500/30">
                <Waves className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Saltwater Fish</h3>
              <p className="text-white/80 mb-8 max-w-md">
                Stunning reef dwellers and marine species. Learn about clownfish, tangs, and creating a marine ecosystem.
              </p>
              <Link 
                href="/fish/saltwater" 
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-slate-900 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Browse Saltwater <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
