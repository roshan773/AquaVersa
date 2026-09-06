'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, CheckCircle2, AlertTriangle, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { plantData } from '@/data/plants';

interface BiotypePreset {
  id: string;
  name: string;
  desc: string;
  recommendedSlugs: string[];
  avoidedSlugs: string[];
  rationale: string;
  specialTip: string;
}

const biotypes: BiotypePreset[] = [
  {
    id: 'community',
    name: 'Peaceful Community Tank',
    desc: 'Tetras, Guppies, Rasboras, Corydoras, Platies, Mollies',
    recommendedSlugs: ['java-fern', 'anubias-nana', 'amazon-sword', 'vallisneria', 'cryptocoryne-wendtii', 'hornwort', 'water-wisteria', 'frogbit'],
    avoidedSlugs: [],
    rationale: 'Peaceful community fish do not eat or uproot live plants. You have 100% freedom to grow soft stem plants, carpeting flora, and delicate floating roots.',
    specialTip: 'Combine fast-growing stem plants (Hornwort, Wisteria) with slow epiphytes (Anubias, Java Fern) for optimal algae suppression.'
  },
  {
    id: 'cichlids',
    name: 'Cichlids & Substrate Diggers',
    desc: 'African Malawi/Tanganyika Cichlids, Severums, Geophagus, Oscars',
    recommendedSlugs: ['anubias-nana', 'java-fern', 'hornwort'],
    avoidedSlugs: ['amazon-sword', 'cryptocoryne-wendtii', 'dwarf-hairgrass', 'monte-carlo'],
    rationale: 'Cichlids constantly sift substrate, dig pits, and shred tender leaves. Only rock-anchored epiphytes with tough, fibrous, bitter-tasting leaves survive.',
    specialTip: 'Superglue or tie Anubias and Java Fern directly onto heavy rocks or driftwood. Do not bury roots in the sand!'
  },
  {
    id: 'goldfish',
    name: 'Goldfish & Herbivores',
    desc: 'Fancy Goldfish, Common Goldfish, Silver Dollars',
    recommendedSlugs: ['java-fern', 'anubias-nana', 'vallisneria', 'hornwort', 'frogbit'],
    avoidedSlugs: ['amazon-sword', 'cryptocoryne-wendtii', 'rotala-rotundifolia', 'ludwigia-repens'],
    rationale: 'Goldfish graze continuously on soft foliage and forage along the bottom. They devour delicate stems and uproot carpets overnight.',
    specialTip: 'Use tough unpalatable plants like Anubias and large Java Ferns. Fast-growing floating plants like Duckweed can be used as nutritious live snacks.'
  },
  {
    id: 'bettas',
    name: 'Betta Fish & Long-Finned',
    desc: 'Betta splendens, Gouramis, Guppies with large delta tails',
    recommendedSlugs: ['anubias-nana', 'amazon-sword', 'frogbit', 'water-spangles', 'red-root-floater', 'java-fern'],
    avoidedSlugs: ['stiff-plastic-fake-plants'],
    rationale: 'Bettas love broad horizontal leaves near the water surface to rest on and build bubble nests under calm floating pads.',
    specialTip: 'Anubias Nana and broad Amazon Sword leaves placed 2 inches below the surface serve as natural hammocks for heavy-finned Bettas.'
  },
  {
    id: 'shrimp-nano',
    name: 'Nano Shrimps & Micro-Fauna',
    desc: 'Neocaridina (Cherry Shrimp), Amano Shrimp, Chili Rasboras, Endlers',
    recommendedSlugs: ['java-moss', 'anubias-nana', 'java-fern', 'frogbit', 'cryptocoryne-wendtii', 'hornwort'],
    avoidedSlugs: [],
    rationale: 'Shrimp require immense surface area to graze on biofilm, plus dense foliage to protect vulnerable molting individuals and tiny shrimplets.',
    specialTip: 'Fine-leafed mosses and floating plant root networks provide vital biofilm grazing pastures for baby shrimp.'
  }
];

