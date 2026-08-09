import { CalendarDays, Droplets, Scissors, FlaskConical, Filter } from 'lucide-react';

export default function MaintenanceSection() {
  const schedule = [
    {
      period: 'Daily',
      tasks: [
        { name: 'Feed fish (1-2 times, only what they eat in 2 mins)', icon: <FishIcon className="w-4 h-4" /> },
        { name: 'Check temperature and filter flow', icon: <ThermometerIcon className="w-4 h-4" /> },
        { name: 'Observe fish behavior and health', icon: <Eye className="w-4 h-4" /> }
      ]
    },
    {
      period: 'Weekly',
      tasks: [
        { name: 'Change 20-30% of water', icon: <Droplets className="w-4 h-4 text-blue-500" /> },
        { name: 'Siphon gravel to remove waste', icon: <Droplets className="w-4 h-4 text-blue-500" /> },
        { name: 'Scrape algae from glass', icon: <Scissors className="w-4 h-4 text-emerald-500" /> },
        { name: 'Test water parameters', icon: <FlaskConical className="w-4 h-4 text-amber-500" /> }
      ]
    },
    {
      period: 'Monthly',
      tasks: [
        { name: 'Rinse filter media in old tank water', icon: <Filter className="w-4 h-4 text-indigo-500" /> },
        { name: 'Trim overgrown plants', icon: <Scissors className="w-4 h-4 text-emerald-500" /> },
        { name: 'Check expiration on test kits & food', icon: <CalendarDays className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold mb-4">
            <CalendarDays className="w-4 h-4" /> Routine Care
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Aquarium Maintenance Schedule
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consistency is the secret to a crystal clear, algae-free, and healthy aquarium. Spend 20 minutes a week to save hours of headaches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {schedule.map((item, idx) => (
            <div key={idx} className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                <CalendarDays className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground relative z-10">{item.period}</h3>
              <ul className="space-y-4 relative z-10">
                {item.tasks.map((task, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-muted rounded-lg shrink-0">
                      {task.icon}
                    </div>
                    <span className="text-muted-foreground font-medium">{task.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Minimal icons for the missing ones in lucide
function FishIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 1.11 0 2.05.23 3 .5h2c-1.15 2.15-2.02 5.02-2.02 8.5S18.85 21.35 20 23.5h-2c-.95.27-1.89.5-3 .5-3.56 0-7.56-2.54-8.5-6C4.5 18 2 19 2 19s1-3.5 1-7c0-3.5-1-7-1-7s2.5 1 4.5 7z" />
    </svg>
  );
}
function ThermometerIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}
function Eye(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
