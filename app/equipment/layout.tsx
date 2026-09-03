import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Aquarium Equipment Guides & Hardware Specifications | ${siteConfig.name}`,
  description: 'Comprehensive guides for aquarium hardware. Choose the right filters, heaters, reef lighting, and aeration systems for your tank setup.',
};

export default function EquipmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
