import { useEffect, useRef, useState } from "react";
import { companyStats } from "../../../data/company.data";
import { usePrefersReducedMotion } from "../../../hooks";

/**
 * StatsSection — Clean, professional agency metrics row.
 *
 * Implements:
 * - Natural, comfortable typography without oversized odd numerals
 * - Subtle glass surface matching the agency redesign
 * - Smooth accessible count-up animation respecting prefers-reduced-motion
 */
const StatsSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [values, setValues] = useState(() =>
    companyStats.map((stat) => (prefersReducedMotion ? stat.value : 0))
  );

  const sectionRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setValues(companyStats.map((stat) => stat.value));
      return undefined;
    }

    const node = sectionRef.current;
    if (!node || hasRun.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        hasRun.current = true;
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setValues(companyStats.map((stat) => Math.round(stat.value * eased)));

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Company statistics"
      className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 border-t border-white/5"
    >
      <div className="mx-auto max-w-container w-full">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 rounded-2xl border border-white/10 bg-navy-secondary/60 p-4 min-[380px]:p-6 sm:p-8 backdrop-blur-sm text-center shadow-lg">
          {companyStats.map((stat, index) => (
            <div
              key={stat.id}
              className="flex flex-col-reverse justify-center items-center py-2 px-1 min-[360px]:px-2 sm:px-3"
            >
              <dt className="text-[11px] min-[360px]:text-xs sm:text-sm font-medium text-gray-300 mt-1.5 leading-tight">
                {stat.label}
              </dt>
              <dd className="text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gold-primary">
                {values[index]}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default StatsSection;
