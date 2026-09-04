import { Waves } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full bg-[#f7f7ff] text-[#27187e] flex flex-col items-center justify-center gap-4 font-sans">
      <div className="w-14 h-14 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] shadow-sm">
        <Waves className="w-7 h-7 animate-pulse text-[#27187e]" />
      </div>
      <div className="space-y-1 text-center">
        <h3 className="text-xl font-display font-normal tracking-wide text-[#27187e]">{siteConfig.name}</h3>
        <p className="text-xs text-[#27187e]/75 font-sans font-normal">Exploring the underwater world…</p>
      </div>
    </div>
  );
}
