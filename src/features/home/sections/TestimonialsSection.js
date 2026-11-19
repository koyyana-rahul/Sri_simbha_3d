import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/home.data";

/**
 * TestimonialsSection — Clean social proof cards for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 2-column testimonial cards matching the agency redesign
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const TestimonialsSection = () => (
  <section className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 border-t border-white/5">
    <div className="mx-auto max-w-container w-full">
      <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          What Clients <span className="text-gold-primary">Say</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
          Trusted by business founders and marketing teams across Visakhapatnam and Andhra Pradesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-6 sm:p-7 backdrop-blur-sm shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-gold-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gold-primary/30" />
              </div>

              <figure>
                <blockquote className="text-sm sm:text-base font-normal italic leading-relaxed text-gray-200 mb-5">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-navy-primary border border-white/10 flex items-center justify-center font-bold text-gold-primary text-xs">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400 block">
                      Verified Campaign Partner
                    </span>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
