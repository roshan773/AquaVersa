import Image from "next/image";
import { Waves } from "lucide-react";

export default function GuidesPage() {
  return (
    <section className="min-h-screen py-24 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Guides & Tutorials</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            In‑depth step‑by‑step guides covering everything from water chemistry to advanced aquascaping techniques.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 glass rounded-3xl border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Water Chemistry</h2>
            <p className="text-slate-200">Learn how to test, balance, and maintain optimal parameters for a healthy aquarium.</p>
          </div>
          <div className="p-6 glass rounded-3xl border border-border">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Aquascaping Basics</h2>
            <p className="text-slate-200">Design stunning planted tanks with layout principles, plant placement, and lighting tips.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
