import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 leading-relaxed font-semibold text-xs text-slate-350">
      <h1 className="text-3xl font-black text-slate-100 tracking-tight">Terms of Service</h1>
      <p className="text-slate-500">Effective Date: July 26, 2026</p>

      <p>
        Welcome to Fish Versa. By accessing or using our websites, calculators, and catalogs, you agree to comply with the terms set forth.
      </p>

      <h3 className="text-base font-bold text-slate-200 mt-6">1. Permitted Use</h3>
      <p>
        The content on Fish Versa is intended solely for personal, non-commercial aquarium research and calculation guidelines. Scraping data or running denial of service loads is strictly prohibited.
      </p>

      <h3 className="text-base font-bold text-slate-200 mt-6">2. Accuracy of Calculations</h3>
      <p>
        Calculators are guidelines. Fish Versa is not responsible for stocking failures, mechanical filter sizing variances, or biological stress occurrences.
      </p>
    </div>
  );
};
export default Terms;
