import * as THREE from "three";

/**
 * Studio3DProducts — Professional 3D Product Geometries & Materials
 * for Sri Simbha Ad Solutions.
 *
 * Implements genuine real-time 3D models for all six services:
 * 1. LED Display Advertising (Beveled aluminum cabinet, micro-LED screen, rear modules, circuit boards, heat sinks, mounting legs)
 * 2. Mobile Van Advertising (Commercial van chassis, alloy wheels, headlights, high-impact side LED billboard display)
 * 3. Tea Cup Printing (Paper cup cylinder with rolled rim, recessed base, authentic printed sleeve, plinth pedestal, rising steam)
 * 4. Digital Marketing (Flagship smartphone, titanium rails, curved front glass, live analytics dashboard, camera island)
 * 5. Website Development (MacBook-style unibody laptop, opening lid, keyboard well, trackpad, sharp web app screen)
 * 6. Ad Film Production (Cinema camera body, multi-element prime lens with AR coatings, matte box, cage, director's monitor)
 *
 * Eliminates all rectangular image boundaries permanently by rendering actual 3D geometry in WebGL.
 */

// Helper to create a procedural high-res canvas texture for screens
export function createScreenTexture({
  title = "SRI SIMBHA AD SOLUTIONS",
  subtitle = "PRIME 4K DIGITAL NETWORK",
  tagline = "Command Attention Across Prime Arterial Junctions",
  accentColor = "#FFC928",
  type = "led",
  logoImg = null,
}) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Deep commercial dark studio background (no blinding yellow fields!)
  ctx.fillStyle = "#020612";
  ctx.fillRect(0, 0, 1024, 576);

  // Micro-pixel grid matrix for realistic LED / OLED screens
  ctx.strokeStyle = "rgba(255, 201, 40, 0.05)";
  ctx.lineWidth = 1;
  const step = type === "led" ? 8 : 12;
  for (let x = 0; x < 1024; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 576);
    ctx.stroke();
  }
  for (let y = 0; y < 576; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Subtle ambient radial glow behind graphics
  const radial = ctx.createRadialGradient(512, 288, 30, 512, 288, 420);
  radial.addColorStop(0, "rgba(255, 201, 40, 0.12)");
  radial.addColorStop(0.5, "rgba(232, 184, 63, 0.04)");
  radial.addColorStop(1, "rgba(2, 6, 18, 0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 1024, 576);

  // Draw authentic logo if provided
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    ctx.save();
    const logoSize = 110;
    const lx = 512 - logoSize / 2;
    const ly = 95;
    ctx.beginPath();
    ctx.arc(512, ly + logoSize / 2, logoSize / 2 + 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 201, 40, 0.18)";
    ctx.fill();
    ctx.drawImage(logoImg, lx, ly, logoSize, logoSize);
    ctx.restore();
  } else {
    // Stylized lion crest emblem fallback
    ctx.save();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(512, 150, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = accentColor;
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SIMBHA", 512, 158);
    ctx.restore();
  }

  // Screen Commercial Typography
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 42px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, 512, 285);

  // Subtitle
  ctx.fillStyle = accentColor;
  ctx.font = "bold 20px monospace";
  ctx.letterSpacing = "3px";
  ctx.fillText(subtitle, 512, 335);

  // Tagline
  ctx.fillStyle = "#94A3B8";
  ctx.font = "italic 18px system-ui, -apple-system, sans-serif";
  ctx.fillText(`"${tagline}"`, 512, 380);

  // Technical metrics at bottom
  const badges = ["6,500+ NITS", "IP68 WEATHERPROOF", "100+ PRIME SCREENS"];
  ctx.font = "bold 13px monospace";
  badges.forEach((b, i) => {
    const bx = 280 + i * 230;
    const by = 470;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
    ctx.strokeRect(bx - 90, by - 16, 180, 32);
    ctx.fillStyle = accentColor;
    ctx.fillText(b, bx, by + 5);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// ============================================================================
// SERVICE 01: LED DISPLAY ADVERTISING (Monolith Billboard)
// ============================================================================
export function createLedBillboard(logoTexture, accentColor = "#FFC928") {
  const group = new THREE.Group();
  group.name = "product_led";

  // 1. Structural Aluminum Monolith Frame
  const frameGeo = new THREE.BoxGeometry(3.3, 1.95, 0.22);
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x121824,
    metalness: 0.92,
    roughness: 0.24,
  });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.castShadow = true;
  frame.receiveShadow = true;
  group.add(frame);

  // Outer chamfered bezel accent
  const bezelGeo = new THREE.BoxGeometry(3.38, 2.03, 0.06);
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x222e42,
    metalness: 0.95,
    roughness: 0.18,
  });
  const bezel = new THREE.Mesh(bezelGeo, bezelMat);
  bezel.position.z = -0.06;
  bezel.castShadow = true;
  group.add(bezel);

  // 2. High-Nit Front LED Display Screen (Realistic commercial self-illumination)
  const screenGeo = new THREE.PlaneGeometry(3.14, 1.79);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: logoTexture || null,
    emissive: new THREE.Color(0x1a1608),
    emissiveIntensity: 0.25,
    roughness: 0.25,
    metalness: 0.1,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.z = 0.114;
  group.add(screen);

  // 3. Modular Magnetic Rear Sub-Panels (Array of 6 panels that separate on scroll)
  const rearModules = [];
  const moduleCols = 3;
  const moduleRows = 2;
  const modW = 0.98;
  const modH = 0.84;

  for (let r = 0; r < moduleRows; r++) {
    for (let c = 0; c < moduleCols; c++) {
      const modGroup = new THREE.Group();

      // Module cabinet casing
      const modGeo = new THREE.BoxGeometry(modW, modH, 0.08);
      const modMat = new THREE.MeshStandardMaterial({
        color: 0x1a2233,
        metalness: 0.88,
        roughness: 0.32,
      });
      const modMesh = new THREE.Mesh(modGeo, modMat);
      modMesh.castShadow = true;
      modGroup.add(modMesh);

      // Exposed internal circuit board layer (green/gold substrate)
      const pcbGeo = new THREE.PlaneGeometry(modW * 0.88, modH * 0.88);
      const pcbMat = new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        metalness: 0.65,
        roughness: 0.38,
      });
      const pcb = new THREE.Mesh(pcbGeo, pcbMat);
      pcb.position.z = 0.042;
      modGroup.add(pcb);

      // Gold chip contacts on PCB
      for (let k = 0; k < 4; k++) {
        const chipGeo = new THREE.BoxGeometry(0.12, 0.12, 0.02);
        const chipMat = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.98,
          roughness: 0.15,
        });
        const chip = new THREE.Mesh(chipGeo, chipMat);
        chip.position.set((k % 2 === 0 ? -0.22 : 0.22), (k < 2 ? 0.18 : -0.18), 0.054);
        modGroup.add(chip);
      }

      // Cooling heat sink fins on rear
      for (let f = 0; f < 5; f++) {
        const finGeo = new THREE.BoxGeometry(0.02, modH * 0.75, 0.05);
        const finMat = new THREE.MeshStandardMaterial({
          color: 0x334155,
          metalness: 0.92,
          roughness: 0.2,
        });
        const fin = new THREE.Mesh(finGeo, finMat);
        fin.position.set(-0.3 + f * 0.15, 0, -0.065);
        modGroup.add(fin);
      }

      const nominalX = (c - 1) * 1.04;
      const nominalY = (0.5 - r) * 0.90;
      const nominalZ = -0.08;

      modGroup.position.set(nominalX, nominalY, nominalZ);
      group.add(modGroup);
      rearModules.push({ group: modGroup, nominalX, nominalY, nominalZ, r, c });
    }
  }

  // 4. Heavy-Duty Steel Support Columns & Base Anchors (Grounded on floor at y = -1.62)
  const legs = [];
  [-0.95, 0.95].forEach((lx) => {
    const legGeo = new THREE.CylinderGeometry(0.085, 0.085, 1.85, 24);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.92,
      roughness: 0.22,
    });
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(lx, -1.35, -0.02);
    leg.castShadow = true;
    leg.receiveShadow = true;
    group.add(leg);
    legs.push(leg);

    // Floor anchor flange plate
    const flangeGeo = new THREE.BoxGeometry(0.44, 0.05, 0.44);
    const flangeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.95,
      roughness: 0.2,
    });
    const flange = new THREE.Mesh(flangeGeo, flangeMat);
    flange.position.set(lx, -1.60, -0.02);
    flange.receiveShadow = true;
    group.add(flange);
  });

  return {
    group,
    update: (localProgress, isMobile, isTransitioning, transitionP) => {
      // Responsive Stage Positioning
      const targetScale = isMobile ? 0.72 : 1.02;
      group.scale.set(targetScale, targetScale, targetScale);

      // Desktop right-side stage balance vs mobile centered composition
      const nominalX = isMobile ? 0 : 0.88;
      const nominalY = isMobile ? 0.15 : 0.22;

      if (isTransitioning) {
        group.position.x = nominalX - transitionP * (isMobile ? 3.5 : 4.8);
        group.position.y = nominalY;
        group.position.z = -transitionP * 1.5;
        group.rotation.y = -0.22 - transitionP * 0.45;
        group.visible = transitionP < 0.98;
        return;
      }

      group.visible = true;
      group.position.x = nominalX;
      group.position.y = nominalY;
      group.position.z = 0;

      // 4-Stage Exploded Disassembly & Reassembly Choreography
      const stageP = Math.min(1.0, localProgress / 0.8);

      if (stageP < 0.22) {
        // STAGE 1: Assembled Monolith (3/4 beauty perspective)
        const p1 = stageP / 0.22;
        group.rotation.y = -0.26 + p1 * 0.06;
        group.rotation.x = 0.03;
        rearModules.forEach(({ group: mg, nominalX, nominalY, nominalZ }) => {
          mg.position.set(nominalX, nominalY, nominalZ);
        });
      } else if (stageP < 0.55) {
        // STAGE 2: Controlled Mechanical Disassembly (Rear modules slide back)
        const p2 = (stageP - 0.22) / 0.33;
        group.rotation.y = -0.20 + p2 * 0.18;
        group.rotation.x = 0.03 + p2 * 0.04;
        rearModules.forEach(({ group: mg, nominalX, nominalY, nominalZ }) => {
          mg.position.set(nominalX, nominalY, nominalZ - p2 * 0.55);
        });
      } else if (stageP < 0.78) {
        // STAGE 3: Exploded Technical View (Lateral isometric separation)
        const p3 = (stageP - 0.55) / 0.23;
        group.rotation.y = -0.02 + Math.sin(p3 * Math.PI) * 0.15;
        group.rotation.x = 0.07;
        rearModules.forEach(({ group: mg, nominalX, nominalY, nominalZ, r, c }) => {
          const spreadX = (c - 1) * 0.35 * p3;
          const spreadY = (0.5 - r) * 0.25 * p3;
          mg.position.set(
            nominalX + spreadX,
            nominalY + spreadY,
            nominalZ - 0.55 - p3 * 0.25
          );
        });
      } else {
        // STAGE 4: Precision Reassembly (Snap lock back into monolithic chassis)
        const p4 = (stageP - 0.78) / 0.22;
        const snap = 1.0 - p4;
        group.rotation.y = -0.02 - p4 * 0.20;
        group.rotation.x = 0.07 * snap;
        rearModules.forEach(({ group: mg, nominalX, nominalY, nominalZ }) => {
          mg.position.set(nominalX, nominalY, nominalZ - snap * 0.80);
        });
      }
    },
  };
}

