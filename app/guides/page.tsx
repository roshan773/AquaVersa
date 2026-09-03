import Link from "next/link";
import { Waves, Sparkles, BookOpen } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Aquarium Setup & Maintenance Guides | ${siteConfig.name}`,
  description: `Read in-depth step-by-step guides on aquarium setup, water parameters, filter media, and plant growth from ${siteConfig.name}.`,
  keywords: [
    "roshan aquva world tutorials",
    "aquarium maintenance guides",
    "roshan aquva world setup tutorial",
    "roshan aquva world",
    "aquaguide",
    "aquvaGuide"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/guides`,
  }
};

export default function GuidesPage() {
  return (
    <section className="min-h-screen py-24 bg-black text-slate-100 text-left font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold mb-4 text-white">Guides & Tutorials</h1>
          <p className="text-base md:text-lg text-slate-455 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            In‑depth step‑by‑step guides covering everything from cycling water chemistry to advanced planted aquascaping layouts.
          </p>

          {/* Above the Fold CTA */}
          <Link
            href="/start-aquarium"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/25 transition-all tracking-wider uppercase font-poppins cursor-pointer"
          >
            <span>Start Your Setup Guide</span>
            <BookOpen className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
          <Link href="/water-params" className="p-8 bg-slate-950 hover:bg-slate-900 rounded-3xl border border-slate-900 hover:border-blue-500/30 hover:shadow-lg transition-all block group">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">Water Chemistry Guide</h2>
            <p className="text-slate-400 leading-relaxed text-sm font-light">
              Master the science of water quality. Learn how to test, balance, and maintain optimal parameters like pH, ammonia, nitrite, and nitrates for a healthy aquarium.
            </p>
            <span className="inline-block mt-6 text-xs font-bold uppercase tracking-wider text-cyan-455 group-hover:underline">Read Water Guide →</span>
          </Link>
          
          <Link href="/plants" className="p-8 bg-slate-950 hover:bg-slate-900 rounded-3xl border border-slate-900 hover:border-emerald-500/30 hover:shadow-lg transition-all block group">
            <h2 className="text-2xl font-bold mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors">Aquascaping & Plants Guide</h2>
            <p className="text-slate-400 leading-relaxed text-sm font-light">
              Design stunning planted tanks. Discover beginner-friendly low-tech plants, placement layouts (foreground/background), lighting needs, and growth guidelines.
            </p>
            <span className="inline-block mt-6 text-xs font-bold uppercase tracking-wider text-emerald-455 group-hover:underline">Read Plants Guide →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
