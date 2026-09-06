import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import AchievementsClient from './AchievementsClient';

export const metadata = constructMetadata({
  title: 'Aquarist Achievements & Badges: Track Learning Milestones',
  description: 'Track your aquarium keeper journey and unlock milestone badges for cycling mastery, stocking architecture, water chemistry, and aquascaping.',
  path: '/achievements',
});

export default function AchievementsPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Aquarium Achievements', url: '/achievements' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AchievementsClient />
    </>
  );
}
