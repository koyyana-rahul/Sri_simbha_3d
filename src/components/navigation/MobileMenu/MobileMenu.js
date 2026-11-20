import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, MapPin, ArrowRight, ChevronRight } from "lucide-react";

import { useEscapeKey, useLockBodyScroll } from "../../../hooks";
import { headerNavigationItems } from "../../../config/navigation.config";
import siteConfig, { buildWhatsAppUrl } from "../../../config/site.config";
import { cx } from "../../../utils/helpers";
import NavItem from "../NavItem/NavItem";

/**
 * MobileMenu — Premium, minimal, Apple-inspired mobile navigation drawer
 * for Sri Simbha Ad Solutions.
 *
 * Implements:
 * - Semantic `<nav aria-label="Mobile">` with complete keyboard & screen-reader accessibility
 * - Full-height viewport overlay covering underlying page content completely
 * - Seamless dark backdrop ensuring zero underlying content bleed
 * - 52–56px touch target navigation items with refined gold active indicator
 * - Intentionally balanced middle space featuring a faint, subtle branded emblem
 * - Refined bottom action area:
 *   - Full-width gold gradient Enquire Now CTA
 *   - Restrained side-by-side WhatsApp and Call Us direct conversion buttons
 *   - Verified business location line
 * - Smooth fade and downward reveal with staggered link entrance
 * - Scroll locking when open, clean restoration on dismissal
 */
const MobileMenu = ({
  isOpen,
  onClose,
  id = "mobile-navigation",
  toggleRef,
}) => {
  const panelRef = useRef(null);

  useEscapeKey(onClose, isOpen);
  useLockBodyScroll(isOpen);

  // Sync body attribute so external floating widgets gracefully yield
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.setAttribute("data-mobile-menu-open", "true");
      } else {
        document.body.removeAttribute("data-mobile-menu-open");
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.removeAttribute("data-mobile-menu-open");
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      const target = event.target;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef?.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, onClose, toggleRef]);

  return (
    <div
      ref={panelRef}
      id={id}
      className={cx(
        "mobile-menu lg:hidden",
        isOpen ? "mobile-menu--open" : "mobile-menu--closed"
      )}
    >
      {/* Subtle backdrop overlay ensuring zero underlying content leakage */}
      <div
        className="fixed inset-0 bg-[#081329]/80 backdrop-blur-md -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <nav aria-label="Mobile" className="menu-list font-medium">
        {/* Navigation Links Group */}
        <div className="w-full flex flex-col pt-1">
          <ul className="flex w-full flex-col divide-y divide-white/[0.06]">
            {headerNavigationItems.map((item) => (
              <li key={item.id} className="menu-nav-item w-full">
                <NavItem
                  to={item.path}
                  label={item.label}
                  onClick={onClose}
                  className="w-full min-h-[46px] sm:min-h-[56px] flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-3 text-[14px] sm:text-base font-medium rounded-lg transition-all group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="nav-item-text">{item.label}</span>
                  </span>
                  <ChevronRight
                    className="w-4 h-4 text-slate-500 group-hover:text-[#FFC928] group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </NavItem>
              </li>
            ))}
          </ul>
        </div>

        {/* Subtle branded orbital emblem (balanced middle space with generous breathing room) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none w-full my-auto py-2 sm:py-3 hidden min-[360px]:flex shrink min-h-0 max-h-[120px] flex-col items-center justify-center opacity-[0.16] transition-opacity duration-300"
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer faint gold orbital ring */}
            <div className="absolute inset-0 rounded-full border border-[#FFC928]/40" />
            {/* Inner dashed orbital orbit */}
            <div className="absolute inset-2.5 rounded-full border border-dashed border-[#FFC928]/30" />
            {/* Center luxury lion sunburst crest */}
            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="#FFC928"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-[#FFC928]"
            >
              <path d="M24 4V8M24 40V44M4 24H8M40 24H44M9.8 9.8L12.6 12.6M35.4 35.4L38.2 38.2M9.8 38.2L12.6 35.4M35.4 12.6L38.2 9.8" strokeWidth="1.2" opacity="0.6" />
              <path d="M16 28C16 23.5 19.5 20 24 20C28.5 20 32 23.5 32 28C32 32 28.5 34.5 24 34.5C19.5 34.5 16 32 16 28Z" />
              <path d="M21 27L24 29.5L27 27" />
              <path d="M24 29.5V32" />
              <circle cx="20.5" cy="25" r="1" fill="#FFC928" />
              <circle cx="27.5" cy="25" r="1" fill="#FFC928" />
              <path d="M19 19L20.5 15L24 17L27.5 15L29 19" strokeWidth="1.4" />
            </svg>
          </div>
          <span className="mt-2 text-[9px] tracking-[0.28em] uppercase text-[#FFC928] font-medium">
            Est. 2019 • Visakhapatnam
          </span>
        </div>

        {/* Bottom Action Area with subtle divider */}
        <div className="w-full flex flex-col pt-1 pb-1">
          {/* Subtle horizontal gradient divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/12 to-transparent mb-3.5" />

          <div className="flex w-full flex-col gap-2.5">
            {/* Primary Action: Full-Width Gold Enquire Now Button */}
            <Link
              to="/contact"
              onClick={onClose}
              className="w-full min-h-[44px] sm:min-h-[48px] py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFC928] via-[#F5B82E] to-[#E8B83F] text-[#081329] text-xs min-[360px]:text-sm font-bold shadow-[0_2px_12px_rgba(232,184,63,0.22)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>

            {/* Direct Contact Actions: WhatsApp & Call Us Buttons */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 sm:gap-2 min-h-[40px] sm:min-h-[44px] py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl border border-emerald-500/30 bg-[#061e14]/70 text-emerald-400 text-[11px] min-[360px]:text-xs sm:text-sm font-semibold hover:bg-emerald-950/80 hover:border-emerald-500/50 active:scale-[0.98] transition-all text-center"
              >
                <FaWhatsapp className="text-sm sm:text-base text-emerald-400 shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:+${siteConfig.contact.phoneDigits}`}
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 sm:gap-2 min-h-[40px] sm:min-h-[44px] py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl border border-white/12 bg-white/[0.04] text-slate-200 text-[11px] min-[360px]:text-xs sm:text-sm font-semibold hover:bg-white/[0.08] hover:border-white/20 hover:text-white active:scale-[0.98] transition-all text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFC928] shrink-0" aria-hidden="true" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Compact Business Location Info */}
            <div className="flex items-center justify-center gap-1.5 pt-1.5 text-[11px] min-[380px]:text-xs text-slate-400 tracking-normal text-center">
              <MapPin className="w-3.5 h-3.5 text-[#FFC928] shrink-0" aria-hidden="true" />
              <span>Gajuwaka, Visakhapatnam, Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
