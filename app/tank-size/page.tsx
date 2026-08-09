import { MonitorSpeaker } from "lucide-react";
import TankSizeGuide from "@/components/home/TankSizeGuide";
import AquariumTypes from "@/components/home/AquariumTypes";

export default function TankSizePage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <MonitorSpeaker className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Tank Size Calculator</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Find the perfect aquarium size for your lifestyle, space, and the fish you want to keep.
            </p>
          </div>
        </div>
      </section>

      <TankSizeGuide />
      <AquariumTypes />
    </div>
  );
}
