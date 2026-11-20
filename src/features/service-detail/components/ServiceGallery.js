import { ZoomIn } from "lucide-react";
import Image from "../../../components/common/Image/Image";

/**
 * ServiceGallery — Clean campaign media gallery.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 4-column photo grid with refined hover borders and zoom affordance
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const ServiceGallery = ({ items, onSelect }) => {
  if (!items?.length) return null;

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 text-center max-w-xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
          Campaign <span className="text-gold-primary">Gallery</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-normal">
          Real-world installations, displays, and client placements across Andhra Pradesh.
        </p>
      </div>

      <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {items.map((item) => (
          <li key={item.src} className="h-full">
            <button
              type="button"
              onClick={() => onSelect(item)}
              aria-label={`Open larger view of ${item.alt}`}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-secondary/60 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-gold-primary/40 focus-visible:border-gold-primary cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                ratio="1 / 1"
                className="transition-transform duration-500 group-hover:scale-105"
              />

              {/* Subtle hover vignette & zoom icon */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-navy-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-primary/90 border border-white/20 text-gold-primary shadow-md">
                  <ZoomIn size={16} />
                </span>
              </span>

              {item.caption ? (
                <span className="absolute bottom-2 left-2.5 right-2.5 z-10 text-[11px] font-medium text-white truncate drop-shadow-md">
                  {item.caption}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceGallery;
