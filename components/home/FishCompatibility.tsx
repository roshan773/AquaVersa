'use client';
import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Layers, ShieldAlert, Droplet, Thermometer } from 'lucide-react';
import Image from 'next/image';
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
    colorTheme: 'emerald' | 'amber' | 'orange' | 'red' | 'blue';
  };

  type SocialType =
    | 'schooling'
    | 'small-school'
    | 'solitary-territorial'
    | 'pair-territorial'
    | 'territorial'
    | 'community';

  const socialTraits: Record<string, SocialType> = {
    'neon-tetra': 'schooling',
    'zebra-danio': 'schooling',
    'cherry-barb': 'schooling',
    'harlequin-rasbora': 'schooling',
    'neon-dwarf-rainbowfish': 'schooling',
    'corydoras-catfish': 'schooling',
    'pajama-cardinalfish': 'small-school',

    'betta-fish': 'solitary-territorial',
    'royal-gramma': 'solitary-territorial',
    'yellow-watchman-goby': 'solitary-territorial',
    'firefish-goby': 'solitary-territorial',
    'mandarinfish': 'solitary-territorial',

    'kribensis-cichlid': 'pair-territorial',
    'angelfish': 'territorial',
    'oscar': 'territorial',
    'yellow-tang': 'territorial',
    'blue-hippo-tang': 'territorial',
    'flame-angelfish': 'territorial',
    'coral-beauty': 'territorial',
    'kole-yellow-eye-tang': 'territorial',
    'banggai-cardinalfish': 'territorial',
    'arowana': 'territorial',

    'guppy': 'community',
    'molly': 'community',
    'discus': 'community',
    'ocellaris-clownfish': 'community',
    'sucker-fish': 'community',
  };

  const knownPredatorySpecies = new Set([
    'oscar',
    'arowana',
  ]);

  const sameSpeciesWarning = (fish: typeof fishData[number]): CompatibilityResult => {
    const social = socialTraits[fish.slug || ''];

    if (fish.slug === 'betta-fish') {
      return {
        status: '🟠 Use Caution',
        message:
          'Same Species: Do not assume two Bettas can share an aquarium. Male Bettas are strongly territorial and should not be housed together; sex, individual temperament, and breeding plans matter.',
        colorTheme: 'orange',
      };
    }

    if (fish.slug === 'royal-gramma') {
      return {
        status: '🔴 Not Recommended',
        message:
          'Same Species: Royal Grammas are territorial toward their own kind and are normally best kept singly unless a known compatible pair is being maintained in a suitably sized aquarium.',
        colorTheme: 'red',
      };
    }

    if (fish.slug === 'yellow-watchman-goby') {
      return {
        status: '🔴 Not Recommended',
        message:
          'Same Species: Yellow Watchman Gobies are territorial and can fight with their own kind unless they are a compatible/mated pair.',
        colorTheme: 'red',
      };
    }

    if (fish.slug === 'firefish-goby' || fish.slug === 'mandarinfish') {
      return {
        status: '🟠 Use Caution',
        message:
          `Same Species: ${fish.name} can show territorial or conspecific aggression. A compatible pair may work, but keeping multiple unrelated individuals is not a safe default.`,
        colorTheme: 'orange',
      };
    }

    if (fish.slug === 'banggai-cardinalfish') {
      return {
        status: '🟠 Use Caution',
        message:
          'Same Species: Banggai Cardinalfish are not a simple "keep six together" schooling fish. Group composition and pair formation matter, and aggression can occur between conspecifics.',
        colorTheme: 'orange',
      };
    }

    if (fish.slug?.includes('tang')) {
      return {
        status: '🟠 Use Caution',
        message:
          'Same Species: Tangs can become territorial toward conspecifics. Multiple tangs require a much larger aquarium, careful species selection, and deliberate introduction; the listed minimum tank size for one fish is not a multiple-fish stocking rule.',
        colorTheme: 'orange',
      };
    }

    if (fish.slug === 'kribensis-cichlid') {
      return {
        status: '🟠 Use Caution',
        message:
          'Same Species: Kribensis are pair-bonding cave spawners. A compatible pair is the normal social arrangement; adding unrelated adults can create territorial conflict.',
        colorTheme: 'orange',
      };
    }

    if (social === 'schooling' || social === 'small-school') {
      const groupText = social === 'schooling' ? 'a proper group' : 'a small group';
      return {
        status: '🟢 Generally Compatible',
        message:
          `Same Species: ${fish.name} is social and should be kept as ${groupText}. Group size, aquarium footprint, filtration, and the species' adult size still need to be considered.`,
        colorTheme: 'emerald',
      };
    }

    return {
      status: '🟢 Generally Compatible',
      message:
        `Same Species: ${fish.name} can generally be kept with conspecifics when the species' social behavior, adult size, aquarium footprint, and territorial requirements are respected.`,
      colorTheme: 'emerald',
    };
  };

  const getCompatibility = (id1: string, id2: string): CompatibilityResult => {
    if (!id1 || !id2) {
      return {
        status: 'Select Species',
        message: 'Select two species to check compatibility.',
        colorTheme: 'blue',
      };
    }

    const f1 = fishData.find(f => f.id === id1);
    const f2 = fishData.find(f => f.id === id2);

    if (!f1 || !f2) {
      return {
        status: 'Select Species',
        message: 'Select two species to check compatibility.',
        colorTheme: 'blue',
      };
    }

    if (id1 === id2) {
      return sameSpeciesWarning(f1);
    }

    const slug1 = f1.slug || '';
    const slug2 = f2.slug || '';

    let status: CompatibilityResult['status'] = '🟢 Generally Compatible';
    let colorTheme: CompatibilityResult['colorTheme'] = 'emerald';
    const reasons: string[] = [];
    const warnings: string[] = [];

    const setStatus = (
      nextStatus: CompatibilityResult['status'],
      nextTheme: CompatibilityResult['colorTheme']
    ) => {
      const priority: Record<string, number> = {
        'Select Species': 0,
        '🟢 Generally Compatible': 1,
        '🟡 Usually Compatible with Conditions': 2,
        '🟠 Use Caution': 3,
        '🔴 Not Recommended': 4,
      };

      if (priority[nextStatus] > priority[status]) {
        status = nextStatus;
        colorTheme = nextTheme;
      }
    };

    const temp1 = parseRange(f1.temperature);
    const temp2 = parseRange(f2.temperature);
    const ph1 = parseRange(f1.ph);
    const ph2 = parseRange(f2.ph);

    // 1. Environment Check
    if (f1.category?.toLowerCase() !== f2.category?.toLowerCase()) {
      return {
        status: '🔴 Not Recommended',
        message:
          `Incompatible environments: ${f1.name} is listed as ${f1.category}, while ${f2.name} is listed as ${f2.category}. These species require different aquarium environments and should not be combined.`,
        colorTheme: 'red',
      };
    }

    // 2. Temperature Check
    if (temp1 && temp2) {
      const overlapMin = Math.max(temp1[0], temp2[0]);
      const overlapMax = Math.min(temp1[1], temp2[1]);

      if (overlapMin > overlapMax) {
        const gap = overlapMin - overlapMax;

        if (gap > 2) {
          return {
            status: '🔴 Not Recommended',
            message:
              `Temperature mismatch: ${f1.name} is listed at ${f1.temperature}, while ${f2.name} is listed at ${f2.temperature}. There is no practical temperature range that comfortably satisfies both.`,
            colorTheme: 'red',
          };
        }

        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Their temperature ranges are very close but do not overlap (${f1.temperature} vs ${f2.temperature}).`
        );
      } else {
        const overlapWidth = overlapMax - overlapMin;

        if (overlapWidth < 2) {
          setStatus('🟡 Usually Compatible with Conditions', 'amber');
          reasons.push(
            `Their temperature ranges overlap narrowly at about ${overlapMin}–${overlapMax}°F.`
          );
        } else {
          reasons.push(`Temperature overlap: approximately ${overlapMin}–${overlapMax}°F.`);
        }
      }
    }

    // 3. pH Check
    if (ph1 && ph2) {
      const overlapMin = Math.max(ph1[0], ph2[0]);
      const overlapMax = Math.min(ph1[1], ph2[1]);

      if (overlapMin > overlapMax) {
        const gap = overlapMin - overlapMax;

        if (gap > 0.5) {
          return {
            status: '🔴 Not Recommended',
            message:
              `Water-chemistry mismatch: ${f1.name} is listed at pH ${f1.ph}, while ${f2.name} is listed at pH ${f2.ph}. Their pH requirements are incompatible.`,
            colorTheme: 'red',
          };
        }

        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Their pH ranges are close but do not overlap (${f1.ph} vs ${f2.ph}).`
        );
      } else {
        const overlapWidth = overlapMax - overlapMin;

        if (overlapWidth < 0.3) {
          setStatus('🟡 Usually Compatible with Conditions', 'amber');
          reasons.push(
            `Their pH ranges have only a narrow shared window (${overlapMin.toFixed(1)}–${overlapMax.toFixed(1)}).`
          );
        } else {
          reasons.push(`pH overlap: approximately ${overlapMin.toFixed(1)}–${overlapMax.toFixed(1)}.`);
        }
      }
    }

    // 4. Species-specific checks (Bettas, Angelfish)
    const hasBetta = slug1 === 'betta-fish' || slug2 === 'betta-fish';
    if (hasBetta) {
      const other = slug1 === 'betta-fish' ? f2 : f1;

      if (other.slug === 'guppy') {
        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          'Betta + Guppy: A Betta may react aggressively to a colorful or long-finned Guppy.'
        );
      } else if (other.slug === 'neon-tetra') {
        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          'Betta + Neon Tetra: Bettas are territorial and individual compatibility varies.'
        );
      } else if (
        other.slug === 'corydoras-catfish' ||
        other.slug === 'harlequin-rasbora'
      ) {
        reasons.push(
          `Betta + ${other.name}: ${other.name} is generally peaceful, but the Betta's individual temperament remains a factor.`
        );
        setStatus('🟡 Usually Compatible with Conditions', 'amber');
      } else {
        if (other.temperament === 'Aggressive' || other.temperament === 'Semi-Aggressive') {
          return {
            status: '🔴 Not Recommended',
            message:
              `Territorial conflict risk: ${other.name} is ${other.temperament}, while Bettas are territorial. This can create severe aggression.`,
            colorTheme: 'red',
          };
        }

        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Betta + ${other.name}: Peacefulness does not guarantee compatibility since individual Betta temperaments vary.`
        );
      }
    }

    const hasAngelfish = slug1 === 'angelfish' || slug2 === 'angelfish';
    const hasNeonTetra = slug1 === 'neon-tetra' || slug2 === 'neon-tetra';

    if (hasAngelfish && hasNeonTetra) {
      return {
        status: '🔴 Not Recommended',
        message:
          'Predation risk: Adult Angelfish are large enough to treat small, slender fish like Neon Tetras as food.',
        colorTheme: 'red',
      };
    }

    const predator = [f1, f2].find(f => knownPredatorySpecies.has(f.slug || ''));
    const prey = predator === f1 ? f2 : f1;

    if (predator) {
      const predatorSize = predator.maxSize || 0;
      const preySize = prey.maxSize || 0;

      if (preySize > 0 && preySize <= 3 && predatorSize / preySize >= 3) {
        return {
          status: '🔴 Not Recommended',
          message:
            `Predation risk: ${predator.name} (${predatorSize}") is large enough to swallow ${prey.name} (${preySize}").`,
          colorTheme: 'red',
        };
      }

      setStatus('🟠 Use Caution', 'orange');
      reasons.push(
        `${predator.name} is a large predatory species. Tankmates must be large and active enough to avoid harassment.`
      );
    }

    // 5. Size Ratio Check
    const size1 = f1.maxSize || 0;
    const size2 = f2.maxSize || 0;

    if (size1 > 0 && size2 > 0) {
      const larger = size1 >= size2 ? f1 : f2;
      const smaller = size1 >= size2 ? f2 : f1;
      const ratio = Math.max(size1, size2) / Math.min(size1, size2);

      if (ratio >= 4 && (smaller.maxSize || 0) <= 2.5) {
        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Significant size difference: ${larger.name} (${larger.maxSize}") is much larger than ${smaller.name} (${smaller.maxSize}").`
        );
      }
    }

    // 6. Tang territorial check
    const tang1 = slug1.includes('tang');
    const tang2 = slug2.includes('tang');

    if (tang1 && tang2) {
      return {
        status: '🟠 Use Caution',
        message:
          'Tang + Tang: Surgeonfish are often highly territorial toward similar species. This requires a spacious aquarium and careful introduction.',
        colorTheme: 'orange',
      };
    }

    // 7. General Temperament check
    const t1 = f1.temperament;
    const t2 = f2.temperament;

    if (t1 === 'Aggressive' && t2 === 'Aggressive') {
      setStatus('🟠 Use Caution', 'orange');
      reasons.push(
        'Both species are aggressive; territorial conflicts are highly likely.'
      );
    } else if (
      (t1 === 'Aggressive' && t2 === 'Peaceful') ||
      (t2 === 'Aggressive' && t1 === 'Peaceful')
    ) {
      const aggressive = t1 === 'Aggressive' ? f1 : f2;
      const peaceful = t1 === 'Aggressive' ? f2 : f1;

      return {
        status: '🔴 Not Recommended',
        message:
          `Temperament conflict: ${aggressive.name} is aggressive while ${peaceful.name} is peaceful.`,
        colorTheme: 'red',
      };
    } else if (
      (t1 === 'Semi-Aggressive' && t2 === 'Peaceful') ||
      (t2 === 'Semi-Aggressive' && t1 === 'Peaceful')
    ) {
      const semi = t1 === 'Semi-Aggressive' ? f1 : f2;
      const peaceful = t1 === 'Semi-Aggressive' ? f2 : f1;

      setStatus('🟡 Usually Compatible with Conditions', 'amber');
      reasons.push(
        `${semi.name} is semi-aggressive while ${peaceful.name} is peaceful; compatibility depends on tank size and hiding spots.`
      );
    }

    // 8. Social/Grouping rules
    for (const fish of [f1, f2]) {
      const social = socialTraits[fish.slug || ''];
      if (social === 'schooling') {
        warnings.push(`${fish.name} is schooling and should be kept in a group of 6 or more.`);
      }
    }

    // 9. Tank Size Match
    const largerMinimum = Math.max(f1.minTankSize || 0, f2.minTankSize || 0);
    if (largerMinimum > 0) {
      reasons.push(`Minimum tank size required: ${largerMinimum} gallons based on species requirements.`);
    }

    if (reasons.length === 0) {
      reasons.push(
        'The water parameters align and no species-specific behavioral conflicts were identified.'
      );
    }

    const finalMessage =
      reasons.join(' ') +
      (warnings.length > 0 ? ` Note: ${warnings.join(' ')}` : '');

    return {
      status,
      message: finalMessage,
      colorTheme,
    };
  };

  const compResult = getCompatibility(fish1, fish2);
  const f1Data = fishData.find(f => f.id === fish1)!;
  const f2Data = fishData.find(f => f.id === fish2)!;

  const themeClasses = {
    emerald: {
      border: 'border-emerald-200 dark:border-emerald-800',
      glow: '',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300',
      text: 'text-emerald-850 dark:text-emerald-400',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
    amber: {
      border: 'border-amber-200 dark:border-amber-800',
      glow: '',
      bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50 text-amber-800 dark:text-amber-300',
      text: 'text-amber-850 dark:text-amber-400',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    },
    orange: {
      border: 'border-orange-200 dark:border-orange-850',
      glow: '',
      bg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/50 text-orange-800 dark:text-orange-300',
      text: 'text-orange-850 dark:text-orange-400',
      icon: <AlertTriangle className="w-5 h-5 text-orange-650 dark:text-orange-400" />,
    },
    red: {
      border: 'border-red-200 dark:border-red-800',
      glow: '',
      bg: 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50 text-red-850 dark:text-red-300',
      text: 'text-red-850 dark:text-red-400',
      icon: <XCircle className="w-5 h-5 text-red-650 dark:text-red-400" />,
    },
    blue: {
      border: 'border-slate-200 dark:border-slate-800',
      glow: '',
      bg: 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-300',
      text: 'text-slate-850 dark:text-slate-350',
      icon: <Info className="w-5 h-5 text-slate-550 dark:text-slate-400" />,
    },
  }[compResult.colorTheme as 'emerald' | 'amber' | 'orange' | 'red' | 'blue'];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200/30 dark:border-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-poppins font-semibold mb-4 border border-cyan-500/25 text-xs uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" /> Compatibility Tool
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-slate-900 dark:text-white">
            Fish Compatibility Checker
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-450 max-w-2xl mx-auto font-light leading-relaxed">
            Ensure your fish co-exist peacefully. Select two species to verify water chemistry, size compatibility, and temperaments.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          {/* Main matchup grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center relative z-10">
            {/* Fish 1 Column */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className={`w-32 h-32 rounded-full overflow-hidden mb-6 border-4 bg-slate-100 dark:bg-slate-950 relative transition-all duration-500 ${themeClasses.border}`}>
                {f1Data?.image ? (
                  <Image src={f1Data.image} alt={f1Data.name} fill className="object-cover scale-105" sizes="128px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}
              </div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 block font-poppins">Select Species 1</label>
              <select
                value={fish1}
                onChange={(e) => setFish1(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">{f.name} ({f.category})</option>
                ))}
              </select>
            </div>

            {/* VS Badge */}
            <div className="md:col-span-1 flex justify-center py-4 md:py-0">
              <div className="w-11 h-11 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs font-poppins font-bold text-slate-400 shadow-sm">
                VS
              </div>
            </div>

            {/* Fish 2 Column */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className={`w-32 h-32 rounded-full overflow-hidden mb-6 border-4 bg-slate-100 dark:bg-slate-955 relative transition-all duration-500 ${themeClasses.border}`}>
                {f2Data?.image ? (
                  <Image src={f2Data.image} alt={f2Data.name} fill className="object-cover scale-105" sizes="128px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}
              </div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 block font-poppins">Select Species 2</label>
              <select
                value={fish2}
                onChange={(e) => setFish2(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">{f.name} ({f.category})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Compatibility Status Banner */}
          <div className={`mt-10 rounded-xl p-5 flex flex-col md:flex-row items-center gap-4 border transition-all duration-300 ${themeClasses.bg}`}>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200/40 dark:border-slate-800 shadow-sm shrink-0">
              {themeClasses.icon}
            </div>
            <div className="text-center md:text-left">
              <h3 className={`text-xl font-bold font-poppins mb-1 ${themeClasses.text}`}>
                {compResult.status}
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm font-light">
                {compResult.message}
              </p>
            </div>
          </div>

          {/* Parameters Comparison Section */}
          <div className="mt-12 border-t border-slate-200/50 dark:border-slate-800/80 pt-8">
            <h4 className="text-base font-bold font-poppins text-slate-900 dark:text-white mb-6 text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
              <Layers className="w-4 h-4 text-cyan-600" /> Species Parameters Matchup
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fish 1 details */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-900">
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">Species 1</span>
                  <span className="text-sm font-bold text-slate-850 dark:text-slate-100">{f1Data.name}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Environment</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f1Data.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Temperament</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f1Data.temperament || 'Community'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Temperature</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f1Data.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">pH Level</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f1Data.ph}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Min Tank Size</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f1Data.minTankSize} Gallons</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Care Difficulty</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f1Data.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Fish 2 details */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-900">
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">Species 2</span>
                  <span className="text-sm font-bold text-slate-850 dark:text-slate-100">{f2Data.name}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Environment</span>
                    <span className={`font-semibold ${f1Data.category !== f2Data.category ? 'text-red-500 font-bold' : 'text-slate-850 dark:text-slate-200'}`}>
                      {f2Data.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Temperament</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f2Data.temperament || 'Community'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Temperature</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f2Data.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">pH Level</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f2Data.ph}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Min Tank Size</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f2Data.minTankSize} Gallons</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-450 dark:text-slate-500">Care Difficulty</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f2Data.difficulty}</span>
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