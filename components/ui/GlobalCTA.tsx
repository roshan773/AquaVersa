'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Fish,
  Leaf,
  FlaskConical,
  Wrench,
  BookOpen,
  type LucideIcon
} from 'lucide-react';

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
  showQuickLinks?: boolean;
}

const defaultQuickLinks = [
  { label: 'Species Library', href: '/fish', icon: Fish },
  { label: 'Aquatic Flora', href: '/plants', icon: Leaf },
  { label: 'Water Analyzer', href: '/water-analyzer', icon: FlaskConical },
  { label: 'Gear & Filtration', href: '/equipment', icon: Wrench },
  { label: 'Setup Guides', href: '/guides', icon: BookOpen },
];

export default function GlobalCTA({
  badge = 'ROSHAN AQUVA WORLD // ATLAS',
  title = (
    <>
      Build a healthier, thriving aquarium <br className="hidden sm:inline" />
      with science-backed guidance.
    </>
  ),
  description = 'Access verified species profiles, water chemistry parameters, and step-by-step tank building tools curated by experienced aquarists.',
  primaryAction = {
    label: 'Explore Species Atlas',
    href: '/fish',
  },
  secondaryAction = {
    label: 'Start Aquarium Guide',
    href: '/start-aquarium',
  },
  showQuickLinks = true,
}: GlobalCTAProps) {
  return (
    <section className="relative py-20 sm:py-28 bg-[#27187e] text-[#f7f7ff] text-left overflow-hidden border-t border-[#3b28ab]">
      {/* Ambient background subtle lighting and contour effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3b28ab]/30 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a0f5c]/50 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />
      
      {/* Geometric subtle blueprint grid lines */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#f7f7ff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3b28ab]/60 border border-[#cfcaf5]/20 text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#cfcaf5] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#f7f7ff]" strokeWidth={2} aria-hidden="true" />
            <span>{badge}</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#f7f7ff] tracking-wide leading-[0.96] mb-6 text-center">
            {title}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-[#cfcaf5] font-normal max-w-2xl mb-10 font-sans leading-relaxed text-center">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#f7f7ff] hover:bg-[#edeafc] text-[#27187e] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 group"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-0.5 transition-transform" strokeWidth={2} aria-hidden="true" />
              </Link>
            )}

            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-transparent border-2 border-[#f7f7ff] hover:bg-[#f7f7ff]/10 text-[#f7f7ff] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <span>{secondaryAction.label}</span>
              </Link>
            )}
          </div>

          {/* Quick Access Tool Chips */}
          {showQuickLinks && (
            <div className="w-full pt-10 border-t border-[#3b28ab]/80">
              <span className="text-[11px] uppercase font-condensed font-bold tracking-[0.2em] text-[#cfcaf5]/70 block mb-4">
                Explore Essential Atlas Archives &amp; Tools
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {defaultQuickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1f1366]/80 border border-[#3b28ab] hover:border-[#f7f7ff] text-[#cfcaf5] hover:text-[#f7f7ff] text-xs font-sans font-medium transition-all shadow-sm hover:scale-105"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#cfcaf5] group-hover:text-[#f7f7ff]" strokeWidth={1.8} aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
