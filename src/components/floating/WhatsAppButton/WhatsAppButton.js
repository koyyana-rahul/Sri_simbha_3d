import { FaWhatsapp } from "react-icons/fa";

import siteConfig, { buildWhatsAppUrl } from "../../../config/site.config";

/**
 * Floating WhatsApp contact call-to-action.
 *
 * Minimal, premium floating button:
 * - 54–58px circular touch target on mobile (56px) and 58–62px on desktop (60px)
 * - Official WhatsApp green background with centered white icon
 * - Subtle, soft shadow for depth (no oversized neon glow or decorative rings)
 * - Clean responsive bottom-right positioning with safe-area insets
 * - Desktop hover: 200ms slight scale with dark branded tooltip "Chat with us on WhatsApp"
 * - Mobile: smooth touch press interaction with no hover-only tooltips
 * - Yields cleanly when mobile menu drawer is open
 */
const WhatsAppButton = ({
  message = siteConfig.contact.whatsappMessage,
  label = "Chat with us on WhatsApp",
  className = "",
}) => (
  <a
    href={buildWhatsAppUrl(message)}
    target="_blank"
    rel="noopener noreferrer"
    className={`group whatsapp-floating-btn ${className}`.trim()}
    aria-label={label}
  >
    {/* Desktop tooltip: "Chat with us on WhatsApp" (hidden on mobile) */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-11 right-0 whitespace-nowrap rounded-md bg-[#081329]/95 border border-[#FFC928]/35 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 hidden sm:block"
    >
      Chat with us on WhatsApp
    </span>

    <FaWhatsapp className="text-[27px] sm:text-[30px] text-white" aria-hidden="true" />
  </a>
);

export default WhatsAppButton;
