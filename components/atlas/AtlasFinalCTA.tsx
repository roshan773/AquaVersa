import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AtlasFinalCTA() {
  return (
    <section className="marine-pattern-dark py-28 bg-[#27187e] text-[#f7f7ff] text-center relative overflow-hidden border-t border-[#3b28ab]">
      <div className="site-container relative z-10 flex flex-col items-center">
        
        <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#f7f7ff]/80 mb-4 block">
          THE AQUARIUM ATLAS
        </span>

        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-normal text-[#f7f7ff] tracking-wide max-w-4xl leading-[0.95] mb-6">
          Build a better aquarium, <br />
          one decision at a time.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[#f7f7ff]/85 font-normal max-w-xl mb-10 font-sans leading-relaxed">
          Explore species requirements, water chemistry parameters, and practical equipment guides in our comprehensive archive.
        </p>

        <Link
          href="/fish"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#f7f7ff] hover:bg-[#edeafc] text-[#27187e] text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-2xl hover:scale-105 active:scale-95"
        >
          <span>Explore The Library</span>
          <ArrowRight className="w-5 h-5 text-[#27187e]" />
        </Link>

      </div>
    </section>
  );
}