// ============================================================================
// SERVICE 02: MOBILE VAN ADVERTISING (Ads On Wheels)
// ============================================================================
export function createAdvertisingVan(logoTexture, accentColor = "#E8B83F") {
  const group = new THREE.Group();
  group.name = "product_van";

  const bodyPaint = new THREE.MeshStandardMaterial({
    color: 0x0c1322,
    metalness: 0.92,
    roughness: 0.18,
  });

  // 1. Van Cargo Body
  const cargoGeo = new THREE.BoxGeometry(2.8, 1.45, 1.35);
  const cargo = new THREE.Mesh(cargoGeo, bodyPaint);
  cargo.position.set(-0.25, -0.4, 0);
  cargo.castShadow = true;
  group.add(cargo);

  // 2. High-Impact Side Advertising LED Billboard Display
  const displayGeo = new THREE.PlaneGeometry(2.4, 1.15);
  const displayMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: logoTexture || null,
    emissive: new THREE.Color(0x161306),
    emissiveIntensity: 0.25,
    roughness: 0.2,
  });
  const sideDisplay = new THREE.Mesh(displayGeo, displayMat);
  sideDisplay.position.set(-0.25, -0.38, 0.685);
  group.add(sideDisplay);

  // 3. Driver Cab & Windshield
  const cabGeo = new THREE.BoxGeometry(1.05, 1.1, 1.32);
  const cab = new THREE.Mesh(cabGeo, bodyPaint);
  cab.position.set(1.4, -0.58, 0);
  cab.castShadow = true;
  group.add(cab);

  // Slanted Glass Windshield
  const glassGeo = new THREE.PlaneGeometry(0.85, 0.65);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x050d1a,
    transmission: 0.85,
    roughness: 0.08,
    ior: 1.5,
  });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.rotation.y = Math.PI / 2;
  glass.rotation.z = -0.38;
  glass.position.set(1.68, -0.32, 0);
  group.add(glass);

  // Dual Emissive Headlights
  [-0.45, 0.45].forEach((hz) => {
    const headGeo = new THREE.BoxGeometry(0.08, 0.16, 0.22);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffedd5,
      emissiveIntensity: 2.0,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(1.92, -0.72, hz);
    group.add(head);
  });

  // 4. Wheels and Rubber Tires (Grounded onto floor)
  const wheels = [];
  const wheelPositions = [
    [-0.95, -1.25, 0.68],
    [1.15, -1.25, 0.68],
    [-0.95, -1.25, -0.68],
    [1.15, -1.25, -0.68],
  ];

  wheelPositions.forEach(([wx, wy, wz]) => {
    const wGroup = new THREE.Group();
    const tireGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.22, 24);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.2,
      roughness: 0.85,
    });
    const tire = new THREE.Mesh(tireGeo, tireMat);
    tire.rotation.x = Math.PI / 2;
    tire.castShadow = true;
    wGroup.add(tire);

    const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.23, 16);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.15,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    wGroup.add(rim);

    wGroup.position.set(wx, wy, wz);
    group.add(wGroup);
    wheels.push(wGroup);
  });

  // Roof Advertising Mount / Aerodynamic Fairing
  const roofMountGeo = new THREE.BoxGeometry(2.2, 0.18, 0.85);
  const roofMount = new THREE.Mesh(roofMountGeo, bodyPaint);
  roofMount.position.set(-0.25, 0.38, 0);
  roofMount.castShadow = true;
  group.add(roofMount);

  return {
    group,
    update: (localProgress, isMobile, isTransitioning, transitionP) => {
      const targetScale = isMobile ? 0.74 : 1.05;
      group.scale.set(targetScale, targetScale, targetScale);

      const nominalX = isMobile ? 0 : 0.85;
      const nominalY = isMobile ? 0.05 : 0.12;

      if (isTransitioning) {
        group.position.x = nominalX - transitionP * (isMobile ? 3.5 : 4.8);
        group.position.y = nominalY;
        group.rotation.y = -0.45 - transitionP * 0.35;
        group.visible = transitionP < 0.98;
        return;
      }

      group.visible = true;
      group.position.x = nominalX;
      group.position.y = nominalY;

      const stageP = Math.min(1.0, localProgress / 0.8);
      group.rotation.y = -0.42 + Math.sin(stageP * Math.PI) * 0.18;

      if (stageP > 0.25 && stageP < 0.75) {
        const exp = Math.sin(((stageP - 0.25) / 0.5) * Math.PI);
        sideDisplay.position.z = 0.685 + exp * 0.35;
        roofMount.position.y = 0.38 + exp * 0.28;
      } else {
        sideDisplay.position.z = 0.685;
        roofMount.position.y = 0.38;
      }
    },
  };
}

