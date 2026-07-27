import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 leading-relaxed font-semibold text-xs text-slate-350">
      <div className="flex items-center space-x-3 text-amber-500 mb-6">
        <AlertTriangle className="h-10 w-10" />
        <h1 className="text-3xl font-black text-slate-100 tracking-tight">General Disclaimer</h1>
      </div>

      <p>
        The content on Fish Versa (including but not limited to compatibility verdicts, temperature thresholds, water parameters, filter configurations, dosages, and guides) is provided strictly for informational and educational purposes.
      </p>

      <h3 className="text-base font-bold text-slate-200 mt-6">1. No Veterinary Advice</h3>
      <p>
        We are not veterinarian professionals. Information on fish diseases, diagnostics, and treatments should not replace professional medical evaluations. Always consult an aquatic veterinarian or certified professional before dosing medications.
      </p>

      <h3 className="text-base font-bold text-slate-200 mt-6">2. Sizing and Configuration Liability</h3>
      <p>
        Heater, filter, and volume outputs are estimate guidelines. Substrate weights, brand variations, and individual species behaviors can alter configurations. You bear all risks for tank setups, mechanical leaks, or community losses.
      </p>
    </div>
  );
};
export default Disclaimer;
