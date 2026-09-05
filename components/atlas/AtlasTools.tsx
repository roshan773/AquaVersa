import Link from 'next/link';
import { ArrowRight, Compass, Maximize2, Leaf, Wrench, FlaskConical, CalendarDays } from 'lucide-react';

export default function AtlasTools() {
  const tools = [
    {
      title: 'Species Compatibility Matrix',
      desc: 'Verify temperature, pH, adult sizes, and social temperaments before introducing new tankmates.',
      icon: Compass,
      href: '/compatibility',
    },
    {
      title: 'Tank Size & Volume Guide',
      desc: 'Explore footprint dimensions, filled weights, and realistic stocking capacities from 5 to 75+ gallons.',
      icon: Maximize2,
      href: '/tank-size',
    },
    {
      title: 'Aquarium Flora Matcher',
      desc: 'Find live aquatic flora matched to your lighting levels, substrate, and maintenance commitment.',
      icon: Leaf,
      href: '/plants',
    },
    {
      title: 'Equipment Recommender',
      desc: 'Get tailored hardware recommendations for filtration flow rates, heaters, and LED lighting.',
      icon: Wrench,
      href: '/equipment',
    },
    {
      title: 'Water Chemistry Analyzer',
      desc: 'Learn practical management of ammonia, nitrite, nitrate, pH, and water hardness.',
      icon: FlaskConical,
      href: '/water-analyzer',
    },
    {
      title: 'Maintenance Schedule',
      desc: 'Daily, weekly, and monthly checklists to maintain biological equilibrium without panic.',
      icon: CalendarDays,
      href: '/start-aquarium',
    },
  ];

  return (
    <section className="marine-pattern-light py-20 sm:py-24 bg-[#f7f7ff] text-left border-t border-[#cfcaf5]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            PRACTICAL UTILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#27187e] tracking-wide">
            Plan before you stock.
          </h2>
          <p className="font-readable text-sm sm:text-base md:text-lg text-[#27187e]/85 max-w-xl mt-2 leading-relaxed">
            Essential reference tools and calculators to prevent costly mistakes and safeguard aquatic life.
          </p>
        </div>

        {/* 6 Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-7 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] mb-5 group-hover:bg-[#27187e] group-hover:text-[#f7f7ff] transition-all shadow-xs">
                  <item.icon className="w-6 h-6 text-current" strokeWidth={2} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-2 group-hover:text-[#1b1059] transition-colors leading-tight">
                  {item.title}
                </h3>

                <p className="font-readable text-sm sm:text-base text-[#27187e]/85 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#edeafc] flex items-center justify-between font-readable text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#27187e]">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1.5 transition-transform" strokeWidth={2.2} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

