import { Waves } from "lucide-react";
import FishCompatibility from "@/components/home/FishCompatibility";
import FishPlantCompatibility from "@/components/home/FishPlantCompatibility";

export default function CompatibilityPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Waves className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Fish Compatibility Guide</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Discover which species thrive together. Filter by temperament, size, and water parameters to build a harmonious community.
            </p>
          </div>
        </div>
      </section>

      <FishCompatibility />
      <FishPlantCompatibility />
    </div>
  );
}
