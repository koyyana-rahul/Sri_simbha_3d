import { SEQUENCE_SERVICES } from "../../config/sequences.config";
import logoImg from "../../assets/images/branding/simba-logo.jpg";
import ParticleField from "../animations/ParticleField/ParticleField";
import { ArrowRight, Sparkles, Phone, Mail, MapPin } from "lucide-react";
import siteConfig from "../../config/site.config";

/**
 * Scene 09 — Final Brand Climax.
 *
 * All six service media converge in orbit around the original Sri Simbha logo.
 * Golden orbital rings connect them.
 *
 * Headline: "Ready to Command Attention?"
 * Supporting copy: "Let's create something extraordinary for your brand."
 * Primary CTA: "Get a Free Quote"
 * Secondary CTA: "Explore Our Services"
 */
const BrandClimaxSection = ({ onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen bg-navy-primary text-white flex flex-col justify-center items-center py-24 px-4 sm:px-8 overflow-hidden">
      {/* Golden Particle Ambience */}
      <ParticleField
        particleCount={80}
        showRings={true}
        interactive={true}
        className="z-0"
      />

      {/* Atmospheric lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(232,184,63,0.12)_0%,rgba(8,19,41,0.95)_70%)] z-0" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Converging 6-Service Constellation Preview */}
        <div className="relative w-full max-w-2xl mb-10 flex items-center justify-center">
          {/* Subtle connecting golden orbital ellipse */}
          <div className="absolute w-[90%] h-[120%] border border-gold-primary/25 rounded-[100%] pointer-events-none transform -rotate-6 animate-pulse" />

          {/* Central Sri Simbha Lion Logo with Radiant Glow */}
          <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-b from-gold-bright/60 via-gold-primary/30 to-navy-secondary shadow-[0_0_50px_rgba(232,184,63,0.35)] flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="Sri Simbha Ad Solutions"
              className="w-full h-full object-cover rounded-[22px]"
              width={144}
              height={144}
            />
          </div>
        </div>

        {/* Six Converged Miniature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-10 w-full max-w-3xl">
          {SEQUENCE_SERVICES.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center p-2.5 rounded-2xl bg-navy-secondary/60 border border-gold-primary/20 backdrop-blur-md shadow-md"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden mb-1.5 border border-navy-border/40">
                <img
                  src={`${s.folder}/frame_200.jpg`}
                  alt={s.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-white truncate w-full text-center">
                {s.shortName}
              </span>
            </div>
          ))}
        </div>

        {/* Scene 09 Headline & Supporting Copy */}
        <div className="space-y-4 max-w-2xl mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gold-bright">
            <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
            THE COMPLETE CREATIVE ECOSYSTEM
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Ready to <span className="gold-gradient-text">Command Attention?</span>
          </h2>

          <p className="text-base sm:text-xl text-content-secondary leading-relaxed font-normal">
            Let's create something extraordinary for your brand. From city-wide
            LED networks and mobile fleet showcases to dynamic digital marketing
            and high-production ad films.
          </p>
        </div>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
          <button
            onClick={() => onOpenQuote && onOpenQuote("Brand Climax Quote")}
            className="w-full sm:w-auto px-9 py-4 rounded-full gold-btn-primary flex items-center justify-center gap-2 text-base font-bold shadow-[0_8px_30px_rgba(232,184,63,0.35)]"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToTop}
            className="w-full sm:w-auto px-8 py-4 rounded-full gold-btn-outline flex items-center justify-center gap-2 text-base font-semibold"
          >
            <span>Explore Our Services</span>
          </button>
        </div>

        {/* Direct Contact Bar */}
        <div className="w-full max-w-2xl pt-8 border-t border-navy-border/40 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-content-secondary">
          <a
            href={`tel:+${siteConfig.contact.phoneDigits}`}
            className="flex items-center gap-2 hover:text-gold-bright transition"
          >
            <Phone className="w-3.5 h-3.5 text-gold-primary" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 hover:text-gold-bright transition"
          >
            <Mail className="w-3.5 h-3.5 text-gold-primary" />
            <span>{siteConfig.contact.email}</span>
          </a>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-gold-primary" />
            <span>Visakhapatnam, Andhra Pradesh</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandClimaxSection;
