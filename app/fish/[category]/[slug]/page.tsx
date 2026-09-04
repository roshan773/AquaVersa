import { fishData } from '@/data/fish';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, Droplets, Thermometer, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

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
          className="inline-flex items-center gap-2 text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:text-[#1b1059] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Species Field Guide</span>
        </Link>

        {/* Species Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 pb-12 border-b-2 border-[#cfcaf5]">
          
          {/* Left: Species Info & Overview */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-condensed font-bold uppercase px-3 py-1 rounded-md bg-[#27187e] text-[#f7f7ff]">
                {fish.category}
              </span>
              <span className="text-xs font-condensed font-bold uppercase px-3 py-1 rounded-md bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                {fish.difficulty} Level
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide leading-tight mb-2">
              {fish.name}
            </h1>
            
            <p className="text-sm sm:text-base text-[#27187e]/70 italic font-sans mb-6">
              {fish.scientificName}
            </p>

            <p className="text-base sm:text-lg text-[#27187e]/85 font-sans leading-relaxed mb-8">
              {fish.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/compatibility"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Check Compatibility</span>
                <Compass className="w-4 h-4 text-[#f7f7ff]" />
              </Link>
              <Link
                href="/start-aquarium"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#f7f7ff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all"
              >
                <span>Start Setup Checklist</span>
              </Link>
            </div>
          </div>

          {/* Right: Large High-Resolution Species Photo */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0d0630] overflow-hidden border-4 border-[#ffffff] shadow-2xl">
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
          <div className="mb-6">
            <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] block">
              NATURAL HISTORY DATA
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-normal text-[#27187e] tracking-wide">
              Species Profile &amp; Parameters
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-5 rounded-2xl">
              <span className="text-[11px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                Minimum Tank Volume
              </span>
              <span className="font-display text-2xl sm:text-3xl text-[#27187e] block mt-1">
                {fish.minTankSize} Gallons
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-5 rounded-2xl">
              <span className="text-[11px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                Temperature Range
              </span>
              <span className="font-display text-2xl sm:text-3xl text-[#27187e] block mt-1">
                {fish.temperature}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-5 rounded-2xl">
              <span className="text-[11px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                pH Range
              </span>
              <span className="font-display text-2xl sm:text-3xl text-[#27187e] block mt-1">
                {fish.ph}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-5 rounded-2xl">
              <span className="text-[11px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                Temperament
              </span>
              <span className="font-display text-2xl sm:text-3xl text-[#27187e] block mt-1">
                {fish.temperament}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-5 rounded-2xl">
              <span className="text-[11px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                Care Difficulty
              </span>
              <span className="font-display text-2xl sm:text-3xl text-[#27187e] block mt-1">
                {fish.difficulty}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-5 rounded-2xl">
              <span className="text-[11px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                Environment Type
              </span>
              <span className="font-display text-2xl sm:text-3xl text-[#27187e] block mt-1">
                {fish.category}
              </span>
            </div>

            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-5 rounded-2xl col-span-2">
              <span className="text-[11px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                Compatibility Note
              </span>
              <span className="text-xs sm:text-sm font-sans text-[#27187e] block mt-1 font-medium">
                Compatibility depends on tank conditions, individual temperament and available space.
              </span>
            </div>
          </div>
        </div>

        {/* RELATED SPECIES */}
        {relatedSpecies.length > 0 && (
          <div className="pt-12 border-t-2 border-[#cfcaf5]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] block">
                  EXPLORE SIMILAR SPECIES
                </span>
                <h3 className="text-4xl sm:text-5xl font-display font-normal text-[#27187e] tracking-wide">
                  Related {fish.category} Species
                </h3>
              </div>
              <Link
                href="/fish"
                className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:underline"
              >
                All Species →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedSpecies.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/fish/${rel.category?.toLowerCase() || 'freshwater'}/${rel.slug}`}
                  className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-5 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#0d0630] overflow-hidden mb-4">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="350px"
                      />
                    </div>
                    <h4 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] leading-tight">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-[#27187e]/70 italic font-sans mb-2">
                      {rel.scientificName}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase text-[#27187e]">
                    <span>View Care Sheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
