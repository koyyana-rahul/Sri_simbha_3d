import { howItWorks } from "../data/home.data";

/**
 * HowItWorksSection — Clean, streamlined 3-step campaign onboarding.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 3-column layout matching the agency redesign
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const HowItWorksSection = () => (
  <section className="relative bg-navy-secondary/50 text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 border-t border-white/5">
    <div className="mx-auto max-w-container w-full">
      <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          How It <span className="text-gold-primary">Works</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
          A straightforward three-step progression from your campaign brief to live deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {howItWorks.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="rounded-2xl border border-white/10 bg-navy-primary/70 p-6 sm:p-7 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-navy-secondary text-gold-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-bold text-gold-primary tracking-wider">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 font-normal">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
