import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 leading-relaxed font-semibold text-sm text-slate-300">
      <h1 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight text-center">
        About <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">AquaVersa</span>
      </h1>
      <p className="text-center text-slate-400 max-w-lg mx-auto">
        The ultimate online portal dedicated to freshwater aquariums, plant aquascaping, biological filters, and species care directories.
      </p>

      <section className="glass rounded-3xl p-8 border border-slate-800/80 space-y-4 bg-slate-950/20 mt-10">
        <h2 className="text-xl font-bold text-slate-100">Our Mission</h2>
        <p>
          AquaVersa was founded to simplify the complex chemistry, calculations, and care metrics required to establish thriving aquatic ecosystems. We combine deep biological facts with interactive equipment calculators and tank mate matching tools to make fishkeeping approachable, ethical, and successful.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100">What We Provide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl">
            <h4 className="font-bold text-sky-400 mb-1">Interactive Matcher</h4>
            <p className="text-xs text-slate-400">Run cross-compatibility algorithms covering water type, pH ranges, sizes, and aggression levels.</p>
          </div>
          <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl">
            <h4 className="font-bold text-sky-400 mb-1">Equipment Calculators</h4>
            <p className="text-xs text-slate-400">Calculate tank volumes, heater sizing, filter flow turnovers, and stocking limits automatically.</p>
          </div>
          <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl">
            <h4 className="font-bold text-sky-400 mb-1">Plant Encyclopedia</h4>
            <p className="text-xs text-slate-400">Discover substrate, lighting, and CO2 requirements for a healthy aquascaped environment.</p>
          </div>
          <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl">
            <h4 className="font-bold text-sky-400 mb-1">Disease Diagnostics</h4>
            <p className="text-xs text-slate-400">Recognize symptoms, trace stressors, and view recovery guidelines with recommended medicines.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
