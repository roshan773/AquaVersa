'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

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
    <section className="py-10 sm:py-14 bg-[#27187e] text-[#f7f7ff] text-left border-t border-[#3b28ab] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#3b28ab]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#1a0f5c]/40 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

      <div className="site-container relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-10">
          
          {/* Left Text Column */}
          <div className="max-w-2xl text-left">
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3b28ab]/60 border border-[#cfcaf5]/20 text-[10px] font-condensed font-bold uppercase tracking-[0.2em] text-[#cfcaf5] mb-3 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#f7f7ff]" strokeWidth={2} aria-hidden="true" />
                <span>{badge}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-[#f7f7ff] tracking-wide leading-snug mb-2">
              {title}
            </h2>

            {description && (
              <p className="text-xs sm:text-sm text-[#cfcaf5] font-normal leading-relaxed font-sans">
                {description}
              </p>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f7f7ff] hover:bg-[#edeafc] text-[#27187e] text-xs font-condensed font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 group"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#27187e] group-hover:translate-x-0.5 transition-transform" strokeWidth={2} aria-hidden="true" />
              </Link>
            )}

            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-transparent border border-[#f7f7ff]/70 hover:border-[#f7f7ff] hover:bg-[#f7f7ff]/10 text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
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
