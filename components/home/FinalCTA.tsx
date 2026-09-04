import Link from 'next/link';
import { ArrowRight, Waves, Compass, BookOpen } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden text-center">
      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#061224] border border-slate-800 shadow-xl relative overflow-hidden text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/60 border border-teal-800/30 text-teal-300 text-xs font-semibold mb-6">
            <Waves className="w-3.5 h-3.5 text-teal-400" />
            <span>{siteConfig.name}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white mb-4 leading-tight">
            Start Planning Your Aquarium with Confidence
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Discover compatible species, understand natural habitat parameters, and build a healthy ecosystem step by step.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center text-xs font-semibold">
            <Link
              href="/start-aquarium"
              className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>First Aquarium Setup Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/fish"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Explore Fish Library</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
