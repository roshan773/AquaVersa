export default function PlantsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 text-left font-sans animate-pulse">
      
      {/* Sidebar Filters Skeleton */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 glass p-6 rounded-2xl space-y-6">
          <div className="h-6 bg-slate-900 border border-slate-850 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-900 border border-slate-850 rounded w-1/4"></div>
            <div className="h-10 bg-slate-900 border border-slate-850 rounded-xl"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-900 border border-slate-850 rounded w-1/3"></div>
            <div className="h-5 bg-slate-900 border border-slate-850 rounded w-3/4"></div>
            <div className="h-5 bg-slate-900 border border-slate-850 rounded w-2/3"></div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 space-y-8">
        <div className="h-28 bg-slate-950 border border-slate-900 rounded-3xl p-6 flex flex-col justify-center space-y-2">
          <div className="h-7 bg-slate-900 border border-slate-850 rounded w-1/4"></div>
          <div className="h-4 bg-slate-900 border border-slate-850 rounded w-2/3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card/50 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-48 bg-slate-900 border-b border-slate-850 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/10 to-transparent -translate-x-full animate-shimmer" />
                </div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-slate-900 border border-slate-850 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-900 border border-slate-850 rounded w-1/2"></div>
                  <div className="h-12 bg-slate-900 border border-slate-850 rounded-xl w-full"></div>
                </div>
              </div>
              <div className="p-5">
                <div className="h-10 bg-slate-900 border border-slate-850 rounded-xl w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
