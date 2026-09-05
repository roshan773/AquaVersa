import { plantData } from "@/data/plants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Info, Activity, ArrowRight, Sparkles, Sprout, Sun, Droplets } from "lucide-react";
import { Metadata } from 'next';
import { siteConfig } from "@/config/site";
import GlobalCTA from "@/components/ui/GlobalCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = plantData.find((p) => p.slug === slug);
  
  if (!plant) {
    return {
      title: `Aquatic Plant Care Guide - ${siteConfig.name}`,
      description: `Learn how to grow live aquatic plants on ${siteConfig.name}.`,
    };
  }

  const titleText = `${plant.name} Care Guide: Planting, Lighting & CO2 Requirements | ${siteConfig.name}`;
  const descText = `Complete ${plant.name} (${plant.scientificName}) planting profile. Learn about growth rate (${plant.growthRate}), placement (${plant.placement}), lighting requirements (${plant.light}), and CO2 parameters on ${siteConfig.name}.`;

  return {
    title: titleText,
    description: descText,
    keywords: [
      `${plant.name.toLowerCase()} care`,
      `${plant.name.toLowerCase()} aquarium plant`,
      `roshan aquva world ${plant.name.toLowerCase()}`,
      `roshan aquva world ${plant.slug}`,
      "roshan aquva world",
    ],
    openGraph: {
      title: titleText,
      description: descText,
      url: `${siteConfig.siteUrl}/plants/${plant.slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: `${siteConfig.siteUrl}${plant.image}`,
          width: 800,
          height: 600,
          alt: `${plant.name} aquarium plant`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: [`${siteConfig.siteUrl}${plant.image}`],
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/plants/${plant.slug}`,
    }
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
        "name": "Plants",
        "item": `${siteConfig.siteUrl}/plants`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": plant.name,
        "item": `${siteConfig.siteUrl}/plants/${plant.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${plant.name} Care Guide: Planting, Lighting & CO2 Requirements`,
    "description": plant.description,
    "image": `${siteConfig.siteUrl}${plant.image}`,
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
      "@id": `${siteConfig.siteUrl}/plants/${plant.slug}`
    }
  };

  const relatedPlants = plantData
    .filter((p) => p.slug !== plant.slug && (p.light === plant.light || p.placement === plant.placement))
    .slice(0, 3);

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
        {/* Back link */}
        <Link
          href="/plants"
          className="inline-flex items-center gap-2 text-sm font-readable font-semibold text-[#27187e] hover:underline mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Botanical Index</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 pb-12 border-b-2 border-[#cfcaf5]">
          
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="font-readable text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#27187e] text-[#f7f7ff]">
                {plant.placement} Zone
              </span>
              <span className="font-readable text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                {plant.difficulty} Care
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-tight leading-none mb-3">
              {plant.name}
            </h1>
            
            <p className="text-base sm:text-lg text-[#27187e]/70 italic font-readable mb-6 font-medium">
              {plant.scientificName}
            </p>

            <p className="text-base sm:text-lg text-[#27187e]/90 font-readable leading-relaxed mb-8 max-w-[65ch]">
              {plant.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/compatibility"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-sm sm:text-base font-readable font-semibold transition-all shadow-md"
              >
                <span>Check Compatible Fauna</span>
                <Sparkles className="w-4 h-4 text-[#f7f7ff]" />
              </Link>
              <Link
                href="/plants"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#ffffff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] text-sm sm:text-base font-readable font-semibold transition-all"
              >
                <span>Browse All Plants</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#12093d] overflow-hidden border-4 border-[#ffffff] shadow-2xl">
              <Image
                src={plant.image}
                alt={`${plant.name} (${plant.scientificName})`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>

        </div>

        {/* Botanical Parameters Ledger */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>Cultivation Requirements</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-normal text-[#27187e] tracking-tight">
              Growth &amp; Chemistry Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left font-readable">
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Lighting Intensity
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block capitalize">
                {plant.light}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                CO2 Supplementation
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                {plant.co2}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Growth Rate
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block capitalize">
                {plant.growthRate}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Aquascape Placement
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block capitalize">
                {plant.placement}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Ideal Temperature
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                {plant.temperature}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Optimal pH Range
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                {plant.ph}
              </span>
            </div>
          </div>
        </div>

        {/* Related Botanical Species */}
        {relatedPlants.length > 0 && (
          <div className="pt-12 border-t-2 border-[#cfcaf5]">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-readable font-semibold uppercase tracking-wider text-[#27187e]/70 block mb-1">
                  COMPLEMENTARY FLORA
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-[#27187e] tracking-tight">
                  Similar Aquarium Plants
                </h3>
              </div>
              <Link
                href="/plants"
                className="font-readable font-semibold text-sm sm:text-base text-[#27187e] hover:underline inline-flex items-center gap-2"
              >
                <span>All Botanical Species</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPlants.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/plants/${rel.slug}`}
                  className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#12093d] overflow-hidden mb-4">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="350px"
                      />
                    </div>
                    <h4 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] leading-tight mb-1">
                      {rel.name}
                    </h4>
                    <p className="text-sm text-[#27187e]/70 italic font-readable mb-3">
                      {rel.scientificName}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#edeafc] flex items-center justify-between font-readable font-semibold text-sm text-[#27187e]">
                    <span>View Care Profile</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <GlobalCTA
        badge="AQUASCAPING & BOTANICAL DESIGN"
        title={
          <>
            Ready to integrate {plant.name} <br className="hidden sm:inline" />
            into your planted aquarium?
          </>
        }
        description={`Match substrate requirements and cohabitation parameters for ${plant.name} using our interactive tools.`}
        primaryAction={{
          label: 'Check Compatibility',
          href: '/compatibility',
        }}
        secondaryAction={{
          label: 'Browse All Plants',
          href: '/plants',
        }}
      />
    </div>
  );
}
