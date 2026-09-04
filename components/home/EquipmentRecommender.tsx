'use client';

import { useState } from 'react';
import { Droplets, Thermometer, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EquipmentRecommender() {
  const [tankSize, setTankSize] = useState('20-40');
  const [tankType, setTankType] = useState('freshwater');
  const [isPlanted, setIsPlanted] = useState('not-sure');

  return (
    <section className="py-20 bg-[#f7f7ff] text-center">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Section Header (Centered) */}
        <div className="mb-12 flex flex-col items-center">
          <span className="inline-block text-[10px] font-condensed font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-md bg-[#edeafc] text-[#27187e] border border-[#cfcaf5] mb-3">
            RECOMMENDATIONS
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
            Equipment Recommender
          </h2>
          <p className="text-xs sm:text-sm text-[#27187e]/80 font-normal max-w-lg mt-1 font-sans">
            Tell us about your aquarium and get personalized equipment recommendations.
          </p>
        </div>

        {/* Centered Recommendation Card */}
        <div className="bg-[#ffffff] border border-[#cfcaf5]/80 rounded-3xl p-6 sm:p-10 shadow-sm text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            
            {/* LEFT: Inputs */}
            <div className="md:col-span-5 space-y-4">
              {/* Tank Size */}
              <div>
                <label className="text-xs font-sans font-semibold text-[#27187e] mb-1.5 block">
                  Tank Size
                </label>
                <div className="relative">
                  <select
                    value={tankSize}
                    onChange={(e) => setTankSize(e.target.value)}
                    className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-4 py-2.5 text-xs text-[#27187e] font-sans focus:outline-none focus:border-[#27187e] appearance-none cursor-pointer pr-8"
                  >
                    <option value="5-10">Select size (5 - 10 Gallons)</option>
                    <option value="20-40">20 - 40 Gallons (Standard)</option>
                    <option value="55+">55+ Gallons (Large)</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#27187e]/70 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>

              {/* Aquarium Type */}
              <div>
                <label className="text-xs font-sans font-semibold text-[#27187e] mb-1.5 block">
                  Aquarium Type
                </label>
                <div className="relative">
                  <select
                    value={tankType}
                    onChange={(e) => setTankType(e.target.value)}
                    className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-4 py-2.5 text-xs text-[#27187e] font-sans focus:outline-none focus:border-[#27187e] appearance-none cursor-pointer pr-8"
                  >
                    <option value="freshwater">Freshwater</option>
                    <option value="planted">Planted Ecosystem</option>
                    <option value="saltwater">Saltwater / Reef</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#27187e]/70 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>

              {/* Planted Tank? */}
              <div>
                <label className="text-xs font-sans font-semibold text-[#27187e] mb-1.5 block">
                  Planted Tank?
                </label>
                <div className="relative">
                  <select
                    value={isPlanted}
                    onChange={(e) => setIsPlanted(e.target.value)}
                    className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-4 py-2.5 text-xs text-[#27187e] font-sans focus:outline-none focus:border-[#27187e] appearance-none cursor-pointer pr-8"
                  >
                    <option value="not-sure">Not sure</option>
                    <option value="yes">Yes, Live Plants</option>
                    <option value="no">No, Fish Only</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#27187e]/70 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Recommended For You */}
            <div className="md:col-span-7">
              <h3 className="font-sans font-bold text-sm text-[#27187e] mb-4">
                Recommended For You
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1: Filtration */}
                <div className="p-3.5 rounded-xl bg-[#f7f7ff] border border-[#cfcaf5]/80 flex flex-col items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#edeafc] flex items-center justify-center text-[#27187e] mb-2.5">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans font-bold text-xs text-[#27187e] mb-1">
                    Filtration
                  </h4>
                  <p className="text-[11px] text-[#27187e]/70 font-sans leading-tight">
                    Keep your water clean and healthy.
                  </p>
                </div>

                {/* 2: Heater */}
                <div className="p-3.5 rounded-xl bg-[#f7f7ff] border border-[#cfcaf5]/80 flex flex-col items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#edeafc] flex items-center justify-center text-[#27187e] mb-2.5">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans font-bold text-xs text-[#27187e] mb-1">
                    Heater
                  </h4>
                  <p className="text-[11px] text-[#27187e]/70 font-sans leading-tight">
                    Maintain stable temperature.
                  </p>
                </div>

                {/* 3: Lighting */}
                <div className="p-3.5 rounded-xl bg-[#f7f7ff] border border-[#cfcaf5]/80 flex flex-col items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#edeafc] flex items-center justify-center text-[#27187e] mb-2.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans font-bold text-xs text-[#27187e] mb-1">
                    Lighting
                  </h4>
                  <p className="text-[11px] text-[#27187e]/70 font-sans leading-tight">
                    Support plant growth and fish health.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Full-width CTA Button inside card */}
          <Link
            href="/equipment"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <span>Get Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f7f7ff]" />
          </Link>

        </div>

      </div>
    </section>
  );
}
