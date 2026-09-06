import { diseasesData } from "@/data/diseases";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, Heart, Activity, Info, AlertTriangle, ArrowRight, Home } from "lucide-react";
import { Metadata } from 'next';
import { siteConfig } from "@/config/site";
import { constructMetadata, constructBreadcrumbSchema } from "@/lib/seo";
import GlobalCTA from "@/components/ui/GlobalCTA";
import CareDisclaimer from "@/components/ui/CareDisclaimer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const disease = diseasesData.find((d) => d.slug === slug);

  if (!disease) {
    return constructMetadata({
      title: `Fish Disease Guide | ${siteConfig.name}`,
      description: `Learn how to identify and treat aquarium fish diseases on ${siteConfig.name}.`,
      pathname: `/diseases/${slug}`,
    });
  }

  const titleText = `${disease.name}: Fish Symptoms, Diagnosis & Treatment Guide`;
  const descText = `Learn how to identify and treat ${disease.name} in aquarium fish. Covers clinical symptoms, transmission, medication precautions, and hospital tank protocols.`;

  return constructMetadata({
    title: titleText,
    description: descText,
    pathname: `/diseases/${disease.slug}`,
    image: disease.image,
    type: 'article',
  });
}

export function generateStaticParams() {
  return diseasesData.map((d) => ({
    slug: d.slug,
  }));
}

export default async function DiseaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const disease = diseasesData.find((d) => d.slug === slug);

  if (!disease) {
    notFound();
  }

  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Diseases', path: '/diseases' },
    { name: disease.name, path: `/diseases/${disease.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${disease.name}: Fish Symptoms, Diagnosis & Treatment Guide`,
    description: disease.description,
    image: `${siteConfig.siteUrl}${disease.image}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/apple-touch-icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}/diseases/${disease.slug}`,
    },
  };

  const otherDiseases = diseasesData
    .filter((d) => d.slug !== disease.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 text-left marine-pattern-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="site-container font-readable pb-20 sm:pb-24">
        
        {/* Visual Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-[#27187e]/70">
          <Link href="/" className="hover:text-[#27187e] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href="/diseases" className="hover:text-[#27187e]">
            Diseases
          </Link>
          <span>/</span>
          <span className="text-[#27187e] font-semibold">{disease.name}</span>
        </nav>

        {/* Back Link */}
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
                alt={`${disease.name} diagnostic symptom profile`} 
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
              Always isolate sick fish in a dedicated quarantine or hospital tank before applying medications. Certain active compounds (like copper, malachite green, or formalin) and temperature shifts can be harmful to snails, shrimp, delicate scale-less fish (like Corydoras), and live plants.
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

        {/* Related Diseases */}
        {otherDiseases.length > 0 && (
          <div className="pt-12 mb-16 border-t-2 border-[#cfcaf5]">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-readable font-semibold uppercase tracking-wider text-[#27187e]/70 block mb-1">
                  RELATED PATHOLOGY
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] tracking-tight">
                  Other Common Aquatic Illnesses
                </h3>
              </div>
              <Link
                href="/diseases"
                className="font-readable font-semibold text-sm sm:text-base text-[#27187e] hover:underline inline-flex items-center gap-2"
              >
                <span>Browse All Diseases</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherDiseases.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/diseases/${rel.slug}`}
                  className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#12093d] overflow-hidden mb-4">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="350px"
                      />
                    </div>
                    <span className="text-xs uppercase font-bold text-[#27187e] px-2 py-0.5 rounded bg-[#edeafc] border border-[#cfcaf5]">
                      {rel.type}
                    </span>
                    <h4 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] leading-tight mt-2 mb-1">
                      {rel.name}
                    </h4>
                  </div>
                  <div className="pt-3 border-t border-[#edeafc] flex items-center justify-between font-readable font-semibold text-sm text-[#27187e]">
                    <span>View Treatment Sheet</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

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
