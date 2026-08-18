import { equipmentData } from "@/data/equipment";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Settings, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const eq = equipmentData.find((e) => e.slug === slug);
  
  if (!eq) {
    return {
      title: "Aquarium Equipment Guide - AquaVersa",
      description: "Learn how to choose the right aquarium equipment.",
    };
  }

  return {
    title: `${eq.name} Specification & Maintenance Guide`,
    description: `Complete ${eq.name} guide. Learn about its purpose, how it works, maintenance instructions, suitable tank types, and common beginner setup mistakes.`,
  };
}

export async function generateStaticParams() {
  return equipmentData
    .filter(eq => eq.slug)
    .map((eq) => ({
      slug: eq.slug,
    }));
}

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const eq = equipmentData.find((e) => e.slug === slug);

  if (!eq) {
    notFound();
  }

  return (
    <div className="w-full pb-24">
      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src={eq.image}
            alt={eq.name}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pb-12">
          <Link href="/equipment" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Equipment
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-sm font-semibold border border-amber-500/30 capitalize`}>
              {eq.category}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-2 text-amber-50">{eq.name}</h1>
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
                <Info className="w-6 h-6 text-amber-500" /> What is it?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{eq.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Why do you need it?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{eq.purpose}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How does it work?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{eq.howItWorks}</p>
            </section>

            <section className="glass p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold mb-6">Maintenance Guide</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{eq.maintenance}</p>
            </section>

          </div>

          {/* Right Column: Sidebar */}
          <aside className="space-y-8">
            <div className="glass p-6 rounded-3xl border border-border sticky top-24">
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Suitable For</h3>
                <ul className="space-y-3">
                  {eq.suitableTanks?.map((tank, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 text-amber-500" /> {tank} Tanks
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-destructive/10 border border-destructive/20">
                <h3 className="font-bold text-destructive flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5" /> Avoid This Mistake
                </h3>
                <p className="text-sm text-muted-foreground">{eq.beginnerMistakes}</p>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
