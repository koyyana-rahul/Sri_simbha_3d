import { useState } from "react";
import ParticleField from "../animations/ParticleField/ParticleField";
import logoImg from "../../assets/images/branding/simba-logo.jpg";
import { SEQUENCE_SERVICES } from "../../config/sequences.config";
import {
  ArrowDown,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";

/**
 * Scene 01 & Scene 02 — Hero Awakening & The Service Universe.
 *
 * Cinematic Apple-inspired presentation:
 * - Radiant original Sri Simbha Lion Logo in golden orbital aura
 * - Editorial headline with metallic gold gradient
 * - Interactive 6-dimensional advertising universe with cinematic preview cards
 */
const HeroUniverseSection = ({ onOpenQuote, onExploreServices }) => {
  const [hoveredService, setHoveredService] = useState(null);

  const scrollToService = (serviceId) => {
    const el = document.getElementById(`service-${serviceId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-navy-primary text-white flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 pb-16 px-4 sm:px-8">
      {/* 3D Particle Canvas & Orbitals */}
      <ParticleField
        particleCount={85}
        showRings={true}
        interactive={true}
        className="z-0"
      />

      {/* Atmospheric lighting layers */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(232,184,63,0.12)_0%,rgba(16,31,66,0.4)_45%,rgba(8,19,41,0.98)_85%)] z-0" />

      {/* Main Center Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center py-6 sm:py-10">
        {/* Original Sri Simbha Lion Logo with Cinematic Orbital Halo */}
        <div className="relative group mb-8">
          {/* Pulsing golden aura */}
          <div className="absolute -inset-8 rounded-full bg-gold-primary/20 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
          
          {/* Subtle concentric orbital ring */}
          <div className="absolute -inset-4 rounded-full border border-gold-primary/30 pointer-events-none animate-spin" style={{ animationDuration: "25s" }} />

          {/* Logo container preserving exact original emblem */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-b from-gold-bright/60 via-gold-primary/30 to-navy-secondary shadow-[0_0_50px_rgba(232,184,63,0.3)] flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="Sri Simbha Ad Solutions Original Brand Crest"
              className="w-full h-full object-cover rounded-[22px]"
              width={144}
              height={144}
            />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-navy-primary/95 border border-gold-primary/40 text-[10px] font-mono tracking-widest text-gold-bright uppercase whitespace-nowrap shadow-lg">
            EST. 2019 • VISAKHAPATNAM
          </div>
        </div>

        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-secondary/80 border border-gold-primary/30 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-wider text-gold-bright uppercase">
            IMMERSIVE 3D SCROLLYTELLING EXPERIENCE
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.05] mb-6">
          We Don't Just Show Ads.
          <br />
          <span className="gold-gradient-text">We Command Attention.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-content-secondary max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Experience our six premier advertising mediums through photorealistic,
          scroll-controlled 3D exploded view engineering showcases.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-8 py-4 rounded-full gold-btn-primary flex items-center justify-center gap-2 text-sm sm:text-base font-bold shadow-[0_8px_30px_rgba(232,184,63,0.35)] hover:shadow-[0_12px_40px_rgba(255,201,40,0.5)] transition"
          >
            <span>Begin 3D Experience</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={() => onOpenQuote && onOpenQuote("All Services")}
            className="w-full sm:w-auto px-8 py-4 rounded-full gold-btn-outline flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scene 02: The Service Universe (Apple Product Carousel Grid) */}
        <div className="w-full pt-8 border-t border-navy-border/40">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold-primary/30" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-gold-bright">
              THE 6-DIMENSIONAL ADVERTISING UNIVERSE
            </span>
            <span className="h-px w-8 bg-gold-primary/30" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
            {SEQUENCE_SERVICES.map((srv) => (
              <button
                key={srv.id}
                onClick={() => scrollToService(srv.id)}
                onMouseEnter={() => setHoveredService(srv.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative flex flex-col p-3 rounded-2xl bg-navy-secondary/50 hover:bg-navy-secondary/90 border border-gold-primary/20 hover:border-gold-primary/60 transition-all duration-300 text-left hover:-translate-y-1.5 shadow-lg hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[11px] font-mono text-gold-primary font-bold">
                    {srv.number}
                  </span>
                  <span className="text-[10px] font-mono text-content-muted">
                    3D EXPLODED
                  </span>
                </div>

                <div className="w-full mb-2.5 aspect-video rounded-xl overflow-hidden bg-navy-primary flex items-center justify-center border border-navy-border/40 relative">
                  <img
                    src={`${srv.folder}/frame_001.jpg`}
                    alt={srv.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/80 via-transparent to-transparent opacity-60" />
                </div>

                <h2 className="text-xs font-bold text-white group-hover:text-gold-bright transition truncate w-full">
                  {srv.shortName}
                </h2>
                <p className="text-[10px] text-content-secondary line-clamp-1 w-full mt-0.5">
                  {srv.tagline}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-4">
        <span className="text-[10px] font-mono text-content-muted uppercase tracking-widest mb-1">
          SCROLL TO EXPLORE 3D DISASSEMBLY & REASSEMBLY
        </span>
        <div className="w-5 h-8 rounded-full border border-gold-primary/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-gold-bright animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroUniverseSection;
