import React from 'react';
import { Info } from 'lucide-react';

interface CareDisclaimerProps {
  className?: string;
}

export default function CareDisclaimer({ className = '' }: CareDisclaimerProps) {
  return (
    <div
      className={`rounded-2xl bg-[#edeafc]/60 border border-[#27187e]/15 p-4 sm:p-5 text-left font-readable text-xs sm:text-sm text-[#27187e]/80 leading-relaxed flex items-start gap-3.5 shadow-2xs ${className}`}
    >
      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#27187e] shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <strong className="font-bold text-[#27187e] block mb-0.5 text-xs sm:text-sm uppercase tracking-wider">
          Educational Guidance Notice
        </strong>
        <p className="font-normal text-[#27187e]/80">
          Information on Roshan Aquva World is provided for general educational purposes. Aquarium requirements can vary depending on individual animals, aquarium conditions, source information, and husbandry practices. Content is periodically reviewed and may be updated as information develops.
        </p>
      </div>
    </div>
  );
}
