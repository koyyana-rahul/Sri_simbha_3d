import { useId, useState } from "react";
import { Plus, MessageSquare } from "lucide-react";

import StructuredData from "../../../components/common/StructuredData/StructuredData";
import { buildFaqSchema } from "../../../utils/structuredData";
import { faqs } from "../../../data/faq.data";
import { buildWhatsAppUrl } from "../../../config/site.config";
import { cx } from "../../../utils/helpers";

/**
 * FaqSection — Clean two-column FAQ section.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Sticky editorial column on the left and accessible accordion items on the right
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const FaqSection = () => {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);
  const baseId = useId();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-navy-secondary/50 text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 border-t border-white/5"
    >
      <StructuredData data={buildFaqSchema(faqs)} />

      <div className="mx-auto max-w-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Quick WhatsApp Question Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3"
            >
              Frequently Asked <span className="text-gold-primary">Questions</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed mb-6">
              Common questions clients ask before launching their first campaign. If you have specific location needs, reach out to us directly.
            </p>

            <div className="rounded-2xl border border-white/10 bg-navy-primary/70 p-5 sm:p-6 backdrop-blur-sm shadow-md">
              <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">
                Have a specific question or custom location?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed mb-4">
                Our directors are available to discuss screen locations, technical formats, and rate cards.
              </p>
              <a
                href={buildWhatsAppUrl("Hi, I have a question regarding campaign placement options.")}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn-primary w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-navy-primary text-xs sm:text-sm shadow-md hover:brightness-105 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 text-navy-primary" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                const panelId = `${baseId}-${faq.id}-panel`;
                const buttonId = `${baseId}-${faq.id}-button`;

                return (
                  <li
                    key={faq.id}
                    className="overflow-hidden rounded-xl border border-white/10 bg-navy-primary/70 backdrop-blur-sm transition-all hover:border-gold-primary/30 shadow-sm"
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-white hover:text-gold-primary transition-colors cursor-pointer"
                      >
                        <span className="pr-4">{faq.question}</span>
                        <Plus
                          className={cx(
                            "h-4 w-4 shrink-0 text-gold-primary transition-transform duration-200",
                            isOpen && "rotate-45"
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-gray-300 font-normal leading-relaxed pt-1 border-t border-white/5"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
