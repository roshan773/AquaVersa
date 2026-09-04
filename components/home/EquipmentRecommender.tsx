'use client';

import { useState } from 'react';
import { Droplets, Thermometer, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EquipmentRecommender() {
  const [tankSize, setTankSize] = useState('20-40');
  const [tankType, setTankType] = useState('freshwater');
  const [isPlanted, setIsPlanted] = useState('not-sure');

  return (
    <section className="marine-pattern-light py-24 bg-[#f7f7ff] text-center relative overflow-hidden">
      <div className="site-container relative z-10">
        
        {/* Section Header (Centered) */}
        <div className="mb-14 flex flex-col items-center">
          <span className="inline-block text-xs font-condensed font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-[#edeafc] text-[#27187e] border border-[#cfcaf5] mb-3">
            RECOMMENDATIONS
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide">
            Equipment Recommender
          </h2>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-lg mt-2 font-sans leading-relaxed">
            Tell us about your aquarium and get personalized equipment recommendations.
          </p>
        </div>

        {/* Centered Recommendation Card */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5]/80 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all duration-300 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
            
            {/* LEFT: Inputs */}
            <div className="md:col-span-5 space-y-5">
              {/* Tank Size */}
              <div>
                <label className="text-xs sm:text-sm font-sans font-bold text-[#27187e] mb-2 block">
                  Tank Size
                </label>
                <div className="relative">
                  <select
                    value={tankSize}
                    onChange={(e) => setTankSize(e.target.value)}
                    className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#27187e] font-sans focus:outline-none focus:border-[#27187e] appearance-none cursor-pointer pr-9 font-medium"
                  >
                    <option value="5-10">Select size (5 - 10 Gallons)</option>
                    <option value="20-40">20 - 40 Gallons (Standard)</option>
                    <option value="55+">55+ Gallons (Large)</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#27187e]/70 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>

              {/* Aquarium Type */}
              <div>
                <label className="text-xs sm:text-sm font-sans font-bold text-[#27187e] mb-2 block">
                  Aquarium Type
                </label>
                <div className="relative">
                  <select
                    value={tankType}
                    onChange={(e) => setTankType(e.target.value)}
                    className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#27187e] font-sans focus:outline-none focus:border-[#27187e] appearance-none cursor-pointer pr-9 font-medium"
                  >
                    <option value="freshwater">Freshwater</option>
                    <option value="planted">Planted Ecosystem</option>
                    <option value="saltwater">Saltwater / Reef</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#27187e]/70 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>

              {/* Planted Tank? */}
              <div>
                <label className="text-xs sm:text-sm font-sans font-bold text-[#27187e] mb-2 block">
                  Planted Tank?
                </label>
                <div className="relative">
                  <select
                    value={isPlanted}
                    onChange={(e) => setIsPlanted(e.target.value)}
                    className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#27187e] font-sans focus:outline-none focus:border-[#27187e] appearance-none cursor-pointer pr-9 font-medium"
                  >
                    <option value="not-sure">Not sure</option>
                    <option value="yes">Yes, Live Plants</option>
                    <option value="no">No, Fish Only</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#27187e]/70 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Recommended For You */}
            <div className="md:col-span-7">
              <h3 className="font-sans font-bold text-sm sm:text-base text-[#27187e] mb-4">
                Recommended For You
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* 1: Filtration */}
                <div className="p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] flex flex-col items-start shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#edeafc] flex items-center justify-center text-[#27187e] mb-3">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-[#27187e] mb-1">
                    Filtration
                  </h4>
                  <p className="text-xs text-[#27187e]/75 font-sans leading-relaxed">
                    Keep your water clean and healthy.
                  </p>
                </div>

                {/* 2: Heater */}
                <div className="p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] flex flex-col items-start shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#edeafc] flex items-center justify-center text-[#27187e] mb-3">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-[#27187e] mb-1">
                    Heater
                  </h4>
                  <p className="text-xs text-[#27187e]/75 font-sans leading-relaxed">
                    Maintain stable temperature.
                  </p>
                </div>

                {/* 3: Lighting */}
                <div className="p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] flex flex-col items-start shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#edeafc] flex items-center justify-center text-[#27187e] mb-3">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-[#27187e] mb-1">
                    Lighting
                  </h4>
                  <p className="text-xs text-[#27187e]/75 font-sans leading-relaxed">
                    Support plant growth and fish health.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Full-width CTA Button */}
          <Link
            href="/equipment"
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Get Recommendations</span>
            <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
          </Link>

        </div>

      </div>
    </section>
  );
}
