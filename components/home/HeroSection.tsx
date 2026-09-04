'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, BookOpen, Layers } from 'lucide-react';
import { fishData } from '@/data/fish';

export default function HeroSection() {
  const speciesCount = fishData.filter(f => f.slug).length;

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center pt-28 sm:pt-36 pb-16 bg-[#f7f7ff] text-[#27187e] overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT: Editorial Heading, Story, CTA & 3 Stat Blocks */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-[#27187e] mb-3 block">
              AQUARIUM KNOWLEDGE FOR EVERYONE
            </span>

            {/* Giant Condensed Headline */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal tracking-wide text-[#27187e] leading-[0.92] mb-6">
              EXPLORE <br />
              A BRIGHTER <br />
              AQUATIC WORLD
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#27187e]/80 font-normal max-w-lg leading-relaxed mb-8 font-sans">
              Learn, plan and care with trusted information on fish, plants, equipment and aquarium essentials.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold">
              <Link
                href="/fish"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <span>Explore Fish</span>
                <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
              </Link>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#f7f7ff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] transition-all shadow-sm"
              >
                <span>Start with the Basics</span>
              </Link>
            </div>

            {/* 3 Information Blocks Below Buttons */}
            <div className="mt-12 pt-8 border-t border-[#cfcaf5] w-full grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block leading-none">
                  {speciesCount}+
                </span>
                <span className="text-xs text-[#27187e]/75 font-sans mt-1 block font-medium">
                  Fish Species
                </span>
              </div>
              
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block leading-none">
                  Guides
                </span>
                <span className="text-xs text-[#27187e]/75 font-sans mt-1 block font-medium">
                  For All Levels
                </span>
              </div>

              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block leading-none">
                  Helpful Tools
                </span>
                <span className="text-xs text-[#27187e]/75 font-sans mt-1 block font-medium">
                  Plan with Confidence
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Large Realistic Aquarium Photo with Organic Curved Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-lg rounded-[2.5rem] overflow-hidden border-2 border-[#cfcaf5] shadow-2xl bg-[#edeafc]">
              <Image
                src="/betta_bg.png"
                alt="Vibrant tropical planted freshwater aquarium with crystal clear water and fish"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />
              
              {/* Subtle organic bottom badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#ffffff]/90 backdrop-blur-md p-4 rounded-2xl border border-[#cfcaf5] shadow-lg flex items-center justify-between">
                <div>
                  <span className="font-condensed font-bold uppercase tracking-wider text-sm text-[#27187e] block">
                    Thriving Ecosystems
                  </span>
                  <span className="text-[11px] text-[#27187e]/70 font-sans block">
                    Species compatibility & water stability
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#27187e] flex items-center justify-center text-[#f7f7ff] shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
