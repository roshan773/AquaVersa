import { TestTubes, Droplets, Thermometer, FlaskConical, ArrowRight, ShieldCheck } from 'lucide-react';
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
      icon: <FlaskConical className="w-5 h-5 text-[#F7F7FF]" />,
      tagColor: 'text-[#F7F7FF] bg-[#27187E] border-[#4a34c9]'
    },
    {
      id: 'nitrite',
      name: 'Nitrite (NO2)',
      target: '0 ppm (Strictly)',
      danger: '> 0 ppm',
      desc: 'The intermediate compound in the nitrogen cycle. Also toxic to fish respiration. Beneficial nitrifying bacteria convert this into nitrate.',
      icon: <FlaskConical className="w-5 h-5 text-[#aca1f7]" />,
      tagColor: 'text-[#aca1f7] bg-[#1c0e64] border-[#3622a6]'
    },
    {
      id: 'nitrate',
      name: 'Nitrate (NO3)',
      target: '< 20 ppm',
      danger: '> 40 ppm',
      desc: 'The final byproduct of the biological cycle. Safely managed through regular partial water changes and nutrient uptake by live aquatic plants.',
      icon: <FlaskConical className="w-5 h-5 text-[#F7F7FF]" />,
      tagColor: 'text-[#F7F7FF] bg-[#27187E] border-[#4a34c9]'
    },
    {
      id: 'ph',
      name: 'pH Level',
      target: 'Species Specific',
      danger: 'Rapid Fluctuations',
      desc: 'Measures water acidity. Consistent stability is much more critical than chasing a theoretical number with chemical additives.',
      icon: <TestTubes className="w-5 h-5 text-[#aca1f7]" />,
      tagColor: 'text-[#aca1f7] bg-[#1c0e64] border-[#3622a6]'
    },
    {
      id: 'temp',
      name: 'Water Temperature',
      target: 'Species Specific',
      danger: 'Sudden Chills or Spikes',
      desc: 'Tropical species typically thrive between 72–80°F. Reliable heaters and digital thermometers protect fish from stress-induced diseases.',
      icon: <Thermometer className="w-5 h-5 text-[#F7F7FF]" />,
      tagColor: 'text-[#F7F7FF] bg-[#27187E] border-[#4a34c9]'
    },
    {
      id: 'gh-kh',
      name: 'Hardness (GH / KH)',
      target: 'Species Specific',
      danger: 'KH < 3 dKH (Crash Risk)',
      desc: 'Carbonate hardness (KH) buffers against pH crashes, while General hardness (GH) provides essential minerals for invertebrates and plants.',
      icon: <Droplets className="w-5 h-5 text-[#aca1f7]" />,
      tagColor: 'text-[#aca1f7] bg-[#1c0e64] border-[#3622a6]'
    }
  ];

  return (
    <section className="py-20 bg-[#14094a] relative border-b border-[#27187E]/80 text-left">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#27187E]/50 border border-[#3622a6] mb-3 text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-semibold">
            <TestTubes className="w-3.5 h-3.5 text-[#aca1f7]" />
            <span>Water Chemistry Fundamentals</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#F7F7FF] tracking-wide">
            Understanding Aquarium Water
          </h2>
          <p className="text-[#F7F7FF]/75 text-sm max-w-2xl mt-2 font-normal leading-relaxed font-sans">
            Successful fishkeeping is fundamentally about cultivating a healthy aquatic environment. Understanding key parameters prevents common beginner issues.
          </p>
        </div>

        {/* Stability Warning Notice */}
        <div className="mb-8 p-4 rounded-xl bg-[#1c0e64] border border-[#27187E] flex items-start gap-3.5 text-left shadow-md">
          <ShieldCheck className="w-5 h-5 text-[#aca1f7] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-[#F7F7FF]/85 font-sans">
            <strong className="font-bold text-white block mb-0.5 font-condensed uppercase tracking-wider text-sm">Core Principle: Stability Over Constant Adjustment</strong>
            Most tank-bred fish adapt comfortably to a range of natural water parameters as long as they are kept stable. Frequent use of chemical adjusters can create volatile swings that stress fish far more than steady, slightly imperfect conditions.
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {params.map(param => (
            <div 
              key={param.id} 
              className="p-5 rounded-2xl border border-[#27187E] bg-[#1c0e64] flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-2 rounded-xl bg-[#27187E] border border-[#3622a6]">
                    {param.icon}
                  </div>
                  <span className={`text-[10px] font-condensed uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border ${param.tagColor}`}>
                    Target: {param.target}
                  </span>
                </div>
                <h3 className="text-xl font-display font-normal text-[#F7F7FF] mb-1.5 tracking-wide">{param.name}</h3>
                <p className="text-xs text-[#F7F7FF]/75 font-normal leading-relaxed mb-4 font-sans">{param.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#27187E] text-[11px] font-condensed uppercase tracking-wider flex justify-between items-center text-[#F7F7FF]/70 font-semibold">
                <span>Caution Zone:</span>
                <span className="font-bold text-[#F7F7FF]">{param.danger}</span>
              </div>
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="mt-10 text-center">
            <Link 
              href="/water-params" 
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F7F7FF] hover:bg-white text-[#27187E] font-condensed font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md"
            >
              <span>Explore Water Chemistry Guide</span>
              <ArrowRight className="w-4 h-4 text-[#27187E]" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
