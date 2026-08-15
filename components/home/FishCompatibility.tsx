'use client';
import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Thermometer, ShieldAlert, Droplet, Layers, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { fishData } from '@/data/fish';

export default function FishCompatibility() {
  const [fish1, setFish1] = useState(fishData[0].id);
  const [fish2, setFish2] = useState(fishData[1].id);

  const getCompatibility = (id1: string, id2: string) => {
    if (id1 === id2) return { status: 'Compatible', message: 'Same species. Generally compatible together in groups or pairs.', colorTheme: 'emerald' };
    
    const f1 = fishData.find(f => f.id === id1);
    const f2 = fishData.find(f => f.id === id2);
    
    if (!f1 || !f2) return { status: 'Unknown', message: 'Select two fish.', colorTheme: 'blue' };

    // Water type check
    if (f1.category !== f2.category) {
      return { status: 'Incompatible', message: `${f1.name} is ${f1.category}, while ${f2.name} is ${f2.category}. They cannot survive in the same water.`, colorTheme: 'red' };
    }

    // Size / Predator check (Angelfish eat small tetras)
    if ((f1.name.includes('Angelfish') && f2.name.includes('Tetra') && !f2.name.includes('Cardinal')) || 
        (f2.name.includes('Angelfish') && f1.name.includes('Tetra') && !f1.name.includes('Cardinal'))) {
      return { status: 'Incompatible', message: 'Angelfish will eat small, slender fish like Neon Tetras as they grow.', colorTheme: 'red' };
    }

    // Betta logic
    const hasBetta = f1.name.includes('Betta') || f2.name.includes('Betta');
    if (hasBetta) {
      const other = f1.name.includes('Betta') ? f2 : f1;
      if (other.name.includes('Guppy')) {
        return { status: 'Incompatible', message: 'Bettas may attack colorful, long-finned fish like Guppies.', colorTheme: 'red' };
      }
      if (other.name.includes('Corydoras')) {
        return { status: 'Compatible', message: 'Corydoras are peaceful bottom-dwellers that Bettas usually ignore.', colorTheme: 'emerald' };
      }
      return { status: 'Warning', message: 'Bettas are highly territorial. Keep them alone or monitor them very closely with other fish.', colorTheme: 'amber' };
    }

    // Tangs logic
    const isTang1 = f1.name.includes('Tang');
    const isTang2 = f2.name.includes('Tang');
    if (isTang1 && isTang2) {
      return { status: 'Warning', message: 'Tangs can be highly aggressive toward other Tangs. Requires a very large tank.', colorTheme: 'amber' };
    }

    if (f1.difficulty === 'Advanced' || f2.difficulty === 'Advanced') {
      return { status: 'Warning', message: 'One or more of these fish require advanced care and pristine water conditions.', colorTheme: 'amber' };
    }
    
    return { status: 'Compatible', message: 'Generally peaceful together in an appropriately sized tank.', colorTheme: 'emerald' };
  };

  const compResult = getCompatibility(fish1, fish2);
  const f1Data = fishData.find(f => f.id === fish1)!;
  const f2Data = fishData.find(f => f.id === fish2)!;

  // Class mapping for dynamic borders and shadows based on result color theme
  const themeClasses = {
    emerald: {
      border: 'border-emerald-500/40',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      bg: 'bg-emerald-950/20 dark:bg-emerald-950/30 border-emerald-500/20',
      text: 'text-emerald-400',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
    },
    amber: {
      border: 'border-amber-500/40',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      bg: 'bg-amber-950/20 dark:bg-amber-950/30 border-amber-500/20',
      text: 'text-amber-400',
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    },
    red: {
      border: 'border-red-500/40',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.25)]',
      bg: 'bg-red-950/20 dark:bg-red-950/30 border-red-500/20',
      text: 'text-red-400',
      icon: <XCircle className="w-6 h-6 text-red-400" />,
    },
    blue: {
      border: 'border-blue-500/40',
      glow: 'shadow-[0_0_25px_rgba(59,130,246,0.25)]',
      bg: 'bg-blue-950/20 dark:bg-blue-950/30 border-blue-500/20',
      text: 'text-blue-400',
      icon: <Info className="w-6 h-6 text-blue-400" />,
    },
  }[compResult.colorTheme as 'emerald' | 'amber' | 'red' | 'blue'];

  return (
    <section className="py-24 bg-slate-950/10 dark:bg-slate-950/40 border-b border-slate-900/80">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold mb-4 border border-cyan-500/20">
            <ShieldAlert className="w-4 h-4" /> Compatibility Tool
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
            Fish Compatibility Checker
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ensure your fish co-exist peacefully. Select two species to verify water chemistry, size compatibility, and temperaments.
          </p>
        </div>

        <div className="bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Main matchup grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center relative z-10">
            
            {/* Fish 1 Column */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className={`w-36 h-36 rounded-full overflow-hidden mb-6 border-4 bg-slate-950 relative transition-all duration-500 ${themeClasses.border} ${themeClasses.glow}`}>
                {f1Data?.image ? (
                  <Image src={f1Data.image} alt={f1Data.name} fill className="object-cover scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
                )}
              </div>
              <label className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2 block">Select Species 1</label>
              <select 
                value={fish1} 
                onChange={(e) => setFish1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-slate-700 transition-colors"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.category})</option>
                ))}
              </select>
            </div>

            {/* VS Badge */}
            <div className="md:col-span-1 flex justify-center py-4 md:py-0">
              <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-lg font-extrabold text-cyan-400 shadow-md">
                VS
              </div>
            </div>

            {/* Fish 2 Column */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className={`w-36 h-36 rounded-full overflow-hidden mb-6 border-4 bg-slate-950 relative transition-all duration-500 ${themeClasses.border} ${themeClasses.glow}`}>
                {f2Data?.image ? (
                  <Image src={f2Data.image} alt={f2Data.name} fill className="object-cover scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
                )}
              </div>
              <label className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2 block">Select Species 2</label>
              <select 
                value={fish2} 
                onChange={(e) => setFish2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-slate-700 transition-colors"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.category})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Compatibility Status Banner */}
          <div className={`mt-10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 border transition-all duration-500 ${themeClasses.bg}`}>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shadow-md shrink-0">
              {themeClasses.icon}
            </div>
            <div className="text-center md:text-left">
              <h3 className={`text-2xl font-bold font-poppins mb-1.5 ${themeClasses.text}`}>
                {compResult.status}
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {compResult.message}
              </p>
            </div>
          </div>

          {/* Parameters Comparison Section */}
          <div className="mt-12 border-t border-slate-800/80 pt-8">
            <h4 className="text-lg font-bold font-poppins text-slate-200 mb-6 text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
              <Layers className="w-5 h-5 text-cyan-400" /> Species Parameters Matchup
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Fish 1 details */}
              <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/50">
                  <span className="text-xs uppercase font-bold px-2 py-1 rounded bg-cyan-500/10 text-cyan-400">Species 1</span>
                  <span className="text-base font-bold text-slate-200">{f1Data.name}</span>
                </div>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Environment</span>
                    <span className="font-semibold text-slate-200">{f1Data.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Temperament</span>
                    <span className="font-semibold text-slate-200">{f1Data.temperament || 'Community'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Temperature</span>
                    <span className="font-semibold text-slate-200">{f1Data.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">pH Level</span>
                    <span className="font-semibold text-slate-200">{f1Data.ph}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Min Tank Size</span>
                    <span className="font-semibold text-slate-200">{f1Data.minTankSize} Gallons</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Care Difficulty</span>
                    <span className="font-semibold text-slate-200">{f1Data.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Fish 2 details */}
              <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/50">
                  <span className="text-xs uppercase font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400">Species 2</span>
                  <span className="text-base font-bold text-slate-200">{f2Data.name}</span>
                </div>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Environment</span>
                    <span className={`font-semibold ${f1Data.category !== f2Data.category ? 'text-red-400 font-bold' : 'text-slate-200'}`}>
                      {f2Data.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Temperament</span>
                    <span className="font-semibold text-slate-200">{f2Data.temperament || 'Community'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Temperature</span>
                    <span className="font-semibold text-slate-200">{f2Data.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">pH Level</span>
                    <span className="font-semibold text-slate-200">{f2Data.ph}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Min Tank Size</span>
                    <span className="font-semibold text-slate-200">{f2Data.minTankSize} Gallons</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Care Difficulty</span>
                    <span className="font-semibold text-slate-200">{f2Data.difficulty}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
