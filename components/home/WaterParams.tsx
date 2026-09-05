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
      icon: <FlaskConical className="w-5 h-5 text-[#27187e]" strokeWidth={2} />,
    },
    {
      id: 'nitrite',
      name: 'Nitrite (NO2)',
      target: '0 ppm (Strictly)',
      danger: '> 0 ppm',
      desc: 'The intermediate compound in the biological nitrogen cycle. Toxic to fish respiration. Converted by beneficial nitrifying bacteria into nitrate.',
      icon: <FlaskConical className="w-5 h-5 text-[#27187e]" strokeWidth={2} />,
    },
    {
      id: 'nitrate',
      name: 'Nitrate (NO3)',
      target: '< 20 ppm',
      danger: '> 40 ppm',
      desc: 'The final byproduct of biological filtration. Safely managed through regular partial water changes and nutrient uptake by live plants.',
      icon: <FlaskConical className="w-5 h-5 text-[#27187e]" strokeWidth={2} />,
    },
    {
      id: 'ph',
      name: 'pH Level',
      target: 'Species Specific',
      danger: 'Rapid Fluctuations',
      desc: 'Measures water acidity vs alkalinity. Consistent stability is far more critical than chasing a theoretical number with chemical additives.',
      icon: <TestTubes className="w-5 h-5 text-[#27187e]" strokeWidth={2} />,
    },
    {
      id: 'temp',
      name: 'Water Temperature',
      target: 'Species Specific',
      danger: 'Sudden Chills or Spikes',
      desc: 'Tropical species typically thrive between 72–80°F. Reliable heaters and digital thermometers protect fish from stress-induced diseases.',
      icon: <Thermometer className="w-5 h-5 text-[#27187e]" strokeWidth={2} />,
    },
    {
      id: 'gh-kh',
      name: 'Hardness (GH / KH)',
      target: 'Species Specific',
      danger: 'KH < 3 dKH (Crash Risk)',
      desc: 'Carbonate hardness (KH) buffers against catastrophic pH crashes, while General hardness (GH) provides essential minerals for invertebrates.',
      icon: <Droplets className="w-5 h-5 text-[#27187e]" strokeWidth={2} />,
    }
  ];

  return (
    <section className="py-24 bg-[#f7f7ff] text-[#27187e] relative text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] mb-4 text-[#27187e] text-xs font-semibold uppercase tracking-wider font-readable">
            <TestTubes className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Water Chemistry Fundamentals</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#27187e] tracking-tight">
            Understanding Aquarium Water Chemistry
          </h2>
          <p className="text-[#27187e]/85 text-base sm:text-lg max-w-2xl mt-3 font-readable leading-relaxed">
            Successful fishkeeping is fundamentally about cultivating a balanced aquatic ecosystem. Mastering key parameters prevents 95% of common health issues.
          </p>
        </div>

        {/* Stability Warning Notice */}
        <div className="mb-10 p-6 rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] flex items-start gap-4 text-left shadow-sm font-readable">
          <ShieldCheck className="w-6 h-6 text-[#27187e] shrink-0 mt-0.5" strokeWidth={2.2} />
          <div className="text-sm sm:text-base leading-relaxed text-[#27187e]/90">
            <strong className="font-bold text-[#27187e] block mb-1 text-base uppercase tracking-wider">Core Rule: Stability Trumps Perfection</strong>
            Most aquarium fish adapt comfortably to a range of natural water parameters as long as they are kept steady. Frequent chemical adjusters create volatile swings that stress fish far more than steady, slightly imperfect conditions.
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-readable">
          {params.map(param => (
            <div 
              key={param.id} 
              className="p-6 rounded-3xl border-2 border-[#cfcaf5] bg-[#ffffff] hover:border-[#27187e] transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#edeafc]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#edeafc] text-[#27187e]">
                      {param.icon}
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-[#27187e]">
                      {param.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 mb-4 bg-[#f7f7ff] p-3.5 rounded-2xl border border-[#cfcaf5] text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#27187e]/70 font-semibold uppercase tracking-wider text-xs">Safe Target:</span>
                    <strong className="text-[#27187e] font-bold">{param.target}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#27187e]/70 font-semibold uppercase tracking-wider text-xs">Danger Zone:</span>
                    <strong className="text-[#27187e] font-bold">{param.danger}</strong>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed">
                  {param.desc}
                </p>
              </div>

              {showCTA && (
                <div className="pt-4 mt-5 border-t border-[#edeafc]">
                  <Link
                    href="/water-analyzer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#27187e] hover:underline"
                  >
                    <span>Analyze This Parameter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
