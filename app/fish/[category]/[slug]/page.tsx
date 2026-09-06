import { fishData } from '@/data/fish';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, Droplets, Thermometer, ShieldCheck, Ruler, Activity, Layers, Heart, Sparkles, Utensils, Clock } from 'lucide-react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
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
    return constructMetadata({
      title: 'Species Care Sheet & Aquarium Guide',
      description: 'Aquarium fish species care sheet, water parameter requirements, and tank setup profile.',
      path: `/fish/${category}/${slug}`,
    });
  }

  const titleText = `${fish.name} Care Guide: Tank Size, Water Parameters & Diet`;
  const descText = `${fish.name} (${fish.scientificName}) complete care profile. Minimum tank size: ${fish.minTankSize} gal, temperature: ${fish.temperature}, pH: ${fish.ph}, diet: ${fish.diet}, temperament: ${fish.temperament}.`;

  return constructMetadata({
    title: titleText,
    description: descText,
    path: `/fish/${category.toLowerCase()}/${fish.slug}`,
    image: fish.image,
  });
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

  // Find compatible species objects for rich links
  const compatibleFishList = (fish.compatibleWith || [])
    .map((cSlug) => fishData.find((f) => f.slug === cSlug))
    .filter((f): f is typeof fishData[0] => Boolean(f));

  // Find related species from the same habitat
  const relatedSpecies = fishData
    .filter((f) => f.category === fish.category && f.id !== fish.id)
    .slice(0, 3);

  const categoryName = fish.category ? `${fish.category} Fish` : 'Fish';
  const categoryPath = fish.category?.toLowerCase() === 'saltwater' ? '/fish/saltwater' : '/fish/freshwater';

  const breadcrumbs = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Species Atlas', url: '/fish' },
    { name: categoryName, url: categoryPath },
    { name: fish.name, url: `/fish/${fish.category?.toLowerCase()}/${fish.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${fish.name} (${fish.scientificName}) Species Care Profile`,
    description: fish.description,
    image: `${siteConfig.url}${fish.image}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/fish/${fish.category?.toLowerCase()}/${fish.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light font-readable">
        <div className="site-container">
          
          {/* Visual Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#27187e]/70">
              <li>
                <Link href="/" className="hover:text-[#27187e] hover:underline">Home</Link>
              </li>
              <li>•</li>
              <li>
                <Link href="/fish" className="hover:text-[#27187e] hover:underline">Species Atlas</Link>
              </li>
              <li>•</li>
              <li>
                <Link href={categoryPath} className="hover:text-[#27187e] hover:underline">{categoryName}</Link>
              </li>
              <li>•</li>
              <li className="text-[#27187e] font-bold" aria-current="page">{fish.name}</li>
            </ol>
          </nav>

          {/* Species Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 pb-12 border-b-2 border-[#cfcaf5]">
            
            {/* Left: Species Info & Overview */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#27187e] text-[#f7f7ff]">
                  {fish.category}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                  {fish.difficulty} Care
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-normal text-[#27187e] tracking-tight leading-none mb-3">
                {fish.name}
              </h1>
              
              <p className="text-base sm:text-lg text-[#27187e]/70 italic mb-6 font-medium">
                {fish.scientificName}
              </p>

              <p className="text-base sm:text-lg text-[#27187e]/90 leading-relaxed mb-8 max-w-[65ch]">
                {fish.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/compatibility"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-sm sm:text-base font-semibold transition-all shadow-md"
                >
                  <span>Check Compatibility</span>
                  <Compass className="w-4 h-4 text-[#f7f7ff]" />
                </Link>
                <Link
                  href="/stocking-planner"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#ffffff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] text-sm sm:text-base font-semibold transition-all"
                >
                  <span>Add to Stocking Plan</span>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-2">
                <Activity className="w-3.5 h-3.5" />
                <span>Biological &amp; Tank Specifications</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-[#27187e] tracking-tight">
                Species Profile &amp; Requirements
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
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
                  Maximum Adult Size
                </span>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block">
                  {fish.maxSize ? `${fish.maxSize} Inches` : 'Standard'}
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
                  Dietary Classification
                </span>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block capitalize">
                  {fish.diet || 'Omnivore'}
                </span>
              </div>

              <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 rounded-2xl shadow-sm">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#27187e]/70 block mb-1">
                  Expected Lifespan
                </span>
                <span className="font-display text-3xl sm:text-4xl text-[#27187e] block capitalize">
                  {fish.lifespan || '3-5 years'}
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
            </div>

            {/* In-depth Care & Nutrition Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {fish.careGuide && (
                <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 sm:p-8 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#27187e]/70 tracking-wider mb-3">
                    <ShieldCheck className="w-4 h-4 text-[#27187e]" />
                    <span>Aquarium Care &amp; Husbandry</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#27187e] mb-3">Husbandry Requirements</h3>
                  <p className="text-base text-[#27187e]/90 leading-relaxed font-medium">
                    {fish.careGuide}
                  </p>
                  {fish.difficultyReason && (
                    <div className="mt-4 p-4 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] text-sm text-[#27187e] font-medium leading-relaxed">
                      <strong>Keeper Note:</strong> {fish.difficultyReason}
                    </div>
                  )}
                </div>
              )}

              <div className="bg-[#ffffff] border-2 border-[#cfcaf5] p-6 sm:p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#27187e]/70 tracking-wider mb-3">
                  <Utensils className="w-4 h-4 text-[#27187e]" />
                  <span>Feeding &amp; Tank Mates</span>
                </div>
                <h3 className="font-display text-2xl text-[#27187e] mb-3">Dietary Recommendations</h3>
                {fish.foods && fish.foods.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {fish.foods.map((food, idx) => (
                      <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-[#edeafc] border border-[#cfcaf5] text-xs font-bold text-[#27187e]">
                        {food}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#27187e]/80 mb-6 font-medium">Standard quality flakes, sinking micro-pellets, and frozen treats.</p>
                )}

                {compatibleFishList.length > 0 && (
                  <div>
                    <span className="text-xs uppercase font-bold text-[#27187e]/70 block tracking-wider mb-2">
                      Documented Compatible Species
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {compatibleFishList.map((comp) => (
                        <Link
                          key={comp.id}
                          href={`/fish/${comp.category?.toLowerCase() || 'freshwater'}/${comp.slug}`}
                          className="px-3 py-1 rounded-lg bg-[#f7f7ff] border border-[#cfcaf5] text-xs font-semibold text-[#27187e] hover:border-[#27187e] hover:underline"
                        >
                          {comp.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#27187e]/70 block mb-1">
                    EXPLORE SIMILAR SPECIES
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-[#27187e] tracking-tight">
                    Related {fish.category} Species
                  </h3>
                </div>
                <Link
                  href="/fish"
                  className="font-semibold text-sm sm:text-base text-[#27187e] hover:underline inline-flex items-center gap-2"
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
                      <p className="text-sm text-[#27187e]/70 italic mb-3">
                        {rel.scientificName}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#edeafc] flex items-center justify-between font-semibold text-sm text-[#27187e]">
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
    </>
  );
}