// ============================================================================
// SERVICE 03: TEA CUP PRINTING (Premium Branded Paper Cup)
// ============================================================================
export function createTeaCup(logoTexture, accentColor = "#F59E0B") {
  const group = new THREE.Group();
  group.name = "product_teacup";

  // 1. Biodegradable Paper Cup Body
  const cupGeo = new THREE.CylinderGeometry(0.72, 0.52, 1.62, 48, 1, true);
  const cupMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.72,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });
  const cup = new THREE.Mesh(cupGeo, cupMat);
  cup.position.y = 0;
  cup.castShadow = true;
  group.add(cup);

  // Rolled Paper Rim Curl
  const rimGeo = new THREE.TorusGeometry(0.72, 0.042, 16, 48);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.65,
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.81;
  group.add(rim);

  // Recessed Cup Base
  const baseGeo = new THREE.CircleGeometry(0.52, 32);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.rotation.x = Math.PI / 2;
  base.position.y = -0.80;
  group.add(base);

  // 2. Printed Paper Advertising Sleeve (Authentic Brand wrap)
  const sleeveGeo = new THREE.CylinderGeometry(0.73, 0.58, 1.05, 48, 1, true);
  const sleeveMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    map: logoTexture || null,
    emissive: new THREE.Color(0x1a1204),
    emissiveIntensity: 0.2,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
  sleeve.position.y = -0.05;
  sleeve.castShadow = true;
  group.add(sleeve);

  // 3. Studio Circular Pedestal Plinth (Grounded on floor)
  const plinthGeo = new THREE.CylinderGeometry(1.22, 1.32, 0.22, 48);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x0a101f,
    metalness: 0.88,
    roughness: 0.24,
  });
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.y = -1.51;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Pedestal Glowing Accent Ring
  const ringGeo = new THREE.TorusGeometry(1.25, 0.024, 16, 48);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xffc928,
    emissive: 0xffc928,
    emissiveIntensity: 1.5,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -1.41;
  group.add(ring);

  // 4. Subtle Ambient Steam Particles
  const steamCount = 18;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  for (let i = 0; i < steamCount * 3; i += 3) {
    steamPos[i] = (Math.random() - 0.5) * 0.4;
    steamPos[i + 1] = 0.85 + Math.random() * 0.8;
    steamPos[i + 2] = (Math.random() - 0.5) * 0.4;
  }
  steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPos, 3));
  const steamMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.06,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
  });
  const steam = new THREE.Points(steamGeo, steamMat);
  group.add(steam);

  return {
    group,
    update: (localProgress, isMobile, isTransitioning, transitionP) => {
      const targetScale = isMobile ? 0.82 : 1.15;
      group.scale.set(targetScale, targetScale, targetScale);

      const nominalX = isMobile ? 0 : 0.85;
      const nominalY = isMobile ? 0.12 : 0.18;

      if (isTransitioning) {
        group.position.x = nominalX - transitionP * (isMobile ? 3.5 : 4.8);
        group.position.y = nominalY;
        group.rotation.y = localProgress * Math.PI * 2 + transitionP * 0.5;
        group.visible = transitionP < 0.98;
        return;
      }

      group.visible = true;
      group.position.x = nominalX;
      group.position.y = nominalY;

      const stageP = Math.min(1.0, localProgress / 0.8);
      group.rotation.y = stageP * Math.PI * 1.5;

      if (stageP > 0.3 && stageP < 0.75) {
        const exp = Math.sin(((stageP - 0.3) / 0.45) * Math.PI);
        sleeve.position.z = exp * 0.45;
        sleeve.scale.set(1 + exp * 0.15, 1, 1 + exp * 0.15);
      } else {
        sleeve.position.z = 0;
        sleeve.scale.set(1, 1, 1);
      }
    },
  };
}

