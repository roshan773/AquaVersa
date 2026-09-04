import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AtlasDestinations() {
  const destinations = [
    {
      id: 'fish',
      title: 'FISH',
      subtitle: 'Species Catalog',
      desc: 'Discover freshwater and saltwater species with detailed care parameters, temperaments, and minimum tank dimensions.',
      image: '/images/betta.png',
      href: '/fish',
    },
    {
      id: 'plants',
      title: 'PLANTS',
      subtitle: 'Botanical Index',
      desc: 'Explore hardy low-tech and high-light aquatic flora to naturally absorb nitrates and oxygenate water.',
      image: '/images/anubias.png',
      href: '/plants',
    },
    {
      id: 'equipment',
      title: 'EQUIPMENT',
      subtitle: 'Hardware Guide',
      desc: 'Understand filtration mechanics, precision heating thermostats, and full-spectrum LED lighting.',
      image: '/images/canister_filter.png',
      href: '/equipment',
    },
    {
      id: 'guides',
      title: 'GUIDES',
      subtitle: 'Knowledge Base',
      desc: 'In-depth reference articles on biological cycling, acclimation protocols, and long-term water stability.',
      image: '/hero_aquarium.jpg',
      href: '/guides',
    },
  ];

  return (
    <section className="marine-pattern-light py-24 bg-[#f7f7ff] text-left border-t border-[#cfcaf5]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            THE ATLAS ARCHIVE
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
            Explore the underwater world.
          </h2>
        </div>

        {/* 4 Large Image-Led Destination Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] bg-[#edeafc] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#27187e] text-[#f7f7ff] px-3 py-1 rounded-full text-xs font-condensed font-bold uppercase tracking-wider">
                    {item.subtitle}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#27187e]/80 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-2 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                <span>Explore Archive</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
