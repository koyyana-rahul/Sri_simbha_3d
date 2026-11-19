import { useState } from "react";
import Seo from "../../components/common/Seo/Seo";
import StructuredData from "../../components/common/StructuredData/StructuredData";
import siteConfig from "../../config/site.config";
import {
  buildLocalBusinessSchema,
  buildWebSiteSchema,
} from "../../utils/structuredData";

import CinematicHeroScrollytelling from "../../components/scrollytelling/CinematicHeroScrollytelling";
import EnquiryModal from "../../components/common/EnquiryModal/EnquiryModal";

import StatsSection from "../../features/home/sections/StatsSection";
import ServicesPreviewSection from "../../features/home/sections/ServicesPreviewSection";
import WhySimbhaSection from "../../features/home/sections/WhySimbhaSection";
import HowItWorksSection from "../../features/home/sections/HowItWorksSection";
import TestimonialsSection from "../../features/home/sections/TestimonialsSection";
import FaqSection from "../../features/home/sections/FaqSection";
import ConnectSection from "../../features/contact/components/ConnectSection";

/**
 * Cinematic 3D Scrollytelling Home Experience.
 *
 * Immersive Apple-inspired presentation:
 * - Master continuous 6-service pinned 3D scrollytelling hero
 * - Portfolio showcase, stats, client testimonials, and FAQ
 */
const Home = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("LED Display Advertising");

  const handleOpenQuote = (serviceName = "LED Display Advertising") => {
    setSelectedService(serviceName);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-viewport overflow-x-hidden bg-navy-primary text-white">
      <Seo title={null} description={siteConfig.description} path="/" />
      <StructuredData data={[buildWebSiteSchema(), buildLocalBusinessSchema()]} />

      {/* Continuous 6-Service Cinematic 3D Scrollytelling Hero */}
      <CinematicHeroScrollytelling onOpenQuote={handleOpenQuote} />

      {/* Our Work / Full Services Portfolio Section */}
      <div id="work" className="scroll-mt-24">
        <ServicesPreviewSection />
      </div>

      {/* Impact Stats */}
      <StatsSection />

      {/* Why Simbha & How It Works */}
      <WhySimbhaSection />
      <HowItWorksSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Interactive FAQ */}
      <FaqSection />

      {/* Direct Contact & Location */}
      <ConnectSection />

      {/* Instant Enquiry Modal */}
      <EnquiryModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
};

export default Home;
