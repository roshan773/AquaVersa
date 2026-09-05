import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Fish, Leaf, Wrench } from 'lucide-react';

export default function AtlasDestinations() {
  const destinations = [
    {
      id: 'fish',
      title: 'FISH LIBRARY',
      subtitle: 'Species Catalog',
      desc: 'Discover freshwater and saltwater species with detailed care parameters, temperaments, and minimum tank dimensions.',
      image: '/images/betta.png',
      href: '/fish',
      icon: Fish,
    },
    {
      id: 'plants',
      title: 'AQUARIUM FLORA',
      subtitle: 'Botanical Index',
      desc: 'Explore hardy low-tech and high-light aquatic flora to naturally absorb nitrates and oxygenate water.',
      image: '/images/anubias.png',
      href: '/plants',
      icon: Leaf,
    },
    {
      id: 'equipment',
      title: 'HARDWARE DIRECTORY',
      subtitle: 'Equipment Guide',
      desc: 'Understand filtration mechanics, precision heating thermostats, and full-spectrum LED lighting.',
      image: '/images/canister_filter.png',
      href: '/equipment',
      icon: Wrench,
    },
    {
      id: 'guides',
      title: 'CARE GUIDES',
      subtitle: 'Knowledge Base',
      desc: 'In-depth reference articles on biological cycling, acclimation protocols, and long-term water stability.',
      image: '/hero_aquarium.jpg',
      href: '/guides',
      icon: BookOpen,
    },
  ];

  return (
    <section className="marine-pattern-light py-20 sm:py-24 bg-[#f7f7ff] text-left border-t border-[#cfcaf5]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            THE AQUARIUM LIBRARY
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#27187e] tracking-wide">
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
                  <div className="absolute top-4 left-4 bg-[#27187e] text-[#f7f7ff] px-3 py-1 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.subtitle}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="font-readable text-sm sm:text-base text-[#27187e]/85 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-3 border-t border-[#edeafc] flex items-center justify-between font-readable text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#27187e]">
                <span>Explore Archive</span>
                <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

