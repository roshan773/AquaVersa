import { Metadata } from "next";
import { fishData } from "@/data/fish";
import FishLibraryClient from "./FishLibraryClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Aquarium Fish Care Library & Species Catalog | AquaGuide",
  description: "Browse the complete AquaGuide / AquvaGuide fish species database. Detailed care profiles, water parameter ranges, temperaments, sizing, and compatibility guidelines for freshwater and saltwater fish.",
  keywords: [
    "aquaguide fish catalog",
    "aquaguide fish database",
    "aquaguide species care",
    "aquvaGuide fish",
    "aquaguide",
    "aquvaGuide",
    "aquaguide compatibility"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/fish`,
  }
};

export default function FishPage() {
  return <FishLibraryClient initialFish={fishData} />;
}
