import { useRef, useState, useEffect } from "react";
import ImageSequenceCanvas from "../animations/ImageSequenceCanvas/ImageSequenceCanvas";
import { ArrowRight, ChevronRight, Layers, Cpu, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ServiceShowcaseSection — Apple-Inspired 3D Scrollytelling Showcase.
 *
 * Implements:
 * - GSAP ScrollTrigger pinned scroll timeline with smooth inertia scrubbing
 * - Full-screen immersive Canvas presentation as the dominant visual focus
 * - 4 distinct stages:
 *   1. Assembled Product (Hero pose & editorial copy)
 *   2. Controlled Disassembly (Mechanical component detachment & callouts)
 *   3. Exploded Technical Showcase (Internal construction & hardware specs HUD)
 *   4. Reassembly (Flawless lock-back & final illuminated hero)
 */
const ServiceShowcaseSection = ({
  service,
  index,
  totalServices = 6,
  onOpenQuote,
}) => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const {
    id,
    number,
    name,
    shortName,
    tagline,
    description,
    specs = [],
    stages = [],
    frameCount,
    accentColor = "#FFC928",
  } = service;

  // Four standardized engineering stages
  const stageNames = [
    "STAGE 1: ASSEMBLED PRODUCT",
    "STAGE 2: CONTROLLED DISASSEMBLY",
    "STAGE 3: EXPLODED TECHNICAL SHOWCASE",
    "STAGE 4: PRECISION REASSEMBLY",
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create GSAP ScrollTrigger timeline for this service sequence
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=2400", // Pinned scrub scroll distance
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Map to 4 stages
        if (p < 0.22) {
          setActiveStageIndex(0);
        } else if (p < 0.52) {
          setActiveStageIndex(1);
        } else if (p < 0.78) {
          setActiveStageIndex(2);
        } else {
          setActiveStageIndex(3);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Jump to specific stage
  const jumpToStage = (stageIdx) => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = [0.05, 0.35, 0.65, 0.92];
    const targetProgress = targets[stageIdx];
    const trigger = ScrollTrigger.getById(section.id) || ScrollTrigger.getAll().find(st => st.trigger === section);
    if (trigger) {
      const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const currentStage = stages[activeStageIndex] || stages[0];

  return (
    <section
      ref={sectionRef}
      id={`service-${id}`}
      className="relative w-full bg-navy-primary text-white overflow-hidden"
    >
      {/* Pinned Stage Container (Full Viewport) */}
      <div
        ref={pinRef}
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-5 select-none"
      >
        {/* Cinematic Ambient Radial Glow matched to product accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor}18 0%, rgba(16,31,66,0.3) 45%, rgba(8,19,41,0.98) 80%)`,
          }}
        />

        {/* Top Minimalist Technical HUD */}
        <div className="relative z-20 flex items-center justify-between pt-16 sm:pt-14 border-b border-navy-border/40 pb-3">
          <div className="flex items-center gap-3">
            <span
              className="text-xs sm:text-sm font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-navy-secondary/80 border"
              style={{ borderColor: `${accentColor}50`, color: accentColor }}
            >
              0{index + 1} / 0{totalServices} • {name.toUpperCase()}
            </span>
          </div>

          {/* Active Stage Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-bright animate-ping" />
            <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
              {stageNames[activeStageIndex]}
            </span>
          </div>
        </div>

        {/* Main 3D Canvas Stage (Occupies Prominent Central Canvas) */}
        <div className="relative z-10 flex-1 w-full flex items-center justify-center my-auto">
          {/* Large High-DPI HTML5 Image Sequence Canvas */}
          <div className="relative w-full h-[62vh] sm:h-[72vh] lg:h-[78vh] flex items-center justify-center">
            <ImageSequenceCanvas
              service={service}
              progress={scrollProgress}
              className="w-full h-full"
              fit="contain"
              showBadge={true}
            />

            {/* Stage 1 & 4 Floating Editorial Layer (Left Overlay) */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 max-w-sm pointer-events-none transition-all duration-700 hidden lg:block ${
                activeStageIndex === 0 || activeStageIndex === 3
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6"
              }`}
            >
              <div className="p-6 rounded-3xl bg-navy-secondary/80 border border-gold-primary/30 backdrop-blur-xl shadow-2xl space-y-3 pointer-events-auto">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-gold-bright">
                  {shortName}
                </span>
                <h3 className="text-3xl font-extrabold text-white leading-tight">
                  {name}
                </h3>
                <p className="text-base font-semibold text-gold-primary italic">
                  "{tagline}"
                </p>
                <p className="text-xs text-content-secondary leading-relaxed">
                  {description}
                </p>
                <div className="pt-2">
                  <Link
                    to={`/services/${id === "van" ? "ad_on_wheels" : id === "teacup" ? "tea_cup" : id === "digital" ? "digital_marketing" : id === "website" ? "website_building" : id === "film" ? "ad_films" : "led"}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-bright hover:text-white transition"
                  >
                    <span>Full Service Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stage 2 & 3: Floating Exploded Mechanical Callouts */}
            {(activeStageIndex === 1 || activeStageIndex === 2) && currentStage?.callouts && (
              <div className="absolute inset-0 pointer-events-none hidden md:block">
                {currentStage.callouts.map((callout, i) => (
                  <div
                    key={i}
                    className={`absolute flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-navy-primary/90 border border-gold-primary/40 backdrop-blur-xl shadow-2xl text-xs font-mono tracking-wide text-white animate-fadeIn ${
                      callout.position === "left"
                        ? "left-4 top-[28%]"
                        : "right-4 top-[60%]"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-bright animate-pulse" />
                    <span className="font-semibold">{callout.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Stage 3: Technical Specifications HUD (Right Overlay) */}
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 max-w-xs pointer-events-none transition-all duration-700 hidden lg:block ${
                activeStageIndex === 2
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-6"
              }`}
            >
              <div className="p-5 rounded-3xl bg-navy-secondary/85 border border-gold-primary/30 backdrop-blur-xl shadow-2xl space-y-3 pointer-events-auto">
                <div className="flex items-center gap-2 border-b border-navy-border/40 pb-2">
                  <Cpu className="w-4 h-4 text-gold-bright" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                    HARDWARE TELEMETRY
                  </span>
                </div>
                <div className="space-y-2">
                  {specs.map((sp, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-mono">
                      <span className="text-content-muted">{sp.label}:</span>
                      <span className="text-gold-bright font-bold">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Control Bar & Stage Selector */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 pb-2 border-t border-navy-border/40">
          {/* Stage Selector Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[0, 1, 2, 3].map((stIdx) => (
              <button
                key={stIdx}
                onClick={() => jumpToStage(stIdx)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${
                  activeStageIndex === stIdx
                    ? "bg-gradient-to-r from-gold-bright to-gold-primary text-navy-primary font-bold shadow-md scale-105"
                    : "bg-navy-secondary/60 text-content-secondary hover:text-white hover:bg-navy-secondary"
                }`}
              >
                {stIdx === 0 && "1. ASSEMBLED"}
                {stIdx === 1 && "2. DISASSEMBLY"}
                {stIdx === 2 && "3. EXPLODED"}
                {stIdx === 3 && "4. REASSEMBLED"}
              </button>
            ))}
          </div>

          {/* Scrub Telemetry & Action Button */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-content-muted hidden sm:inline">
              PROGRESS: <span className="text-white font-bold">{Math.round(scrollProgress * 100)}%</span>
            </span>

            <button
              onClick={() => onOpenQuote && onOpenQuote(name)}
              className="px-5 py-2 rounded-full gold-btn-primary flex items-center gap-2 text-xs font-bold shadow-lg"
            >
              <span>Get Quote for {shortName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcaseSection;
