import Link from 'next/link';
import { Fish, Flower2, Settings, Wrench, ArrowRight } from 'lucide-react';

export default function EverythingYouNeed() {
  const resources = [
    {
      num: '01',
      title: 'Fish Library',
      desc: 'Explore freshwater and saltwater species with detailed care guides.',
      icon: <Fish className="w-6 h-6 text-[#27187e]" />,
      href: '/fish',
    },
    {
      num: '02',
      title: 'Aquarium Plants',
      desc: 'Find the right plants for your setup and lighting.',
      icon: <Flower2 className="w-6 h-6 text-[#27187e]" />,
      href: '/plants',
    },
    {
      num: '03',
      title: 'Equipment Guide',
      desc: 'Learn about essential and advanced aquarium equipment.',
      icon: <Settings className="w-6 h-6 text-[#27187e]" />,
      href: '/equipment',
    },
    {
      num: '04',
      title: 'Aquarium Tools',
      desc: 'Use our interactive tools to plan with confidence.',
      icon: <Wrench className="w-6 h-6 text-[#27187e]" />,
      href: '/compatibility',
    },
  ];

  return (
    <section className="marine-pattern-light py-24 bg-[#f7f7ff] text-center relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header (Centered) */}
        <div className="mb-14 flex flex-col items-center">
          <span className="inline-block text-xs font-condensed font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-[#edeafc] text-[#27187e] border border-[#cfcaf5] mb-3">
            EXPLORE
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide">
            EVERYTHING YOU NEED
          </h2>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-xl mt-3 font-sans leading-relaxed">
            Tools, guides and resources to help you create and maintain a thriving aquarium.
          </p>
        </div>

        {/* 2x2 Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          {resources.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="bg-[#ffffff] border-2 border-[#cfcaf5]/80 hover:border-[#27187e] p-8 rounded-3xl flex items-center justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start gap-5 max-w-[80%]">
                <div className="w-12 h-12 rounded-2xl bg-[#edeafc] flex items-center justify-center border border-[#cfcaf5] group-hover:bg-[#27187e] group-hover:text-[#f7f7ff] transition-colors shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-1.5 tracking-wide group-hover:text-[#1b1059] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#27187e]/80 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>

              <span className="font-display text-5xl sm:text-6xl text-[#27187e]/25 group-hover:text-[#27187e] transition-colors shrink-0">
                {item.num}
              </span>
            </Link>
          ))}
        </div>

        {/* Centered Action Button */}
        <div className="flex justify-center">
          <Link
            href="/fish"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <span>Explore All Features</span>
            <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
