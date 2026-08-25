import Image from 'next/image';
import Link from 'next/link';

export default function AquariumTypes() {
  const types = [
    {
      id: 'community',
      title: 'Community Tank',
      desc: 'Peaceful mix of species. Perfect for beginners.',
      image: '/images/neon_tetra.png',
      color: 'bg-red-500/10 text-red-500 border border-red-500/20',
      href: '/start-aquarium',
    },
    {
      id: 'cichlid',
      title: 'African Cichlid',
      desc: 'High pH, rockscapes, and vibrant colors.',
      image: '/images/african_cichlid.png',
      color: 'bg-red-500/10 text-red-500 border border-red-500/20',
      href: '/fish/freshwater?search=cichlid',
    },
    {
      id: 'planted',
      title: 'Planted Aquascape',
      desc: 'Focus on aquatic flora and natural layouts.',
      image: '/images/anubias.png',
      color: 'bg-red-500/10 text-red-500 border border-red-500/20',
      href: '/plants',
    },
    {
      id: 'reef',
      title: 'Saltwater Reef',
      desc: 'Corals, anemones, and marine fish.',
      image: '/images/blue_tang.png',
      color: 'bg-red-500/10 text-red-500 border border-red-500/20',
      href: '/fish/saltwater',
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden border-b border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.02),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 text-center max-w-7xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-white">
          Types of Aquariums
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
          Every successful aquarium starts with a vision. Choose the style of ecosystem you want to build.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type) => (
            <Link 
              href={type.href} 
              key={type.id} 
              className="group text-left rounded-3xl border border-red-500/10 bg-black/40 overflow-hidden hover:border-red-500/35 hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] hover:-translate-y-1 transition-all duration-300 block cursor-pointer"
            >
              <div className="relative h-48 w-full overflow-hidden bg-black/80">
                 <Image src={type.image} alt={type.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase mb-4 ${type.color}`}>
                  {type.title.split(' ')[1] || type.title}
                </span>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors">{type.title}</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{type.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
