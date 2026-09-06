import Link from 'next/link';
import { BookOpen, ArrowRight, FlaskConical, Leaf, Wrench, Compass, GitCompare } from 'lucide-react';
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import GlobalCTA from '@/components/ui/GlobalCTA';

export const metadata = constructMetadata({
  title: 'Aquarium Setup & Fish Care Reference Guides',
  description: 'Step-by-step guides covering nitrogen cycle chemistry, live planted aquascapes, filtration sizing, disease prevention, and beginner tank setup.',
  path: '/guides',
});

export default function GuidesPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Aquarium Knowledge Guides', url: '/guides' },
  ]);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] text-left marine-pattern-light font-readable">
        <section className="pt-32 pb-24">
          <div className="site-container">
            
            {/* Header */}
            <div className="mb-14 pb-8 border-b-2 border-[#cfcaf5]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-4">
                <BookOpen className="w-3.5 h-3.5 text-[#27187e]" />
                <span>Knowledge Pillars</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-tight mb-4">
                AQUARIUM GUIDES
              </h1>
              <p className="text-base sm:text-lg text-[#27187e]/80 max-w-2xl leading-relaxed font-medium">
                Structured reference guides and operational protocols for freshwater and marine aquarium keepers at every experience level.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guideCategories.map((guide, idx) => {
                const Icon = guide.icon;
                return (
                  <Link
                    key={idx}
                    href={guide.href}
                    className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-8 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] flex items-center justify-center mb-6 group-hover:bg-[#27187e] group-hover:text-[#ffffff] transition-colors duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h2 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] mb-3 leading-tight">
                        {guide.title}
                      </h2>
                      <p className="text-sm text-[#27187e]/80 leading-relaxed font-medium mb-6">
                        {guide.desc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#edeafc] flex items-center justify-between font-semibold text-sm text-[#27187e]">
                      <span>Read Guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>

        <GlobalCTA
          badge="AQUARIUM PLANNING TOOLS"
          title={
            <>
              Apply guide recommendations <br className="hidden sm:inline" />
              with our interactive calculators.
            </>
          }
          description="Size your filter turnover, calculate tank dimensions, and verify water chemistry."
          primaryAction={{
            label: 'Check Water Parameters',
            href: '/water-params',
          }}
          secondaryAction={{
            label: 'Open Species Atlas',
            href: '/fish',
          }}
        />
      </div>
    </>
  );
}
