'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // When path or search params change, animate progress bar to complete and disappear
    setProgress(30);
    const t1 = setTimeout(() => setProgress(70), 50);
    const t2 = setTimeout(() => setProgress(100), 150);
    const t3 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, searchParams]);

  if (progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-1 z-[99999] pointer-events-none overflow-hidden bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#27187e] via-[#3b28ab] to-[#27187e] transition-all duration-300 ease-out shadow-[0_0_10px_#27187e]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: 'width, opacity',
        }}
      />
    </div>
  );
}
