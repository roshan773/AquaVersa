import Link from "next/link";
import { Waves } from "lucide-react";

export default function GuidesPage() {
  return (
    <section className="min-h-screen py-24 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Guides & Tutorials</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            In‑depth step‑by‑step guides covering everything from water chemistry to advanced aquascaping techniques.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/water-params" className="p-8 glass rounded-3xl border border-border/40 hover:border-cyan-500/40 hover:shadow-lg transition-all block text-left group">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">Water Chemistry Guide</h2>
            <p className="text-slate-300 leading-relaxed">
              Master the science of water quality. Learn how to test, balance, and maintain optimal parameters like pH, ammonia, nitrite, and nitrates for a healthy aquarium.
            </p>
            <span className="inline-block mt-6 text-sm font-semibold text-cyan-400 group-hover:underline">Read Water Guide →</span>
          </Link>
          
          <Link href="/plants" className="p-8 glass rounded-3xl border border-border/40 hover:border-emerald-500/40 hover:shadow-lg transition-all block text-left group">
            <h2 className="text-2xl font-bold mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors">Aquascaping & Plants Guide</h2>
            <p className="text-slate-300 leading-relaxed">
              Design stunning planted tanks. Discover beginner-friendly low-tech plants, placement layouts (foreground/background), lighting needs, and growth guidelines.
            </p>
            <span className="inline-block mt-6 text-sm font-semibold text-emerald-400 group-hover:underline">Read Plants Guide →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
