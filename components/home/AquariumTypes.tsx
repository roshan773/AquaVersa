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
    <section className="bg-[#ffffff] rounded-3xl border-2 border-[#cfcaf5] p-6 sm:p-10 shadow-sm text-left font-readable">
      <div className="mb-10 pb-6 border-b border-[#edeafc]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5 text-[#27187e]" />
          <span>Biotope Classifications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-[#27187e] tracking-tight">
          Explore Aquarium Biotope Types
        </h2>
        <p className="text-base text-[#27187e]/85 max-w-xl mt-2 leading-relaxed">
          Every thriving aquarium begins with a clear system focus. Choose the style of habitat that fits your goals and experience level.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {types.map((type) => (
          <Link 
            href={type.href} 
            key={type.id} 
            className="group text-left rounded-3xl border-2 border-[#cfcaf5] bg-[#f7f7ff] overflow-hidden hover:border-[#27187e] transition-all flex flex-col justify-between shadow-sm hover:shadow-lg"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-[#12093d]">
                <Image 
                  src={type.image} 
                  alt={type.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
                <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5] px-2.5 py-1 rounded-md text-xs uppercase font-bold tracking-wider shadow-sm">
                  {type.badge}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl sm:text-2xl font-display font-normal mb-2 text-[#27187e] group-hover:text-[#1b1059] transition-colors">
                  {type.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#27187e]/80 font-medium leading-relaxed">
                  {type.desc}
                </p>
              </div>
            </div>
            
            <div className="p-5 pt-0">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#27187e] group-hover:underline pt-3 border-t border-[#edeafc] w-full justify-between">
                <span>Learn Requirements</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
