import Link from 'next/link';
import { Droplets, Maximize2, Users, Utensils, RefreshCw, ArrowRight, BookOpen } from 'lucide-react';

export default function AtlasKnowledge() {
  const pillars = [
    {
      num: '01',
      title: 'Water Chemistry',
      subtitle: 'The Invisible Foundation',
      desc: 'An established aquarium is a closed biological ecosystem. Beneficial nitrifying bacteria convert toxic ammonia and nitrite into manageable nitrate. Stability is vastly more important than chasing textbook pH numbers.',
      icon: Droplets,
      href: '/water-params',
    },
    {
      num: '02',
      title: 'Space & Volume',
      subtitle: 'Swimming Footprints',
      desc: 'Water volume determines biological buffer capacity against waste spikes, while tank length provides the swimming distance required by active schooling fish. Vertical height matters less than surface footprint.',
      icon: Maximize2,
      href: '/tank-size',
    },
    {
      num: '03',
      title: 'Compatibility',
      subtitle: 'Social & Biotope Dynamics',
      desc: 'Fish compatibility depends on temperament, adult size ratios, feeding competition, and habitat chemistry. Never mix predatory species with fish that can fit in their mouth.',
      icon: Users,
      href: '/compatibility',
    },
    {
      num: '04',
      title: 'Diet & Nutrition',
      subtitle: 'Species-Specific Feeding',
      desc: 'Overfeeding is the number one cause of water parameter crashes in new aquariums. Provide high-quality variety (pellets, live/frozen, greens) in amounts consumed within two minutes.',
      icon: Utensils,
      href: '/guides',
    },
    {
      num: '05',
      title: 'Routine Maintenance',
      subtitle: 'Sustainable Habitats',
      desc: 'Consistent 20-25% partial weekly water changes remove accumulated nitrates and replenish vital trace minerals. Regular maintenance preserves long-term biological equilibrium.',
      icon: RefreshCw,
      href: '/guides',
    },
  ];

  return (
    <section className="marine-pattern-dark py-24 bg-[#27187e] text-[#f7f7ff] text-left relative overflow-hidden">
      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#cfcaf5] mb-2 block">
            CORE PRINCIPLES
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#ffffff] tracking-wide">
            Good aquariums begin with good information.
          </h2>
          <p className="font-readable text-sm sm:text-base md:text-lg text-[#e2dffa] font-normal max-w-2xl mt-3 leading-relaxed">
            Every successful aquarium relies on five foundational pillars of aquatic ecology.
          </p>
        </div>

        {/* 5 Pillars Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <Link
              key={item.num}
              href={item.href}
              className={`bg-[#1b1059] border-2 border-[#cfcaf5]/30 hover:border-[#ffffff] rounded-3xl p-8 flex flex-col justify-between group transition-all duration-300 shadow-xl hover:-translate-y-1.5 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* High-Contrast Visible Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] group-hover:bg-[#ffffff] group-hover:scale-105 transition-all shadow-md">
                    <item.icon className="w-6 h-6 text-[#27187e]" strokeWidth={2.2} />
                  </div>
                  <span className="font-display text-4xl sm:text-5xl text-[#cfcaf5]/40 group-hover:text-[#ffffff] transition-colors">
                    {item.num}
                  </span>
                </div>

                <span className="font-sans text-xs uppercase tracking-widest text-[#cfcaf5] font-bold block mb-1">
                  {item.subtitle}
                </span>

                <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#ffffff] mb-3 leading-tight">
                  {item.title}
                </h3>

                <p className="font-readable text-sm sm:text-base text-[#e2dffa] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#cfcaf5]/20 flex items-center justify-between font-readable text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#ffffff]">
                <span>Read Knowledge Article</span>
                <ArrowRight className="w-4 h-4 text-[#ffffff] group-hover:translate-x-1.5 transition-transform" strokeWidth={2.2} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

