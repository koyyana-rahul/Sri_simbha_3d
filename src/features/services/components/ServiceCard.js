import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * ServiceCard — Clean, professional service tile for Sri Simbha Ad Solutions.
 *
 * Implements:
 * - Single surface container without nested card clutter
 * - Subtle border and refined gold accent on hover
 * - Small outline icon container
 * - Pure link element with no nested interactive controls (WCAG compliant)
 */
const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const serviceNumber = String((index ?? 0) + 1).padStart(2, "0");

  return (
    <Link
      to={service.path}
      aria-label={`${service.title} — learn more`}
      className="group flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 sm:p-7 backdrop-blur-sm text-left transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-xl"
    >
      <div>
        {/* Top Meta Row: Number & Icon */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-mono font-semibold tracking-wider text-gold-primary">
            {serviceNumber} / 06
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-primary border border-white/10 text-gold-primary transition-all duration-300 group-hover:border-gold-primary/40 group-hover:text-gold-bright">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-gold-primary transition-colors flex items-center justify-between gap-2">
          <span>{service.title}</span>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-gold-primary/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-primary"
            aria-hidden="true"
          />
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-300 font-normal leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom Action Affordance */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">
          Campaign Ready
        </span>

        <span className="text-xs font-semibold text-gold-primary group-hover:text-white transition-colors flex items-center gap-1">
          <span>Learn More</span>
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
