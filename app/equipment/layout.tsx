import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Aquarium Equipment Guides & Hardware Specifications | ${siteConfig.name}`,
  description: 'Practical guides for aquarium hardware. Choose suitable filters, heaters, lighting, and aeration systems for your tank setup.',
};

export default function EquipmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
