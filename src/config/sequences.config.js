/**
 * Configuration-driven registry for all 6 cinematic image sequences.
 *
 * Maps actual asset folders, frame counts, taglines, specs, stages,
 * and exploded-view technical callouts.
 */

export const SEQUENCE_SERVICES = [
  {
    id: "led",
    number: "01",
    name: "LED Display Advertising",
    shortName: "LED Billboard",
    tagline: "Be Seen. Everywhere.",
    description:
      "Command instant attention with commercial-grade outdoor digital billboards placed in prime, high-traffic arterial junctions.",
    folder: "/assets/sequences/led",
    fileNamePattern: "frame_{index}.jpg",
    frameCount: 241,
    aspectRatio: 640 / 360,
    accentColor: "#FFC928",
    specs: [
      { label: "Display Brightness", value: "6,500+ Nits" },
      { label: "Ingress Rating", value: "IP68 Weatherproof" },
      { label: "Prime Network", value: "100+ Screens" },
      { label: "Daily Impressions", value: "250,000+" },
    ],
    stages: [
      {
        progress: [0, 0.22],
        title: "Assembled Monolith",
        subtitle: "High-impact outdoor installation engineered for maximum daylight visibility.",
        callouts: [
          { label: "Die-Cast Aluminum Cabinet", position: "left" },
          { label: "Ultra-High Contrast Mask", position: "right" },
        ],
      },
      {
        progress: [0.22, 0.55],
        title: "Mechanical Disassembly",
        subtitle: "Modular magnetic LED panels separating from the structural reinforcement chassis.",
        callouts: [
          { label: "Micro-LED Surface Mount Array", position: "left" },
          { label: "Sub-Module Thermal Heat Sink", position: "right" },
        ],
      },
      {
        progress: [0.55, 0.78],
        title: "Internal Architecture",
        subtitle: "High-efficiency redundant power units, receiving cards and optical sensors revealed.",
        callouts: [
          { label: "Synchronous Cloud Sending Card", position: "left" },
          { label: "Direct-Drive Power Rail", position: "right" },
        ],
      },
      {
        progress: [0.78, 1.0],
        title: "Full Illumination Reassembly",
        subtitle: "Seamless magnetic lock and full-spectrum dynamic video broadcast active.",
        callouts: [
          { label: "Precision Bezel Alignment", position: "left" },
          { label: "Dynamic Color Calibration", position: "right" },
        ],
      },
    ],
  },
  {
    id: "van",
    number: "02",
    name: "Mobile Van Advertising",
    shortName: "Ads on Wheels",
    tagline: "Your Brand. On The Move.",
    description:
      "Transform entire cities into your runway with custom-engineered mobile LED display vehicles delivering dynamic broadcast advertising on wheels.",
    folder: "/assets/sequences/van",
    fileNamePattern: "frame_{index}.jpg",
    frameCount: 241,
    aspectRatio: 640 / 360,
    accentColor: "#E8B83F",
    specs: [
      { label: "Fleet Coverage", value: "City-Wide Matrix" },
      { label: "Audio Sync", value: "High-Fidelity PA" },
      { label: "Power Independence", value: "On-Board Generator" },
      { label: "Telemetry", value: "Live GPS Tracking" },
    ],
    stages: [
      {
        progress: [0, 0.22],
        title: "High-Impact Arrival",
        subtitle: "Custom-modified advertising vehicle positioned with optimal line of sight.",
        callouts: [
          { label: "Reinforced Aerodynamic Roof Mount", position: "left" },
          { label: "Shock-Isolated Chassis", position: "right" },
        ],
      },
      {
        progress: [0.22, 0.55],
        title: "Exploded Vehicle Dynamics",
        subtitle: "Exterior aerodynamic fairings, display brackets and wheels detaching in isometric space.",
        callouts: [
          { label: "Dual High-Nit Side Displays", position: "left" },
          { label: "Stabilizer Suspension Struts", position: "right" },
        ],
      },
      {
        progress: [0.55, 0.78],
        title: "Sub-Frame & Generator Core",
        subtitle: "On-board silent power plant, hydraulic leveling system and audio distribution.",
        callouts: [
          { label: "Silent Inverter Generator", position: "left" },
          { label: "Digital Media Controller", position: "right" },
        ],
      },
      {
        progress: [0.78, 1.0],
        title: "Operational Reassembly",
        subtitle: "Unified vehicle architecture accelerating into high-density retail corridors.",
        callouts: [
          { label: "Full Perimeter Illumination", position: "left" },
          { label: "Audience Engagement Active", position: "right" },
        ],
      },
    ],
  },
  {
    id: "teacup",
    number: "03",
    name: "Tea Cup Advertising",
    shortName: "Tea Cup Printing",
    tagline: "Every Sip Is An Advertisement.",
    description:
      "Put your brand directly in consumer hands with custom-printed cups distributed across high-footfall tea hubs and cafeterias.",
    folder: "/assets/sequences/teacup",
    fileNamePattern: "frame_{index}.jpg",
    frameCount: 241,
    accentColor: "#F59E0B",
    aspectRatio: 640 / 360,
    specs: [
      { label: "Print Process", value: "HD Flexographic" },
      { label: "Material", value: "Food-Grade Bio-Wax" },
      { label: "Distribution", value: "500+ Outlets" },
      { label: "Monthly Units", value: "500,000+ Cups" },
    ],
    stages: [
      {
        progress: [0, 0.22],
        title: "The Tactile Canvas",
        subtitle: "Everyday consumer touchpoint engineered into an intimate advertising medium.",
        callouts: [
          { label: "Rolled Comfort Lip Rim", position: "left" },
          { label: "360° Seamless Graphic Wrap", position: "right" },
        ],
      },
      {
        progress: [0.22, 0.55],
        title: "Layer Separation",
        subtitle: "Outer printed advertising sleeve lifts away from the inner insulating barrier.",
        callouts: [
          { label: "UV-Cured Food-Safe Inks", position: "left" },
          { label: "Triple-Layer Air Thermal Gap", position: "right" },
        ],
      },
      {
        progress: [0.55, 0.78],
        title: "Structural Anatomy",
        subtitle: "Biodegradable paper substrate, heat-sealed base disk and moisture membrane.",
        callouts: [
          { label: "Interlocked Base Flange", position: "left" },
          { label: "Non-Toxic PLA Inner Coating", position: "right" },
        ],
      },
      {
        progress: [0.78, 1.0],
        title: "Reassembled Precision",
        subtitle: "Steam-ready, premium finished branded cup delivering prolonged brand retention.",
        callouts: [
          { label: "High-Recall Retention Rate", position: "left" },
          { label: "Active Regional Distribution", position: "right" },
        ],
      },
    ],
  },
  {
    id: "digital",
    number: "04",
    name: "Digital Marketing",
    shortName: "Digital Campaigns",
    tagline: "Get Found. Get Remembered.",
    description:
      "Target high-intent audiences across Google, Meta, and social channels with data-driven funnels engineered to convert attention into revenue.",
    folder: "/assets/sequences/digital",
    fileNamePattern: "frame_{index}.jpg",
    frameCount: 241,
    aspectRatio: 640 / 360,
    accentColor: "#FFC928",
    specs: [
      { label: "Channels", value: "Meta, Google, LinkedIn" },
      { label: "Targeting", value: "Hyper-Local & Intent" },
      { label: "Optimization", value: "Real-Time AI Bidding" },
      { label: "Conversion Lift", value: "3.4x Average ROI" },
    ],
    stages: [
      {
        progress: [0, 0.22],
        title: "The Mobile Gateway",
        subtitle: "The handheld epicenter where modern audiences discover and engage with brands.",
        callouts: [
          { label: "Ceramic Glass Display", position: "left" },
          { label: "Omnichannel Feed Input", position: "right" },
        ],
      },
      {
        progress: [0.22, 0.55],
        title: "Component Explosion",
        subtitle: "OLED matrix, logic board and optic arrays expand into technical space.",
        callouts: [
          { label: "Sub-Pixel Pixel Layer", position: "left" },
          { label: "High-Frequency Radio Antennas", position: "right" },
        ],
      },
      {
        progress: [0.55, 0.78],
        title: "Data Cloud & Analytics",
        subtitle: "Conversion funnels, live click attribution and viral creative layers orbit the hardware.",
        callouts: [
          { label: "Real-Time Pixel Tracking", position: "left" },
          { label: "Predictive Audience Clustering", position: "right" },
        ],
      },
      {
        progress: [0.78, 1.0],
        title: "Synchronized Conversion",
        subtitle: "Polished multi-platform marketing ecosystem delivering measurable brand dominance.",
        callouts: [
          { label: "Automated Lead Gen Pipeline", position: "left" },
          { label: "Live Performance Dashboard", position: "right" },
        ],
      },
    ],
  },
  {
    id: "website",
    number: "05",
    name: "Website Development",
    shortName: "Web Development",
    tagline: "Your Digital Identity Starts Here.",
    description:
      "Fast, responsive, mobile-first web platforms built with modern technology to turn visitors into long-term commercial clients.",
    folder: "/assets/sequences/website",
    fileNamePattern: "frame_{index}.jpg",
    frameCount: 240,
    aspectRatio: 640 / 360,
    accentColor: "#E8B83F",
    specs: [
      { label: "Performance", value: "100 Lighthouse Score" },
      { label: "Stack", value: "React, Vite, Node, Cloud" },
      { label: "Security", value: "Enterprise TLS & Shield" },
      { label: "Responsiveness", value: "Fluid Multi-Device" },
    ],
    stages: [
      {
        progress: [0, 0.22],
        title: "The Workstation Opening",
        subtitle: "Premium aluminum laptop opening to ignite the modern digital brand identity.",
        callouts: [
          { label: "Liquid Retina XDR Display", position: "left" },
          { label: "Precision CNC Enclosure", position: "right" },
        ],
      },
      {
        progress: [0.22, 0.55],
        title: "Hardware Layering",
        subtitle: "Display panel, keybed matrix, thermal heatsinks and lithium cells separate.",
        callouts: [
          { label: "Anti-Reflective Optical Coating", position: "left" },
          { label: "Scissor-Switch Mechanism", position: "right" },
        ],
      },
      {
        progress: [0.55, 0.78],
        title: "Architecture & Interface",
        subtitle: "Zero-latency API endpoints, semantic DOM trees and responsive viewports float into view.",
        callouts: [
          { label: "Component Modular Architecture", position: "left" },
          { label: "Edge-Cached Global CDN", position: "right" },
        ],
      },
      {
        progress: [0.78, 1.0],
        title: "The Masterpiece Live",
        subtitle: "Production web platform alive with fluid 60fps animations and seamless conversion pathways.",
        callouts: [
          { label: "Enterprise Scalability", position: "left" },
          { label: "Instant User Onboarding", position: "right" },
        ],
      },
    ],
  },
  {
    id: "film",
    number: "06",
    name: "Ad Film Production",
    shortName: "Ad Films",
    tagline: "Your Story. Our Vision.",
    description:
      "Broadcast-grade commercial ad films crafted with cinema optics, precision lighting design, and industry-standard color grading.",
    folder: "/assets/sequences/film",
    fileNamePattern: "frame_{index}.jpg",
    frameCount: 241,
    aspectRatio: 640 / 360,
    accentColor: "#FFC928",
    specs: [
      { label: "Sensor Tech", value: "Full-Frame 6K Cinema" },
      { label: "Optics", value: "Anamorphic Primes" },
      { label: "Grading", value: "DaVinci Wide Gamut" },
      { label: "Delivery", value: "4K HDR Master Delivery" },
    ],
    stages: [
      {
        progress: [0, 0.22],
        title: "The Cine Rig Ready",
        subtitle: "Studio cinema camera package balanced for high-production storytelling.",
        callouts: [
          { label: "Carbon-Fiber Rod Baseplate", position: "left" },
          { label: "Precision Matte Box & Flags", position: "right" },
        ],
      },
      {
        progress: [0.22, 0.55],
        title: "Optical Dissection",
        subtitle: "Anamorphic lens barrel extends, revealing individual ground glass elements and iris blades.",
        callouts: [
          { label: "Multi-Coated Anamorphic Glass", position: "left" },
          { label: "12-Blade Circular Aperture", position: "right" },
        ],
      },
      {
        progress: [0.55, 0.78],
        title: "Sensor Core & Mount",
        subtitle: "Large-format CMOS sensor block, active peltier cooling and titanium PL mount.",
        callouts: [
          { label: "Dual Native ISO Sensor", position: "left" },
          { label: "Active Sensor Stabilization", position: "right" },
        ],
      },
      {
        progress: [0.78, 1.0],
        title: "The Hero Shot",
        subtitle: "Cinematic lighting flares the front element as the story takes center stage.",
        callouts: [
          { label: "Broadcast-Ready Master", position: "left" },
          { label: "Emotional Story Impact", position: "right" },
        ],
      },
    ],
  },
];
