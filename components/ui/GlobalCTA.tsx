'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export interface GlobalCTAProps {
  badge?: string;
  title?: React.ReactNode;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export default function GlobalCTA({
  badge = 'ROSHAN AQUVA WORLD',
  title = 'Build a better aquarium, one decision at a time.',
  description = 'Explore species requirements, water chemistry parameters, and practical equipment guides in our comprehensive archive.',
  primaryAction = {
    label: 'Explore Species Catalog',
    href: '/fish',
  },
  secondaryAction = {
    label: 'Start with the Basics',
    href: '/start-aquarium',
  },
}: GlobalCTAProps) {
  return (
    <section className="py-12 sm:py-16 bg-[#27187e] text-[#f7f7ff] text-left border-t border-[#3b28ab] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#3b28ab]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#12093d]/50 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

      <div className="site-container relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Text Column */}
          <div className="max-w-2xl text-left">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1059] border border-[#cfcaf5]/30 text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#cfcaf5] mb-3 shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#cfcaf5]" />
                <span>{badge}</span>
              </div>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-[#ffffff] tracking-wide leading-snug mb-3">
              {title}
            </h2>

            {description && (
              <p className="font-readable text-sm sm:text-base md:text-lg text-[#e2dffa] font-normal leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#ffffff] hover:bg-[#edeafc] text-[#27187e] font-readable text-sm sm:text-base font-semibold transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" strokeWidth={2.2} aria-hidden="true" />
              </Link>
            )}

            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1b1059] border-2 border-[#cfcaf5]/40 hover:border-[#ffffff] text-[#ffffff] font-readable text-sm sm:text-base font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{secondaryAction.label}</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

