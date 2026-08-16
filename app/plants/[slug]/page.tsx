import { plantData } from "@/data/plants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Info, Activity, ArrowUpRight } from "lucide-react";
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = plantData.find((p) => p.slug === slug);
  
  if (!plant) {
    return {
      title: "Aquatic Plant Guide - AquaGuide",
      description: "Learn how to grow live aquatic plants.",
    };
  }

  return {
    title: `${plant.name} Care Guide: Planting, Lighting & CO2 Requirements`,
    description: `Complete ${plant.name} (${plant.scientificName}) care guide. Learn about planting placement (${plant.placement}), growth rate (${plant.growthRate}), lighting needs (${plant.light}), CO2 requirements (${plant.co2}), and aquatic care.`,
  };
}

export async function generateStaticParams() {
  return plantData
    .filter(plant => plant.slug)
    .map((plant) => ({
      slug: plant.slug,
    }));
}

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = plantData.find((p) => p.slug === slug);

  if (!plant) {
    notFound();
  }

  return (
    <div className="w-full pb-24">
      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src={plant.image}
            alt={plant.name}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pb-12">
          <Link href="/plants" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Plants
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-sm font-semibold border border-emerald-500/30 capitalize`}>
              {plant.difficulty} Care
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-2 text-emerald-50">{plant.name}</h1>
          <p className="text-xl text-emerald-200/60 italic">{plant.scientificName}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-emerald-500" /> About {plant.name}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{plant.description}</p>
            </section>

            {/* Growth Requirements */}
            <section className="glass p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold mb-8">Growth Requirements</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-muted/50 border border-border flex flex-col items-start">
                  <span className="text-sm text-muted-foreground mb-1">Lighting</span>
                  <span className="text-lg font-semibold text-foreground">{plant.light}</span>
                </div>
                <div className="p-5 rounded-2xl bg-muted/50 border border-border flex flex-col items-start">
                  <span className="text-sm text-muted-foreground mb-1">CO2</span>
                  <span className="text-lg font-semibold text-foreground">{plant.co2}</span>
                </div>
                <div className="p-5 rounded-2xl bg-muted/50 border border-border flex flex-col items-start">
                  <span className="text-sm text-muted-foreground mb-1">Growth Rate</span>
                  <span className="text-lg font-semibold text-foreground">{plant.growthRate}</span>
                </div>
                <div className="p-5 rounded-2xl bg-muted/50 border border-border flex flex-col items-start">
                  <span className="text-sm text-muted-foreground mb-1">Placement</span>
                  <span className="text-lg font-semibold text-foreground">{plant.placement}</span>
                </div>
                <div className="p-5 rounded-2xl bg-muted/50 border border-border flex flex-col items-start">
                  <span className="text-sm text-muted-foreground mb-1">Temperature</span>
                  <span className="text-lg font-semibold text-foreground">{plant.temperature}</span>
                </div>
                <div className="p-5 rounded-2xl bg-muted/50 border border-border flex flex-col items-start">
                  <span className="text-sm text-muted-foreground mb-1">pH Level</span>
                  <span className="text-lg font-semibold text-foreground">{plant.ph}</span>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Tips Sidebar */}
          <aside className="space-y-8">
            <div className="glass p-6 rounded-3xl border border-border sticky top-24">
              <h3 className="text-xl font-bold mb-6">Planting Tips</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border">
                  <ArrowUpRight className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm mb-1">Placement Strategy</strong>
                    <span className="text-sm text-muted-foreground">{plant.placement} works best to create visual depth.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border">
                  <Activity className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm mb-1">CO2 Needs</strong>
                    <span className="text-sm text-muted-foreground">{plant.co2 === "Required" ? "Make sure you have a pressurized CO2 system." : "Liquid carbon or natural CO2 is sufficient."}</span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
