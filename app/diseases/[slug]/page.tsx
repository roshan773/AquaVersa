import { diseasesData } from "@/data/diseases";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, Heart, Activity, Info, Stethoscope, AlertTriangle } from "lucide-react";
import GlobalCTA from "@/components/ui/GlobalCTA";
import CareDisclaimer from "@/components/ui/CareDisclaimer";

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
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container font-readable">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/diseases" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#27187e] hover:underline mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Disease Archive
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12 pb-12 border-b-2 border-[#cfcaf5]">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap gap-2.5 mb-2">
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#27187e] text-[#f7f7ff]">
                {disease.type} Infection
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#edeafc] text-[#27187e] text-xs font-bold border border-[#cfcaf5] uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" /> Clinical Pathology
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-tight leading-none mb-3">
              {disease.name}
            </h1>
            
            <p className="text-base sm:text-lg text-[#27187e]/90 leading-relaxed font-medium max-w-[65ch]">
              {disease.description}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-[#ffffff] bg-[#12093d] shadow-xl">
              <Image 
                src={disease.image} 
                alt={disease.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Important Warning Banner */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 flex items-start gap-4 text-sm sm:text-base mb-10 shadow-sm">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-[#27187e]" />
          <div className="space-y-1">
            <strong className="font-bold text-base block text-[#27187e] uppercase tracking-wider">Critical Medication Precaution</strong>
            <p className="leading-relaxed text-[#27187e]/90 font-medium">
              Always isolate sick fish in a dedicated quarantine or hospital tank before applying medications. Certain active compounds (like copper, malachite green, or formalin) and temperature shifts can be lethal to snails, shrimp, delicate scale-less fish (like Corydoras), and live plants.
            </p>
          </div>
        </div>

        {/* Key Symptoms & Transmission grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Key Symptoms */}
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-5 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Key Clinical Symptoms
              </h2>
              <ul className="space-y-3.5">
                {disease.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-[#27187e] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#27187e] mt-2 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#edeafc] border border-[#cfcaf5] p-4 rounded-2xl flex items-start gap-2.5 mt-6 text-xs sm:text-sm text-[#27187e] font-medium">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Diagnose early! Pathogen replication accelerates exponentially once physical symptoms appear.</span>
            </div>
          </div>

          {/* Transmission & Susceptibility */}
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-5 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Transmission &amp; Etiology
              </h2>
              <p className="text-sm sm:text-base text-[#27187e]/90 leading-relaxed mb-6 font-medium">
                {disease.transmission}
              </p>
            </div>
            <div className="border-t border-[#edeafc] pt-5 space-y-3 text-xs sm:text-sm font-medium">
              <div>
                <span className="font-bold uppercase tracking-wider text-[#27187e]/70 block mb-1">Most Susceptible Species:</span>
                <span className="text-[#27187e] font-bold">{disease.susceptible.join(", ")}</span>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider text-[#27187e]/70 block mb-1">Affected Ecosystem Types:</span>
                <span className="text-[#27187e] font-bold">{disease.affected.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Treatment Plan */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] mb-6 flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-[#27187e]" /> Step-by-Step Clinical Treatment Protocol
          </h2>
          <div className="space-y-5">
            {disease.treatment.map((step, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5]">
                <span className="w-8 h-8 rounded-xl bg-[#27187e] text-[#f7f7ff] flex items-center justify-center font-display text-lg shrink-0 shadow-sm">
                  {i + 1}
                </span>
                <p className="text-[#27187e]/90 leading-relaxed pt-0.5 text-sm sm:text-base font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <CareDisclaimer />
        </div>

      </div>

      <GlobalCTA
        badge="DIAGNOSTIC PATHOLOGY & MEDICATIONS"
        title={
          <>
            Diagnose active disease symptoms <br className="hidden sm:inline" />
            with our symptom checker tool.
          </>
        }
        description="Select observed physical and behavioral symptoms to identify root causes and immediate care protocols."
        primaryAction={{
          label: 'Open Symptom Checker',
          href: '/symptom-checker',
        }}
        secondaryAction={{
          label: 'Test Water Chemistry',
          href: '/water-analyzer',
        }}
      />
    </div>
  );
}
