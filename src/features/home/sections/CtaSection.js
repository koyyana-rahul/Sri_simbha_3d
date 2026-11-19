import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

import siteConfig, {
  buildTelUrl,
  buildWhatsAppUrl,
} from "../../../config/site.config";

/**
 * CtaSection — Clean, professional conversion call-to-action band.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Elimination of unwanted decorative badges and heavy blur layers
 * - Direct conversion via WhatsApp, Phone, and Contact page
 */
const CtaSection = ({
  heading = "Let’s plan your campaign",
  body = "Tell us what you want to promote and which part of the city you want to reach. We will come back with placements, sizes and a written quote — usually the same day.",
  context,
  className = "",
}) => (
  <section
    aria-labelledby="cta-heading"
    className={`relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 text-center border-t border-white/10 ${className}`.trim()}
  >
    <div className="mx-auto max-w-2xl w-full">
      <h2
        id="cta-heading"
        className="mb-2.5 text-2xl sm:text-3xl font-bold text-white tracking-tight"
      >
        {heading}
      </h2>

      <p className="mx-auto mb-6 text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
        {body}
      </p>

      {context ? (
        <p className="mb-5 text-xs sm:text-sm font-medium text-gold-primary">
          {context}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/contact"
          className="gold-btn-primary inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-navy-primary shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
        >
          <span>Send an Enquiry</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-xs sm:text-sm font-semibold hover:bg-emerald-900/40 hover:border-emerald-400 transition-all"
        >
          <FaWhatsapp className="text-base text-emerald-400" aria-hidden="true" />
          <span>Chat on WhatsApp</span>
        </a>

        <a
          href={buildTelUrl()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-200 text-xs sm:text-sm font-semibold hover:border-gold-primary/40 hover:text-white transition-all"
        >
          <FaPhoneAlt className="text-xs text-gold-primary" aria-hidden="true" />
          <span>{siteConfig.contact.phone}</span>
        </a>
      </div>
    </div>
  </section>
);

export default CtaSection;