// ============================================================================
// SERVICE 04: DIGITAL MARKETING (Flagship Smartphone)
// ============================================================================
export function createSmartphone(logoTexture, accentColor = "#38BDF8") {
  const group = new THREE.Group();
  group.name = "product_phone";

  const bodyGeo = new THREE.BoxGeometry(1.28, 2.45, 0.088);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x182030,
    metalness: 0.96,
    roughness: 0.14,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  group.add(body);

  const screenGeo = new THREE.PlaneGeometry(1.22, 2.38);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: logoTexture || null,
    emissive: new THREE.Color(0x061426),
    emissiveIntensity: 0.25,
    roughness: 0.12,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.z = 0.046;
  group.add(screen);

  const bumpGeo = new THREE.BoxGeometry(0.55, 0.58, 0.05);
  const bumpMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.95,
    roughness: 0.2,
  });
  const bump = new THREE.Mesh(bumpGeo, bumpMat);
  bump.position.set(-0.32, 0.85, -0.065);
  group.add(bump);

  for (let c = 0; c < 3; c++) {
    const lensGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x020617,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.6,
      ior: 1.58,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(
      -0.32 + (c === 2 ? 0.14 : -0.12),
      0.85 + (c === 0 ? 0.14 : c === 1 ? -0.14 : 0),
      -0.092
    );
    group.add(lens);
  }

  const uiCards = [];
  [-0.45, 0.45].forEach((ux, idx) => {
    const cardGeo = new THREE.PlaneGeometry(0.68, 0.42);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x0f233f,
      emissive: new THREE.Color(0x0c2138),
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.85,
    });
    const card = new THREE.Mesh(cardGeo, cardMat);
    card.position.set(ux, (idx === 0 ? 0.45 : -0.45), 0.18);
    group.add(card);
    uiCards.push(card);
  });

  return {
    group,
    update: (localProgress, isMobile, isTransitioning, transitionP) => {
      const targetScale = isMobile ? 0.78 : 1.1;
      group.scale.set(targetScale, targetScale, targetScale);

      const nominalX = isMobile ? 0 : 0.85;
      const nominalY = isMobile ? 0.15 : 0.22;

      if (isTransitioning) {
        group.position.x = nominalX - transitionP * (isMobile ? 3.5 : 4.8);
        group.position.y = nominalY;
        group.rotation.y = -0.32 - transitionP * 0.45;
        group.visible = transitionP < 0.98;
        return;
      }

      group.visible = true;
      group.position.x = nominalX;
      group.position.y = nominalY;

      const stageP = Math.min(1.0, localProgress / 0.8);
      group.rotation.y = -0.32 + Math.sin(stageP * Math.PI) * 0.35;
      group.rotation.x = 0.08 + Math.cos(stageP * Math.PI) * 0.05;

      if (stageP > 0.25 && stageP < 0.75) {
        const exp = Math.sin(((stageP - 0.25) / 0.5) * Math.PI);
        uiCards.forEach((c, i) => {
          c.position.z = 0.18 + exp * 0.55;
          c.position.x = (i === 0 ? -0.45 : 0.45) * (1 + exp * 0.4);
        });
      } else {
        uiCards.forEach((c, i) => {
          c.position.z = 0.18;
          c.position.x = i === 0 ? -0.45 : 0.45;
        });
      }
    },
  };
}

