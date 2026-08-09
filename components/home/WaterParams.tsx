import { TestTubes, Droplets, Thermometer, FlaskConical } from 'lucide-react';

export default function WaterParams() {
  const params = [
    {
      id: 'ammonia',
      name: 'Ammonia (NH3)',
      target: '0 ppm',
      danger: '> 0.25 ppm',
      desc: 'Highly toxic waste produced by fish and rotting food. Must always be zero in a cycled tank.',
      icon: <FlaskConical className="w-8 h-8 text-rose-500" />,
      color: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      id: 'nitrite',
      name: 'Nitrite (NO2)',
      target: '0 ppm',
      danger: '> 0.25 ppm',
      desc: 'The second stage of the nitrogen cycle. Also highly toxic and prevents fish blood from carrying oxygen.',
      icon: <FlaskConical className="w-8 h-8 text-orange-500" />,
      color: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'nitrate',
      name: 'Nitrate (NO3)',
      target: '< 20 ppm',
      danger: '> 40 ppm',
      desc: 'The final product of the cycle. Less toxic, but must be removed via regular water changes or live plants.',
      icon: <FlaskConical className="w-8 h-8 text-amber-500" />,
      color: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'ph',
      name: 'pH Level',
      target: '6.5 - 7.5',
      danger: 'Rapid swings',
      desc: 'Measures acidity. Most captive-bred fish adapt to your tap water pH. Stability is far more important than hitting a specific number.',
      icon: <TestTubes className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'temp',
      name: 'Temperature',
      target: '76°F - 80°F',
      danger: '< 72°F or > 86°F',
      desc: 'Tropical fish need warm, stable water. Use a reliable heater and a separate digital thermometer.',
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20'
    },
    {
      id: 'gh-kh',
      name: 'GH & KH',
      target: 'Varies',
      danger: 'KH < 3 dKH',
      desc: 'General & Carbonate Hardness. KH buffers your pH, preventing deadly acidic crashes.',
      icon: <Droplets className="w-8 h-8 text-cyan-500" />,
      color: 'bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Understand Your Water
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You aren't just keeping fish; you are keeping water. Master these six parameters, and your fish will thrive automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {params.map(param => (
            <div key={param.id} className={`p-6 rounded-3xl border bg-card hover:shadow-lg transition-shadow ${param.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-background rounded-2xl shadow-sm">
                  {param.icon}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-muted-foreground mb-1">Target</div>
                  <div className="font-mono font-bold text-foreground bg-background px-2 py-1 rounded-md border inline-block">
                    {param.target}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{param.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{param.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-muted-foreground">Danger Zone:</span>
                  <span className="font-mono font-bold text-destructive">{param.danger}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
