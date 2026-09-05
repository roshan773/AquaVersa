import { fishData } from '@/data/fish';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, Droplets, Thermometer, ShieldCheck, Ruler, Activity, Layers } from 'lucide-react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import GlobalCTA from '@/components/ui/GlobalCTA';
import CareDisclaimer from '@/components/ui/CareDisclaimer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const fish = fishData.find((f) => f.slug === slug && f.category?.toLowerCase() === category.toLowerCase());

  if (!fish) {
    return {
      title: `Species Field Guide - ${siteConfig.name}`,
      description: `Learn how to care for tropical fish on ${siteConfig.name}.`,
    };
  }

  const titleText = `${fish.name} (${fish.scientificName}) Field Guide | ${siteConfig.name}`;
  const descText = `Comprehensive ${fish.name} (${fish.scientificName}) care sheet. Minimum tank volume: ${fish.minTankSize} Gallons, temperament: ${fish.temperament}, pH: ${fish.ph}, temperature: ${fish.temperature}.`;

  return {
    title: titleText,
    description: descText,
    keywords: [
      `${fish.name.toLowerCase()} care`,
      `${fish.name.toLowerCase()} compatibility`,
      `${fish.name.toLowerCase()} tank size`,
      `roshan aquva world ${fish.name.toLowerCase()}`,
      `roshan aquva world ${fish.slug}`,
    ],
    openGraph: {
      title: titleText,
      description: descText,
      url: `${siteConfig.siteUrl}/fish/${category.toLowerCase()}/${fish.slug}`,
      siteName: siteConfig.name,
      type: 'article',
      images: [
        {
          url: `${siteConfig.siteUrl}${fish.image}`,
          width: 800,
          height: 600,
          alt: `${fish.name} in planted aquarium`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: descText,
      images: [`${siteConfig.siteUrl}${fish.image}`],
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/fish/${category.toLowerCase()}/${fish.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return fishData
    .filter((fish) => fish.category && fish.slug)
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

  // Find related species from the same habitat
  const relatedSpecies = fishData
    .filter((f) => f.category === fish.category && f.id !== fish.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Back Link */}
        <Link
          href="/fish"
          className="inline-flex items-center gap-2 text-sm font-readable font-semibold text-[#27187e] hover:underline mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Species Field Guide</span>
        </Link>

        {/* Species Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 pb-12 border-b-2 border-[#cfcaf5]">
          
          {/* Left: Species Info & Overview */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="font-readable text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#27187e] text-[#f7f7ff]">
                {fish.category}
              </span>
              <span className="font-readable text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                {fish.difficulty} Care
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-tight leading-none mb-3">
              {fish.name}
            </h1>
            
            <p className="text-base sm:text-lg text-[#27187e]/70 italic font-readable mb-6 font-medium">
              {fish.scientificName}
            </p>

            <p className="text-base sm:text-lg text-[#27187e]/90 font-readable leading-relaxed mb-8 max-w-[65ch]">
              {fish.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/compatibility"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-sm sm:text-base font-readable font-semibold transition-all shadow-md"
              >
                <span>Check Compatibility</span>
                <Compass className="w-4 h-4 text-[#f7f7ff]" />
              </Link>
              <Link
                href="/start-aquarium"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#ffffff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] text-sm sm:text-base font-readable font-semibold transition-all"
              >
                <span>Start Setup Guide</span>
              </Link>
            </div>
          </div>

          {/* Right: High-Resolution Species Photo */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#12093d] overflow-hidden border-4 border-[#ffffff] shadow-2xl">
              <Image
                src={fish.image}
                alt={`${fish.name} (${fish.scientificName})`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>

        </div>

        {/* SPECIES PROFILE: Structured Natural History Parameters */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Taxonomic Specifications</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-normal text-[#27187e] tracking-tight">
              Species Profile &amp; Biology
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left font-readable">
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Minimum Tank Volume
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                {fish.minTankSize} Gallons
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Temperature Range
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                {fish.temperature}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                pH Range
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                {fish.ph}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Temperament
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                {fish.temperament}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Care Difficulty
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block capitalize">
                {fish.difficulty}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Biotope Category
              </span>
              <span className="font-display text-3xl sm:text-4xl text-[#27187e] block capitalize">
                {fish.category}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm sm:col-span-2">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                Compatibility &amp; Cohabitation Guidance
              </span>
              <p className="text-sm sm:text-base text-[#27187e]/90 block mt-2 font-medium leading-relaxed">
                Successful cohabitation typically requires matching water parameters (pH &amp; temp), respecting swim territories, and providing suitable hides or plant cover. Requirements may vary between individual fish and aquarium setups.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <CareDisclaimer />
          </div>
        </div>

        {/* RELATED SPECIES */}
        {relatedSpecies.length > 0 && (
          <div className="pt-12 border-t-2 border-[#cfcaf5]">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-readable font-semibold uppercase tracking-wider text-[#27187e]/70 block mb-1">
                  EXPLORE SIMILAR SPECIES
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-[#27187e] tracking-tight">
                  Related {fish.category} Species
                </h3>
              </div>
              <Link
                href="/fish"
                className="font-readable font-semibold text-sm sm:text-base text-[#27187e] hover:underline inline-flex items-center gap-2"
              >
                <span>Browse Full Species Index</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedSpecies.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/fish/${rel.category?.toLowerCase() || 'freshwater'}/${rel.slug}`}
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
                    <h4 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] leading-tight mb-1">
                      {rel.name}
                    </h4>
                    <p className="text-sm text-[#27187e]/70 italic font-readable mb-3">
                      {rel.scientificName}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#edeafc] flex items-center justify-between font-readable font-semibold text-sm text-[#27187e]">
                    <span>View Care Sheet</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <GlobalCTA
        badge="SPECIES COMPATIBILITY & TANK PLANNING"
        title={
          <>
            Planning to house {fish.name}? <br className="hidden sm:inline" />
            Check your tank parameters.
          </>
        }
        description={`Calculate stocking levels and verify tank mate compatibility for ${fish.name} with our interactive tools.`}
        primaryAction={{
          label: 'Open Stocking Planner',
          href: '/stocking-planner',
        }}
        secondaryAction={{
          label: 'Check Water Parameters',
          href: '/water-analyzer',
        }}
      />
    </div>
  );
}
