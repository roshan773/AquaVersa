import Link from 'next/link';
import { BookOpen, ArrowRight, FlaskConical, Leaf, Wrench, Compass, GitCompare } from 'lucide-react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Aquarium Knowledge Guides & Reference Articles | ${siteConfig.name}`,
  description: `In-depth step-by-step editorial guides covering nitrogen water chemistry, planted aquascapes, hardware selection, and disease prevention.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/guides`,
  },
};

export default function GuidesPage() {
  const guideCategories = [
    {
      title: 'Water Chemistry & Nitrogen Cycle',
      desc: 'Master ammonia, nitrite, nitrate conversion, and pH stability to establish a biologically resilient aquarium.',
      icon: FlaskConical,
      href: '/water-params',
    },
    {
      title: 'Aquascaping & Live Flora',
      desc: 'Discover low-tech aquatic plants, substrate selection, CO2 requirements, and layout principles.',
      icon: Leaf,
      href: '/plants',
    },
    {
      title: 'Tank Size & Volume Planning',
      desc: 'Understand surface area gas exchange, floor weight distribution, and realistic stocking capacities.',
      icon: Compass,
      href: '/tank-size',
    },
    {
      title: 'Filtration & Hardware Architecture',
      desc: 'Compare sponge, hang-on-back, and canister filtration flow rates for mechanical and biological media.',
      icon: Wrench,
      href: '/equipment',
    },
    {
      title: 'Species Compatibility & Social Behavior',
      desc: 'Evaluate temperament dynamics, schooling requirements, and biotope matching before adding livestock.',
      icon: GitCompare,
      href: '/compatibility',
    },
    {
      title: 'Beginner 5-Step Setup Progression',
      desc: 'A structured roadmap from dry tank placement to cycling, acclimation, and weekly water change discipline.',
      icon: BookOpen,
      href: '/start-aquarium',
    },
  ];

  return (
    <section className="min-h-screen pt-32 pb-24 bg-[#f7f7ff] text-[#27187e] text-left font-sans marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-[#cfcaf5]">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            KNOWLEDGE BASE
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide mb-3">
            CARE GUIDES &amp; ARTICLES
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-2xl font-sans leading-relaxed">
            Carefully written natural history reference articles on aquatic husbandry, water parameter management, and habitat planning.
          </p>
        </div>

        {/* 6 Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideCategories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-7 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] mb-5 group-hover:bg-[#27187e] group-hover:text-[#f7f7ff] transition-all">
                  <item.icon className="w-6 h-6 text-current" strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-2 group-hover:text-[#1b1059] transition-colors leading-tight">
                  {item.title}
                </h2>

                <p className="text-sm text-[#27187e]/80 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                <span>Read Reference Article</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
