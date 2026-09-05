'use client';

import GlobalCTA from '@/components/ui/GlobalCTA';

export default function AtlasFinalCTA() {
  return (
    <GlobalCTA
      badge="THE AQUARIUM KNOWLEDGE LIBRARY"
      title="Build a better aquarium, one decision at a time."
      description="Explore species profiles, water chemistry parameters, and practical equipment setup guides in our growing library."
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
