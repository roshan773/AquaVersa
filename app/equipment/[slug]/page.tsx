import { equipmentData } from "@/data/equipment";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Settings, Info, AlertTriangle, CheckCircle2, Sparkles, Wrench, ShieldCheck, Activity } from "lucide-react";
import { Metadata } from 'next';
import { siteConfig } from "@/config/site";
import GlobalCTA from "@/components/ui/GlobalCTA";
import CareDisclaimer from "@/components/ui/CareDisclaimer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const eq = equipmentData.find((e) => e.slug === slug);
  
  if (!eq) {
    return {
      title: `Aquarium Equipment Guide - ${siteConfig.name}`,
      description: `Learn how to choose the right aquarium equipment on ${siteConfig.name}.`,
    };
  }

  const titleText = `${eq.name} Specification & Maintenance Guide | ${siteConfig.name}`;
  const descText = `Complete ${eq.name} hardware guide. Learn about its purpose, operational details, maintenance instructions, and beginner setup mistakes on ${siteConfig.name}.`;

  return {
    title: titleText,
    description: descText,
    keywords: [
      `${eq.name.toLowerCase()} specs`,
      `aquarium ${eq.name.toLowerCase()}`,
      `roshan aquva world ${eq.name.toLowerCase()}`,
      `roshan aquva world ${eq.slug}`,
      "roshan aquva world",
    ],
    openGraph: {
      title: titleText,
      description: descText,
      url: `${siteConfig.siteUrl}/equipment/${eq.slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: `${siteConfig.siteUrl}${eq.image}`,
          width: 800,
          height: 600,
          alt: `${eq.name} hardware spec`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: [`${siteConfig.siteUrl}${eq.image}`],
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/equipment/${eq.slug}`,
    }
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteConfig.siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Equipment",
        "item": `${siteConfig.siteUrl}/equipment`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": eq.name,
        "item": `${siteConfig.siteUrl}/equipment/${eq.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${eq.name} Specification & Maintenance Guide`,
    "description": eq.description,
    "image": `${siteConfig.siteUrl}${eq.image}`,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}/apple-touch-icon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.siteUrl}/equipment/${eq.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="site-container">
        
        {/* Back Link */}
        <Link
          href="/equipment"
          className="inline-flex items-center gap-2 text-sm font-readable font-semibold text-[#27187e] hover:underline mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Equipment Archive</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 pb-12 border-b-2 border-[#cfcaf5]">
          
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="font-readable text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#27187e] text-[#f7f7ff]">
                {eq.category}
              </span>
              <span className="font-readable text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                Hardware Specification
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-tight leading-none mb-3">
              {eq.name}
            </h1>
            
            <p className="text-base sm:text-lg text-[#27187e]/90 font-readable leading-relaxed mb-8 max-w-[65ch]">
              {eq.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tank-size"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-sm sm:text-base font-readable font-semibold transition-all shadow-md"
              >
                <span>Calculate Tank Volume</span>
                <Sparkles className="w-4 h-4 text-[#f7f7ff]" />
              </Link>
              <Link
                href="/equipment-wizard"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#ffffff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] text-sm sm:text-base font-readable font-semibold transition-all"
              >
                <span>Equipment Selection Wizard</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] overflow-hidden shadow-xl flex items-center justify-center p-8">
              <Image
                src={eq.image || '/hero_aquarium.jpg'}
                alt={`${eq.name} - hardware specification`}
                fill
                className="object-contain p-6"
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>

        </div>

        {/* Technical Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-8 font-readable">
            
            {/* Purpose */}
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-7 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#edeafc] text-[#27187e]">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] tracking-tight">
                  Primary Biological &amp; Physical Purpose
                </h2>
              </div>
              <p className="text-base sm:text-lg text-[#27187e]/90 font-readable leading-relaxed">
                {eq.purpose}
              </p>
            </div>

            {/* How it works */}
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-7 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#edeafc] text-[#27187e]">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] tracking-tight">
                  Operational Mechanics &amp; Physics
                </h2>
              </div>
              <p className="text-base sm:text-lg text-[#27187e]/90 font-readable leading-relaxed">
                {eq.howItWorks}
              </p>
            </div>

            {/* Maintenance */}
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-7 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#edeafc] text-[#27187e]">
                  <Wrench className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] tracking-tight">
                  Maintenance &amp; Longevity Protocol
                </h2>
              </div>
              <p className="text-base sm:text-lg text-[#27187e]/90 font-readable leading-relaxed">
                {eq.maintenance}
              </p>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 font-readable">
            
            {/* Suitable For */}
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-display font-normal text-[#27187e] mb-4">
                Suitable Tank Environments
              </h3>
              <ul className="space-y-3">
                {eq.suitableTanks?.map((tank, i) => (
                  <li key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#edeafc] border border-[#cfcaf5] text-sm font-semibold text-[#27187e]">
                    <CheckCircle2 className="w-4 h-4 text-[#27187e] shrink-0" strokeWidth={2.5} />
                    <span>{tank} Tanks</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-[#27187e]">
                <AlertTriangle className="w-5 h-5 text-[#27187e]" />
                <h3 className="text-xl sm:text-2xl font-display font-normal text-[#27187e]">
                  Setup Considerations
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#27187e]/85 font-readable leading-relaxed">
                {eq.beginnerMistakes}
              </p>
            </div>

          </aside>

        </div>

        <div className="mt-12">
          <CareDisclaimer />
        </div>

      </div>

      <GlobalCTA
        badge="HARDWARE & FILTRATION SIZING"
        title={
          <>
            Configure your entire <br className="hidden sm:inline" />
            life support hardware setup.
          </>
        }
        description={`Calculate total turnover flow rates and heater wattages when installing ${eq.name}.`}
        primaryAction={{
          label: 'Equipment Selection Wizard',
          href: '/equipment-wizard',
        }}
        secondaryAction={{
          label: 'Calculate Tank Dimensions',
          href: '/tank-size',
        }}
      />
    </div>
  );
}
