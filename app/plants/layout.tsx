import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aquatic Plant Guide & Planting Database | AquaGuide',
  description: 'Explore live aquatic plants for freshwater aquariums. Learn about lighting, CO2, placement, and difficulty levels to build a thriving planted tank.',
};

export default function PlantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
