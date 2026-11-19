import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import ServiceCard from "../../services/components/ServiceCard";
import services from "../../../config/services.config";

/**
 * ServicesPreviewSection — Clean, professional home page services grid.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 6-service grid using modern ServiceCard components
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const ServicesPreviewSection = () => (
  <section
    id="services"
    aria-labelledby="services-preview-heading"
    className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 border-t border-white/5"
  >
    <div className="mx-auto max-w-container w-full">
      <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
        <h2
          id="services-preview-heading"
          className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2"
        >
          One Agency for <span className="text-gold-primary">Every Screen & Space</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
          Outdoor LED displays, transit vans, print, and digital marketing under a unified brief.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {services.map((service, index) => (
          <li key={service.id} className="h-full">
            <ServiceCard service={service} index={index} />
          </li>
        ))}
      </ul>

      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-200 text-sm font-semibold hover:border-gold-primary/40 hover:text-white transition-all"
        >
          <span>Compare All 6 Services</span>
          <ArrowRight className="w-4 h-4 text-gold-primary" />
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesPreviewSection;
