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
      badge: 'Living Ecosystem',
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
    <section className="py-20 bg-[#040a14] relative border-b border-slate-800/80 text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-800/30 mb-3 text-teal-300 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Aquarium Styles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight">
              Explore Aquarium Types
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-2 font-normal leading-relaxed">
              Every thriving aquarium begins with a clear system focus. Choose the style of habitat that fits your goals and experience level.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type) => (
            <Link 
              href={type.href} 
              key={type.id} 
              className="group text-left rounded-2xl border border-slate-800 bg-[#061224] overflow-hidden hover:border-slate-700 transition-all duration-200 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <Image 
                  src={type.image} 
                  alt={type.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-85" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
                <div className="absolute top-3 left-3 bg-[#030712]/90 px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-teal-300 border border-slate-800">
                  {type.badge}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold mb-1.5 text-white group-hover:text-teal-300 transition-colors font-poppins">
                  {type.title}
                </h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed mb-4 flex-grow">
                  {type.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 group-hover:text-teal-300 pt-3 border-t border-slate-800/80">
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
