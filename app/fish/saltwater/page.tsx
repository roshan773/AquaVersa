import { Metadata } from "next";
import { fishData } from "@/data/fish";
import SaltwaterClient from "./SaltwaterClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Saltwater Marine Fish Care, Species & Compatibility | AquaGuide",
  description: "Detailed care guide library for saltwater marine aquarium fish on AquaGuide / AquvaGuide. Browse clownfish, marine tangs, gobies, and cardinalfish. Learn about salinity, parameters, and compatibility.",
  keywords: [
    "aquaguide saltwater fish",
    "saltwater marine species guide",
    "aquvaGuide marine",
    "aquaguide",
    "aquvaGuide",
    "aquaguide reef safe fish"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/fish/saltwater`,
  }
};

export default function SaltwaterPage() {
  const saltwaterFish = fishData.filter(f => f.category?.toLowerCase() === "saltwater");
  return <SaltwaterClient saltwaterFish={saltwaterFish} />;
}
