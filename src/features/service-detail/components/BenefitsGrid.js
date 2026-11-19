import { CheckCircle2 } from "lucide-react";
import { splitTitleDetail } from "../../../utils/helpers";

/**
 * BenefitsGrid — Clean, professional benefits cards for service detail pages.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 3-column cards matching the agency redesign
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const BenefitsGrid = ({ benefits }) => {
  if (!benefits?.length) return null;

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 text-center max-w-xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
          Key <span className="text-gold-primary">Benefits</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-normal">
          Measurable commercial advantages engineered for maximum audience impact.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => {
          const { title, detail } = splitTitleDetail(benefit);

          return (
            <li
              key={title || index}
              className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 sm:p-6 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-primary border border-white/10 text-gold-primary">
                  <CheckCircle2 size={15} aria-hidden="true" />
                </div>
                <span className="text-base font-bold text-white tracking-tight">
                  {title}
                </span>
              </div>

              {detail ? (
                <p className="text-xs sm:text-sm font-normal leading-relaxed text-gray-300">
                  {detail}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BenefitsGrid;
