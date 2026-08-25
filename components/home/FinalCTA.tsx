import Link from 'next/link';
import { ArrowRight, Waves } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden border-t border-slate-200/30 dark:border-slate-900 text-left">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-poppins text-xs font-semibold uppercase tracking-wider mb-6">
          <Waves className="w-3.5 h-3.5" /> Dive In
        </div>
        <h2 className="text-3xl md:text-5xl font-poppins font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          Ready to build your <span className="text-cyan-500">dream aquarium?</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Start planning compatible stocking layouts, hardware configurations, and planted environments with confidence today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full max-w-md mx-auto">
          <Link
            href="/start-aquarium"
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
          >
            <span>Start Your Journey</span> <ArrowRight className="w-4 h-4 text-white" />
          </Link>
          <Link
            href="/guides"
            className="px-8 py-3.5 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-200 font-semibold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
          >
            Browse Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
