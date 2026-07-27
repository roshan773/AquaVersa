import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 leading-relaxed font-semibold text-xs text-slate-300">
      <h1 className="text-3xl font-black text-slate-100 tracking-tight">Privacy Policy</h1>
      <p className="text-slate-400">Effective Date: July 26, 2026</p>
      
      <p>
        At Fish Versa, we value your privacy. This policy outlines how we handle your personal data when you visit our website, register or bookmark entries, and interact with comments.
      </p>

      <h3 className="text-base font-bold text-slate-200 mt-6">1. Information We Collect</h3>
      <p>
        We collect personal details (such as names and emails) when submitted voluntarily via discussion boxes or newsletters. We also gather automated telemetry data such as IP address and search history logs.
      </p>

      <h3 className="text-base font-bold text-slate-200 mt-6">2. Cookies & Settings</h3>
      <p>
        We use local storage tokens and standard HTTP cookies to support persistent settings preferences and admin user authorization states.
      </p>
    </div>
  );
};
export default Privacy;
