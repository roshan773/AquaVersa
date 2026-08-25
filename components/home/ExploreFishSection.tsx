'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Droplets, Waves } from 'lucide-react';

export default function ExploreFishSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200/30 dark:border-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-slate-900 dark:text-white">
            Explore the Aquatic World
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-450 font-light leading-relaxed">
            Whether you're looking for the vibrant colors of a tropical freshwater tank or the exotic beauty of a marine reef, we have the perfect guides for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Freshwater Card */}
          <div className="group relative rounded-xl overflow-hidden min-h-[380px] flex flex-col justify-end p-8 border border-slate-200/60 dark:border-slate-850 bg-slate-50 dark:bg-slate-900">
            <Image 
              src="/images/neon_tetra.png" 
              alt="Freshwater Aquarium" 
              fill 
              className="object-cover opacity-80 group-hover:scale-102 transition-transform duration-700" 
              sizes="(max-width: 768px) 100vw, 550px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="relative z-10 text-white text-left">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-5 border border-white/10">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-2">Freshwater Fish</h3>
              <p className="text-slate-200 font-light text-xs sm:text-sm mb-6 max-w-md leading-relaxed">
                Beginner-friendly, diverse, and vibrant. Discover tetras, cichlids, bettas, and more for your home aquarium.
              </p>
              <Link 
                href="/fish/freshwater" 
                className="inline-flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
              >
                <span>Browse Freshwater</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Saltwater Card */}
          <div className="group relative rounded-xl overflow-hidden min-h-[380px] flex flex-col justify-end p-8 border border-slate-200/60 dark:border-slate-850 bg-slate-50 dark:bg-slate-900">
            <Image 
              src="/images/clownfish.png" 
              alt="Saltwater Aquarium" 
              fill 
              className="object-cover opacity-80 group-hover:scale-102 transition-transform duration-700" 
              sizes="(max-width: 768px) 100vw, 550px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="relative z-10 text-white text-left">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-5 border border-white/10">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-2">Saltwater Fish</h3>
              <p className="text-slate-200 font-light text-xs sm:text-sm mb-6 max-w-md leading-relaxed">
                Stunning reef dwellers and marine species. Learn about clownfish, tangs, and creating a marine ecosystem.
              </p>
              <Link 
                href="/fish/saltwater" 
                className="inline-flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
              >
                <span>Browse Saltwater</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
