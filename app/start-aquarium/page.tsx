import { starterGuideSteps } from "@/data/guides";
import StartAquariumClient from "@/components/start-aquarium/StartAquariumClient";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `How to Start Your First Aquarium: Step-by-Step Guide | ${siteConfig.name}`,
  description: `Follow our interactive guide to safely set up your first aquarium. Learn how to choose a tank, condition water, cycle the ecosystem, and avoid common beginner mistakes on ${siteConfig.name}.`,
  keywords: [
    "roshan aquva world beginner setup",
    "start aquarium guide step by step",
    "roshan aquva world beginner guide",
    "roshan aquva world",
    "aquaguide",
    "aquvaGuide"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/start-aquarium`,
  }
};

export default function StartAquariumPage() {
  return <StartAquariumClient starterGuideSteps={starterGuideSteps} />;
}
