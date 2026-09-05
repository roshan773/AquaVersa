"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldAlert, 
  Activity, 
  Heart, 
  CheckCircle2, 
  Search, 
  HelpCircle, 
  Thermometer, 
  Info,
  Droplets,
  Layers,
  RotateCcw,
  Stethoscope
} from "lucide-react";
import { Disease as DiseaseType } from "@/lib/types";
import { diseasesData } from "@/data/diseases";
import GlobalCTA from "@/components/ui/GlobalCTA";

export default function Diseases() {
  const [diseases] = useState<DiseaseType[]>(diseasesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredDiseases = diseases.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All" || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container font-readable">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Pathology &amp; Aquatic Medicine</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            DISEASE &amp; TREATMENT ARCHIVE
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 max-w-2xl leading-relaxed">
            Clinical profiles for common aquatic infections. Understand pathogen life cycles, clinical symptoms, and safe medication dosing protocols.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-3xl relative">
            <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search diseases or symptoms (e.g. Ich, Fin Rot, White Spot, Velvet)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] focus:border-[#27187e] text-base text-[#27187e] placeholder:text-[#27187e]/50 focus:outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 mb-10 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs uppercase font-bold text-[#27187e]/80 tracking-wider">
              Pathogen Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {['All', 'Parasitic', 'Bacterial', 'Fungal', 'Environmental'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedType === t
                      ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                      : 'bg-[#edeafc] text-[#27187e] hover:bg-[#cfcaf5]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/symptom-checker"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#27187e] text-[#f7f7ff] text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#1b1059] transition-all shadow-sm"
          >
            <Activity className="w-4 h-4" />
            <span>Open Symptom Checker</span>
          </Link>
        </div>

        {/* Disease Cards Grid */}
        {filteredDiseases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredDiseases.map((disease) => (
              <Link
                key={disease.id}
                href={`/diseases/${disease.slug}`}
                className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#12093d] overflow-hidden mb-5">
                    <Image
                      src={disease.image}
                      alt={disease.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm">
                      {disease.type}
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight mb-2">
                    {disease.name}
                  </h2>

                  <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed line-clamp-3 mb-4 font-medium">
                    {disease.description}
                  </p>

                  <div className="pt-3 border-t border-[#edeafc] space-y-1.5 text-xs sm:text-sm">
                    <span className="text-[#27187e]/70 font-semibold uppercase tracking-wider block">Key Symptoms:</span>
                    <p className="text-[#27187e] font-semibold line-clamp-2">
                      {disease.symptoms.slice(0, 3).join(", ")}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#edeafc] flex items-center justify-between text-sm font-semibold text-[#27187e]">
                  <span>Read Pathology &amp; Treatment Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-12 text-center max-w-xl mx-auto my-12 font-readable">
            <h3 className="text-3xl font-display font-normal text-[#27187e] mb-2">
              No disease matches found.
            </h3>
            <p className="text-base text-[#27187e]/75 mb-6">
              Try adjusting your query or reset the filter criteria to view all documented illnesses.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedType('All'); }}
              className="px-6 py-3 rounded-full bg-[#27187e] text-[#f7f7ff] text-sm font-bold uppercase tracking-wider hover:bg-[#1b1059] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      <GlobalCTA
        badge="DIAGNOSTIC PATHOLOGY & MEDICATIONS"
        title={
          <>
            Diagnose your fish symptoms <br className="hidden sm:inline" />
            with interactive clinical tools.
          </>
        }
        description="Check off physical manifestations to identify fungal, parasitic, or bacterial root causes."
        primaryAction={{
          label: 'Launch Symptom Checker',
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
