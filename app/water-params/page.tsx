import { Droplets } from "lucide-react";
import WaterParams from "@/components/home/WaterParams";
import MaintenanceSection from "@/components/home/MaintenanceSection";

export default function WaterChemistryPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Droplets className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Water Chemistry Guide</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Master the science of water quality. Learn how to test, balance, and maintain the perfect environment for your aquatic life.
            </p>
          </div>
        </div>
      </section>

      <WaterParams showCTA={false} />
      <MaintenanceSection />
    </div>
  );
}
