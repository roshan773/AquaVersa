import { Metadata } from "next";
import { fishData } from "@/data/fish";
import FreshwaterClient from "./FreshwaterClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Freshwater Fish Care, Species & Compatibility | AquaGuide",
  description: "Learn how to care for freshwater aquarium fish. Browse tetras, bettas, cichlids, guppies, and corydoras profiles on AquaGuide / AquvaGuide. Discover pH, temperature, and tank setup needs.",
  keywords: [
    "aquaguide freshwater fish",
    "freshwater fish care guide",
    "aquvaGuide freshwater",
    "aquaguide",
    "aquvaGuide",
    "aquaguide setup guide"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/fish/freshwater`,
  }
};

export default function FreshwaterPage() {
  const freshwaterFish = fishData.filter(f => f.category?.toLowerCase() === "freshwater");
  return <FreshwaterClient freshwaterFish={freshwaterFish} />;
}