// ============================================================================
// SERVICE 05: WEBSITE DEVELOPMENT (Precision Laptop)
// ============================================================================
export function createLaptop(logoTexture, accentColor = "#60A5FA") {
  const group = new THREE.Group();
  group.name = "product_laptop";

  const aluMat = new THREE.MeshStandardMaterial({
    color: 0x1a2130,
    metalness: 0.94,
    roughness: 0.22,
  });

  const baseGeo = new THREE.BoxGeometry(2.5, 0.08, 1.72);
  const base = new THREE.Mesh(baseGeo, aluMat);
  base.position.set(0, -0.65, 0);
  base.castShadow = true;
  group.add(base);

  const keyWellGeo = new THREE.BoxGeometry(2.1, 0.02, 0.85);
  const keyWellMat = new THREE.MeshStandardMaterial({ color: 0x0b0f19, roughness: 0.8 });
  const keyWell = new THREE.Mesh(keyWellGeo, keyWellMat);
  keyWell.position.set(0, -0.60, -0.22);
  group.add(keyWell);

  const padGeo = new THREE.BoxGeometry(0.82, 0.015, 0.52);
  const padMat = new THREE.MeshStandardMaterial({ color: 0x252e42, metalness: 0.8, roughness: 0.18 });
  const pad = new THREE.Mesh(padGeo, padMat);
  pad.position.set(0, -0.60, 0.48);
  group.add(pad);

  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, -0.61, -0.85);

  const lidGeo = new THREE.BoxGeometry(2.5, 1.62, 0.05);
  const lid = new THREE.Mesh(lidGeo, aluMat);
  lid.position.set(0, 0.81, 0);
  lid.castShadow = true;
  lidGroup.add(lid);

  const screenGeo = new THREE.PlaneGeometry(2.38, 1.52);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: logoTexture || null,
    emissive: new THREE.Color(0x0a1628),
    emissiveIntensity: 0.25,
    roughness: 0.14,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.81, 0.028);
  lidGroup.add(screen);

  group.add(lidGroup);

  return {
    group,
    update: (localProgress, isMobile, isTransitioning, transitionP) => {
      const targetScale = isMobile ? 0.75 : 1.05;
      group.scale.set(targetScale, targetScale, targetScale);

      const nominalX = isMobile ? 0 : 0.85;
      const nominalY = isMobile ? 0.18 : 0.25;

      if (isTransitioning) {
        group.position.x = nominalX - transitionP * (isMobile ? 3.5 : 4.8);
        group.position.y = nominalY;
        group.rotation.y = -0.35 - transitionP * 0.45;
        group.visible = transitionP < 0.98;
        return;
      }

      group.visible = true;
      group.position.x = nominalX;
      group.position.y = nominalY;

      const stageP = Math.min(1.0, localProgress / 0.8);
      group.rotation.y = -0.38 + Math.sin(stageP * Math.PI) * 0.22;
      group.rotation.x = 0.12;

      const openAngle = Math.min(1.0, stageP * 1.8) * -0.28;
      lidGroup.rotation.x = openAngle;
    },
  };
}

