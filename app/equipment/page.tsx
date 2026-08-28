import { Metadata } from "next";
import { equipmentData } from "@/data/equipment";
import EquipmentClient from "./EquipmentClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Aquarium Equipment Spec Guides & Hardware | AquaGuide",
  description: "Detailed hardware specifications and maintenance tutorials for aquarium filtration, heating, lighting, and aeration systems on AquaGuide / AquvaGuide.",
  keywords: [
    "aquaguide equipment",
    "aquarium hardware guide",
    "aquvaGuide equipment",
    "aquaguide",
    "aquvaGuide",
    "aquarium filtration specs"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/equipment`,
  }
};

export default function EquipmentPage() {
  return <EquipmentClient eqList={equipmentData} />;
}
