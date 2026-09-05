import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Aquarium Fish Care Library & Compatibility Guide | ${siteConfig.name}`,
  description: 'Explore our library of tropical aquarium fish. Find care parameters, diets, temperaments, and sizing guides for freshwater and saltwater fish.',
};

export default function FishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
