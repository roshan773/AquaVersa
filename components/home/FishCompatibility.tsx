'use client';
import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Thermometer, ShieldAlert, Droplet, Layers, HelpCircle } from 'lucide-react';
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

  /*
   * fishData intentionally remains the source of truth for:
   * - environment
   * - temperature
   * - pH
   * - adult size
   * - minimum tank size
   * - temperament
   * - diet
   * - compatibleWith
   *
   * The traits below only add behavior that the current Fish type does not
   * explicitly model. They are species-specific guardrails for the checker,
   * not replacement fish records.
   *
   * Compatibility is inherently probabilistic. Even reputable aquarium
   * compatibility charts describe their results as guidelines rather than
   * guarantees, so this engine deliberately avoids pretending that one
   * variable (especially temperament) can determine compatibility by itself.
   */
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

    // Same-species checks must happen before pairwise calculations.
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

    // 1. Environment: freshwater and marine fish cannot share the same aquarium.
    if (f1.category?.toLowerCase() !== f2.category?.toLowerCase()) {
      return {
        status: '🔴 Not Recommended',
        message:
          `Incompatible environments: ${f1.name} is listed as ${f1.category}, while ${f2.name} is listed as ${f2.category}. These species require different aquarium environments and should not be combined in one aquarium.`,
        colorTheme: 'red',
      };
    }

    // 2. Temperature: require a meaningful shared target, not merely a single
    // mathematical endpoint. A tiny overlap is treated as conditional.
    if (temp1 && temp2) {
      const overlapMin = Math.max(temp1[0], temp2[0]);
      const overlapMax = Math.min(temp1[1], temp2[1]);

      if (overlapMin > overlapMax) {
        const gap = overlapMin - overlapMax;

        if (gap > 2) {
          return {
            status: '🔴 Not Recommended',
            message:
              `Temperature mismatch: ${f1.name} is listed at ${f1.temperature}, while ${f2.name} is listed at ${f2.temperature}. There is no practical temperature range that comfortably satisfies both records.`,
            colorTheme: 'red',
          };
        }

        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Their listed temperature ranges are very close but do not overlap (${f1.temperature} vs ${f2.temperature}).`
        );
        warnings.push(
          'Do not force the aquarium temperature outside either species\' appropriate range just to make the pair work.'
        );
      } else {
        const overlapWidth = overlapMax - overlapMin;

        if (overlapWidth < 2) {
          setStatus('🟡 Usually Compatible with Conditions', 'amber');
          reasons.push(
            `Their listed temperature ranges overlap only narrowly at about ${overlapMin}–${overlapMax}°F.`
          );
          warnings.push(
            `Keep the aquarium stable within the shared range rather than repeatedly adjusting temperature (${overlapMin}–${overlapMax}°F).`
          );
        } else {
          reasons.push(`Temperature overlap: approximately ${overlapMin}–${overlapMax}°F.`);
        }
      }
    }

    // 3. pH: pH is not a hard binary compatibility switch. A shared range is
    // useful, but a narrow overlap is a condition rather than proof of harm.
    if (ph1 && ph2) {
      const overlapMin = Math.max(ph1[0], ph2[0]);
      const overlapMax = Math.min(ph1[1], ph2[1]);

      if (overlapMin > overlapMax) {
        const gap = overlapMin - overlapMax;

        if (gap > 0.5) {
          return {
            status: '🔴 Not Recommended',
            message:
              `Water-chemistry mismatch: ${f1.name} is listed at pH ${f1.ph}, while ${f2.name} is listed at pH ${f2.ph}. Their listed pH ranges do not overlap enough to recommend combining them.`,
            colorTheme: 'red',
          };
        }

        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Their listed pH ranges are very close but do not overlap (${f1.ph} vs ${f2.ph}).`
        );
        warnings.push(
          'Prioritize stable, species-appropriate water rather than chemically forcing pH to an exact number.'
        );
      } else {
        const overlapWidth = overlapMax - overlapMin;

        if (overlapWidth < 0.3) {
          setStatus('🟡 Usually Compatible with Conditions', 'amber');
          reasons.push(
            `Their listed pH ranges have only a narrow shared window (${overlapMin.toFixed(1)}–${overlapMax.toFixed(1)}).`
          );
        } else {
          reasons.push(`pH overlap: approximately ${overlapMin.toFixed(1)}–${overlapMax.toFixed(1)}.`);
        }
      }
    }

    // 4. Species-specific behavior.
    const hasBetta = slug1 === 'betta-fish' || slug2 === 'betta-fish';
    if (hasBetta) {
      const other = slug1 === 'betta-fish' ? f2 : f1;

      if (other.slug === 'guppy') {
        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          'Betta + Guppy: this combination can work in some community aquariums, but a Betta may react aggressively to a colorful or long-finned Guppy.'
        );
        warnings.push(
          'Do not treat this as guaranteed compatibility; provide cover and be prepared to separate the fish if chasing, fin damage, or persistent stress occurs.'
        );
      } else if (other.slug === 'neon-tetra') {
        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          'Betta + Neon Tetra: the water ranges can overlap, but the Betta is territorial and individual behavior varies.'
        );
        warnings.push(
          'Use a suitably sized, planted aquarium with cover and monitor the Betta closely for chasing or harassment.'
        );
      } else if (
        other.slug === 'corydoras-catfish' ||
        other.slug === 'harlequin-rasbora'
      ) {
        reasons.push(
          `Betta + ${other.name}: ${other.name} is generally peaceful, but the Betta's individual temperament remains the deciding behavioral risk.`
        );
        warnings.push(
          'Provide cover and enough space for the species to use different areas of the aquarium.'
        );
        setStatus('🟡 Usually Compatible with Conditions', 'amber');
      } else {
        if (other.temperament === 'Aggressive' || other.temperament === 'Semi-Aggressive') {
          return {
            status: '🔴 Not Recommended',
            message:
              `Territorial conflict risk: ${other.name} is listed as ${other.temperament}, while Bettas are territorial. Combining two territorial fish with overlapping space can create persistent aggression and stress.`,
            colorTheme: 'red',
          };
        }

        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Betta + ${other.name}: a peaceful label does not guarantee compatibility because Betta temperament varies between individuals.`
        );
        warnings.push(
          'Use a suitably sized aquarium, visual cover, and a plan to separate fish if aggression develops.'
        );
      }
    }

    // Adult Angelfish can prey on small, slender fish. Neon Tetra is a
    // specific high-risk example and should not be presented as a normal
    // community pairing.
    const hasAngelfish = slug1 === 'angelfish' || slug2 === 'angelfish';
    const hasNeonTetra = slug1 === 'neon-tetra' || slug2 === 'neon-tetra';

    if (hasAngelfish && hasNeonTetra) {
      return {
        status: '🔴 Not Recommended',
        message:
          'Predation risk: adult freshwater Angelfish are large enough to treat small, slender fish such as Neon Tetras as prey. This is not a reliable community combination as the Angelfish mature.',
        colorTheme: 'red',
      };
    }

    // Large known predators should not be paired with fish small enough to
    // plausibly become prey. Do not classify every omnivore as a predator.
    const predator = [f1, f2].find(f => knownPredatorySpecies.has(f.slug || ''));
    const prey = predator === f1 ? f2 : f1;

    if (predator) {
      const predatorSize = predator.maxSize || 0;
      const preySize = prey.maxSize || 0;

      if (preySize > 0 && preySize <= 3 && predatorSize / preySize >= 3) {
        return {
          status: '🔴 Not Recommended',
          message:
            `Predation risk: ${predator.name} reaches about ${predatorSize}" while ${prey.name} reaches about ${preySize}". Their size difference makes the smaller fish an unsafe tankmate as the predator matures.`,
          colorTheme: 'red',
        };
      }

      setStatus('🟠 Use Caution', 'orange');
      reasons.push(
        `${predator.name} is a large predatory species, so tankmates must be too large to be swallowed and must tolerate its behavior and bioload.`
      );
    }

    // 5. Generic adult-size risk. This is intentionally a warning, not a
    // mathematical "compatibility formula": size alone cannot predict every
    // interaction, but a very large difference deserves attention.
    const size1 = f1.maxSize || 0;
    const size2 = f2.maxSize || 0;

    if (size1 > 0 && size2 > 0) {
      const larger = size1 >= size2 ? f1 : f2;
      const smaller = size1 >= size2 ? f2 : f1;
      const ratio = Math.max(size1, size2) / Math.min(size1, size2);

      if (ratio >= 4 && (smaller.maxSize || 0) <= 2.5) {
        setStatus('🟠 Use Caution', 'orange');
        reasons.push(
          `Large adult-size difference: ${larger.name} (${larger.maxSize}") is much larger than ${smaller.name} (${smaller.maxSize}").`
        );
        warnings.push(
          'Adult size matters more than juvenile size; monitor for chasing, predation, or food competition as the fish mature.'
        );
      }
    }

    // 6. Species-specific territorial combinations.
    const tang1 = slug1.includes('tang');
    const tang2 = slug2.includes('tang');

    if (tang1 && tang2) {
      return {
        status: '🟠 Use Caution',
        message:
          'Tang + Tang: tangs can be highly territorial toward other surgeonfish, especially similar-shaped species. This requires a large marine aquarium, careful species selection, and deliberate introduction; it is not a default community pairing.',
        colorTheme: 'orange',
      };
    }

    const territorialPair = [f1, f2].filter(f => {
      const social = socialTraits[f.slug || ''];
      return social === 'solitary-territorial' || social === 'territorial';
    });

    if (territorialPair.length === 2) {
      setStatus('🟠 Use Caution', 'orange');
      reasons.push(
        `Both ${f1.name} and ${f2.name} have meaningful territorial behavior, so aquarium footprint, rockwork/cover, and introduction order matter.`
      );
    } else if (territorialPair.length === 1) {
      const territorialFish = territorialPair[0];
      const other = territorialFish === f1 ? f2 : f1;

      if (other.temperament === 'Aggressive') {
        return {
          status: '🔴 Not Recommended',
          message:
            `Behavioral conflict: ${territorialFish.name} is territorial and ${other.name} is listed as aggressive. Without species-specific evidence for this pairing, it should not be treated as a safe community combination.`,
          colorTheme: 'red',
        };
      }

      setStatus('🟡 Usually Compatible with Conditions', 'amber');
      reasons.push(
        `${territorialFish.name} has territorial behavior, while ${other.name} is not strongly territorial.`
      );
      warnings.push(
        'Provide adequate territory/cover and monitor the first days after introduction for chasing or exclusion.'
      );
    }

    // 7. General temperament is only a supporting signal. It no longer
    // overrides species-specific evidence or assumes every "semi-aggressive"
    // fish will attack every peaceful fish.
    const t1 = f1.temperament;
    const t2 = f2.temperament;

    if (t1 === 'Aggressive' && t2 === 'Aggressive') {
      setStatus('🟠 Use Caution', 'orange');
      reasons.push(
        'Both fish are listed as aggressive, so territorial conflict is a significant risk.'
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
          `Temperament conflict: ${aggressive.name} is listed as aggressive while ${peaceful.name} is listed as peaceful. Without species-specific evidence that this pair is safe, it should not be recommended as a community combination.`,
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
        `${semi.name} is listed as semi-aggressive while ${peaceful.name} is listed as peaceful; compatibility depends on space, territory, and individual behavior.`
      );
    }

    // 8. Social/group requirements.
    for (const fish of [f1, f2]) {
      const social = socialTraits[fish.slug || ''];

      if (social === 'schooling') {
        warnings.push(
          `${fish.name} should be kept in an appropriate group rather than as a solitary fish; the exact group size depends on the species and aquarium size.`
        );
      }

      if (social === 'small-school') {
        warnings.push(
          `${fish.name} is social and is generally better kept in a small group when the aquarium is appropriately sized.`
        );
      }
    }

    // 9. Known compatibility mapping is supporting evidence only.
    // It must NEVER turn a biologically unsuitable pair green. The previous
    // implementation used one-sided lists as if they were proof of safety.
    const explicitlyListedByBoth =
      Boolean(f1.compatibleWith?.includes(slug2)) &&
      Boolean(f2.compatibleWith?.includes(slug1));

    if (explicitlyListedByBoth) {
      reasons.push(
        'The pair is also explicitly listed as compatible by both fish records in the current database.'
      );
    } else if (
      f1.compatibleWith?.includes(slug2) ||
      f2.compatibleWith?.includes(slug1)
    ) {
      reasons.push(
        'One fish record lists the other as a compatible tankmate; this is treated only as supporting evidence because compatibility lists are not guarantees.'
      );
    }

    // 10. Tank size: never invent a "combined gallons" formula from adult
    // length. Use the larger listed minimum only as a starting reference and
    // clearly state that stocking/group requirements can make the real need
    // higher.
    const largerMinimum = Math.max(f1.minTankSize || 0, f2.minTankSize || 0);

    if (largerMinimum > 0) {
      reasons.push(
        `Tank-size starting point: at least ${largerMinimum} gallons based on the larger listed species minimum; actual requirements can be higher because group size, footprint, filtration, aquascape, and total stocking also matter.`
      );
    }

    if (reasons.length === 0) {
      reasons.push(
        'The available records show compatible environments and no major species-specific conflict was identified. Compatibility is still conditional on proper stocking, space, filtration, and individual behavior.'
      );
    }

    const finalMessage =
      reasons.join(' ') +
      (warnings.length > 0 ? ` NOTE: ${warnings.join(' ')}` : '');

    return {
      status,
      message: finalMessage,
      colorTheme,
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
    <section className="py-24 bg-black border-b border-red-500/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.02),transparent_60%)] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 font-bold mb-4 border border-red-500/20 text-xs uppercase tracking-wider animate-float">
            <ShieldAlert className="w-4 h-4" /> Compatibility Tool
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-white">
            Fish Compatibility Checker
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Ensure your fish co-exist peacefully. Select two species to verify water chemistry, size compatibility, and temperaments.
          </p>
        </div>

        <div className="bg-black/40 border border-red-500/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Main matchup grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center relative z-10">
            {/* Fish 1 Column */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className={`w-36 h-36 rounded-full overflow-hidden mb-6 border-4 bg-black relative transition-all duration-500 ${themeClasses.border} ${themeClasses.glow}`}>
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
                className="w-full bg-black border border-red-500/15 rounded-xl px-4 py-3 text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500/30 transition-colors"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id} className="bg-black text-slate-200">{f.name} ({f.category})</option>
                ))}
              </select>
            </div>

            {/* VS Badge */}
            <div className="md:col-span-1 flex justify-center py-4 md:py-0">
              <div className="w-14 h-14 rounded-full bg-black border border-red-500/25 flex items-center justify-center text-lg font-extrabold text-red-500 shadow-md shadow-red-500/10">
                VS
              </div>
            </div>

            {/* Fish 2 Column */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className={`w-36 h-36 rounded-full overflow-hidden mb-6 border-4 bg-black relative transition-all duration-500 ${themeClasses.border} ${themeClasses.glow}`}>
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
                className="w-full bg-black border border-red-500/15 rounded-xl px-4 py-3 text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500/30 transition-colors"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id} className="bg-black text-slate-200">{f.name} ({f.category})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Compatibility Status Banner */}
          <div className={`mt-10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 border transition-all duration-500 ${themeClasses.bg}`}>
            <div className="p-3 bg-black rounded-xl border border-red-500/20 shadow-md shrink-0">
              {themeClasses.icon}
            </div>
            <div className="text-center md:text-left">
              <h3 className={`text-2xl font-bold font-poppins mb-1.5 ${themeClasses.text}`}>
                {compResult.status}
              </h3>
              <p className="text-slate-200 leading-relaxed text-sm md:text-base font-light">
                {compResult.message}
              </p>
            </div>
          </div>

          {/* Parameters Comparison Section */}
          <div className="mt-12 border-t border-red-500/10 pt-8">
            <h4 className="text-lg font-bold font-poppins text-white mb-6 text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
              <Layers className="w-5 h-5 text-red-500" /> Species Parameters Matchup
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fish 1 details */}
              <div className="bg-black border border-red-500/10 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-500/10">
                  <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-500">Species 1</span>
                  <span className="text-base font-bold text-white">{f1Data.name}</span>
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
              <div className="bg-black border border-red-500/10 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-500/10">
                  <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-500">Species 2</span>
                  <span className="text-base font-bold text-white">{f2Data.name}</span>
                </div>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Environment</span>
                    <span className={`font-semibold ${f1Data.category !== f2Data.category ? 'text-red-500 font-bold' : 'text-slate-200'}`}>
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