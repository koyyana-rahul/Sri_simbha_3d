import { useEffect, useState } from "react";
import { SEQUENCE_SERVICES } from "../../config/sequences.config";

/**
 * Floating Service Navigator Dock (Apple Dynamic Capsule Style).
 *
 * Provides quick jump access to all 6 cinematic exploded sequences
 * with subtle scroll-spy indication.
 */
const ServiceDock = () => {
  const [activeServiceId, setActiveServiceId] = useState("led");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal dock once visitor scrolls past hero section
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Detect active service section in viewport
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      for (const srv of SEQUENCE_SERVICES) {
        const el = document.getElementById(`service-${srv.id}`);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveServiceId(srv.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(`service-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Service Quick Jump Navigator"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy-primary/80 border border-gold-primary/25 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] animate-fadeIn"
    >
      {SEQUENCE_SERVICES.map((s) => {
        const isActive = activeServiceId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
              isActive
                ? "bg-gold-primary/20 text-gold-bright font-bold border border-gold-primary/40 shadow-sm"
                : "text-content-secondary hover:text-white hover:bg-navy-secondary/50"
            }`}
            title={s.name}
          >
            <span className={isActive ? "text-gold-bright" : "text-content-muted"}>
              {s.number}
            </span>
            <span className="hidden md:inline">{s.shortName}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default ServiceDock;
