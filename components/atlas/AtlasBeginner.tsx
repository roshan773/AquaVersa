import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AtlasBeginner() {
  const steps = [
    {
      num: '01',
      title: 'Choose the Tank & Footprint',
      desc: 'Select an appropriate volume (20-gallon long is ideal for beginners) and a sturdy, level stand capable of supporting filled water weight (~10 lbs per gallon).',
    },
    {
      num: '02',
      title: 'Prepare the Aquatic Environment',
      desc: 'Install the filter, heater, and substrate. Dechlorinate tap water before filling to protect future bacteria colonies from chlorine and chloramine.',
    },
    {
      num: '03',
      title: 'Biological Nitrogen Cycle',
      desc: 'Establish the biological nitrogen cycle over 3–6 weeks using liquid ammonia or fishless cycling. Verify ammonia and nitrite are strictly 0 ppm.',
    },
    {
      num: '04',
      title: 'Stock Resilient Initial Species',
      desc: 'Start with a small group of hardy, peaceful community species. Acclimate slowly via float-and-drip methods to equalize temperature and pH.',
    },
    {
      num: '05',
      title: 'Maintain Consistent Parameters',
      desc: 'Perform 20–25% partial weekly water changes, vacuum detritus from substrate, feed in moderation, and test parameters weekly with liquid test kits.',
    },
  ];

  return (
    <section className="marine-pattern-light py-20 sm:py-24 bg-[#f7f7ff] text-left border-t border-[#cfcaf5]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            BEGINNER ROADMAP
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#27187e] tracking-wide">
            Starting your first aquarium?
          </h2>
          <p className="font-readable text-sm sm:text-base md:text-lg text-[#27187e]/85 max-w-xl mt-2 leading-relaxed">
            Follow this 5-step biological progression to establish a resilient, thriving habitat.
          </p>
        </div>

        {/* 5-Step Editorial Progression */}
        <div className="space-y-4">
          {steps.map((item) => (
            <div
              key={item.num}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-6 md:max-w-3xl">
                <span className="font-display text-4xl sm:text-5xl text-[#27187e] shrink-0 leading-none">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-1.5 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-readable text-sm sm:text-base text-[#27187e]/85 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center gap-2 font-readable text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#27187e] hover:text-[#1b1059] shrink-0 group"
              >
                <span>Read Step Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.2} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

