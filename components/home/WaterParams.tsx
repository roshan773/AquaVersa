import { TestTubes, Droplets, Thermometer, FlaskConical, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface WaterParamsProps {
  showCTA?: boolean;
}

export default function WaterParams({ showCTA = true }: WaterParamsProps) {
  const params = [
    {
      id: 'ammonia',
      name: 'Ammonia (NH3)',
      target: '0 ppm (Strictly)',
      danger: '> 0 ppm',
      desc: 'Highly toxic waste excreted by fish gills and decaying organic matter. Must be completely zero in an established, cycled aquarium.',
      icon: <FlaskConical className="w-5 h-5 text-rose-400" />,
      tagColor: 'text-rose-300 bg-rose-950/40 border-rose-800/40'
    },
    {
      id: 'nitrite',
      name: 'Nitrite (NO2)',
      target: '0 ppm (Strictly)',
      danger: '> 0 ppm',
      desc: 'The intermediate compound in the nitrogen cycle. Also toxic to fish respiration. Beneficial nitrifying bacteria convert this into nitrate.',
      icon: <FlaskConical className="w-5 h-5 text-amber-400" />,
      tagColor: 'text-amber-300 bg-amber-950/40 border-amber-800/40'
    },
    {
      id: 'nitrate',
      name: 'Nitrate (NO3)',
      target: '< 20 ppm',
      danger: '> 40 ppm',
      desc: 'The final byproduct of the biological cycle. Safely managed through regular partial water changes and nutrient uptake by live aquatic plants.',
      icon: <FlaskConical className="w-5 h-5 text-teal-400" />,
      tagColor: 'text-teal-300 bg-teal-950/40 border-teal-800/40'
    },
    {
      id: 'ph',
      name: 'pH Level',
      target: 'Species Specific',
      danger: 'Rapid Fluctuations',
      desc: 'Measures water acidity. Consistent stability is much more critical than chasing a theoretical number with chemical additives.',
      icon: <TestTubes className="w-5 h-5 text-sky-400" />,
      tagColor: 'text-sky-300 bg-sky-950/40 border-sky-800/40'
    },
    {
      id: 'temp',
      name: 'Water Temperature',
      target: 'Species Specific',
      danger: 'Sudden Chills or Spikes',
      desc: 'Tropical species typically thrive between 72–80°F. Reliable heaters and digital thermometers protect fish from stress-induced diseases.',
      icon: <Thermometer className="w-5 h-5 text-emerald-400" />,
      tagColor: 'text-emerald-300 bg-emerald-950/40 border-emerald-800/40'
    },
    {
      id: 'gh-kh',
      name: 'Hardness (GH / KH)',
      target: 'Species Specific',
      danger: 'KH < 3 dKH (Crash Risk)',
      desc: 'Carbonate hardness (KH) buffers against pH crashes, while General hardness (GH) provides essential minerals for invertebrates and plants.',
      icon: <Droplets className="w-5 h-5 text-teal-400" />,
      tagColor: 'text-teal-300 bg-teal-950/40 border-teal-800/40'
    }
  ];

  return (
    <section className="py-20 bg-[#040a14] relative border-b border-slate-800/80 text-left">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-800/30 mb-3 text-teal-300 text-xs font-semibold">
            <TestTubes className="w-3.5 h-3.5 text-teal-400" />
            <span>Water Chemistry Fundamentals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight">
            Understanding Aquarium Water
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-2 font-normal leading-relaxed">
            Successful fishkeeping is fundamentally about cultivating a healthy aquatic environment. Understanding key parameters prevents common beginner issues.
          </p>
        </div>

        {/* Stability Warning Notice */}
        <div className="mb-8 p-4 rounded-xl bg-[#061224] border border-slate-800 flex items-start gap-3.5 text-left">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-slate-300">
            <strong className="font-semibold text-white block mb-0.5">Core Principle: Stability Over Constant Adjustment</strong>
            Most tank-bred fish adapt comfortably to a range of natural water parameters as long as they are kept stable. Frequent use of chemical adjusters can create volatile swings that stress fish far more than steady, slightly imperfect conditions.
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {params.map(param => (
            <div 
              key={param.id} 
              className="p-5 rounded-xl border border-slate-800 bg-[#061224] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {param.icon}
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border ${param.tagColor}`}>
                    Target: {param.target}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 font-poppins">{param.name}</h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed mb-4">{param.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] flex justify-between items-center text-slate-400">
                <span>Caution Zone:</span>
                <span className="font-medium text-slate-200">{param.danger}</span>
              </div>
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="mt-10 text-center">
            <Link 
              href="/water-params" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              <span>Explore Water Chemistry Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
