import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../../../assets/images/branding/simba-logo.jpg";
import siteConfig from "../../../config/site.config";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { MOBILE_NAV_BREAKPOINT } from "../../../utils/constants";
import Navbar from "../../navigation/Navbar/Navbar";
import MobileMenu from "../../navigation/MobileMenu/MobileMenu";

const MOBILE_MENU_ID = "mobile-navigation";

/**
 * Site header: brand identity, primary desktop navigation, and mobile menu trigger.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${MOBILE_NAV_BREAKPOINT}px)`);

  const toggleRef = useRef(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The panel is unmounted on desktop, so make sure a stale "open" state can
  // never be revealed again if the viewport shrinks back to mobile.
  useEffect(() => {
    if (isDesktop) closeMenu();
  }, [isDesktop, closeMenu]);

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""} ${isMenuOpen ? "site-header--menu-open" : ""}`.trim()}>
      {/* `py-header` is bound to the shared layout token in variables.css */}
      <div className="site-header__bar py-header">
        {/* Left: Brand logo and refined brand typography */}
        <div className="flex items-center justify-self-start flex-shrink-0">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 sm:gap-2.5 rounded-md transition-opacity hover:opacity-90"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="logo-container">
              <img
                className="logo-img"
                alt={siteConfig.logoAlt}
                src={logo}
                width={44}
                height={44}
              />
            </span>
            <div className="flex flex-col justify-center leading-tight">
              <span className="animated-brand font-bold text-white tracking-tight text-[13.5px] min-[380px]:text-[15px] sm:text-[17px]">
                Sri Simbha
              </span>
              <span className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#FFC928] uppercase">
                Ad Solutions
              </span>
            </div>
          </Link>
        </div>

        {/* Centre: Navigation links (Desktop) */}
        <Navbar onNavigate={closeMenu} className="hidden lg:flex justify-self-center px-4" />

        {/* Right: Enquire Now button and mobile menu toggle */}
        <div className="flex items-center justify-self-end gap-1.5 min-[360px]:gap-2 sm:gap-3 flex-shrink-0">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="inline-flex items-center justify-center h-8.5 min-[360px]:h-9 sm:h-10 px-2.5 min-[360px]:px-4 sm:px-5 text-[10.5px] min-[360px]:text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-[#FFC928] to-[#E8B83F] text-[#081329] shadow-[0_2px_8px_rgba(232,184,63,0.2)] hover:shadow-[0_4px_16px_rgba(255,201,40,0.35)] hover:brightness-105 active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            Enquire Now
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={toggleMenu}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/12 bg-white/5 p-2 flex items-center justify-center text-gray-200 backdrop-blur-sm transition hover:bg-white/10 hover:border-[#FFC928]/40 hover:text-white active:scale-95 lg:hidden"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            {isMenuOpen ? (
              <X size={20} aria-hidden="true" className="text-white" />
            ) : (
              <Menu size={20} aria-hidden="true" className="text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {isDesktop ? null : (
        <MobileMenu
          id={MOBILE_MENU_ID}
          isOpen={isMenuOpen}
          onClose={closeMenu}
          toggleRef={toggleRef}
        />
      )}
    </header>
  );
};

export default Header;
