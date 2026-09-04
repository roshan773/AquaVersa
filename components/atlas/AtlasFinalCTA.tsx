'use client';

import GlobalCTA from '@/components/ui/GlobalCTA';

export default function AtlasFinalCTA() {
  return (
    <GlobalCTA
      badge="THE AQUARIUM ATLAS ARCHIVES"
      title="Build a better aquarium, one decision at a time."
      description="Explore species biological profiles, water chemistry parameters, and step-by-step equipment setup guides in our comprehensive archive."
      primaryAction={{
        label: 'Explore Species Library',
        href: '/fish',
      }}
      secondaryAction={{
        label: 'Start with the Basics',
        href: '/start-aquarium',
      }}
    />
  );
}