// ============================================================================
// SERVICE 06: AD FILM PRODUCTION (Cinema Camera)
// ============================================================================
export function createCinemaCamera(logoTexture, accentColor = "#FFEEDB") {
  const group = new THREE.Group();
  group.name = "product_film";

  const camBodyMat = new THREE.MeshStandardMaterial({
    color: 0x111624,
    metalness: 0.9,
    roughness: 0.28,
  });

  const bodyGeo = new THREE.BoxGeometry(1.25, 1.15, 1.45);
  const body = new THREE.Mesh(bodyGeo, camBodyMat);
  body.castShadow = true;
  group.add(body);

  const lensBarrelGeo = new THREE.CylinderGeometry(0.42, 0.45, 1.1, 32);
  const lensBarrelMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.95,
    roughness: 0.2,
  });
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, lensBarrelMat);
  lensBarrel.rotation.x = Math.PI / 2;
  lensBarrel.position.set(0, 0, 1.15);
  lensBarrel.castShadow = true;
  group.add(lensBarrel);

  const glassGeo = new THREE.SphereGeometry(0.38, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    transmission: 0.9,
    roughness: 0.05,
    ior: 1.54,
    reflectivity: 0.9,
  });
  const frontGlass = new THREE.Mesh(glassGeo, glassMat);
  frontGlass.rotation.x = Math.PI / 2;
  frontGlass.position.set(0, 0, 1.68);
  group.add(frontGlass);

  for (let r = 0; r < 2; r++) {
    const ringGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.16, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.9,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0, 0.85 + r * 0.42);
    group.add(ring);
  }

  const matteGeo = new THREE.BoxGeometry(1.2, 0.95, 0.25);
  const matte = new THREE.Mesh(matteGeo, camBodyMat);
  matte.position.set(0, 0, 1.82);
  group.add(matte);

  const flagGeo = new THREE.BoxGeometry(1.25, 0.02, 0.55);
  const flag = new THREE.Mesh(flagGeo, camBodyMat);
  flag.position.set(0, 0.48, 1.95);
  flag.rotation.x = -0.35;
  group.add(flag);

  const handleGeo = new THREE.BoxGeometry(0.18, 0.28, 1.1);
  const handle = new THREE.Mesh(handleGeo, camBodyMat);
  handle.position.set(0, 0.72, 0);
  group.add(handle);

  const monGroup = new THREE.Group();
  monGroup.position.set(0.68, 0.65, 0.2);

  const monCaseGeo = new THREE.BoxGeometry(0.85, 0.55, 0.06);
  const monCase = new THREE.Mesh(monCaseGeo, camBodyMat);
  monGroup.add(monCase);

  const monScreenGeo = new THREE.PlaneGeometry(0.80, 0.50);
  const monScreenMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: logoTexture || null,
    emissive: new THREE.Color(0x1a1206),
    emissiveIntensity: 0.25,
  });
  const monScreen = new THREE.Mesh(monScreenGeo, monScreenMat);
  monScreen.position.z = 0.032;
  monGroup.add(monScreen);

  monGroup.rotation.y = -0.45;
  group.add(monGroup);

  return {
    group,
    update: (localProgress, isMobile, isTransitioning, transitionP) => {
      const targetScale = isMobile ? 0.76 : 1.08;
      group.scale.set(targetScale, targetScale, targetScale);

      const nominalX = isMobile ? 0 : 0.85;
      const nominalY = isMobile ? 0.15 : 0.22;

      if (isTransitioning) {
        group.position.x = nominalX - transitionP * (isMobile ? 3.5 : 4.8);
        group.position.y = nominalY;
        group.visible = transitionP < 0.98;
        return;
      }

      group.visible = true;
      group.position.x = nominalX;
      group.position.y = nominalY;

      const stageP = Math.min(1.0, localProgress / 0.8);
      group.rotation.y = 0.48 + Math.sin(stageP * Math.PI) * 0.25;
      group.rotation.x = -0.06;

      if (stageP > 0.3 && stageP < 0.75) {
        const exp = Math.sin(((stageP - 0.3) / 0.45) * Math.PI);
        lensBarrel.position.z = 1.15 + exp * 0.45;
        frontGlass.position.z = 1.68 + exp * 0.65;
        matte.position.z = 1.82 + exp * 0.85;
        flag.position.z = 1.95 + exp * 0.85;
      } else {
        lensBarrel.position.z = 1.15;
        frontGlass.position.z = 1.68;
        matte.position.z = 1.82;
        flag.position.z = 1.95;
      }
    },
  };
}
