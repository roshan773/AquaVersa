import Link from 'next/link';
import { ArrowRight, Waves } from 'lucide-react';
import Image from 'next/image';

export default function FinalCTA() {
  return (
    <section className="relative py-32 bg-slate-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <Image src="/betta_bg.png" alt="Dark Aquarium" fill className="object-cover opacity-15 mix-blend-luminosity brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-955/20 backdrop-blur-md border border-blue-500/30 text-blue-500 font-semibold mb-8">
          <Waves className="w-4 h-4" /> Dive In
        </div>
        <h2 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6 max-w-4xl mx-auto leading-tight text-center">
          Ready to Build Your <span className="text-blue-500">Dream Aquarium?</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 text-center">
          Start building your aquarium with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/start-aquarium"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/guides"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold rounded-full transition-colors flex items-center justify-center text-lg cursor-pointer"
          >
            Browse Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
