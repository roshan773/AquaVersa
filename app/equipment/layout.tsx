import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aquarium Equipment Guides & Hardware Specifications | AquaVersa',
  description: 'Comprehensive guides for aquarium hardware. Choose the right filters, heaters, reef lighting, and aeration systems for your tank setup.',
};

export default function EquipmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
