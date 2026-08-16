import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aquarium Fish Care Library & Compatibility Guide | AquaGuide',
  description: 'Browse our complete tropical aquarium fish database. Get detailed care parameters, diets, temperaments, and sizing guides for freshwater and saltwater fish.',
};

export default function FishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
