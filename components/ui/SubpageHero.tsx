import React, { ReactNode } from "react";

interface SubpageHeroProps {
  title: string;
  description?: string;
  badge?: string;
  icon?: ReactNode;
}

export default function SubpageHero({ title, description, badge, icon }: SubpageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 bg-[#f7f7ff] text-[#27187e] border-b border-[#cfcaf5] overflow-hidden text-left marine-pattern-light">
      <div className="site-container relative z-10">
        <div className="max-w-3xl">
          {badge && (
            <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#27187e] mb-3 block">
              {badge}
            </span>
          )}

          <div className="flex items-center gap-4 mb-4">
            {icon && (
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#edeafc] text-[#27187e] border border-[#cfcaf5] shrink-0 shadow-xs">
                {icon}
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#27187e] tracking-wide leading-tight">
              {title}
            </h1>
          </div>

          {description && (
            <p className="font-readable text-sm sm:text-base md:text-lg text-[#27187e]/85 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

