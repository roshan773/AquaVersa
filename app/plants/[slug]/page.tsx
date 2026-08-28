import { plantData } from "@/data/plants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Info, Activity, ArrowUpRight, Sparkles, HelpCircle } from "lucide-react";
import { Metadata } from 'next';
import { siteConfig } from "@/config/site";
import { getFishLink } from "@/lib/linking";

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
      description: "Learn how to grow live aquatic plants on AquaGuide / AquvaGuide.",
    };
  }

  const titleText = `${plant.name} Care Guide: Planting, Lighting & CO2 Requirements | AquaGuide`;
  const descText = `Complete ${plant.name} (${plant.scientificName}) planting profile. Learn about growth rate (${plant.growthRate}), placement (${plant.placement}), lighting requirements (${plant.light}), and CO2 parameters on AquaGuide / AquvaGuide.`;

  return {
    title: titleText,
    description: descText,
    keywords: [
      `${plant.name.toLowerCase()} care`,
      `${plant.name.toLowerCase()} aquarium plant`,
      `aquaguide ${plant.name.toLowerCase()}`,
      `aquvaGuide ${plant.slug}`,
      "aquaguide",
      "aquvaGuide"
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

  // Dynamic JSON-LD structures
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

  return (
    <div className="w-full pb-24 text-slate-100 bg-black">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src={plant.image}
            alt={`${plant.name} (${plant.scientificName}) live aquatic plant in setup`}
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pb-12 text-left">
          <Link href="/plants" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Plants
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-450 text-xs font-bold border border-emerald-500/30 capitalize tracking-wider`}>
              {plant.difficulty} Care
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-2 text-white leading-tight">{plant.name}</h1>
          <p className="text-lg md:text-xl text-emerald-300/80 italic font-light mb-6">{plant.scientificName}</p>

          {/* Above the fold CTA */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link 
              href="/compatibility" 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-all shadow-lg shadow-emerald-600/10 flex items-center gap-2 cursor-pointer"
            >
              <span>Check Compatible Fish</span>
              <Sparkles className="w-4 h-4" />
            </Link>
            <Link 
              href="/aquascape-planner" 
              className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-250 hover:text-white font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Design Layout</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid lg:grid-cols-3 gap-12 text-left">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 font-poppins text-white">
                <Info className="w-6 h-6 text-emerald-400" /> About {plant.name}
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-light whitespace-pre-line">{plant.description}</p>
            </section>

            {/* Growth Requirements */}
            <section className="glass p-8 rounded-3xl border border-border bg-card/10 space-y-8">
              <h2 className="text-2xl font-bold font-poppins text-white pb-4 border-b border-slate-900">Growth Parameters</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                  <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Lighting</span>
                  <span className="font-semibold text-white">{plant.light}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                  <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">CO2 Dosing</span>
                  <span className="font-semibold text-white">{plant.co2}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                  <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Growth Rate</span>
                  <span className="font-semibold text-white">{plant.growthRate}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900 col-span-2 md:col-span-1">
                  <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Placement</span>
                  <span className="font-semibold text-white truncate block">{plant.placement}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                  <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Temperature</span>
                  <span className="font-semibold text-white">{plant.temperature}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                  <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">pH Level</span>
                  <span className="font-semibold text-white">{plant.ph}</span>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Tips Sidebar */}
          <aside className="space-y-8">
            <div className="glass p-6 rounded-3xl border border-border bg-card/25 sticky top-24 space-y-6">
              <h3 className="text-xl font-bold font-poppins text-white">Planting Tips</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-900">
                  <ArrowUpRight className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm mb-1 text-slate-200">Placement Strategy</strong>
                    <span className="text-xs text-slate-400 font-light leading-relaxed">{plant.placement} works best to create structural layout depth.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-900">
                  <Activity className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm mb-1 text-slate-200">CO2 Needs</strong>
                    <span className="text-xs text-slate-400 font-light leading-relaxed">{plant.co2 === "Recommended" || plant.co2 === "Required" ? "Requires gaseous CO2 systems for robust carpeting." : "Thrives in low-tech setups without high CO2 additions."}</span>
                  </div>
                </li>
              </ul>
              
              <div className="border-t border-slate-900 pt-6">
                <span className="text-xs text-slate-500 block mb-3 font-semibold uppercase tracking-wider">Plant Compatibility Check</span>
                <p className="text-xs text-slate-400 font-light mb-3">Suitable for community aquariums. Match with compatible fish species.</p>
                <Link
                  href={getFishLink("neon-tetra")}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-center rounded-xl text-xs font-semibold text-slate-350 transition-colors block cursor-pointer"
                >
                  View Compatible Fish
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
