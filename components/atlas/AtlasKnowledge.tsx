import Link from 'next/link';
import { Droplets, Maximize2, Users, Utensils, RefreshCw, ArrowRight } from 'lucide-react';

export default function AtlasKnowledge() {
  const pillars = [
    {
      num: '01',
      title: 'Water Chemistry',
      subtitle: 'The Invisible Foundation',
      desc: 'An established aquarium is a closed biological ecosystem. Beneficial nitrifying bacteria convert toxic ammonia and nitrite into manageable nitrate. Stability is vastly more important than chasing textbook pH numbers.',
      icon: <Droplets className="w-6 h-6 text-[#27187e]" />,
      href: '/water-params',
    },
    {
      num: '02',
      title: 'Space & Volume',
      subtitle: 'Swimming Footprints',
      desc: 'Water volume determines biological buffer capacity against waste spikes, while tank length provides the swimming distance required by active schooling fish. Vertical height matters less than surface footprint.',
      icon: <Maximize2 className="w-6 h-6 text-[#27187e]" />,
      href: '/tank-size',
    },
    {
      num: '03',
      title: 'Compatibility',
      subtitle: 'Social & Biotope Dynamics',
      desc: 'Fish compatibility depends on temperament, adult size ratios, feeding competition, and habitat chemistry. Never mix predatory species with fish that can fit in their mouth.',
      icon: <Users className="w-6 h-6 text-[#27187e]" />,
      href: '/compatibility',
    },
    {
      num: '04',
      title: 'Diet & Nutrition',
      subtitle: 'Species-Specific Feeding',
      desc: 'Overfeeding is the number one cause of water parameter crashes in new aquariums. Provide high-quality variety (pellets, live/frozen, greens) in amounts consumed within two minutes.',
      icon: <Utensils className="w-6 h-6 text-[#27187e]" />,
      href: '/guides',
    },
    {
      num: '05',
      title: 'Routine Maintenance',
      subtitle: 'Sustainable Habitats',
      desc: 'Consistent 20-25% partial weekly water changes remove accumulated nitrates and replenish vital trace minerals. Regular maintenance preserves long-term biological equilibrium.',
      icon: <RefreshCw className="w-6 h-6 text-[#27187e]" />,
      href: '/guides',
    },
  ];

  return (
    <section className="marine-pattern-dark py-24 bg-[#27187e] text-[#f7f7ff] text-left relative overflow-hidden">
      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#f7f7ff]/80 mb-2 block">
            CORE PRINCIPLES
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#f7f7ff] tracking-wide">
            Good aquariums begin with good information.
          </h2>
          <p className="text-base sm:text-lg text-[#f7f7ff]/85 font-normal max-w-2xl mt-3 font-sans leading-relaxed">
            Every successful aquarium relies on five foundational pillars of aquatic ecology.
          </p>
        </div>

        {/* 5 Pillars Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <Link
              key={item.num}
              href={item.href}
              className={`bg-[#1f1366] border-2 border-[#3b28ab] hover:border-[#f7f7ff]/60 rounded-3xl p-8 flex flex-col justify-between group transition-all duration-300 shadow-xl hover:-translate-y-1 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#27187e] border border-[#3b28ab] flex items-center justify-center text-[#f7f7ff]">
                    {item.icon}
                  </div>
                  <span className="font-display text-4xl text-[#f7f7ff]/30 group-hover:text-[#f7f7ff] transition-colors">
                    {item.num}
                  </span>
                </div>

                <span className="text-xs uppercase font-condensed tracking-widest text-[#f7f7ff]/70 font-bold block mb-1">
                  {item.subtitle}
                </span>

                <h3 className="text-3xl font-display font-normal text-[#f7f7ff] mb-3 leading-tight">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#f7f7ff]/80 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#3b28ab] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#f7f7ff]">
                <span>Read Knowledge Article</span>
                <ArrowRight className="w-4 h-4 text-[#f7f7ff] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
