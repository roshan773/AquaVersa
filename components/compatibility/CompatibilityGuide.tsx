'use client';

import { useState } from 'react';
import { 
  ShieldAlert, 
  Layers, 
  Droplets, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  AlertOctagon, 
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const pillars = [
  {
    num: '01',
    title: 'Water Chemistry & Hardness',
    desc: 'Fish have evolved specific osmoregulatory systems for either soft acidic water (like Amazonian Discus/Tetras) or hard alkaline water (like African Rift Lake Cichlids or Livebearers). Forcing soft-water fish into hard water causes chronic organ failure.',
    icon: Droplets
  },
  {
    num: '02',
    title: 'Vertical Swimming Zonation',
    desc: 'A well-planned community aquarium balances the 3 vertical zones: Top Dwellers (Danios, Hatchetfish), Mid-Water Schoolers (Tetras, Rasboras), and Bottom Dwellers (Corydoras, Plecos, Loaches). This eliminates spatial competition.',
    icon: Layers
  },
  {
    num: '03',
    title: 'Temperament & Conspecific Behavior',
    desc: 'Peaceful community fish suffer severe chronic stress and immune collapse when housed with aggressive or boisterous tankmates. Certain fish only direct aggression toward their own species (conspecific), while others defend territory universally.',
    icon: ShieldAlert
  },
  {
    num: '04',
    title: 'Adult Size & Mouth Capacity',
    desc: 'Never judge compatibility by juvenile store sizes. Adult Angelfish or Oscars grow large enough to view juvenile Tetras and Guppies as natural live food. Remember the fundamental rule: "If it fits in their mouth, it will be eaten."',
    icon: AlertOctagon
  },
  {
    num: '05',
    title: 'Schooling Numbers & Safety in Groups',
    desc: 'Shoaling fish (Tetras, Danios, Barbs, Corydoras) kept in isolation or pairs live in constant predator panic. A minimum group of 6 to 10 individuals distributes social hierarchy and significantly reduces stress hormones.',
    icon: Sparkles
  }
];

const fatalMistakes = [
  {
    pair: 'Male Betta + Male Guppy',
    reason: 'Male Bettas mistake the flowing, vibrant delta tails of male Guppies for rival Bettas, leading to aggressive chasing and fin tearing.',
    fix: 'House Bettas with short-finned, calm mid/bottom dwellers like Harlequin Rasboras or Corydoras.'
  },
  {
    pair: 'Tiger Barbs + Angelfish',
    reason: 'Tiger Barbs are hyperactive, notorious fin-nippers that will relentlessly shred the long ventral and dorsal fin trailers of slow-moving Angelfish.',
    fix: 'Pair Angelfish with peaceful tetras that are large enough not to be eaten (e.g., Bleeding Heart or Lemon Tetras).'
  },
  {
    pair: 'Goldfish + Tropical Community Fish',
    reason: 'Goldfish are coldwater species (65°–72°F) producing massive bioload, while Tropical fish require 76°–82°F. High tropical temperatures accelerate goldfish metabolism to dangerous rates.',
    fix: 'Keep Goldfish in a dedicated coldwater species aquarium with heavy mechanical and biological filtration.'
  },
  {
    pair: 'African Cichlids + Amazonian Discus',
    reason: 'African Rift Lake cichlids require hard, alkaline water (pH 7.8–8.6) and high aggression dynamics, whereas Discus require very soft, warm, acidic water (pH 6.0–6.8, 84°–86°F).',
    fix: 'Never mix South American soft-water biotopes with African rift lake alkaline setups.'
  }
];

const faqs = [
  {
    q: 'How many fish can I safely keep in my community aquarium?',
    a: 'Rather than using outdated "one inch per gallon" rules, safe capacity depends on adult bioload, filtration turnover (minimum 4–6x tank volume/hour), surface area for oxygen exchange, and species swimming activity. Use our Stocking Calculator on this page to compute real-time capacity.'
  },
  {
    q: 'Can semi-aggressive fish live in a peaceful community tank?',
    a: 'In some cases, semi-aggressive fish (like Gouramis, Rainbow Sharks, or Dwarf Cichlids) can cohabitate in large, heavily planted aquariums (30+ gallons) with ample driftwood caves and sightline breaks that establish natural territory boundaries.'
  },
  {
    q: 'What is the best way to introduce new tankmates to prevent fighting?',
    a: 'Turn off aquarium lights, rearrange a few decorations or plants to reset established territorial claims, acclimate new fish with the drip method for 30–45 minutes, and feed resident fish before releasing newcomers.'
  },
  {
    q: 'Why are my peaceful schooling fish nipping each other’s fins?',
    a: 'This almost always happens when schooling fish (such as Barbs, Tetras, or Danios) are kept in groups that are too small (less than 6). In inadequate numbers, their natural pecking order breaks down, causing anxious aggression.'
  }
];

export default function CompatibilityGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-12 text-left font-sans">
      
      {/* 5 Pillars Section */}
      <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edeafc] text-[#27187e] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Foundational Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] tracking-tight mb-3">
            The 5 Pillars of Community Aquarium Compatibility
          </h2>
          <p className="font-readable text-sm sm:text-base text-[#27187e]/80 leading-relaxed">
            Successful community aquariums do not happen by chance. Every harmonious tank respects these five biological principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className={`bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-2xl p-6 flex flex-col justify-between ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl text-[#27187e] leading-none">
                      {p.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-[#27187e] mb-2 leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-readable text-xs sm:text-sm text-[#27187e]/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Common Incompatible Pairings Alert Box */}
      <div className="bg-[#27187e] text-[#f7f7ff] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b28ab] text-[#f7f7ff] text-xs font-bold uppercase tracking-wider mb-2">
            <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
            <span>Crucial Warnings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#f7f7ff] tracking-tight mb-2">
            4 Common Pairing Mistakes to Avoid
          </h2>
          <p className="font-readable text-sm sm:text-base text-[#cfcaf5] leading-relaxed">
            These classic mismatches are frequently sold together in commercial pet shops but result in chronic stress, fin loss, or fatalities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fatalMistakes.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#1f1366] border border-[#3b28ab] rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold font-mono uppercase text-rose-400 block mb-1">
                  Mismatch #{idx + 1}
                </span>
                <h3 className="font-display text-2xl text-[#ffffff] mb-2">
                  {m.pair}
                </h3>
                <p className="font-readable text-xs sm:text-sm text-[#cfcaf5] leading-relaxed mb-4">
                  {m.reason}
                </p>
              </div>
              <div className="pt-3 border-t border-[#3b28ab] font-readable text-xs">
                <span className="text-emerald-400 font-bold block mb-0.5">Atlas Recommendation:</span>
                <span className="text-[#f7f7ff]/90">{m.fix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safe Introduction Protocol Guide */}
      <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-10 shadow-sm">
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] tracking-tight mb-6">
          Step-by-Step New Fish Acclimation Protocol
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-readable">
          {[
            {
              step: 'Step 1: Dim Lights',
              desc: 'Turn off tank lighting 30 minutes before introducing new fauna to lower cortisol and territorial defense instincts.'
            },
            {
              step: 'Step 2: Temperature Float',
              desc: 'Float the sealed transit bag in the aquarium for 15–20 minutes to equalize water temperature gradually.'
            },
            {
              step: 'Step 3: Drip Acclimation',
              desc: 'Slowly add small cupfuls (or airline drip) of tank water into the bag over 30 minutes to adjust pH and TDS.'
            },
            {
              step: 'Step 4: Net & Release',
              desc: 'Net the fish into the tank gently. Never pour the transport bag water into your main aquarium!'
            }
          ].map((s, i) => (
            <div key={i} className="bg-[#f7f7ff] border border-[#cfcaf5] rounded-2xl p-5">
              <span className="font-display text-lg text-[#27187e] block mb-1.5">{s.step}</span>
              <p className="text-xs sm:text-sm text-[#27187e]/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-10 shadow-sm">
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] tracking-tight mb-6">
          Frequently Asked Questions on Fish Compatibility
        </h2>
        <div className="space-y-4 font-readable">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border-2 border-[#cfcaf5] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-[#f7f7ff] hover:bg-[#edeafc] transition-colors cursor-pointer"
                >
                  <span className="font-display text-lg sm:text-xl text-[#27187e] pr-4">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#27187e] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#27187e] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 bg-[#ffffff] border-t border-[#cfcaf5] text-sm sm:text-base text-[#27187e]/85 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