export default function PlantCompatibility() {
  const [selectedBiotype, setSelectedBiotype] = useState<string>('community');

  const currentBiotype = biotypes.find(b => b.id === selectedBiotype) || biotypes[0];

  const recommendedPlants = plantData.filter(p => 
    (p.slug && currentBiotype.recommendedSlugs.includes(p.slug)) || 
    (selectedBiotype === 'community' && p.difficulty === 'Easy')
  );

  return (
    <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-9 shadow-sm text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#edeafc]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edeafc] text-[#27187e] text-xs font-bold uppercase tracking-wider mb-2">
            <Leaf className="w-3.5 h-3.5" />
            <span>Flora &amp; Fauna Compatibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#27187e] tracking-tight">
            Fish-Safe Aquatic Plant Selector
          </h2>
        </div>
        <p className="font-readable text-xs sm:text-sm text-[#27187e]/75 max-w-sm">
          Select your primary fish group to see which aquatic plant species will thrive without being eaten or uprooted.
        </p>
      </div>

      {/* Biotype Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {biotypes.map(bio => (
          <button
            key={bio.id}
            onClick={() => setSelectedBiotype(bio.id)}
            className={`flex flex-col items-start p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
              selectedBiotype === bio.id
                ? 'border-[#27187e] bg-[#27187e] text-[#f7f7ff] shadow-sm'
                : 'border-[#cfcaf5] bg-[#f7f7ff] text-[#27187e] hover:border-[#27187e] hover:bg-[#edeafc]'
            }`}
          >
            <span className="font-sans font-bold text-sm sm:text-base leading-tight mb-1">
              {bio.name}
            </span>
            <span className={`font-readable text-[11px] leading-tight line-clamp-2 ${
              selectedBiotype === bio.id ? 'text-[#cfcaf5]' : 'text-[#27187e]/70'
            }`}>
              {bio.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Rationale & Advice Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
        <div className="lg:col-span-8 bg-[#edeafc]/60 border border-[#cfcaf5] rounded-2xl p-5 sm:p-6 flex flex-col justify-center">
          <span className="text-[11px] uppercase font-bold text-[#27187e]/70 block mb-1">
            Biotype Dynamics &amp; Herbivory Rationale
          </span>
          <p className="font-readable text-sm sm:text-base text-[#27187e] font-medium leading-relaxed">
            {currentBiotype.rationale}
          </p>
        </div>
        <div className="lg:col-span-4 bg-[#27187e] text-[#f7f7ff] rounded-2xl p-5 sm:p-6 flex flex-col justify-center shadow-sm">
          <span className="text-[11px] uppercase font-bold text-[#cfcaf5] block mb-1">
            Aquascaping Master Tip
          </span>
          <p className="font-readable text-xs sm:text-sm text-[#f7f7ff] leading-relaxed">
            {currentBiotype.specialTip}
          </p>
        </div>
      </div>

      {/* Recommended Plants Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-bold text-2xl text-[#27187e] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Recommended Compatible Plants for {currentBiotype.name}</span>
          </h3>
          <span className="font-readable text-xs font-semibold text-[#27187e]/70">
            {recommendedPlants.length} species available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedPlants.map(plant => (
            <div
              key={plant.id}
              className="bg-[#f7f7ff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-2xl p-4 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#1f1366] mb-3">
                  <Image
                    src={plant.image}
                    alt={plant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="300px"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#27187e]/90 text-[#f7f7ff] text-[10px] font-bold uppercase">
                    {plant.difficulty} Care
                  </div>
                </div>

                <div className="mb-2">
                  <h4 className="font-sans font-bold text-lg text-[#27187e] leading-tight">
                    {plant.name}
                  </h4>
                  <span className="font-readable text-xs italic text-[#27187e]/70 block">
                    {plant.scientificName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-readable text-[#27187e]/80 py-2 border-y border-[#cfcaf5]/50 mb-3">
                  <div>
                    <span className="font-semibold block text-[#27187e]">Placement:</span>
                    <span className="truncate block">{plant.placement}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[#27187e]">Light Needs:</span>
                    <span>{plant.light}</span>
                  </div>
                </div>

                <p className="font-readable text-xs text-[#27187e]/85 line-clamp-2 mb-3">
                  {plant.description}
                </p>
              </div>

              <Link
                href={`/plants/${plant.slug}`}
                className="inline-flex items-center justify-between w-full pt-2 text-xs font-readable font-bold text-[#27187e] group-hover:text-[#1b1059]"
              >
                <span>View Botanical Profile</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
