import { diseasesData } from "@/data/diseases";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ShieldAlert, Heart, Activity, Info } from "lucide-react";

export function generateStaticParams() {
  return diseasesData.map((d) => ({
    slug: d.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DiseaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const disease = diseasesData.find((d) => d.slug === slug);

  if (!disease) {
    notFound();
  }

  // Badge class helper based on disease type
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "Parasitic":
        return "bg-red-600 text-white border border-red-500/30 shadow-md backdrop-blur-sm";
      case "Bacterial":
        return "bg-purple-600 text-white border border-purple-500/30 shadow-md backdrop-blur-sm";
      case "Fungal":
        return "bg-amber-500 text-slate-950 border border-amber-400/30 shadow-md backdrop-blur-sm";
      default:
        return "bg-blue-600 text-white border border-blue-500/30 shadow-md backdrop-blur-sm";
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background relative py-12">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <Link 
          href="/diseases" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-500 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Diseases Library
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12 bg-card/40 border border-border/80 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-sm">
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getTypeBadgeClass(disease.type)}`}>
                {disease.type} Infection
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20 uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" /> High Risk Pathogen
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-extrabold text-foreground tracking-tight">
              {disease.name}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {disease.description}
            </p>
          </div>

          <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-border/80 bg-muted/80 shadow-lg group">
            <Image 
              src={disease.image} 
              alt={disease.name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
        </div>

        {/* Important Warning Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 flex items-start gap-4 text-sm text-amber-800 dark:text-amber-300 mb-8 shadow-sm">
          <Info className="w-6 h-6 shrink-0 mt-0.5 text-amber-500" />
          <div className="space-y-1">
            <strong className="font-bold text-base block text-amber-900 dark:text-amber-200">Important Health Warning</strong>
            <p className="leading-relaxed">
              Before taking any treatment action or applying medications, always refer to the specific care guides and requirements for your fish species. Certain medications (like copper or formalin), aquarium salt, or temperature changes can be highly toxic or fatal to specific fish breeds, live plants, or snails/shrimp in your aquarium.
            </p>
          </div>
        </div>

        {/* Key Symptoms & Transmission grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Symptoms */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-amber-500">
                <Activity className="w-5 h-5" /> Key Clinical Symptoms
              </h2>
              <ul className="space-y-4">
                {disease.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 shadow-sm shadow-amber-500" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-500/5 dark:bg-amber-950/10 border border-amber-500/10 p-4 rounded-2xl flex items-start gap-3 mt-6 text-xs text-amber-700 dark:text-amber-300">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Diagnose early! Pathogens multiply rapidly once symptoms manifest.</span>
            </div>
          </div>

          {/* Transmission & Susceptibility */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-cyan-500">
                <ShieldAlert className="w-5 h-5" /> Transmission & Cause
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {disease.transmission}
              </p>
            </div>
            <div className="border-t border-border pt-5 space-y-3 text-xs">
              <div>
                <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">Most Susceptible Species:</span>
                <span className="text-foreground/90 font-medium">{disease.susceptible.join(", ")}</span>
              </div>
              <div>
                <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">Affected Ecosystems:</span>
                <span className="text-foreground/90 font-medium">{disease.affected.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Treatment Plan */}
        <div className="mt-8 bg-red-500/5 dark:bg-red-950/5 border border-red-500/20 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-600 dark:text-red-400">
            <Heart className="w-6 h-6 animate-pulse" /> Step-by-Step Clinical Treatment Guide
          </h2>
          <div className="space-y-6">
            {disease.treatment.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-white/20 shadow-md">
                  {i + 1}
                </span>
                <p className="text-foreground/90 leading-relaxed pt-1 text-sm md:text-base">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Guidelines */}
        <div className="mt-8 bg-emerald-500/5 dark:bg-emerald-950/5 border border-emerald-500/20 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-6 h-6" /> Preventative Care Protocols
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disease.prevention.map((p, i) => (
              <div key={i} className="bg-card border border-emerald-500/10 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-inner">
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Protocol {i + 1}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
