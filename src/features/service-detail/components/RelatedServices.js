import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import services from "../../../config/services.config";

/**
 * RelatedServices — Clean "Other services" strip shown at the bottom of a service page.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean responsive cards matching the agency redesign
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const RelatedServices = ({ currentId }) => {
  const related = services.filter((service) => service.id !== currentId);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-services-heading"
      className="mx-auto w-full max-w-container px-2 pb-12 sm:px-4"
    >
      <div className="mb-6 sm:mb-8 text-center max-w-xl mx-auto">
        <h2
          id="related-services-heading"
          className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5"
        >
          Other <span className="text-gold-primary">Services</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-normal">
          Explore all our physical and digital advertising channels across Andhra Pradesh.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((service) => {
          const Icon = service.icon;

          return (
            <li key={service.id}>
              <Link
                to={service.path}
                className="group flex h-full items-start gap-3.5 rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-0.5"
              >
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-primary text-gold-primary transition-all duration-300 group-hover:border-gold-primary/40"
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <span className="flex items-center gap-1.5 text-base font-bold text-white group-hover:text-gold-primary transition-colors">
                    <span>{service.title}</span>
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-gold-primary/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-primary"
                    />
                  </span>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-gray-300 font-normal">
                    {service.description}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RelatedServices;
