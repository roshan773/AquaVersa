'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shield, Award, ArrowRight, Fish, Leaf, Wrench, Compass, Layers } from 'lucide-react';
import { siteConfig } from '@/config/site';
import GlobalCTA from '@/components/ui/GlobalCTA';

export default function AboutUsClient() {
  const pillars = [
    {
      title: 'Scientific Accuracy',
      desc: 'Care parameters, thermal tolerances, and minimum aquarium volume requirements derived from biological data, not pet store sales convenience.',
      icon: <Award className="w-6 h-6 text-[#27187e]" />,
    },
    {
      title: 'Animal Welfare First',
      desc: 'We advocate for complete nitrogen cycle establishment, generous swimming footprints, and zero stress-inducing cohabitation.',
      icon: <Heart className="w-6 h-6 text-[#27187e]" />,
    },
    {
      title: 'Educational Accessibility',
      desc: 'Demystifying complex water chemistry, pH carbonate buffering, and biological filtration mechanics into clear, practical keeper guidance.',
      icon: <Shield className="w-6 h-6 text-[#27187e]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left font-readable marine-pattern-light">
      <div className="site-container">
        
        {/* Hero Section */}
        <div className="mb-16 pb-12 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Digital Field Guide Mission</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-6">
            ABOUT ROSHAN AQUVA WORLD
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#27187e]/90 font-medium max-w-3xl leading-relaxed">
            An independent aquarium knowledge platform built to empower fishkeepers with verified natural history data, water chemistry tools, and biotope planning guides.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/fish"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-sm sm:text-base font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Browse Species Library</span>
              <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#ffffff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] text-sm sm:text-base font-bold uppercase tracking-wider transition-all"
            >
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>

        {/* Core Mission Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Section */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-8 sm:p-12 mb-16 shadow-sm">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-[#27187e] mb-6">
            The Philosophy of The Field Guide
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-[#27187e]/90 leading-relaxed font-medium max-w-3xl">
            <p>
              Aquarium fishkeeping is a deeply rewarding science, but novice keepers are frequently overwhelmed by conflicting marketing claims, uncycled setups, and overcrowded stocking advice.
            </p>
            <p>
              {siteConfig.name} was established as a rigorous digital reference: complete biological species parameters, realistic volume and footprint requirements, clear nitrogen chemistry explanations, and honest compatibility warnings.
            </p>
          </div>
        </div>

      </div>

      <GlobalCTA
        badge="GET IN TOUCH"
        title={
          <>
            Have a question or suggestions <br className="hidden sm:inline" />
            for our species archive?
          </>
        }
        description="Our team welcomes feedback, species care corrections, and keeper inquiries."
        primaryAction={{
          label: 'Contact Us',
          href: '/contact',
        }}
        secondaryAction={{
          label: 'Explore Species Catalog',
          href: '/fish',
        }}
      />
    </div>
  );
}
