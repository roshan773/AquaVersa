import Image from 'next/image';
import Link from 'next/link';

export default function AquariumTypes() {
  const types = [
    {
      id: 'community',
      title: 'Community Tank',
      desc: 'Peaceful mix of species. Perfect for beginners.',
      image: '/hero_aquarium.jpg',
      color: 'bg-emerald-500/20 text-emerald-600',
    },
    {
      id: 'cichlid',
      title: 'African Cichlid',
      desc: 'High pH, rockscapes, and vibrant colors.',
      image: '/hero_aquarium.jpg',
      color: 'bg-amber-500/20 text-amber-600',
    },
    {
      id: 'planted',
      title: 'Planted Aquascape',
      desc: 'Focus on aquatic flora and natural layouts.',
      image: '/hero_aquarium.jpg',
      color: 'bg-green-500/20 text-green-600',
    },
    {
      id: 'reef',
      title: 'Saltwater Reef',
      desc: 'Corals, anemones, and marine fish.',
      image: '/hero_aquarium.jpg',
      color: 'bg-cyan-500/20 text-cyan-600',
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
          Types of Aquariums
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
          Every successful aquarium starts with a vision. Choose the style of ecosystem you want to build.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type) => (
            <Link href="/guides" key={type.id} className="group text-left rounded-3xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all block">
              <div className="relative h-48 w-full overflow-hidden">
                 <Image src={type.image} alt={type.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${type.color}`}>
                  {type.title}
                </span>
                <h3 className="text-xl font-bold mb-2 text-foreground">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
