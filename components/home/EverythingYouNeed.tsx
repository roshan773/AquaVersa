import Link from 'next/link';
import { Fish, Flower2, Settings, Wrench, ArrowRight } from 'lucide-react';

export default function EverythingYouNeed() {
  const resources = [
    {
      num: '01',
      title: 'Fish Library',
      desc: 'Explore freshwater and saltwater species with detailed care guides.',
      icon: <Fish className="w-5 h-5 text-[#27187e]" />,
      href: '/fish',
    },
    {
      num: '02',
      title: 'Aquarium Plants',
      desc: 'Find the right plants for your setup and lighting.',
      icon: <Flower2 className="w-5 h-5 text-[#27187e]" />,
      href: '/plants',
    },
    {
      num: '03',
      title: 'Equipment Guide',
      desc: 'Learn about essential and advanced aquarium equipment.',
      icon: <Settings className="w-5 h-5 text-[#27187e]" />,
      href: '/equipment',
    },
    {
      num: '04',
      title: 'Aquarium Tools',
      desc: 'Use our interactive tools to plan with confidence.',
      icon: <Wrench className="w-5 h-5 text-[#27187e]" />,
      href: '/compatibility',
    },
  ];

  return (
    <section className="py-20 bg-[#f7f7ff] text-center">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header (Centered) */}
        <div className="mb-12 flex flex-col items-center">
          <span className="inline-block text-[10px] font-condensed font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-md bg-[#edeafc] text-[#27187e] border border-[#cfcaf5] mb-3">
            EXPLORE
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
            EVERYTHING YOU NEED
          </h2>
          <p className="text-sm text-[#27187e]/80 font-normal max-w-lg mt-2 font-sans">
            Tools, guides and resources to help you create and maintain a thriving aquarium.
          </p>
        </div>

        {/* 2x2 Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 text-left">
          {resources.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="bg-[#ffffff] border border-[#cfcaf5]/70 hover:border-[#27187e] p-7 rounded-2xl flex items-center justify-between group transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-4 max-w-[80%]">
                <div className="w-10 h-10 rounded-xl bg-[#edeafc] flex items-center justify-center border border-[#cfcaf5] group-hover:bg-[#27187e] group-hover:text-[#f7f7ff] transition-colors shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-normal text-[#27187e] mb-1 tracking-wide group-hover:text-[#1b1059] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#27187e]/75 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>

              <span className="font-display text-4xl text-[#27187e]/30 group-hover:text-[#27187e] transition-colors shrink-0">
                {item.num}
              </span>
            </Link>
          ))}
        </div>

        {/* Centered Action Button */}
        <div className="flex justify-center">
          <Link
            href="/fish"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <span>Explore All Features</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f7f7ff]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
