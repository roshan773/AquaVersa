'use client';

import { useState, useEffect } from 'react';
import { Ruler, Info, Layers } from "lucide-react";
import TankSizeGuide from "@/components/home/TankSizeGuide";
import AquariumTypes from "@/components/home/AquariumTypes";

export default function TankSizePage() {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [length, setLength] = useState<string>('24');
  const [width, setWidth] = useState<string>('12');
  const [height, setHeight] = useState<string>('16');
  const [gallons, setGallons] = useState<number>(10);
  const [liters, setLiters] = useState<number>(38);

  useEffect(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    if (unit === 'in') {
      const volGallons = (l * w * h) / 231;
      const volLiters = volGallons * 3.78541;
      setGallons(parseFloat(volGallons.toFixed(1)));
      setLiters(parseFloat(volLiters.toFixed(1)));
    } else {
      const volLiters = (l * w * h) / 1000;
      const volGallons = volLiters * 0.264172;
      setGallons(parseFloat(volGallons.toFixed(1)));
      setLiters(parseFloat(volLiters.toFixed(1)));
    }
  }, [length, width, height, unit]);

  return (
    <div className="w-full">
      {/* Header and Interactive Calculator */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 border-b border-slate-900 overflow-hidden px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6 border border-cyan-500/20 shadow-lg">
              <Ruler className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-white">Tank Volume Calculator</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Calculate your aquarium volume instantly by entering your tank's dimensions, and learn how it impacts your stocking choices.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="font-bold text-lg text-slate-200">Dimensions</span>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
                  <button 
                    onClick={() => setUnit('in')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      unit === 'in' ? 'bg-cyan-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button 
                    onClick={() => setUnit('cm')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      unit === 'cm' ? 'bg-cyan-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Length</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono font-bold"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-bold">{unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Width</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono font-bold"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-bold">{unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Height</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono font-bold"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-bold">{unit}</span>
                  </div>
                </div>
              </div>

              {/* Warning box */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left">
                <div className="flex gap-3 text-amber-400 mb-2">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-bold text-sm">Critical Stocking Note</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Aquarium volume is only <strong>one</strong> variable. Real stocking capacity depends on <strong>adult species size, swimming habits, active bioload, filtration turnover rates, and maintenance frequency.</strong> A long/wide tank provides a larger water surface footprint for oxygen exchange than a tall/narrow tank of identical volume.
                </p>
              </div>
            </div>

            {/* Output */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs mb-4">
                  <Layers className="w-4 h-4" /> Calculated Capacity
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-sm font-bold text-slate-400 block mb-1">Volume (US Gallons)</span>
                    <span className="text-5xl md:text-6xl font-poppins font-black text-white leading-none tracking-tight">
                      {gallons} <span className="text-xl md:text-2xl font-bold text-cyan-400">G</span>
                    </span>
                  </div>
                  <div className="border-t border-slate-800 pt-6">
                    <span className="text-sm font-bold text-slate-400 block mb-1">Volume (Metric Litres)</span>
                    <span className="text-4xl md:text-5xl font-poppins font-black text-slate-200 leading-none tracking-tight">
                      {liters} <span className="text-lg md:text-xl font-bold text-cyan-500">L</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-850 pt-4 leading-relaxed text-left">
                *Calculation is based on empty internal volumes. Substrate, rocks, driftwood, and equipment will displace and reduce the actual water volume by 10-20%.
              </div>
            </div>
          </div>
        </div>
      </section>

      <TankSizeGuide />
      <AquariumTypes />
    </div>
  );
}
