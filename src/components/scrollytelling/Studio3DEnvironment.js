import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Studio3DEnvironment — Real-World 3D WebGL Studio Environment.
 *
 * Implements:
 * - Deep midnight navy studio (#050c18) matching physical universe
 * - Continuous reflective dark metallic studio floor with PCFSoft shadows and specular falloff
 * - Clean lighting & atmospheric depth without crude overlapping procedural meshes
 * - Unified studio lighting system:
 *   - Overhead volumetric golden spotlight that tracks camera movement
 *   - Directional key light with soft shadow mapping
 *   - Service-specific dynamic floor illuminator (casts authentic floor bounce matching active service)
 *   - Golden rim lighting behind product stage
 * - Continuous 3D camera flight and perspective dolly between product stations
 * - Subtle floating ambient dust particles with depth drift
 */
const Studio3DEnvironment = ({
  scrollProgress = 0,
  activeServiceIndex = 0,
  serviceLocalProgress = 0,
  accentColor = "#FFC928",
  isOpeningVisible = true,
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const spotLightRef = useRef(null);
  const screenGlowLightRef = useRef(null);
  const rimLightRef = useRef(null);
  const particlesRef = useRef(null);
  const rafRef = useRef(null);

  // Store latest props in refs for smooth animation loop
  const stateRef = useRef({
    scrollProgress: 0,
    activeServiceIndex: 0,
    serviceLocalProgress: 0,
    accentColor: "#FFC928",
    isOpeningVisible: true,
  });

  useEffect(() => {
    stateRef.current = {
      scrollProgress,
      activeServiceIndex,
      serviceLocalProgress,
      accentColor,
      isOpeningVisible,
    };
  }, [scrollProgress, activeServiceIndex, serviceLocalProgress, accentColor, isOpeningVisible]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Atmospheric Depth Fog (Seamless deep midnight navy)
    const scene = new THREE.Scene();
    const studioNavy = new THREE.Color(0x050c18);
    scene.background = studioNavy;
    scene.fog = new THREE.FogExp2(0x050c18, 0.038);
    sceneRef.current = scene;

    // 2. Camera Setup (Mobile-First responsive camera framing)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;
    const initialZ = isMobile ? 4.9 : 5.4;
    const initialY = isMobile ? 0.95 : 1.1;
    const camera = new THREE.PerspectiveCamera(isMobile ? 45 : 44, width / height, 0.1, 100);
    camera.position.set(0, initialY, initialZ);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Continuous Reflective Ground Plane / Dark Metallic Floor
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x040914,
      roughness: 0.20,
      metalness: 0.88,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.62;
    floor.receiveShadow = true;
    scene.add(floor);

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a162b, 1.25);
    scene.add(ambientLight);

    // Main Golden Volumetric Spotlight from above (tracks camera)
    const spotLight = new THREE.SpotLight(0xffc928, 3.8);
    spotLight.position.set(0, 7.0, 2.8);
    spotLight.angle = 0.60;
    spotLight.penumbra = 0.85;
    spotLight.decay = 1.8;
    spotLight.distance = 32;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.0008;
    spotLight.target.position.set(0, 0, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);
    spotLightRef.current = spotLight;

    // Soft key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
    keyLight.position.set(3.5, 4.5, 4.2);
    scene.add(keyLight);

    // Dynamic Screen & Product Emissive Illuminator (casts real light onto floor)
    const screenGlowLight = new THREE.PointLight(0xffb703, 2.8, 16);
    screenGlowLight.position.set(0, -0.5, 0.8);
    scene.add(screenGlowLight);
    screenGlowLightRef.current = screenGlowLight;

    // Golden rim light behind product stage
    const rimLight = new THREE.PointLight(0xffc928, 2.5, 20);
    rimLight.position.set(0, 1.8, -3.0);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 6. Floating 3D Ambient Dust Particles (Minimal atmospheric depth)
    const particleCount = 48;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8 + 0.4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffc928,
      size: 0.026,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 8. Master Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle particle drift
      if (particles) {
        particles.rotation.y = elapsedTime * 0.015;
      }

      // Read current scrollytelling state
      const {
        activeServiceIndex: srvIdx,
        serviceLocalProgress: localP,
        scrollProgress: totalP,
        isOpeningVisible: isOpening,
      } = stateRef.current;

      const isMob = window.innerWidth < 768;
      const baseZ = isMob ? 4.9 : 5.4;
      const baseY = isMob ? 0.95 : 1.1;

      // Transition calculation for smooth camera panning
      const isTransitioning = localP > 0.8 && srvIdx < 5;
      const transitionP = isTransitioning ? (localP - 0.8) / 0.2 : 0;
      const easeT =
        transitionP < 0.5
          ? 2 * transitionP * transitionP
          : -1 + (4 - 2 * transitionP) * transitionP;

      // 3D Camera Choreography
      let targetZ, targetY, targetX;
      if (isOpening || totalP < 0.04) {
        // Hero camera: centered, calm, atmospheric
        targetZ = baseZ;
        targetY = baseY;
        targetX = 0;
      } else if (isTransitioning) {
        targetZ = baseZ + easeT * (isMob ? 0.55 : 0.75);
        targetY = baseY + Math.sin(easeT * Math.PI) * 0.12;
        targetX = Math.sin(easeT * Math.PI) * (isMob ? 0.35 : 0.55);
      } else if (srvIdx === 0) {
        // LED Billboard 4-Stage Cinematic Camera
        const stageP = Math.min(1.0, localP / 0.8);
        if (stageP < 0.22) {
          targetZ = baseZ - stageP * 0.12;
          targetY = baseY;
          targetX = Math.sin(stageP * Math.PI) * (isMob ? 0.06 : 0.12);
        } else if (stageP < 0.55) {
          const p2 = (stageP - 0.22) / 0.33;
          targetZ = baseZ - 0.12 - p2 * 0.22;
          targetY = baseY + p2 * 0.10;
          targetX = (isMob ? 0.06 : 0.12) + p2 * (isMob ? 0.08 : 0.15);
        } else if (stageP < 0.78) {
          const p3 = (stageP - 0.55) / 0.23;
          targetZ = baseZ - 0.34 + p3 * 0.08;
          targetY = baseY + 0.10 - p3 * 0.04;
          targetX = (isMob ? 0.14 : 0.24) * Math.cos(p3 * Math.PI);
        } else {
          const p4 = (stageP - 0.78) / 0.22;
          targetZ = baseZ - 0.26 + p4 * 0.10;
          targetY = baseY + 0.06 - p4 * 0.06;
          targetX = (1 - p4) * (isMob ? 0.08 : 0.12);
        }
      } else {
        targetZ = baseZ - localP * 0.22;
        targetY = baseY - localP * 0.08;
        targetX = Math.sin(totalP * Math.PI) * (isMob ? 0.12 : 0.18);
      }

      // Smooth camera damping for fast-scrolling inertia (prevents visual snapping)
      camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.28);
      camera.lookAt(camera.position.x * 0.3, isMob ? 0.04 : 0, 0);

      // Spotlight tracking
      if (spotLight) {
        spotLight.position.x = targetX * 1.6;
        spotLight.target.position.set(targetX * 0.5, 0, 0);
      }

      // Dynamic Product Floor Bounce Illumination
      if (screenGlowLight) {
        if (isOpening || totalP < 0.04) {
          screenGlowLight.intensity = 0.5;
          screenGlowLight.color.setHex(0xffc928);
          screenGlowLight.position.set(0, -0.6, 0.5);
        } else {
          const serviceLightColors = [
            0xffb703, // LED
            0xffd166, // Van
            0xf59e0b, // Tea Cup
            0x38bdf8, // Phone
            0x60a5fa, // Laptop
            0xffeedb, // Camera
          ];
          const serviceLightIntensities = [2.8, 2.4, 2.0, 2.6, 2.4, 2.6];
          const currentCol = serviceLightColors[srvIdx] || 0xffc928;
          const currentInt = serviceLightIntensities[srvIdx] || 2.4;

          screenGlowLight.color.setHex(currentCol);
          screenGlowLight.position.x = isMob ? 0 : 0.85;
          screenGlowLight.intensity = isTransitioning
            ? currentInt * (1 - easeT * 0.35)
            : currentInt * (1 + (1 - localP) * 0.25);
        }
      }

      // Rim light
      if (rimLight) {
        rimLight.position.x = targetX * 0.6;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default Studio3DEnvironment;
