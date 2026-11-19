import { whySimbha } from "../data/home.data";

/**
 * WhySimbhaSection — Clean, professional value propositions for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 3-column cards matching the agency design language
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const WhySimbhaSection = () => (
  <section className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 border-t border-white/5">
    <div className="mx-auto max-w-container w-full">
      <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          Why Sri <span className="text-gold-primary">Simbha</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
          Strategic media placement, transparent direct rates, and execution designed to command market attention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {whySimbha.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-6 sm:p-7 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-0.5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-navy-primary text-gold-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 font-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhySimbhaSection;
