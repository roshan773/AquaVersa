"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Diseases() {
  const diseases = [
    {
      name: "Ich (White Spot Disease)",
      description: "A common parasitic infection causing white spots on fish.",
      susceptible: ["Freshwater Betta", "Guppies", "Tetras"],
      affected: ["All freshwater species"],
      cure: "Increase temperature to 28°C, add aquarium salt, and treat with formalin or malachite green.",
      image: "/images/Ich (White Spot Disease).png"
    },
    {
      name: "Velvet (Oodinium)",
      description: "A parasitic fungus that gives fish a dusty golden appearance.",
      susceptible: ["Cichlids", "Angelfish"],
      affected: ["All freshwater and some saltwater species"],
      cure: "Raise temperature, improve water flow, and treat with copper-based medication.",
      image: "/images/Velvet (Oodinium).png"
    },
    {
      name: "Fin Rot",
      description: "Bacterial infection that erodes fins and tail.",
      susceptible: ["Goldfish", "Betta"],
      affected: ["Any fish in poor water conditions"],
      cure: "Perform water changes, keep water quality high, and treat with antibiotics.",
      image: "/images/Fin Rot.png"
    }
  ];

  return (
    <div className="flex flex-col w-full py-12 bg-background">
      <section className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-5xl font-poppins font-bold mb-4 text-foreground">
          Fish Diseases Guide
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn which fish suffer from common ailments, how they spread, and effective treatments.
        </p>
      </section>

      <section className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {diseases.map((d, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
              <Image src={d.image} alt={d.name} fill className="object-cover" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">{d.name}</h2>
            <p className="text-sm text-muted-foreground mb-2">{d.description}</p>
            <p className="text-sm mb-1"><span className="font-medium">Susceptible:</span> {d.susceptible.join(", ")}</p>
            <p className="text-sm mb-1"><span className="font-medium">Affected:</span> {d.affected.join(", ")}</p>
            <p className="text-sm mb-4"><span className="font-medium">Cure:</span> {d.cure}</p>
            <Link href={`/search?q=${encodeURIComponent(d.name.split(" ")[0])}`} className="inline-flex items-center gap-1 text-cyan-600 hover:text-cyan-500 font-medium group">
              Find Affected Fish <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
