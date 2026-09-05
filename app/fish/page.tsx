import { Metadata } from "next";
import { fishData } from "@/data/fish";
import FishLibraryClient from "./FishLibraryClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Aquarium Fish Care Library & Species Catalog | ${siteConfig.name}`,
  description: `Browse the ${siteConfig.name} fish species library. Care profiles, water parameter ranges, temperaments, sizing, and compatibility guidelines for freshwater and saltwater fish.`,
  keywords: [
    "roshan aquva world fish catalog",
    "roshan aquva world fish database",
    "roshan aquva world species care",
    "roshan aquva world fish",
    "roshan aquva world",
    "aquaguide",
    "aquvaGuide"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/fish`,
  }
};

export default function FishPage() {
  return <FishLibraryClient initialFish={fishData} />;
}
