import { diseasesData } from "@/data/diseases";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ShieldAlert, Heart, Activity } from "lucide-react";

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/diseases" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-500 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Diseases Library
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12">
        <div className="md:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" /> High Contagion Risk
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground">
            {disease.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {disease.description}
          </p>
        </div>

        <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-border bg-muted shadow-lg">
          <Image 
            src={disease.image} 
            alt={disease.name} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-12">
        {/* Symptoms */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-500">
            <Activity className="w-5 h-5" /> Key Symptoms
          </h2>
          <ul className="space-y-3">
            {disease.symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Transmission & Susceptibility */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-500">
              <ShieldAlert className="w-5 h-5" /> Transmission & Cause
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {disease.transmission}
            </p>
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-xs">
            <p><span className="font-semibold text-muted-foreground">Most Susceptible Species:</span> {disease.susceptible.join(", ")}</p>
            <p><span className="font-semibold text-muted-foreground">Affected Groups:</span> {disease.affected.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Treatment Plan */}
      <div className="mt-12 bg-red-500/5 dark:bg-red-950/5 border border-red-500/20 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-600 dark:text-red-400">
          <Heart className="w-6 h-6 animate-pulse" /> Step-by-Step Treatment Guide
        </h2>
        <div className="space-y-6">
          {disease.treatment.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-white/20 shadow-md">
                {i + 1}
              </span>
              <p className="text-foreground leading-relaxed pt-0.5 text-sm md:text-base">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prevention Guidelines */}
      <div className="mt-8 bg-emerald-500/5 dark:bg-emerald-950/5 border border-emerald-500/20 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-6 h-6" /> Prevention Protocols
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {disease.prevention.map((p, i) => (
            <div key={i} className="bg-card border border-emerald-500/10 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Protocol {i + 1}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
