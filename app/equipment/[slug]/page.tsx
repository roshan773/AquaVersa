import { equipmentData } from "@/data/equipment";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Settings, Info, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import { Metadata } from 'next';
import { siteConfig } from "@/config/site";

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
      description: "Learn how to choose the right aquarium equipment on AquaGuide / AquvaGuide.",
    };
  }

  const titleText = `${eq.name} Specification & Maintenance Guide | AquaGuide`;
  const descText = `Complete ${eq.name} hardware guide. Learn about its purpose, operational details, maintenance instructions, and beginner setup mistakes on AquaGuide / AquvaGuide.`;

  return {
    title: titleText,
    description: descText,
    keywords: [
      `${eq.name.toLowerCase()} specs`,
      `aquarium ${eq.name.toLowerCase()}`,
      `aquaguide ${eq.name.toLowerCase()}`,
      `aquvaGuide ${eq.slug}`,
      "aquaguide",
      "aquvaGuide"
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
            src={eq.image}
            alt={`${eq.name} - essential aquarium equipment specification visual`}
            fill
            className="object-cover opacity-45"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pb-12 text-left">
          <Link href="/equipment" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Equipment
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-sm font-semibold border border-amber-500/30 capitalize`}>
              {eq.category}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-2 text-white leading-tight">{eq.name}</h1>

          {/* Above the fold CTA */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link 
              href="/tank-size" 
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-all shadow-lg shadow-amber-600/10 flex items-center gap-2 cursor-pointer"
            >
              <span>Calculate Tank Size</span>
              <Sparkles className="w-4 h-4" />
            </Link>
            <Link 
              href="/equipment-wizard" 
              className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-250 hover:text-white font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Equipment Wizard</span>
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
                <Info className="w-6 h-6 text-amber-500" /> What is it?
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-light">{eq.description}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-white">Why do you need it?</h2>
              <p className="text-base text-slate-300 leading-relaxed font-light">{eq.purpose}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-white">How does it work?</h2>
              <p className="text-base text-slate-300 leading-relaxed font-light">{eq.howItWorks}</p>
            </section>

            <section className="glass p-8 rounded-3xl border border-border bg-card/10 space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-white pb-3 border-b border-slate-900">Maintenance Guide</h2>
              <p className="text-base text-slate-350 leading-relaxed font-light text-sm">{eq.maintenance}</p>
            </section>

          </div>

          {/* Right Column: Sidebar */}
          <aside className="space-y-8">
            <div className="glass p-6 rounded-3xl border border-border bg-card/25 sticky top-24 space-y-6">
              
              <div>
                <h3 className="text-xl font-bold font-poppins text-white mb-4">Suitable For</h3>
                <ul className="space-y-3">
                  {eq.suitableTanks?.map((tank, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-slate-300">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" /> {tank} Tanks
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-destructive/10 border border-destructive/20 space-y-2">
                <h3 className="font-bold text-destructive flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4.5 h-4.5" /> Avoid This Mistake
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{eq.beginnerMistakes}</p>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
