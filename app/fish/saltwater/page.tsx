import { Metadata } from "next";
import { fishData } from "@/data/fish";
import SaltwaterClient from "./SaltwaterClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Saltwater Marine Fish Care, Species & Compatibility | ${siteConfig.name}`,
  description: `Detailed care guide library for saltwater marine aquarium fish on ${siteConfig.name}. Browse clownfish, marine tangs, gobies, and cardinalfish. Learn about salinity, parameters, and compatibility.`,
  keywords: [
    "roshan aquva world saltwater fish",
    "saltwater marine species guide",
    "roshan aquva world marine",
    "roshan aquva world",
    "aquaguide",
    "aquvaGuide"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/fish/saltwater`,
  }
};

export default function SaltwaterPage() {
  const saltwaterFish = fishData.filter(f => f.category?.toLowerCase() === "saltwater");
  return <SaltwaterClient saltwaterFish={saltwaterFish} />;
}
