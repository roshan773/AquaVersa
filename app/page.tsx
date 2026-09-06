import { constructMetadata } from '@/lib/seo';
import AtlasHero from '@/components/atlas/AtlasHero';
import AtlasDestinations from '@/components/atlas/AtlasDestinations';
import AtlasSpeciesIndex from '@/components/atlas/AtlasSpeciesIndex';
import AtlasKnowledge from '@/components/atlas/AtlasKnowledge';
import AtlasTools from '@/components/atlas/AtlasTools';
import AtlasBeginner from '@/components/atlas/AtlasBeginner';
import AtlasFinalCTA from '@/components/atlas/AtlasFinalCTA';

export const metadata = constructMetadata({
  title: 'The Comprehensive Aquarium Care & Planning Atlas',
  description: 'Explore verified species care sheets, live plant profiles, water parameter testing tools, stocking calculators, and beginner aquarium guides.',
  path: '/',
});

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#f7f7ff] text-[#27187e]">
      {/* 1. Original Editorial Hero */}
      <AtlasHero />

      {/* 2. Destination Portals: Fish, Plants, Equipment, Guides */}
      <AtlasDestinations />

      {/* 3. Species Field Guide Index */}
      <AtlasSpeciesIndex />

      {/* 4. Core Knowledge Pillars (Dark Persian Indigo Section) */}
      <AtlasKnowledge />

      {/* 5. Practical Planning Utilities */}
      <AtlasTools />

      {/* 6. Beginner 5-Step Progression */}
      <AtlasBeginner />

      {/* 7. Final Atlas CTA */}
      <AtlasFinalCTA />
    </div>
  );
}
