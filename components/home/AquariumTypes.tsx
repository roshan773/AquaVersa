import Image from 'next/image';
import Link from 'next/link';

export default function AquariumTypes() {
  const types = [
    {
      id: 'community',
      title: 'Community Tank',
      desc: 'Peaceful mix of species. Perfect for beginners.',
      image: '/images/neon_tetra.png',
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-450 border border-cyan-500/20',
      href: '/start-aquarium',
    },
    {
      id: 'cichlid',
      title: 'African Cichlid',
      desc: 'High pH, rockscapes, and vibrant colors.',
      image: '/images/african_cichlid.png',
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-450 border border-cyan-500/20',
      href: '/fish/freshwater?search=cichlid',
    },
    {
      id: 'planted',
      title: 'Planted Aquascape',
      desc: 'Focus on aquatic flora and natural layouts.',
      image: '/images/anubias.png',
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-450 border border-cyan-500/20',
      href: '/plants',
    },
    {
      id: 'reef',
      title: 'Saltwater Reef',
      desc: 'Corals, anemones, and marine fish.',
      image: '/images/blue_tang.png',
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-450 border border-cyan-500/20',
      href: '/fish/saltwater',
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-905 relative overflow-hidden border-b border-slate-200/30 dark:border-slate-900">
      <div className="container mx-auto px-4 text-center max-w-7xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-slate-900 dark:text-white">
          Types of Aquariums
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-450 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
          Every successful aquarium starts with a vision. Choose the style of ecosystem you want to build.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type) => (
            <Link 
              href={type.href} 
              key={type.id} 
              className="group text-left rounded-xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-slate-950 overflow-hidden hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 block cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                 <Image src={type.image} alt={type.title} fill className="object-cover group-hover:scale-102 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
              <div className="p-6">
                <span className={`inline-block px-2.5 py-0.5 rounded-lg text-[9px] font-bold tracking-widest uppercase mb-4 ${type.color}`}>
                  {type.title.split(' ')[1] || type.title}
                </span>
                <h3 className="text-base sm:text-lg font-poppins font-bold mb-1.5 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{type.title}</h3>
                <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-light leading-relaxed">{type.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
