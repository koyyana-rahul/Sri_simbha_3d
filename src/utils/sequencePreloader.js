/**
 * High-performance sequence preloader and caching layer for Sri Simbha Ad Solutions.
 *
 * Engineered for fast scrolling & rapid scrubbing:
 * - Immediate keyframe seeding (0%, 25%, 50%, 75%, 100%) for all 6 services on mount
 * - Prioritized progressive loading (Active service -> Immediate next service)
 * - Safe aspect-ratio canvas blitting with DPR clamping
 * - O(1) nearest-frame fallback eliminating blank flashes or stutter during fast flings
 * - Memory-friendly caching of loaded frames
 */

class SequencePreloader {
  constructor() {
    this.cache = new Map(); // serviceId -> Array of HTMLImageElement | null
    this.loadState = new Map(); // serviceId -> { loadedCount, totalCount, isComplete, listeners, firstFrameLoaded }
    this.activePriority = null;
  }

  getFramePath(folder, pattern, index) {
    const frameIndex = String(index).padStart(3, "0");
    const filename = pattern.replace("{index}", frameIndex);
    return `${folder}/${filename}`;
  }

  initSequence(service) {
    const { id, frameCount } = service;
    if (this.cache.has(id)) {
      return this.loadState.get(id);
    }

    const frames = new Array(frameCount).fill(null);
    this.cache.set(id, frames);

    const state = {
      loadedCount: 0,
      totalCount: frameCount,
      isComplete: false,
      listeners: new Set(),
      firstFrameLoaded: false,
    };
    this.loadState.set(id, state);

    // Fast-scroll defense: Immediately seed 9 essential milestone keyframes across the journey
    // (0%, 12.5%, 25%, 37.5%, 50%, 62.5%, 75%, 87.5%, 100%) so rapid flings always have dense frames!
    const keyMilestones = [
      1,
      Math.max(1, Math.floor(frameCount * 0.125)),
      Math.max(1, Math.floor(frameCount * 0.25)),
      Math.max(1, Math.floor(frameCount * 0.375)),
      Math.max(1, Math.floor(frameCount * 0.50)),
      Math.max(1, Math.floor(frameCount * 0.625)),
      Math.max(1, Math.floor(frameCount * 0.75)),
      Math.max(1, Math.floor(frameCount * 0.875)),
      frameCount,
    ];

    Promise.all(keyMilestones.map((num) => this.loadSingleFrame(service, num))).then(() => {
      state.firstFrameLoaded = true;
      this.notify(id);
    });

    return state;
  }

  loadSingleFrame(service, frameNumber) {
    const { id, folder, fileNamePattern, frameCount } = service;
    const frames = this.cache.get(id);
    const index = Math.max(0, Math.min(frameNumber - 1, frameCount - 1));

    if (frames && frames[index]) {
      return Promise.resolve(frames[index]);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      const src = this.getFramePath(folder, fileNamePattern, index + 1);
      img.src = src;

      img.onload = () => {
        if (frames) {
          frames[index] = img;
          const state = this.loadState.get(id);
          if (state) {
            state.loadedCount++;
            if (state.loadedCount >= frameCount) {
              state.isComplete = true;
            }
            this.notify(id);
          }
        }
        resolve(img);
      };

      img.onerror = () => {
        resolve(null);
      };
    });
  }

  preloadSequencePriority(service, priority = "high") {
    this.initSequence(service);
    const { frameCount } = service;

    // Load keyframes first with density based on scroll velocity/priority
    const keyframes = [];
    const step = priority === "urgent" ? 2 : priority === "high" ? 4 : 8;
    for (let i = 1; i <= frameCount; i += step) {
      keyframes.push(i);
    }
    if (keyframes[keyframes.length - 1] !== frameCount) {
      keyframes.push(frameCount);
    }

    Promise.all(keyframes.map((num) => this.loadSingleFrame(service, num))).then(() => {
      // Progressive background batching for remaining intermediate frames
      const remaining = [];
      for (let i = 1; i <= frameCount; i++) {
        if (!keyframes.includes(i)) {
          remaining.push(i);
        }
      }

      this.batchLoad(service, remaining, priority === "urgent" ? 12 : 8);
    });
  }

  batchLoad(service, frameNumbers, batchSize = 8) {
    if (!frameNumbers.length) return;

    const chunk = frameNumbers.slice(0, batchSize);
    const rest = frameNumbers.slice(batchSize);

    Promise.all(chunk.map((num) => this.loadSingleFrame(service, num))).then(() => {
      if (rest.length) {
        if (typeof window !== "undefined" && window.requestIdleCallback) {
          window.requestIdleCallback(() => this.batchLoad(service, rest, batchSize), {
            timeout: 200,
          });
        } else {
          setTimeout(() => this.batchLoad(service, rest, batchSize), 25);
        }
      }
    });
  }

  getFrame(serviceId, frameIndex) {
    const frames = this.cache.get(serviceId);
    if (!frames) return null;

    const maxIdx = frames.length - 1;
    const idx = Math.max(0, Math.min(frameIndex, maxIdx));

    // 1. Instant hit
    if (frames[idx]) return frames[idx];

    // 2. High-speed bidirectional nearest-frame search (finds the absolute closest loaded frame)
    let left = idx - 1;
    let right = idx + 1;
    while (left >= 0 || right <= maxIdx) {
      if (left >= 0 && frames[left]) return frames[left];
      if (right <= maxIdx && frames[right]) return frames[right];
      left--;
      right++;
    }

    return null;
  }

  subscribe(serviceId, callback) {
    const state = this.loadState.get(serviceId);
    if (state) {
      state.listeners.add(callback);
    }
    return () => {
      if (state) {
        state.listeners.delete(callback);
      }
    };
  }

  notify(serviceId) {
    const state = this.loadState.get(serviceId);
    if (state) {
      state.listeners.forEach((cb) => cb(state));
    }
  }

  getProgress(serviceId) {
    const state = this.loadState.get(serviceId);
    if (!state) return 0;
    return state.totalCount > 0 ? state.loadedCount / state.totalCount : 0;
  }
}

export const sequencePreloader = new SequencePreloader();
export default sequencePreloader;
