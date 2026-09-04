import Link from 'next/link';
import { ArrowRight, Waves, Compass } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-[#0d0630] relative overflow-hidden text-center">
      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#1c0e64] border border-[#3622a6] shadow-2xl relative overflow-hidden text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#27187E] border border-[#4a34c9] text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-semibold mb-6 shadow-sm">
            <Waves className="w-3.5 h-3.5 text-[#aca1f7]" />
            <span>{siteConfig.name}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#F7F7FF] mb-4 tracking-wide leading-tight">
            START PLANNING YOUR AQUARIUM WITH CONFIDENCE
          </h2>

          <p className="text-[#F7F7FF]/80 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed font-sans">
            Discover compatible species, understand natural habitat parameters, and build a healthy ecosystem step by step.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center text-xs font-condensed uppercase tracking-wider font-bold">
            <Link
              href="/start-aquarium"
              className="px-7 py-3.5 bg-[#F7F7FF] hover:bg-white text-[#27187E] rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95"
            >
              <span>First Aquarium Setup Guide</span>
              <ArrowRight className="w-4 h-4 text-[#27187E]" />
            </Link>
            <Link
              href="/fish"
              className="px-7 py-3.5 bg-[#27187E] hover:bg-[#3622a6] border border-[#4a34c9] text-[#F7F7FF] hover:text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Compass className="w-4 h-4 text-[#aca1f7]" />
              <span>Explore Fish Library</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
