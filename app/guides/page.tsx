import Link from 'next/link';
import { BookOpen, ArrowRight, FlaskConical, Leaf, Wrench, Compass, GitCompare, Layers } from 'lucide-react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import GlobalCTA from '@/components/ui/GlobalCTA';

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
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] text-left marine-pattern-light font-readable">
      <section className="pt-32 pb-24">
        <div className="site-container">
          
          {/* Header */}
          <div className="mb-12 pb-8 border-b-2 border-[#cfcaf5]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5 text-[#27187e]" />
              <span>Editorial Field Knowledge</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
              CARE GUIDES &amp; ARTICLES
            </h1>
            <p className="text-base sm:text-lg text-[#27187e]/85 max-w-2xl leading-relaxed font-medium">
              Carefully researched natural history reference articles on aquatic husbandry, water parameter management, and biotope habitat design.
            </p>
          </div>

          {/* 6 Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {guideCategories.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-7 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] mb-5 group-hover:bg-[#27187e] group-hover:text-[#f7f7ff] transition-all shadow-sm">
                    <item.icon className="w-6 h-6 text-current" strokeWidth={2} aria-hidden="true" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-2 group-hover:text-[#1b1059] transition-colors leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#edeafc] flex items-center justify-between text-sm font-semibold text-[#27187e]">
                  <span>Read Reference Guide</span>
                  <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

        </div>

        <GlobalCTA
          badge="AQUARIUM KNOWLEDGE BASE"
          title={
            <>
              Have questions about your <br className="hidden sm:inline" />
              aquarium setup?
            </>
          }
          description="Use our interactive tools to calculate tank volumes, diagnose active diseases, and simulate community compatibility."
          primaryAction={{
            label: 'Check Compatibility',
            href: '/compatibility',
          }}
          secondaryAction={{
            label: 'Water Chemistry Analyzer',
            href: '/water-analyzer',
          }}
        />
      </section>
    </div>
  );
}
