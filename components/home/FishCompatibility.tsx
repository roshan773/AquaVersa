'use client';

import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { fishData } from '@/data/fish';

export default function FishCompatibility() {
  const [fish1, setFish1] = useState(fishData[0].id);
  const [fish2, setFish2] = useState(fishData[1].id);

  // Parse numeric ranges such as "72-78°F", "72 – 78°F", or "6.5-7.5".
  const parseRange = (value?: string): [number, number] | null => {
    if (!value) return null;
    const matches = value.match(/(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)/i);
    if (!matches) return null;
    const a = Number(matches[1]);
    const b = Number(matches[2]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
    return [Math.min(a, b), Math.max(a, b)];
  };

  type CompatibilityResult = {
    status: string;
    message: string;
    level: 'compatible' | 'caution' | 'incompatible';
  };

  const getCompatibility = (id1: string, id2: string): CompatibilityResult => {
    const f1 = fishData.find((f) => f.id === id1);
    const f2 = fishData.find((f) => f.id === id2);

    if (!f1 || !f2) {
      return {
        status: 'Select Species',
        message: 'Choose two fish species above to evaluate their compatibility.',
        level: 'caution',
      };
    }

    if (f1.id === f2.id) {
      return {
        status: 'Same Species Selected',
        message: `Evaluating multiple ${f1.name} individuals. Schooling fish thrive in groups of 6+, while territorial species (like male Bettas) must be housed individually.`,
        level: f1.temperament?.toLowerCase().includes('peaceful') ? 'compatible' : 'caution',
      };
    }

    // 1. Habitat Check (Freshwater vs Saltwater)
    if (f1.category !== f2.category) {
      return {
        status: 'Incompatible Habitat',
        message: `${f1.name} is a ${f1.category} species, while ${f2.name} is a ${f2.category} species. They cannot share the same aquatic environment due to fundamental salinity differences.`,
        level: 'incompatible',
      };
    }

    // 2. Temperature Overlap
    const temp1 = parseRange(f1.temperature);
    const temp2 = parseRange(f2.temperature);
    let tempOverlap = true;
    if (temp1 && temp2) {
      tempOverlap = !(temp1[1] < temp2[0] || temp2[1] < temp1[0]);
    }

    // 3. pH Overlap
    const ph1 = parseRange(f1.ph);
    const ph2 = parseRange(f2.ph);
    let phOverlap = true;
    if (ph1 && ph2) {
      phOverlap = !(ph1[1] < ph2[0] || ph2[1] < ph1[0]);
    }

    if (!tempOverlap || !phOverlap) {
      return {
        status: 'Water Parameter Mismatch',
        message: `Water chemistry differences detected. ${f1.name} requires (${f1.temperature}, pH ${f1.ph}) while ${f2.name} requires (${f2.temperature}, pH ${f2.ph}).`,
        level: 'caution',
      };
    }

    // 4. Temperament Check
    const agg1 = f1.temperament?.toLowerCase().includes('aggressive') || f1.temperament?.toLowerCase().includes('territorial');
    const agg2 = f2.temperament?.toLowerCase().includes('aggressive') || f2.temperament?.toLowerCase().includes('territorial');
    const peace1 = f1.temperament?.toLowerCase().includes('peaceful');
    const peace2 = f2.temperament?.toLowerCase().includes('peaceful');

    if ((agg1 && peace2) || (agg2 && peace1)) {
      return {
        status: 'Temperament Conflict Possible',
        message: `One species has territorial or semi-aggressive tendencies while the other is peaceful. Ensure sufficient tank volume and visual breaks, or consider alternative tankmates.`,
        level: 'caution',
      };
    }

    return {
      status: 'Favorable Compatibility Match',
      message: `${f1.name} and ${f2.name} share compatible water chemistry (${f1.temperature}, pH range), environmental parameters, and manageable social temperaments.`,
      level: 'compatible',
    };
  };

  const compResult = getCompatibility(fish1, fish2);
  const f1Data = fishData.find((f) => f.id === fish1) || fishData[0];
  const f2Data = fishData.find((f) => f.id === fish2) || fishData[1];

  return (
    <section className="py-24 bg-[#27187e] text-[#f7f7ff] relative overflow-hidden text-left">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-condensed font-bold uppercase tracking-widest text-[#f7f7ff]/70 mb-2 block">
            INTERACTIVE TOOL
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#f7f7ff] tracking-wide">
            FISH COMPATIBILITY CHECKER
          </h2>
          <p className="text-base text-[#f7f7ff]/80 font-normal max-w-2xl mt-2 font-sans">
            Compare two fish to see how they may match in terms of water parameters, temperament, tank size and care requirements.
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-[#1f1366] border border-[#3b28ab] rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* 2-Fish Matchup */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center">
            
            {/* Fish 1 */}
            <div className="md:col-span-3 flex flex-col items-center text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-5 border-4 border-[#f7f7ff]/20 bg-[#27187e] relative shadow-lg">
                <Image
                  src={f1Data.image}
                  alt={f1Data.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>

              <label className="text-xs uppercase font-condensed font-bold tracking-widest text-[#f7f7ff]/70 mb-2 block">
                Select Species 1
              </label>

              <select
                value={fish1}
                onChange={(e) => setFish1(e.target.value)}
                className="w-full max-w-xs bg-[#27187e] border border-[#3b28ab] rounded-xl px-4 py-3 text-sm text-[#f7f7ff] font-sans focus:outline-none focus:ring-2 focus:ring-[#f7f7ff]/50 transition-colors"
              >
                {fishData.map((f) => (
                  <option key={f.id} value={f.id} className="bg-[#27187e] text-[#f7f7ff]">
                    {f.name} ({f.category})
                  </option>
                ))}
              </select>
            </div>

            {/* VS Badge */}
            <div className="md:col-span-1 flex justify-center py-2 md:py-0">
              <div className="w-14 h-14 rounded-full bg-[#27187e] border-2 border-[#f7f7ff]/30 flex items-center justify-center font-display text-2xl text-[#f7f7ff] shadow-md">
                VS
              </div>
            </div>

            {/* Fish 2 */}
            <div className="md:col-span-3 flex flex-col items-center text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-5 border-4 border-[#f7f7ff]/20 bg-[#27187e] relative shadow-lg">
                <Image
                  src={f2Data.image}
                  alt={f2Data.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>

              <label className="text-xs uppercase font-condensed font-bold tracking-widest text-[#f7f7ff]/70 mb-2 block">
                Select Species 2
              </label>

              <select
                value={fish2}
                onChange={(e) => setFish2(e.target.value)}
                className="w-full max-w-xs bg-[#27187e] border border-[#3b28ab] rounded-xl px-4 py-3 text-sm text-[#f7f7ff] font-sans focus:outline-none focus:ring-2 focus:ring-[#f7f7ff]/50 transition-colors"
              >
                {fishData.map((f) => (
                  <option key={f.id} value={f.id} className="bg-[#27187e] text-[#f7f7ff]">
                    {f.name} ({f.category})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Compatibility Guidance Status Banner */}
          <div className="mt-10 rounded-2xl p-6 bg-[#27187e] border border-[#3b28ab] flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#1f1366] border border-[#3b28ab] flex items-center justify-center shrink-0 text-[#f7f7ff]">
              {compResult.level === 'compatible' && <CheckCircle2 className="w-6 h-6 text-[#f7f7ff]" />}
              {compResult.level === 'caution' && <AlertTriangle className="w-6 h-6 text-[#f7f7ff]" />}
              {compResult.level === 'incompatible' && <XCircle className="w-6 h-6 text-[#f7f7ff]" />}
            </div>

            <div>
              <h3 className="text-2xl font-display font-normal text-[#f7f7ff] tracking-wide mb-1">
                {compResult.status}
              </h3>
              <p className="text-sm text-[#f7f7ff]/80 font-sans leading-relaxed">
                {compResult.message}
              </p>
            </div>
          </div>

          {/* Species Parameters Matchup */}
          <div className="mt-10 pt-8 border-t border-[#3b28ab]">
            <h4 className="text-xl font-display font-normal text-[#f7f7ff] mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#f7f7ff]/70" />
              <span>PARAMETER BREAKDOWN</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Fish 1 Card */}
              <div className="bg-[#27187e] border border-[#3b28ab] p-5 rounded-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3b28ab]">
                  <span className="text-xs font-condensed font-bold uppercase tracking-wider text-[#f7f7ff]/70">Species 1</span>
                  <span className="font-display text-lg text-[#f7f7ff]">{f1Data.name}</span>
                </div>
                
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">Environment</span>
                    <span className="text-[#f7f7ff] font-medium">{f1Data.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">Temperament</span>
                    <span className="text-[#f7f7ff] font-medium">{f1Data.temperament || 'Peaceful'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">Temperature</span>
                    <span className="text-[#f7f7ff] font-medium">{f1Data.temperature}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">pH Range</span>
                    <span className="text-[#f7f7ff] font-medium">{f1Data.ph}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#f7f7ff]/70">Min Tank Size</span>
                    <span className="text-[#f7f7ff] font-medium">{f1Data.minTankSize} Gallons</span>
                  </div>
                </div>
              </div>

              {/* Fish 2 Card */}
              <div className="bg-[#27187e] border border-[#3b28ab] p-5 rounded-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3b28ab]">
                  <span className="text-xs font-condensed font-bold uppercase tracking-wider text-[#f7f7ff]/70">Species 2</span>
                  <span className="font-display text-lg text-[#f7f7ff]">{f2Data.name}</span>
                </div>
                
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">Environment</span>
                    <span className="text-[#f7f7ff] font-medium">{f2Data.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">Temperament</span>
                    <span className="text-[#f7f7ff] font-medium">{f2Data.temperament || 'Peaceful'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">Temperature</span>
                    <span className="text-[#f7f7ff] font-medium">{f2Data.temperature}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#3b28ab]/50">
                    <span className="text-[#f7f7ff]/70">pH Range</span>
                    <span className="text-[#f7f7ff] font-medium">{f2Data.ph}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#f7f7ff]/70">Min Tank Size</span>
                    <span className="text-[#f7f7ff] font-medium">{f2Data.minTankSize} Gallons</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="mt-8 pt-6 border-t border-[#3b28ab] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#f7f7ff]/70 font-sans">
              * Compatibility ratings provide general educational guidance. Individual fish behavior depends on tank dimensions, cover, and feeding routines.
            </p>
            <Link
              href="/compatibility"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f7f7ff] hover:bg-[#edeafc] text-[#27187e] text-xs font-condensed font-bold uppercase tracking-wider transition-all shrink-0"
            >
              <span>Full Compatibility Tool</span>
              <ArrowRight className="w-4 h-4 text-[#27187e]" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}