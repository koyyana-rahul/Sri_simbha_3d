import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";

/**
 * Cinematic 3D Particle Field & Orbital Rings Component.
 *
 * Renders golden micro-particles, ambient dust, and rotating orbital energy
 * rings around the central Sri Simbha brand crest.
 */
const ParticleField = ({
  className = "",
  particleCount = 65,
  showRings = true,
  interactive = true,
}) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));

    // Particle pool
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      goldHue: Math.random() > 0.4 ? "#FFC928" : "#E8B83F",
    }));

    let ringRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const centerX = width / 2 + (mouseRef.current.x - 0.5) * 40;
      const centerY = height / 2 + (mouseRef.current.y - 0.5) * 40;

      // Draw subtle orbital rings if requested
      if (showRings) {
        ringRotation += prefersReducedMotion ? 0.0003 : 0.0015;

        // Inner golden ring
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ringRotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, width * 0.22, height * 0.16, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(232, 184, 63, 0.18)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Outer counter-rotating ring
        ctx.rotate(-ringRotation * 1.6);
        ctx.beginPath();
        ctx.ellipse(0, 0, width * 0.32, height * 0.22, -Math.PI / 8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 201, 40, 0.1)";
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
        ctx.restore();
      }

      // Draw golden particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.fillStyle = p.goldHue;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(232, 184, 63, 0.6)";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount, showRings, interactive, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
    />
  );
};

export default ParticleField;
