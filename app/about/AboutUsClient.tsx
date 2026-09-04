'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shield, Award, ArrowRight, Fish, Leaf, Wrench, Compass } from 'lucide-react';
import { siteConfig } from '@/config/site';
import GlobalCTA from '@/components/ui/GlobalCTA';

export default function AboutUsClient() {
  const pillars = [
    {
      title: 'Scientific Accuracy',
      desc: 'Care parameters, temperature tolerances, and minimum tank sizing derived from biological requirements, not retail convenience.',
      icon: <Award className="w-6 h-6 text-[#27187e]" />,
    },
    {
      title: 'Animal Welfare First',
      desc: 'We advocate for proper nitrogen cycling, species-appropriate swimming footprints, and zero cruelty.',
      icon: <Heart className="w-6 h-6 text-[#27187e]" />,
    },
    {
      title: 'Educational Accessibility',
      desc: 'Demystifying complex water chemistry, pH buffering, and biological filtration into clear, human advice.',
      icon: <Shield className="w-6 h-6 text-[#27187e]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left font-sans marine-pattern-light">
      <div className="site-container">
        
        {/* Hero Section */}
        <div className="mb-16 pb-12 border-b border-[#cfcaf5]">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-3 block">
            ABOUT THE ATLAS
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide mb-6">
            ROSHAN AQUVA WORLD
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#27187e]/90 font-normal max-w-3xl leading-relaxed">
            An independent aquarium knowledge resource built to help fishkeepers choose livestock responsibly, understand water chemistry, and establish resilient aquatic habitats.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/fish"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Browse Species Library</span>
              <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f7f7ff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all"
            >
              <span>Contact Us</span>
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
                <div className="w-12 h-12 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#27187e]/80 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Section */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-8 sm:p-12 mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-normal text-[#27187e] mb-6">
            The Philosophy of The Atlas
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-[#27187e]/85 leading-relaxed font-sans max-w-3xl">
            <p>
              Aquarium fishkeeping is a deeply rewarding craft, but novice keepers are often overwhelmed by contradictory advice, marketing gimmicks, or premature stocking advice.
            </p>
            <p>
              {siteConfig.name} was created as an unbiased field guide: documented species parameters, realistic volume guidelines, clear nitrogen cycle explanations, and practical compatibility warnings without jargon or sales pitches.
            </p>
          </div>
        </div>

      </div>

      <GlobalCTA
        badge="JOIN THE ATLAS COMMUNITY"
        title={
          <>
            Explore our open, science-backed <br className="hidden sm:inline" />
            aquarium encyclopedia.
          </>
        }
        description="Whether setting up your very first 10-gallon nano or planning a 125-gallon planted biotope, we're here to help."
        primaryAction={{
          label: 'Start Aquarium Guide',
          href: '/start-aquarium',
        }}
        secondaryAction={{
          label: 'Contact the Atlas Team',
          href: '/contact',
        }}
      />
    </div>
  );
}
