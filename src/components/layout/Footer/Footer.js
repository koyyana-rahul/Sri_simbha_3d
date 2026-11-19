import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

import siteConfig, {
  buildMailTo,
  buildWhatsAppUrl,
} from "../../../config/site.config";

/**
 * Site footer.
 *
 * Visually unchanged from the original design, but every value now comes from
 * `config/site.config.js` instead of being hardcoded, and the e-mail action is
 * a real `<a href="mailto:">` instead of a `<button>` running `window.open`.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050c18] border-t border-white/5 py-8 text-center text-sm text-gray-400">
      <div className="mx-auto flex w-full max-w-container flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mb-3 flex items-center justify-center gap-6">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-expand flex items-center gap-2 py-2 text-gray-300 transition-colors hover:text-green-400"
            aria-label={`Chat on WhatsApp with ${siteConfig.shortName}`}
          >
            <FaWhatsapp className="text-lg" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <a
            href={buildMailTo()}
            className="tap-expand flex items-center gap-2 py-2 text-gray-300 transition-colors hover:text-blue-400"
            aria-label={`Email ${siteConfig.name}`}
          >
            <FaEnvelope className="text-lg" aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>

        <p className="text-gray-400">
          &copy; {year}{" "}
          <span className="font-medium text-brand-400">
            {siteConfig.legalName}
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
