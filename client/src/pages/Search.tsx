import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFishes, fetchPlants, fetchEquipment, fetchGuides, fetchBlogs } from '../services/api';
import { Search as SearchIcon, Loader2, Compass } from 'lucide-react';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Query all endpoints
  const { data: fishData, isLoading: isFishLoading } = useQuery({
    queryKey: ['search-fish', query],
    queryFn: () => fetchFishes({ search: query, limit: 5 }),
    enabled: !!query
  });

  const { data: plantData, isLoading: isPlantLoading } = useQuery({
    queryKey: ['search-plants', query],
    queryFn: () => fetchPlants({ search: query }),
    enabled: !!query
  });

  const { data: equipData, isLoading: isEquipLoading } = useQuery({
    queryKey: ['search-equip', query],
    queryFn: () => fetchEquipment({ search: query }),
    enabled: !!query
  });

  const { data: guideData, isLoading: isGuideLoading } = useQuery({
    queryKey: ['search-guides', query],
    queryFn: () => fetchGuides({ search: query }),
    enabled: !!query
  });

  const { data: blogData, isLoading: isBlogLoading } = useQuery({
    queryKey: ['search-blogs', query],
    queryFn: () => fetchBlogs({ search: query }),
    enabled: !!query
  });

  const fishes = fishData?.fishes || [];
  const plants = plantData || [];
  const equipment = equipData || [];
  const guides = guideData || [];
  const blogs = blogData || [];

  const totalResults = fishes.length + plants.length + equipment.length + guides.length + blogs.length;
  const isLoadingAll = isFishLoading || isPlantLoading || isEquipLoading || isGuideLoading || isBlogLoading;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-semibold text-sm">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-100 flex items-center space-x-3">
          <SearchIcon className="h-8 w-8 text-sky-400" />
          <span>Search Results</span>
        </h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1.5">
          Query: "{query}" &bull; {totalResults} matches found
        </p>
      </div>

      {isLoadingAll && (
        <div className="flex items-center justify-center space-x-2 text-sky-400 py-10 font-bold text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Searching encyclopedia databases...</span>
        </div>
      )}

      {!isLoadingAll && totalResults === 0 && (
        <div className="glass rounded-2xl p-12 text-center border border-slate-800/80 max-w-md mx-auto space-y-4">
          <Compass className="h-12 w-12 text-slate-500 mx-auto" />
          <h3 className="font-extrabold text-lg text-slate-200">No Matches Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            We couldn't find any listings matching "{query}". Try checking your spelling or adjusting terms.
          </p>
        </div>
      )}

      {/* Results Listings */}
      {!isLoadingAll && totalResults > 0 && (
        <div className="space-y-8">
          
          {/* Fish */}
          {fishes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-200 border-b border-slate-800 pb-2">Species Care Profiles ({fishes.length})</h3>
              <div className="grid grid-cols-1 gap-3">
                {fishes.map((f: any) => (
                  <Link
                    key={f._id}
                    to={`/fish/${f.slug}`}
                    className="glass p-4 rounded-xl flex justify-between items-center hover:border-sky-400/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-200">{f.commonName}</h4>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">{f.scientificName}</p>
                    </div>
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest font-extrabold">View Profile</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Plants */}
          {plants.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-200 border-b border-slate-800 pb-2">Aquatic Plants ({plants.length})</h3>
              <div className="grid grid-cols-1 gap-3">
                {plants.map((p: any) => (
                  <Link
                    key={p._id}
                    to={`/plants/${p.slug}`}
                    className="glass p-4 rounded-xl flex justify-between items-center hover:border-sky-400/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-200">{p.name}</h4>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">{p.scientificName}</p>
                    </div>
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest font-extrabold">View Plant</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Equipment */}
          {equipment.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-200 border-b border-slate-800 pb-2">Equipment Products ({equipment.length})</h3>
              <div className="grid grid-cols-1 gap-3">
                {equipment.map((e: any) => (
                  <Link
                    key={e._id}
                    to={`/equipment/${e.slug}`}
                    className="glass p-4 rounded-xl flex justify-between items-center hover:border-sky-400/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-200">{e.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Brand: {e.brand} &bull; Category: {e.category}</p>
                    </div>
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest font-extrabold">View product</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Guides */}
          {guides.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-200 border-b border-slate-800 pb-2">Educational Guides ({guides.length})</h3>
              <div className="grid grid-cols-1 gap-3">
                {guides.map((g: any) => (
                  <Link
                    key={g._id}
                    to={`/guides/${g.slug}`}
                    className="glass p-4 rounded-xl flex justify-between items-center hover:border-sky-400/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-200">{g.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{g.excerpt}</p>
                    </div>
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest font-extrabold">Read Guide</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blogs */}
          {blogs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-200 border-b border-slate-800 pb-2">Blog Posts ({blogs.length})</h3>
              <div className="grid grid-cols-1 gap-3">
                {blogs.map((b: any) => (
                  <Link
                    key={b._id}
                    to={`/blog/${b.slug}`}
                    className="glass p-4 rounded-xl flex justify-between items-center hover:border-sky-400/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-200">{b.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{b.excerpt}</p>
                    </div>
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest font-extrabold">Read Post</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
export default Search;
