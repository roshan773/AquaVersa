'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Droplets, Waves } from 'lucide-react';

export default function ExploreFishSection() {
  return (
    <section className="py-24 bg-[#030303] border-b border-red-500/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.01),transparent_60%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-white">
            Explore the Aquatic World
          </h2>
          <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
            Whether you're looking for the vibrant colors of a tropical freshwater tank or the exotic beauty of a marine reef, we have the perfect guides for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Freshwater Card */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 border border-red-500/10 bg-black">
            <Image 
              src="/images/neon_tetra.png" 
              alt="Freshwater Aquarium" 
              fill 
              className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 backdrop-blur-md flex items-center justify-center mb-6 border border-red-500/35">
                <Droplets className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-3xl font-poppins font-bold mb-3">Freshwater Fish</h3>
              <p className="text-slate-300 font-light text-sm mb-8 max-w-md leading-relaxed">
                Beginner-friendly, diverse, and vibrant. Discover tetras, cichlids, bettas, and more for your home aquarium.
              </p>
              <Link 
                href="/fish/freshwater" 
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] shadow-lg cursor-pointer"
              >
                <span>Browse Freshwater</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Saltwater Card */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 border border-red-500/10 bg-black">
            <Image 
              src="/images/clownfish.png" 
              alt="Saltwater Aquarium" 
              fill 
              className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 backdrop-blur-md flex items-center justify-center mb-6 border border-red-500/35">
                <Waves className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-3xl font-poppins font-bold mb-3">Saltwater Fish</h3>
              <p className="text-slate-300 font-light text-sm mb-8 max-w-md leading-relaxed">
                Stunning reef dwellers and marine species. Learn about clownfish, tangs, and creating a marine ecosystem.
              </p>
              <Link 
                href="/fish/saltwater" 
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] shadow-lg cursor-pointer"
              >
                <span>Browse Saltwater</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
