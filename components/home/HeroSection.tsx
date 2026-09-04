'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fishData } from '@/data/fish';

export default function HeroSection() {
  const speciesCount = fishData.filter((f) => f.slug).length;

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 bg-[#f7f7ff] text-[#27187e] overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT: Eyebrow, Headline, Description, Buttons, Stats */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Eyebrow */}
            <span className="text-[11px] font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e]/80 mb-3 block">
              AQUARIUM KNOWLEDGE FOR EVERYONE
            </span>

            {/* Giant Condensed Headline */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-normal tracking-wide text-[#27187e] leading-[0.92] mb-6">
              EXPLORE <br />
              A BRIGHTER <br />
              AQUATIC WORLD
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#27187e]/80 font-normal max-w-md leading-relaxed mb-8 font-sans">
              Learn, plan and care with trusted information on fish, plants, equipment and aquarium essentials.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-condensed uppercase tracking-wider font-bold">
              <Link
                href="/fish"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <span>Explore Fish</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#f7f7ff]" />
              </Link>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f7f7ff] border border-[#cfcaf5] hover:bg-[#edeafc] text-[#27187e] transition-all shadow-sm"
              >
                <span>Start with the Basics</span>
              </Link>
            </div>

            {/* 3 Information Blocks Below Buttons */}
            <div className="mt-12 pt-6 border-t border-[#cfcaf5]/60 w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block leading-none">
                  {speciesCount}+
                </span>
                <span className="text-[11px] text-[#27187e]/75 font-sans mt-1 block font-medium">
                  Fish Species
                </span>
              </div>
              
              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block leading-none">
                  Guides
                </span>
                <span className="text-[11px] text-[#27187e]/75 font-sans mt-1 block font-medium">
                  For All Levels
                </span>
              </div>

              <div>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block leading-none">
                  Helpful Tools
                </span>
                <span className="text-[11px] text-[#27187e]/75 font-sans mt-1 block font-medium">
                  Plan with Confidence
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Large Realistic Discus Aquarium Photo with S-Curve Boundary & Script */}
          <div className="lg:col-span-6 relative flex flex-col items-end">
            <div className="relative w-full aspect-[4/5] max-w-lg rounded-tl-[10rem] rounded-bl-[14rem] rounded-tr-3xl rounded-br-3xl overflow-hidden shadow-2xl border-4 border-[#f7f7ff] bg-[#edeafc]">
              <Image
                src="/images/hero_discus.jpg"
                alt="Majestic blue Discus fish in a thriving planted aquarium"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />
              
              {/* Subtle inner shadow gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Script Signature matching the reference */}
              <div className="absolute bottom-6 right-6 text-right text-[#f7f7ff] select-none pointer-events-none drop-shadow-lg">
                <p className="text-xl sm:text-2xl font-serif italic tracking-wide text-[#f7f7ff]">
                  More
                </p>
                <p className="text-2xl sm:text-3xl font-serif italic font-normal tracking-wide text-[#f7f7ff]">
                  Than a Hobby.
                </p>
                <p className="text-xl sm:text-2xl font-serif italic text-[#f7f7ff]">
                  A Healthier World.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
