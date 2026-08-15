import { starterGuideSteps } from "@/data/guides";
import StartAquariumClient from "@/components/start-aquarium/StartAquariumClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Start Your First Aquarium: Step-by-Step Guide | AquaVersa",
  description: "Follow our interactive guide to safely set up your first aquarium. Learn how to choose a tank, condition water, cycle the ecosystem, and avoid common beginner mistakes.",
};

export default function StartAquariumPage() {
  return <StartAquariumClient starterGuideSteps={starterGuideSteps} />;
}
