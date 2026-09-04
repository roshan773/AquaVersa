'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AtlasHero() {
  return (
    <section className="marine-pattern-light relative pt-32 sm:pt-40 pb-20 bg-[#f7f7ff] text-[#27187e] overflow-hidden text-left">
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Eyebrow, Headline, Description, Buttons */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <span className="text-xs sm:text-sm font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-4 block">
              ROSHAN AQUVA WORLD
            </span>

            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal tracking-wide text-[#27187e] leading-[0.92] mb-6">
              Know your fish. <br />
              Understand your <br />
              aquarium.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#27187e]/90 font-normal max-w-lg leading-relaxed mb-8 font-sans">
              Practical aquarium knowledge for choosing fish, understanding their needs, planning tanks and caring for aquatic life.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-condensed uppercase tracking-wider font-bold">
              <Link
                href="/fish"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-md hover:scale-105 active:scale-95 text-sm group"
              >
                <span>Explore Fish</span>
                <ArrowRight className="w-4 h-4 text-[#f7f7ff] group-hover:translate-x-0.5 transition-transform" strokeWidth={2} aria-hidden="true" />
              </Link>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#f7f7ff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] transition-all shadow-sm text-sm hover:scale-105 active:scale-95"
              >
                <span>Start with the Basics</span>
              </Link>
            </div>

          </div>

          {/* RIGHT: Large Immersive Aquarium Photography */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-xl rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffffff] bg-[#edeafc]">
              <Image
                src="/images/hero_discus.jpg"
                alt="Natural planted freshwater aquarium with blue Discus fish"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 650px"
              />
              
              {/* Subtle natural shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#27187e]/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-left text-[#f7f7ff]">
                <span className="font-display text-2xl tracking-wider block">
                  The Natural Habitat
                </span>
                <span className="text-xs font-sans text-[#f7f7ff]/90 font-medium">
                  Symphysodon aequifasciatus — Planted Amazonian Biotopes
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
