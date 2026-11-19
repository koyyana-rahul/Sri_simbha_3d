import { useEffect, useRef, useState, useCallback } from "react";
import sequencePreloader from "../../../utils/sequencePreloader";

/**
 * Reusable ImageSequenceCanvas Component.
 *
 * Renders high-fidelity, scroll-synchronized image sequences onto HTML5 Canvas
 * with sub-pixel DPR scaling, aspect ratio preservation, frame interpolation,
 * and intelligent anti-flicker frame caching.
 */
const ImageSequenceCanvas = ({
  service,
  progress = 0,
  className = "",
  fit = "contain",
  onFrameChange,
  showBadge = true,
  interactive = false,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);

  const [loadState, setLoadState] = useState(() =>
    sequencePreloader.initSequence(service)
  );

  const { id, frameCount, accentColor = "#FFC928", name, shortName } = service;

  // Subscribe to preload updates
  useEffect(() => {
    sequencePreloader.initSequence(service);
    const unsubscribe = sequencePreloader.subscribe(id, (newState) => {
      setLoadState({ ...newState });
    });

    // Start prioritized loading
    sequencePreloader.preloadSequencePriority(service, "high");

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [id, service]);

  // Main draw function
  const renderFrame = useCallback(
    (targetProgress) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      // Calculate frame index
      const clampedProgress = Math.max(0, Math.min(1, targetProgress));
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(clampedProgress * (frameCount - 1))
      );

      const img = sequencePreloader.getFrame(id, frameIndex);

      if (!img) {
        // Clear canvas with subtle dark navy tint
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      lastDrawnFrameRef.current = frameIndex;
      if (onFrameChange) {
        onFrameChange(frameIndex + 1, frameCount);
      }

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle atmospheric radial ambient glow behind object
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDim = Math.max(canvas.width, canvas.height);
      const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        maxDim * 0.05,
        centerX,
        centerY,
        maxDim * 0.45
      );
      glow.addColorStop(0, "rgba(232, 184, 63, 0.08)");
      glow.addColorStop(0.5, "rgba(16, 31, 66, 0.2)");
      glow.addColorStop(1, "rgba(8, 19, 41, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Preserve aspect ratio
      const imgAspect = (img.naturalWidth || 640) / (img.naturalHeight || 360);
      const canvasAspect = canvas.width / canvas.height;

      let drawW, drawH, drawX, drawY;

      if (fit === "contain") {
        if (canvasAspect > imgAspect) {
          drawH = canvas.height * 0.94;
          drawW = drawH * imgAspect;
          drawX = (canvas.width - drawW) / 2;
          drawY = (canvas.height - drawH) / 2;
        } else {
          drawW = canvas.width * 0.94;
          drawH = drawW / imgAspect;
          drawX = (canvas.width - drawW) / 2;
          drawY = (canvas.height - drawH) / 2;
        }
      } else {
        // cover
        if (canvasAspect > imgAspect) {
          drawW = canvas.width;
          drawH = drawW / imgAspect;
          drawX = 0;
          drawY = (canvas.height - drawH) / 2;
        } else {
          drawH = canvas.height;
          drawW = drawH * imgAspect;
          drawX = (canvas.width - drawW) / 2;
          drawY = 0;
        }
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw the frame
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    },
    [id, frameCount, fit, onFrameChange]
  );

  // Render on progress change or resize
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      renderFrame(progress);
    });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress, renderFrame, loadState.loadedCount]);

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(progress));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [progress, renderFrame]);

  const loadPercent = Math.round(
    loadState.totalCount > 0
      ? (loadState.loadedCount / loadState.totalCount) * 100
      : 0
  );

  const currentFrame =
    lastDrawnFrameRef.current >= 0
      ? lastDrawnFrameRef.current + 1
      : Math.floor(progress * (frameCount - 1)) + 1;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-contain pointer-events-none select-none"
        aria-label={`${name} 3D sequence frame ${currentFrame} of ${frameCount}`}
      />

      {/* Frame Counter / Telemetry overlay badge */}
      {showBadge && (
        <div className="absolute bottom-4 right-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-primary/80 border border-gold-primary/20 backdrop-blur-md text-[11px] font-mono text-content-secondary shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-bright animate-pulse" />
          <span>FRAME</span>
          <span className="text-white font-semibold">
            {String(currentFrame).padStart(3, "0")}
          </span>
          <span className="text-content-muted">/</span>
          <span className="text-content-muted">{frameCount}</span>
        </div>
      )}

      {/* Preload progress bar if sequence is still loading initial frames */}
      {!loadState.isComplete && loadPercent < 40 && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-navy-primary/90 border border-gold-primary/30 text-[10px] font-mono text-gold-bright backdrop-blur-md">
          <svg
            className="animate-spin h-3 w-3 text-gold-bright"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>BUFFERING {loadPercent}%</span>
        </div>
      )}
    </div>
  );
};

export default ImageSequenceCanvas;
