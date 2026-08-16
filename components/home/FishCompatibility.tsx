'use client';
import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Thermometer, ShieldAlert, Droplet, Layers, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { fishData } from '@/data/fish';

export default function FishCompatibility() {
  const [fish1, setFish1] = useState(fishData[0].id);
  const [fish2, setFish2] = useState(fishData[1].id);

  const parseRange = (str: string): [number, number] | null => {
    const match = str.match(/([0-9.]+)\s*-\s*([0-9.]+)/) || str.match(/([0-9.]+)\s*–\s*([0-9.]+)/) || str.match(/([0-9.]+)\s*—\s*([0-9.]+)/);
    if (match) {
      return [parseFloat(match[1]), parseFloat(match[2])];
    }
    return null;
  };

  const getCompatibility = (id1: string, id2: string) => {
    if (!id1 || !id2) {
      return {
        status: "Select Species",
        message: "Select two species to check compatibility.",
        colorTheme: "blue"
      };
    }

    const f1 = fishData.find(f => f.id === id1);
    const f2 = fishData.find(f => f.id === id2);

    if (!f1 || !f2) {
      return {
        status: "Select Species",
        message: "Select two species to check compatibility.",
        colorTheme: "blue"
      };
    }

    // 1. Same Species Selection
    if (id1 === id2) {
      const isSchooling = f1.slug === 'neon-tetra' || 
                          f1.slug === 'zebra-danio' || 
                          f1.slug === 'cherry-barb' || 
                          f1.slug === 'harlequin-rasbora' || 
                          f1.slug === 'neon-dwarf-rainbowfish' || 
                          f1.slug === 'pajama-cardinalfish' || 
                          f1.slug === 'banggai-cardinalfish' ||
                          f1.slug === 'corydoras-catfish';
                          
      if (f1.slug === 'betta-fish') {
        return {
          status: '🔴 Not Recommended',
          message: 'Same Species Conflict: Male Bettas are highly territorial and must never be housed together in the same aquarium as they will fight aggressively, often fatally.',
          colorTheme: 'red'
        };
      }

      if (f1.slug?.includes('tang')) {
        return {
          status: '🟠 Use Caution',
          message: 'Same Species Conflict: Marine Tangs are territorial toward their own kind. Keeping multiples of the same species requires an exceptionally large tank (120+ gallons) with ample swimming space and visual barriers.',
          colorTheme: 'orange'
        };
      }

      if (isSchooling) {
        return {
          status: '🟢 Generally Compatible',
          message: `Same Species: Generally compatible. Note that ${f1.name} is a schooling species and must be kept in a group of 6 or more individuals to prevent stress and promote natural behaviors.`,
          colorTheme: 'emerald'
        };
      }

      return {
        status: '🟢 Generally Compatible',
        message: `Same Species: Generally compatible together in pairs, groups, or as individuals depending on tank size and aquarium structure.`,
        colorTheme: 'emerald'
      };
    }

    // Compatibility variables
    let status = '🟢 Generally Compatible';
    let colorTheme: 'emerald' | 'amber' | 'orange' | 'red' | 'blue' = 'emerald';
    const reasons: string[] = [];
    const warnings: string[] = [];

    // 2. Environment Mismatch
    if (f1.category?.toLowerCase() !== f2.category?.toLowerCase()) {
      return {
        status: '🔴 Not Recommended',
        message: `Incompatible environments: ${f1.name} is a ${f1.category} species, whereas ${f2.name} is a ${f2.category} species. Freshwater and marine species cannot coexist in the same tank.`,
        colorTheme: 'red'
      };
    }

    // 3. Temperature Overlap Check
    const temp1 = f1.temperature ? parseRange(f1.temperature) : null;
    const temp2 = f2.temperature ? parseRange(f2.temperature) : null;
    if (temp1 && temp2) {
      const minTemp = Math.max(temp1[0], temp2[0]);
      const maxTemp = Math.min(temp1[1], temp2[1]);
      if (minTemp > maxTemp) {
        return {
          status: '🔴 Not Recommended',
          message: `Temperature mismatch: ${f1.name} requires ${f1.temperature}, while ${f2.name} requires ${f2.temperature}. These species have no suitable temperature range in common.`,
          colorTheme: 'red'
        };
      } else if (maxTemp - minTemp < 2) {
        status = '🟡 Usually Compatible with Conditions';
        colorTheme = 'amber';
        reasons.push(`Narrow temperature range overlap of ${minTemp}–${maxTemp}°F.`);
        warnings.push(`Maintain water temperature strictly between ${minTemp}°F and ${maxTemp}°F.`);
      }
    }

    // 4. pH Overlap Check
    const ph1 = f1.ph ? parseRange(f1.ph) : null;
    const ph2 = f2.ph ? parseRange(f2.ph) : null;
    if (ph1 && ph2) {
      const minPh = Math.max(ph1[0], ph2[0]);
      const maxPh = Math.min(ph1[1], ph2[1]);
      if (minPh > maxPh) {
        const gap = minPh - maxPh;
        if (gap > 0.5) {
          status = '🔴 Not Recommended';
          colorTheme = 'red';
          reasons.push(`Severe pH parameter mismatch: ${f1.name} prefers a pH of ${f1.ph}, while ${f2.name} prefers a pH of ${f2.ph}.`);
        } else {
          status = '🟠 Use Caution';
          colorTheme = 'orange';
          reasons.push(`pH range mismatch: ${f1.name} prefers a pH of ${f1.ph}, while ${f2.name} prefers a pH of ${f2.ph}. Keeping them together will cause chronic osmotic stress to one or both species.`);
        }
      } else if (maxPh - minPh < 0.4) {
        if (status === '🟢 Generally Compatible') {
          status = '🟡 Usually Compatible with Conditions';
          colorTheme = 'amber';
        }
        reasons.push(`Limited pH range overlap (${minPh.toFixed(1)}–${maxPh.toFixed(1)}).`);
      }
    }

    // 5. Size and Predation Mismatch
    const f1Max = f1.maxSize || 0;
    const f2Max = f2.maxSize || 0;
    const largeFish = f1Max >= f2Max ? f1 : f2;
    const smallFish = f1Max >= f2Max ? f2 : f1;
    const largeSize = Math.max(f1Max, f2Max);
    const smallSize = Math.min(f1Max, f2Max);
    const sizeRatio = smallSize > 0 ? largeSize / smallSize : 1;

    // Check for predator risk (carnivorous/omnivorous large fish vs small fish)
    const isCarnivorousPredator = largeFish.diet === 'Carnivore' || 
                                  largeFish.diet?.includes('Carnivore') || 
                                  largeFish.diet === 'Omnivore' || 
                                  largeFish.diet?.includes('Omnivore');
    
    if (isCarnivorousPredator && sizeRatio >= 4 && smallSize <= 3.0) {
      return {
        status: '🔴 Not Recommended',
        message: `Predation hazard: ${largeFish.name} grows to a large size of ${largeSize} inches and will likely swallow the small ${smallFish.name} (${smallSize} inches) as it matures. Large predatory fish naturally consume smaller tankmates that fit in their mouths.`,
        colorTheme: 'red'
      };
    } else if (sizeRatio >= 3.0 && smallSize <= 2.5) {
      if (status !== '🔴 Not Recommended') {
        status = '🟠 Use Caution';
        colorTheme = 'orange';
      }
      reasons.push(`Significant size difference: ${largeFish.name} (${largeSize} inches) is much larger than ${smallFish.name} (${smallSize} inches), which presents a risk of chasing or ingestion.`);
    }

    // 6. Explicit Compatibility Mapping
    const slug1 = f1.slug || "";
    const slug2 = f2.slug || "";
    const isExplicitlyCompatible = 
      (f1.compatibleWith && f1.compatibleWith.includes(slug2)) || 
      (f2.compatibleWith && f2.compatibleWith.includes(slug1));

    // 7. Specific Aggression / Behaviors
    const hasBetta = slug1 === 'betta-fish' || slug2 === 'betta-fish';
    if (hasBetta) {
      const betta = slug1 === 'betta-fish' ? f1 : f2;
      const other = slug1 === 'betta-fish' ? f2 : f1;
      
      if (other.slug === 'guppy') {
        return {
          status: '🔴 Not Recommended',
          message: 'Behavioral conflict: Male Bettas are territorial and can be triggered by colorful, long-finned fish like Guppies, often leading to persistent aggression and fin damage.',
          colorTheme: 'red'
        };
      } else if (other.slug === 'neon-tetra') {
        status = '🟠 Use Caution';
        colorTheme = 'orange';
        reasons.push(`Betta aggression warning: Bettas are highly territorial. Neon Tetras are active schoolers that may nip fins, or the Betta may chase them depending on individual temperament.`);
        warnings.push("Ensure the tank has dense planting and plenty of cover to break lines of sight.");
      } else if (other.slug === 'corydoras-catfish' || other.slug === 'sucker-fish' || other.slug === 'harlequin-rasbora') {
        if (status === '🟢 Generally Compatible') {
          status = '🟡 Usually Compatible with Conditions';
          colorTheme = 'amber';
        }
        reasons.push(`Bettas generally ignore peaceful bottom-dwellers like ${other.name} or quiet midwater schoolers.`);
        warnings.push("Provide caves/plants, and monitor the Betta's individual behavior closely.");
      } else {
        if (other.temperament !== 'Peaceful') {
          return {
            status: '🔴 Not Recommended',
            message: `Territorial warning: Housing a solitary Betta with another semi-aggressive/aggressive species like ${other.name} will likely result in severe territorial fighting.`,
            colorTheme: 'red'
          };
        } else {
          status = '🟠 Use Caution';
          colorTheme = 'orange';
          reasons.push("Bettas are solitary and territorial. Mixing them with other community fish always carries a risk of aggression.");
        }
      }
    }

    // Angelfish vs Neon Tetra
    const hasAngelfish = slug1 === 'angelfish' || slug2 === 'angelfish';
    const hasNeonTetra = slug1 === 'neon-tetra' || slug2 === 'neon-tetra';
    if (hasAngelfish && hasNeonTetra) {
      return {
        status: '🔴 Not Recommended',
        message: 'Predation hazard: Adult Angelfish are natural predators of Neon Tetras in the wild. While young Angelfish may coexist briefly, mature Angelfish will swallow small, slender fish like Neon Tetras.',
        colorTheme: 'red'
      };
    }

    // Goldfish vs Tropical Fish
    const isGoldfish1 = slug1.includes('goldfish');
    const isGoldfish2 = slug2.includes('goldfish');
    if ((isGoldfish1 && !isGoldfish2) || (isGoldfish2 && !isGoldfish1)) {
      const goldfish = isGoldfish1 ? f1 : f2;
      const tropical = isGoldfish1 ? f2 : f1;
      return {
        status: '🔴 Not Recommended',
        message: `Husbandry mismatch: ${goldfish.name} is a coldwater/subtropical fish that requires lower temperatures and creates high bioloads, whereas ${tropical.name} is a tropical fish requiring higher water temperatures and stable environments.`,
        colorTheme: 'red'
      };
    }

    // Tang vs Tang
    const isTang1 = slug1.includes('tang');
    const isTang2 = slug2.includes('tang');
    if (isTang1 && isTang2) {
      status = '🟠 Use Caution';
      colorTheme = 'orange';
      reasons.push("Intra-species conflict: Marine Tangs are highly aggressive toward other Tangs of similar shape or species. Keeping them together requires a large tank (120+ Gallons) with multiple grazing spots.");
    }

    // 8. General Temperament Compatibility Mapping (Fallback if not overridden)
    if (status !== '🔴 Not Recommended') {
      const t1 = f1.temperament;
      const t2 = f2.temperament;

      if ((t1 === 'Aggressive' && t2 === 'Peaceful') || (t2 === 'Aggressive' && t1 === 'Peaceful')) {
        const aggr = t1 === 'Aggressive' ? f1 : f2;
        const peaceful = t1 === 'Aggressive' ? f2 : f1;
        return {
          status: '🔴 Not Recommended',
          message: `Temperament clash: Highly aggressive territory-holders like ${aggr.name} will constantly bully, injure, or stress peaceful community species like ${peaceful.name}.`,
          colorTheme: 'red'
        };
      } else if (t1 === 'Aggressive' && t2 === 'Aggressive') {
        if (colorTheme !== 'orange') {
          status = '🟠 Use Caution';
          colorTheme = 'orange';
        }
        reasons.push("Double Aggression warning: Both species are aggressive territory holders. Coexistence requires a very large tank with clear territorial visual barriers.");
      } else if ((t1 === 'Semi-Aggressive' && t2 === 'Peaceful') || (t2 === 'Semi-Aggressive' && t1 === 'Peaceful')) {
        const semi = t1 === 'Semi-Aggressive' ? f1 : f2;
        const peaceful = t1 === 'Semi-Aggressive' ? f2 : f1;
        if (isExplicitlyCompatible) {
          status = '🟡 Usually Compatible with Conditions';
          colorTheme = 'amber';
          reasons.push(`Standard compatibility: The semi-aggressive ${semi.name} is generally compatible with the peaceful ${peaceful.name} when kept with proper school sizes and hiding spaces.`);
        } else {
          status = '🟠 Use Caution';
          colorTheme = 'orange';
          reasons.push(`Behavioral risk: The semi-aggressive ${semi.name} may chase, bully, or nip the fins of the peaceful ${peaceful.name}.`);
        }
      }
    }

    // Schooling warning note
    const schooling1 = f1.slug === 'neon-tetra' || f1.slug === 'zebra-danio' || f1.slug === 'cherry-barb' || f1.slug === 'harlequin-rasbora' || f1.slug === 'neon-dwarf-rainbowfish' || f1.slug === 'corydoras-catfish';
    const schooling2 = f2.slug === 'neon-tetra' || f2.slug === 'zebra-danio' || f2.slug === 'cherry-barb' || f2.slug === 'harlequin-rasbora' || f2.slug === 'neon-dwarf-rainbowfish' || f2.slug === 'corydoras-catfish';
    
    if (schooling1) {
      warnings.push(`Keep ${f1.name} in an appropriate group (minimum 6) to reduce stress and support schooling.`);
    }
    if (schooling2) {
      warnings.push(`Keep ${f2.name} in an appropriate group (minimum 6) to reduce stress and support schooling.`);
    }

    // Tank Size logic
    let recommendedTank = Math.max(f1.minTankSize || 0, f2.minTankSize || 0);
    // Add extra bioload buffer
    const totalMax = (f1.maxSize || 0) + (f2.maxSize || 0);
    if (totalMax > 15) {
      recommendedTank += 20;
    } else if (totalMax > 6) {
      recommendedTank += 10;
    } else {
      recommendedTank += 5;
    }
    
    reasons.push(`A combined tank size of at least ${recommendedTank} gallons is recommended to support their swimming spaces and biological filtration.`);

    // Fallback default reasons
    if (reasons.length === 0) {
      reasons.push("Both species share matching water environments, temperature overlaps, pH ranges, and peaceful temperaments.");
    }

    // Build final message
    let finalMessage = reasons.join(" ");
    if (warnings.length > 0) {
      finalMessage += " NOTE: " + warnings.join(" ");
    }

    return {
      status,
      message: finalMessage,
      colorTheme
    };
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
    orange: {
      border: 'border-orange-500/40',
      glow: 'shadow-[0_0_25px_rgba(249,115,22,0.25)]',
      bg: 'bg-orange-950/20 dark:bg-orange-950/30 border-orange-500/20',
      text: 'text-orange-400',
      icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
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
  }[compResult.colorTheme as 'emerald' | 'amber' | 'orange' | 'red' | 'blue'];

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
                  <Image src={f1Data.image} alt={f1Data.name} fill className="object-cover scale-105" sizes="144px" />
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
                  <Image src={f2Data.image} alt={f2Data.name} fill className="object-cover scale-105" sizes="144px" />
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
