'use client';

import { Waves, Mail, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 flex items-center">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6 border border-cyan-500/20 shadow-lg">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-white">Get in Touch</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions, ideas, or noticed a data error? Reach out to us. We love collaborating with the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-850 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-cyan-400 font-poppins">Direct Support</h2>
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <a href="mailto:pakhreroshan@gmail.com" className="hover:text-cyan-400 transition-colors">
                    pakhreroshan@gmail.com
                  </a>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-6">
                <h2 className="text-xl font-bold text-cyan-400 font-poppins">Join Our Community</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Discuss tank builds and parameters on Discord: <br/>
                  <a href="https://discord.gg/aquaguide" className="underline hover:text-cyan-300 font-bold block mt-1">discord.gg/aquaguide</a>
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-6">
                <h2 className="text-xl font-bold text-cyan-400 font-poppins">Follow Us</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Stay updated via <a href="https://instagram.com/aquaguide" className="underline hover:text-cyan-300">Instagram</a> and <a href="https://twitter.com/aquaguide" className="underline hover:text-cyan-300">Twitter</a> for daily care tips.
                </p>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-6 text-xs text-slate-500">
              <p>
                AquaGuide Team<br/>
                123 Ocean Drive<br/>
                Seaside, CA 94000<br/>
                USA
              </p>
            </div>
          </div>

          {/* Inaccuracy Submission Notice Card */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold uppercase tracking-wider text-sm border-b border-slate-800 pb-3">
                <ShieldAlert className="w-5 h-5 text-cyan-400" /> Report Data Inaccuracy
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Aquarium husbandry is an evolving science. If you notice any incorrect species guidelines, inaccurate water parameters, or outdated equipment specifications in our database, please let us know!
              </p>

              <div className="bg-slate-950/80 border border-slate-850 p-6 rounded-2xl space-y-4">
                <p className="text-slate-300 text-xs leading-relaxed">
                  To submit an inaccuracy record, please send an email directly to:
                </p>
                <div className="text-center py-2 bg-slate-900 border border-slate-800 rounded-xl">
                  <a 
                    href="mailto:pakhreroshan@gmail.com?subject=AquaGuide Inaccuracy Report" 
                    className="font-poppins font-bold text-lg text-cyan-400 hover:text-cyan-300 hover:underline transition-all block"
                  >
                    pakhreroshan@gmail.com
                  </a>
                </div>
                
                <div className="space-y-2 pt-2">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Please include in your email:</p>
                  <ul className="text-slate-300 text-xs space-y-2 list-disc list-inside">
                    <li>The species or item name (e.g. Neon Tetra, Java Fern)</li>
                    <li>The incorrect detail currently displayed on the website</li>
                    <li>Your suggested correction or data change</li>
                    <li>Any reference or scientific source link (optional)</li>
                  </ul>
                </div>
              </div>

              <a 
                href="mailto:pakhreroshan@gmail.com?subject=AquaGuide Inaccuracy Report"
                className="inline-flex w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all shadow-md shadow-cyan-500/10 text-sm justify-center items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Email Inaccuracy Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
