import { MapPin, Users } from "lucide-react";

import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import Seo from "../../components/common/Seo/Seo";
import StructuredData from "../../components/common/StructuredData/StructuredData";
import CtaSection from "../../features/home/sections/CtaSection";
import {
  milestones,
  serviceAreas,
  values,
  whyChooseUs,
} from "../../data/company.data";
import { aboutPage } from "../../features/about/data/about.data";
import { buildLocalBusinessSchema } from "../../utils/structuredData";

/**
 * About route screen — Clean, professional agency about page for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Two-column principles (Vision & Mission)
 * - Four-column milestone timeline and core values
 * - Commercial advantages and geographical footprint
 * - Full token conformance (pt-header, mt-section, zero min-h-viewport or hardcoded margins)
 */
const About = () => {
  const TeamIcon = aboutPage.team.icon || Users;

  return (
    <>
      <Seo
        title={aboutPage.metaTitle}
        description={aboutPage.intro}
        path="/about"
      />
      <StructuredData data={buildLocalBusinessSchema()} />

      <section className="relative flex flex-col items-center bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-12 sm:pb-16 pt-header">
        <div className="w-full max-w-container mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-5 sm:mb-6">
            <Breadcrumbs items={aboutPage.breadcrumbs} />
          </div>

          {/* 1. CLEAN EDITORIAL HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-8 border-b border-white/10">
            {/* Left: Heading, Core Statement & Stats */}
            <div className="lg:col-span-5 flex flex-col">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
                About <span className="text-gold-primary">Sri Simbha</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed mb-5">
                {aboutPage.intro}
              </p>

              <div className="rounded-xl border border-white/10 bg-navy-secondary/60 p-4 mb-5">
                <p className="text-xs sm:text-sm font-medium text-gold-bright italic leading-relaxed">
                  "We don't merely place advertisements. We transform physical journeys and digital touchpoints into commercial attention."
                </p>
              </div>

              {/* Compact Agency Facts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-navy-secondary/60 p-3.5">
                  <span className="block text-xl sm:text-2xl font-bold text-gold-primary">100+</span>
                  <span className="text-xs text-gray-400 font-medium">Prime Display Assets</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-navy-secondary/60 p-3.5">
                  <span className="block text-xl sm:text-2xl font-bold text-gold-primary">Est. 2019</span>
                  <span className="text-xs text-gray-400 font-medium">Visakhapatnam HQ</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative Story */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5 text-sm sm:text-base text-gray-300 font-normal leading-relaxed pt-1">
              {aboutPage.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 2. VISION AND MISSION */}
          <div className="relative z-10 mt-section w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {aboutPage.principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={principle.id}
                    className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 sm:p-6 backdrop-blur-sm shadow-md"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-navy-primary text-gold-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        {principle.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                      {principle.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. COMPANY MILESTONES */}
          <div className="relative z-10 mt-section w-full">
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Company <span className="text-gold-primary">Milestones</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                Key steps in building our regional media and outdoor advertising network.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-primary block mb-1">
                      {milestone.year}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      {milestone.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                      {milestone.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. WHAT WE STAND FOR (VALUES) */}
          <div className="relative z-10 mt-section w-full">
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                What We <span className="text-gold-primary">Stand For</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                The core operating principles behind every campaign we execute.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.id}
                    className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 backdrop-blur-sm text-left"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-navy-primary text-gold-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                      {value.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. WHY BUSINESSES CHOOSE US */}
          <div className="relative z-10 mt-section w-full">
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Why Businesses <span className="text-gold-primary">Choose Us</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                Direct execution, transparent pricing, and measurable reach across Andhra Pradesh.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {whyChooseUs.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 backdrop-blur-sm flex items-start gap-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-primary text-gold-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. TEAM LEADERSHIP & SERVICE COVERAGE */}
          <div className="relative z-10 mt-section w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Leadership Desk */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 sm:p-6 backdrop-blur-sm flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-navy-primary text-gold-primary">
                    <TeamIcon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    {aboutPage.team.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                  {aboutPage.team.body}
                </p>
              </div>

              {/* Service Areas */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 sm:p-6 backdrop-blur-sm flex flex-col justify-center">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-primary mb-2.5 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Where We Operate</span>
                </h3>
                <ul className="flex flex-wrap gap-1.5 mb-2.5">
                  {serviceAreas.map((area) => (
                    <li key={area}>
                      <span className="inline-block rounded-lg bg-navy-primary/80 border border-white/10 px-2.5 py-1 text-xs text-gray-300 font-mono">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-gray-400">
                  Digital marketing, web development, and ad films are delivered remotely across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Work with a team that answers"
        body="No sales desk, no ticket queue. Send us your requirements and we will tell you honestly whether advertising is the right next step for you."
      />
    </>
  );
};

export default About;
