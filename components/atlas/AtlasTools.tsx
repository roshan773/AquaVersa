import Link from 'next/link';
import { ArrowRight, GitCompare, Ruler, Leaf, Wrench, FlaskConical, CalendarDays } from 'lucide-react';

export default function AtlasTools() {
  const tools = [
    {
      title: 'Fish Compatibility Checker',
      desc: 'Verify temperature, pH, adult sizes, and social temperaments before introducing new tankmates.',
      icon: GitCompare,
      href: '/compatibility',
    },
    {
      title: 'Tank Size & Volume Guide',
      desc: 'Explore footprint dimensions, filled weights, and realistic stocking capacities from 5 to 75+ gallons.',
      icon: Ruler,
      href: '/tank-size',
    },
    {
      title: 'Plant Matcher',
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
      title: 'Water Chemistry Reference',
      desc: 'Learn practical management of ammonia, nitrite, nitrate, pH, and water hardness.',
      icon: FlaskConical,
      href: '/water-params',
    },
    {
      title: 'Maintenance Schedule',
      desc: 'Daily, weekly, and monthly checklists to maintain biological equilibrium without panic.',
      icon: CalendarDays,
      href: '/start-aquarium',
    },
  ];

  return (
    <section className="marine-pattern-light py-24 bg-[#f7f7ff] text-left border-t border-[#cfcaf5]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            PRACTICAL UTILITIES
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
            Plan before you stock.
          </h2>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-xl mt-2 font-sans leading-relaxed">
            Essential reference tools and calculators to prevent costly mistakes and safeguard aquatic life.
          </p>
        </div>

        {/* 6 Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-7 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] mb-5 group-hover:bg-[#27187e] group-hover:text-[#f7f7ff] transition-all">
                  <item.icon className="w-6 h-6 text-current" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-2 group-hover:text-[#1b1059] transition-colors leading-tight">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#27187e]/80 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
