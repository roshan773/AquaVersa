"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";

export default function BuildEcosystem() {
  const [tankSize, setTankSize] = useState("10 Gallons");
  const [light, setLight] = useState("Low");

  return (
    <section className="py-24 bg-slate-900 text-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Build Your Ecosystem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Not sure which plants work for your setup? Tell us your parameters and we'll recommend the perfect aquatic flora.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Controls */}
          <div className="glass p-8 rounded-3xl border border-slate-700/50 bg-slate-800/50">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold mb-4 text-slate-300">Tank Size</label>
                <div className="flex flex-wrap gap-3">
                  {["5 Gallons", "10 Gallons", "20 Gallons", "55+ Gallons"].map(size => (
                    <button 
                      key={size}
                      onClick={() => setTankSize(size)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        tankSize === size 
                          ? "bg-cyan-500 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                          : "bg-slate-900/50 text-slate-400 border border-slate-700 hover:border-cyan-500/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-4 text-slate-300">Lighting Level</label>
                <div className="flex flex-wrap gap-3">
                  {["Low", "Medium", "High"].map(l => (
                    <button 
                      key={l}
                      onClick={() => setLight(l)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        light === l 
                          ? "bg-cyan-500 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                          : "bg-slate-900/50 text-slate-400 border border-slate-700 hover:border-cyan-500/50"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">3</span>
              Recommended Plants
            </h3>
            
            <div className="grid gap-4">
              {[
                { name: "Anubias Nana", desc: "Extremely hardy, attaches to rocks", diff: "Easy" },
                { name: "Java Fern", desc: "Low light tolerant, doesn't need soil", diff: "Easy" },
                { name: "Amazon Sword", desc: "Large background plant, fast growing", diff: "Intermediate" }
              ].map((p, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800/60 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden relative shrink-0">
                    <Image 
                      src="/images/java_fern.png" 
                      alt={p.name}
                      fill
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-50 flex items-center gap-2">
                      {p.name}
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-700">{p.diff}</span>
                    </h4>
                    <p className="text-sm text-slate-400 mt-1">{p.desc}</p>
                  </div>
                  <div className="ml-auto flex items-center pr-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
