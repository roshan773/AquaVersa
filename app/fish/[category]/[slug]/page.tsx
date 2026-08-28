import { fishData } from "@/data/fish";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Droplets, Thermometer, Info, Leaf, Activity, Sparkles, HelpCircle } from "lucide-react";
import { Metadata } from 'next';
import { siteConfig } from "@/config/site";
import { getFishLink, getPlantLink } from "@/lib/linking";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const fish = fishData.find((f) => f.slug === slug && f.category?.toLowerCase() === category.toLowerCase());
  
  if (!fish) {
    return {
      title: `Fish Care Guide - ${siteConfig.name}`,
      description: "Learn how to care for tropical fish on AquaGuide / AquvaGuide.",
    };
  }

  const titleText = `${fish.name} Care Guide: Tank Size, Temperament & Water Parameters | AquaGuide`;
  const descText = `Complete ${fish.name} (${fish.scientificName}) care guide. Learn about minimum tank size (${fish.minTankSize} Gallons), temperament (${fish.temperament}), pH (${fish.ph}), temperature (${fish.temperature}), diet, and compatible tank mates on AquaGuide / AquvaGuide.`;

  return {
    title: titleText,
    description: descText,
    keywords: [
      `${fish.name.toLowerCase()} care`,
      `${fish.name.toLowerCase()} compatibility`,
      `${fish.name.toLowerCase()} tank size`,
      `aquaguide ${fish.name.toLowerCase()}`,
      `aquvaGuide ${fish.slug}`,
      "aquaguide",
      "aquvaGuide"
    ],
    openGraph: {
      title: titleText,
      description: descText,
      url: `${siteConfig.siteUrl}/fish/${category.toLowerCase()}/${fish.slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: `${siteConfig.siteUrl}${fish.image}`,
          width: 800,
          height: 600,
          alt: `${fish.name} swimming in aquarium`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: [`${siteConfig.siteUrl}${fish.image}`],
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/fish/${category.toLowerCase()}/${fish.slug}`,
    }
  };
}

export async function generateStaticParams() {
  return fishData
    .filter(fish => fish.category && fish.slug)
    .map((fish) => ({
      category: fish.category!.toLowerCase(),
      slug: fish.slug,
    }));
}

