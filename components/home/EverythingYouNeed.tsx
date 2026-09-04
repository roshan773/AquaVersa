import Link from 'next/link';
import { Fish, Leaf, Wrench, Compass, ArrowRight } from 'lucide-react';

export default function EverythingYouNeed() {
  const resources = [
    {
      num: '01',
      title: 'Fish Library',
      desc: 'Explore freshwater and saltwater species with detailed care guides.',
      icon: <Fish className="w-6 h-6 text-[#27187e]" />,
      href: '/fish',
      action: 'Browse species',
    },
    {
      num: '02',
      title: 'Aquarium Plants',
      desc: 'Find the right plants for your setup, lighting, and layout.',
      icon: <Leaf className="w-6 h-6 text-[#27187e]" />,
      href: '/plants',
      action: 'Explore flora',
    },
    {
      num: '03',
      title: 'Equipment Guide',
      desc: 'Learn about essential filtration, heaters, and lighting hardware.',
      icon: <Wrench className="w-6 h-6 text-[#27187e]" />,
      href: '/equipment',
      action: 'View equipment',
    },
    {
      num: '04',
      title: 'Aquarium Tools',
      desc: 'Use interactive compatibility and sizing tools to plan with confidence.',
      icon: <Compass className="w-6 h-6 text-[#27187e]" />,
      href: '/compatibility',
      action: 'Launch tools',
    },
  ];

  return (
    <section className="py-20 bg-[#f7f7ff] border-t border-[#cfcaf5] text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-condensed font-bold uppercase tracking-widest text-[#27187e] mb-2 block">
            EXPLORE
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
            EVERYTHING YOU NEED
          </h2>
          <p className="text-base text-[#27187e]/80 font-normal max-w-xl mt-2 font-sans">
            Tools, guides and resources to help you create and maintain a thriving aquarium.
          </p>
        </div>

        {/* 2x2 Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="editorial-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#edeafc] flex items-center justify-center border border-[#cfcaf5] group-hover:bg-[#27187e] group-hover:text-[#f7f7ff] transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-display text-3xl sm:text-4xl text-[#27187e]/40 group-hover:text-[#27187e] transition-colors">
                    {item.num}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-normal text-[#27187e] mb-2 tracking-wide group-hover:text-[#1b1059] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#27187e]/75 leading-relaxed font-sans mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                <span>{item.action}</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
