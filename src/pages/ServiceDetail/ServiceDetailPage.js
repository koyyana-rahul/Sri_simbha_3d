import { useCallback, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import { ImageModal } from "../../components/common/Modal/Modal";
import Seo from "../../components/common/Seo/Seo";
import StructuredData from "../../components/common/StructuredData/StructuredData";
import { getServiceByPath } from "../../config/services.config";
import { buildServiceSchema } from "../../utils/structuredData";
import { buildWhatsAppUrl } from "../../config/site.config";
import CtaSection from "../../features/home/sections/CtaSection";
import BenefitsGrid from "../../features/service-detail/components/BenefitsGrid";
import RelatedServices from "../../features/service-detail/components/RelatedServices";
import ServiceGallery from "../../features/service-detail/components/ServiceGallery";
import NotFound from "../NotFound/NotFound";

/**
 * ServiceDetailPage — Clean, dedicated service presentation for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean editorial split header: Left side headline & description, Right side direct actions
 * - 3-column benefits grid, 4-column media gallery, and related services
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceByPath(`/services/${slug}`);

  const [selectedImage, setSelectedImage] = useState(null);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  if (!service) return <NotFound />;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: service.path },
  ];

  return (
    <>
      <Seo
        title={service.title}
        description={service.longDescription}
        path={service.path}
        type="article"
      />
      <StructuredData data={buildServiceSchema(service)} />

      <div
        key={service.id}
        className="relative z-0 min-h-[calc(100vh-var(--header-height))] bg-navy-primary text-white pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
      >
        <div className="mx-auto max-w-container w-full">
          {/* Breadcrumb Navigation */}
          <div className="mb-5 sm:mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Service Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 lg:mb-12 border-b border-white/10">
            {/* Left: Heading & Description */}
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-semibold tracking-wider text-gold-primary uppercase block mb-1.5">
                {service.title}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
                {service.heading}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
                {service.longDescription}
              </p>
            </div>

            {/* Right: Direct Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/contact"
                  className="gold-btn-primary inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-navy-primary shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  <span>Request Placements & Rates</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={buildWhatsAppUrl(`Hi, I'm interested in ${service.title}. Could you share available placements and pricing?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-xs sm:text-sm font-semibold hover:bg-emerald-900/40 hover:border-emerald-400 transition-all"
                >
                  <FaWhatsapp className="text-sm text-emerald-400" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Active campaigns ready for immediate deployment</span>
              </div>
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="w-full mb-12 sm:mb-16">
            <BenefitsGrid benefits={service.benefits} />
          </div>

          {/* Placement Showcase Gallery */}
          <div className="w-full mb-12 sm:mb-16">
            <ServiceGallery items={service.gallery} onSelect={setSelectedImage} />
          </div>

          {/* Related / Other Services */}
          <div className="w-full">
            <RelatedServices currentId={service.id} />
          </div>
        </div>
      </div>

      {/* Clean Call-to-Action Band */}
      <CtaSection
        heading={`Get a quote for ${service.title.toLowerCase()}`}
        body="Tell us the area you want to cover and roughly when the campaign should start. We will come back with specific placements and a written price."
      />

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={Boolean(selectedImage)}
        onClose={closeLightbox}
        src={selectedImage?.src}
        alt={selectedImage?.alt}
        title={service.title}
      />
    </>
  );
};

export default ServiceDetailPage;
