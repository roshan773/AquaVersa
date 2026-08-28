import React, { ReactNode } from "react";
import Image from "next/image";

interface SubpageHeroProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export default function SubpageHero({ title, description, icon }: SubpageHeroProps) {
  return (
    <section className="relative py-24 bg-black text-slate-100 border-b border-blue-500/10 overflow-hidden text-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-luminosity select-none">
        <Image 
          src="/betta_bg.png" 
          alt="Subtle aquarium background" 
          fill 
          className="object-cover object-center" 
          priority 
        />
      </div>

      {/* Ambient blue background glows */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="flex flex-col items-center">
          {icon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 mb-6 border border-blue-500/20 shadow-md">
              {icon}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold tracking-tight mb-4 text-white">
            {title}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
