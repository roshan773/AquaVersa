import { TestTubes, Droplets, Thermometer, FlaskConical, ArrowRight, AlertTriangle } from 'lucide-react';
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
      desc: 'Highly toxic waste product excreted by fish gills and decaying organic matter. Must always be zero in a cycled aquarium. Any reading above zero requires an immediate water change.',
      icon: <FlaskConical className="w-8 h-8 text-rose-500" />,
      color: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      id: 'nitrite',
      name: 'Nitrite (NO2)',
      target: '0 ppm (Strictly)',
      danger: '> 0 ppm',
      desc: 'The second stage of the Nitrogen Cycle. Highly toxic compound that binds to fish blood cells, preventing oxygen transport (brown blood disease). Must always be zero.',
      icon: <FlaskConical className="w-8 h-8 text-orange-500" />,
      color: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'nitrate',
      name: 'Nitrate (NO3)',
      target: '< 20 ppm',
      danger: '> 40 ppm',
      desc: 'The final, less toxic byproduct of the Nitrogen Cycle. Slowly accumulates over time and must be kept below 20 ppm via weekly partial water changes and live plants.',
      icon: <FlaskConical className="w-8 h-8 text-amber-500" />,
      color: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'ph',
      name: 'pH Level',
      target: 'Varies by Species',
      danger: 'Rapid Swings (> 0.2/day)',
      desc: 'Measures water acidity. Most captive-bred fish easily adapt to local tap water pH. Keeping pH stable is critical; using chemical buffers to force a specific number is dangerous and leads to crashes.',
      icon: <TestTubes className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'temp',
      name: 'Temperature',
      target: 'Varies by Species',
      danger: 'Sudden Fluctuations',
      desc: 'Tropical species need warm, stable water (usually 75-80°F), while goldfish prefer cooler water (65-72°F). Rapid temperature swings weaken fish immune systems, triggering disease.',
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20'
    },
    {
      id: 'gh-kh',
      name: 'GH & KH Hardness',
      target: 'Varies by Species',
      danger: 'KH < 3 dKH',
      desc: 'General (GH) and Carbonate (KH) hardness. KH buffers pH, preventing dangerous acid drops. Live plants, shrimp, and snails rely on GH minerals for shell and leaf development.',
      icon: <Droplets className="w-8 h-8 text-cyan-500" />,
      color: 'bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Understand Your Water
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You aren't just keeping fish; you are keeping water. Master these six parameters, and your fish will thrive automatically.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-start gap-4 max-w-4xl mx-auto">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-amber-500" />
          <div className="text-left text-sm leading-relaxed">
            <strong className="block text-base mb-1 font-bold text-foreground">Critical Care Concept: Stability Over Perfection!</strong>
            Target values like pH and temperature vary heavily depending on the specific fish species you keep. Forcing a specific pH target using chemical buffers often results in unstable pH bounces, which are far more lethal than keeping fish in a stable, slightly off-target pH. Ensure your Nitrogen Cycle is established before adding fish.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {params.map(param => (
            <div key={param.id} className={`p-6 rounded-3xl border bg-card hover:shadow-lg transition-shadow ${param.color} flex flex-col`}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-background rounded-2xl shadow-sm">
                  {param.icon}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-muted-foreground mb-1">Target</div>
                  <div className="font-mono font-bold text-foreground bg-background px-2 py-1 rounded-md border inline-block text-xs md:text-sm">
                    {param.target}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{param.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{param.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-muted-foreground">Danger Zone:</span>
                  <span className="font-mono font-bold text-destructive">{param.danger}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="mt-12 text-center">
            <Link href="/water-params" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transition-colors shadow-lg shadow-cyan-500/10">
              View Full Water Chemistry Guide <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
