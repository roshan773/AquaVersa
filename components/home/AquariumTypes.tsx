import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';

export default function AquariumTypes() {
  const types = [
    {
      id: 'community',
      title: 'Freshwater Community',
      badge: 'Beginner Friendly',
      desc: 'A peaceful mix of schooling tetras, rasboras, and corydoras. Ideal for balanced community aquariums.',
      image: '/images/neon_tetra.png',
      href: '/start-aquarium',
    },
    {
      id: 'planted',
      title: 'Planted Aquascape',
      badge: 'Living Flora',
      desc: 'Focuses on lush aquatic flora, CO2 balance, specialized substrates, and natural layout composition.',
      image: '/images/anubias.png',
      href: '/plants',
    },
    {
      id: 'cichlid',
      title: 'African Cichlids',
      badge: 'Hardwater Habitat',
      desc: 'Vibrant rockscapes, higher pH water parameters, and active territorial dynamics for specialized keepers.',
      image: '/images/african_cichlid.png',
      href: '/fish/freshwater',
    },
    {
      id: 'reef',
      title: 'Marine & Reef',
      badge: 'Saltwater Habitat',
      desc: 'Marine fish, live rock filtration, specific gravity monitoring, and delicate symbiotic relationships.',
      image: '/images/clownfish.png',
      href: '/fish/saltwater',
    }
  ];

  return (
    <section className="py-20 bg-[#14094a] relative border-b border-[#27187E]/80 text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#27187E]/50 border border-[#3622a6] mb-3 text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-semibold">
              <Layers className="w-3.5 h-3.5 text-[#aca1f7]" />
              <span>Aquarium Styles</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#F7F7FF] tracking-wide">
              Explore Aquarium Types
            </h2>
            <p className="text-[#F7F7FF]/75 text-sm max-w-xl mt-2 font-normal leading-relaxed font-sans">
              Every thriving aquarium begins with a clear system focus. Choose the style of habitat that fits your goals and experience level.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type) => (
            <Link 
              href={type.href} 
              key={type.id} 
              className="group text-left rounded-2xl border border-[#27187E] bg-[#1c0e64] overflow-hidden hover:border-[#F7F7FF] transition-all duration-200 flex flex-col shadow-lg"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#0d0630]">
                <Image 
                  src={type.image} 
                  alt={type.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-85" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
                <div className="absolute top-3 left-3 bg-[#F7F7FF] px-2.5 py-0.5 rounded-md text-[10px] font-condensed uppercase tracking-wider font-bold text-[#27187E]">
                  {type.badge}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-normal tracking-wide mb-1.5 text-[#F7F7FF] group-hover:text-white transition-colors">
                  {type.title}
                </h3>
                <p className="text-xs text-[#F7F7FF]/75 font-normal leading-relaxed mb-4 flex-grow font-sans">
                  {type.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-condensed uppercase tracking-wider font-bold text-[#aca1f7] group-hover:text-white pt-3 border-t border-[#27187E]">
                  <span>Learn Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
