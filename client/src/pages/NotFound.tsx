import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <Compass className="h-16 w-16 text-sky-400 animate-spin" />
      <div className="space-y-2">
        <h1 className="text-6xl font-black bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">404</h1>
        <h2 className="text-xl font-extrabold text-slate-100">Page Lost at Sea</h2>
        <p className="text-xs text-slate-400 max-w-xs font-semibold leading-relaxed mx-auto">
          The page you are looking for has drifted off the map. Try checking the URL or return back to port.
        </p>
      </div>
      <Link
        to="/"
        className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors btn-glow-cyan"
      >
        Return to Home
      </Link>
    </div>
  );
};
export default NotFound;