export default async function FishDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const fish = fishData.find((f) => f.slug === slug && f.category?.toLowerCase() === category.toLowerCase());

  if (!fish) {
    notFound();
  }

  const isFreshwater = fish.category?.toLowerCase() === "freshwater";
  const themeColor = isFreshwater ? "cyan" : "blue";

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
        "name": "Fish",
        "item": `${siteConfig.siteUrl}/fish`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": isFreshwater ? "Freshwater" : "Saltwater",
        "item": `${siteConfig.siteUrl}/fish/${category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": fish.name,
        "item": `${siteConfig.siteUrl}/fish/${category.toLowerCase()}/${fish.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${fish.name} Care Guide: Tank Size, Temperament & Water Parameters`,
    "description": fish.description,
    "image": `${siteConfig.siteUrl}${fish.image}`,
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
      "@id": `${siteConfig.siteUrl}/fish/${category.toLowerCase()}/${fish.slug}`
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
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src={fish.image}
            alt={`${fish.name} (${fish.scientificName}) swimming in aquarium environment`}
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pb-12 text-left">
          <Link href={`/fish/${category.toLowerCase()}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to {fish.category}
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full bg-${themeColor}-500/20 text-${themeColor}-400 text-xs font-bold border border-${themeColor}-500/30 capitalize tracking-wider`}>
              {fish.difficulty} Care
            </div>
            <div className={`px-3 py-1 rounded-full bg-${themeColor}-500/20 text-${themeColor}-400 text-xs font-bold border border-${themeColor}-500/30 capitalize tracking-wider`}>
              {fish.category}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-2 text-white leading-tight">{fish.name}</h1>
          <p className="text-lg md:text-xl text-slate-300 italic font-light mb-6">{fish.scientificName}</p>

          {/* Above the fold CTA */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link 
              href="/compatibility" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-all shadow-lg shadow-blue-600/10 flex items-center gap-2 cursor-pointer"
            >
              <span>Check Compatibility</span>
              <Sparkles className="w-4 h-4" />
            </Link>
            <Link 
              href="/start-aquarium" 
              className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-250 hover:text-white font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Start Setup Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid lg:grid-cols-3 gap-12 text-left">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Difficulty & Guidance */}
            <section className="glass p-8 rounded-3xl border border-border bg-card/30">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2 font-poppins text-white">
                    Experience Level: {fish.difficulty}
                  </h2>
                  <p className="text-base font-semibold text-blue-400 mt-1">
                    {fish.difficulty === "Beginner" && "Highly recommended for beginner aquarists."}
                    {fish.difficulty === "Advanced Beginner" && "Good for beginners who have mastered basic tank cycling."}
                    {fish.difficulty === "Intermediate" && "Requires some keeping experience and parameter checks."}
                    {fish.difficulty === "Advanced" && "Demands specialized setups and close parameter oversight."}
                  </p>
                </div>
                <div className="shrink-0 bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Difficulty Score</div>
                  <div className="text-3xl font-extrabold text-blue-400">{fish.difficultyScore} <span className="text-base font-medium text-slate-550">/ 4</span></div>
                </div>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-slate-850">
                <p className="text-slate-400 italic text-sm leading-relaxed">
                  <strong className="text-slate-350 not-italic mr-1.5 font-bold uppercase tracking-wider text-[10px]">Context:</strong>
                  {fish.difficultyReason}
                </p>
              </div>
            </section>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2 font-poppins text-white">
                <Info className="w-6 h-6 text-blue-400" /> About the {fish.name}
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-light">{fish.description}</p>
            </section>

            {/* Care Guide */}
            <section className="glass p-8 rounded-3xl border border-border bg-card/10 space-y-8">
              <h2 className="text-2xl font-bold font-poppins text-white pb-4 border-b border-slate-900">Comprehensive Care Specs</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-200">
                    <Droplets className="w-5 h-5 text-blue-400" /> Water Parameters & Dimensions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                      <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Water Type</span>
                      <span className="font-semibold text-white capitalize">{fish.category}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                      <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Temperature</span>
                      <span className="font-semibold text-white">{fish.temperature || 'Varies'}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                      <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">pH Range</span>
                      <span className="font-semibold text-white">{fish.ph || 'Varies'}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                      <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Minimum Tank Size</span>
                      <span className="font-semibold text-white">{fish.minimumTankSize || (fish.minTankSize ? `${fish.minTankSize} Gal` : 'Varies')}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                      <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Max Growth Size</span>
                      <span className="font-semibold text-white">{fish.adultSize || (fish.maxSize ? `${fish.maxSize} inches` : 'Varies')}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900">
                      <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Average Lifespan</span>
                      <span className="font-semibold text-white">{fish.lifespan || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                {fish.careGuide && (
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-200">
                      <Info className="w-5 h-5 text-emerald-400" /> Tank Setup Guidelines
                    </h3>
                    <p className="text-slate-300 leading-relaxed font-light text-sm">{fish.careGuide}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-200">
                    <Activity className="w-5 h-5 text-amber-400" /> Diet & Nutrition
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {fish.foods && fish.foods.map((food, i) => (
                      <span key={i} className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">{food}</span>
                    ))}
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm font-light">
                    {Array.isArray(fish.diet) ? fish.diet.map((item, i) => (
                      <li key={i}>{item}</li>
                    )) : fish.diet ? <li>{fish.diet}</li> : <li>Varies depending on environment</li>}
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Compatibility Sidebar */}
          <aside className="space-y-8">
            <div className="glass p-6 rounded-3xl border border-border bg-card/25 sticky top-24 space-y-6">
              <div>
                <h3 className="text-xl font-bold font-poppins text-white mb-4">Compatibility Profile</h3>
                
                <div className="mb-2">
                  <span className="text-xs text-slate-500 block mb-1.5 font-semibold uppercase tracking-wider">Temperament</span>
                  <span className="inline-flex px-3.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                    {fish.temperament}
                  </span>
                </div>
              </div>

              {fish.compatibleWith && fish.compatibleWith.length > 0 && (
                <div className="border-t border-slate-900 pt-6">
                  <span className="text-xs text-slate-500 block mb-3 font-semibold uppercase tracking-wider">Compatible Tank Mates</span>
                  <ul className="space-y-2.5">
                    {fish.compatibleWith.map((mateSlug, i) => {
                      const mate = fishData.find(f => f.slug === mateSlug);
                      const mateName = mate ? mate.name : mateSlug.replace(/-/g, " ");
                      return (
                        <li key={i}>
                          <Link 
                            href={getFishLink(mateSlug)} 
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-xs font-semibold text-slate-300 transition-all hover:translate-x-0.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 
                            <span>{mateName}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4 flex items-center gap-1.5 bg-blue-500/5 border border-blue-500/10 p-3 rounded-xl text-[10px] text-slate-400">
                    <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Always monitor behavior when adding new tank mates.</span>
                  </div>
                </div>
              )}

              {fish.plants && fish.plants.length > 0 ? (
                <div className="border-t border-slate-900 pt-6">
                  <span className="text-xs text-slate-500 block mb-3 font-semibold uppercase tracking-wider">Recommended Plants</span>
                  <ul className="space-y-2">
                    {fish.plants.map((plantName, i) => (
                      <li key={i}>
                        <Link 
                          href={getPlantLink(plantName)} 
                          className="flex items-center gap-2 text-xs text-slate-450 hover:text-emerald-400 hover:underline transition-colors py-1 inline-flex"
                        >
                          <Leaf className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 
                          <span>{plantName}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="border-t border-slate-900 pt-6">
                  <span className="text-xs text-slate-500 block mb-2 font-semibold uppercase tracking-wider">Suggested Plants</span>
                  <p className="text-xs text-slate-400 font-light mb-3">Tough epiphytes are generally well tolerated by most fish.</p>
                  <Link 
                    href={getPlantLink("java-fern")} 
                    className="flex items-center gap-2 text-xs text-slate-450 hover:text-emerald-400 transition-colors py-1"
                  >
                    <Leaf className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 
                    <span>Java Fern Guide</span>
                  </Link>
                </div>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
