'use client';

import GlobalCTA from '@/components/ui/GlobalCTA';

export default function FinalCTA() {
  return (
    <GlobalCTA
      badge="ROSHAN AQUVA WORLD"
      title={
        <>
          Build a better aquarium, <br className="hidden sm:inline" />
          one decision at a time.
        </>
      }
      description="Systematic guides, species compatibility algorithms, water testing calculators, and equipment manuals designed for beginner and veteran fishkeepers."
      primaryAction={{
        label: 'Explore Species Catalog',
        href: '/fish',
      }}
      secondaryAction={{
        label: 'Explore Botanical Plants',
        href: '/plants',
      }}
      showQuickLinks={true}
    />
  );
}
