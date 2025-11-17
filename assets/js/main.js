document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const favicon = document.getElementById("dynamic-favicon");
  const themes = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5"];
  const storageKey = "reko-theme";
  let currentIndex = 0;

  const themePalette = {
    "theme-1": { primary: "#4f46e5", secondary: "#a855f7" },
    "theme-2": { primary: "#22c55e", secondary: "#22d3ee" },
    "theme-3": { primary: "#f97316", secondary: "#facc15" },
    "theme-4": { primary: "#3b82f6", secondary: "#22d3ee" },
    "theme-5": { primary: "#ec4899", secondary: "#a855f7" },
  };

  const setFavicon = (themeKey) => {
    if (!favicon) return;
    const colors = themePalette[themeKey] || themePalette["theme-1"];
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <defs>
          <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="${colors.primary}"/>
            <stop offset="100%" stop-color="${colors.secondary}"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="24" fill="url(#grad)">
          <animate attributeName="r" values="20;24;20" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d="M20 32h24M24 24h16M24 40h16" stroke="#0f172a" stroke-width="3" stroke-linecap="round" opacity="0.9">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>`;
    favicon.setAttribute("href", `data:image/svg+xml,${encodeURIComponent(svg)}`);
  };

  if (root) {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
    const storedIndex = stored ? themes.indexOf(stored) : -1;

    if (storedIndex >= 0) {
      themes.forEach((t) => root.classList.remove(t));
      root.classList.add(themes[storedIndex]);
      currentIndex = storedIndex;
      setFavicon(themes[storedIndex]);
    } else {
      const existing = themes.findIndex((t) => root.classList.contains(t));
      if (existing >= 0) {
        currentIndex = existing;
        setFavicon(themes[existing]);
      } else {
        root.classList.add(themes[currentIndex]);
        setFavicon(themes[currentIndex]);
      }
    }
  }

  if (themeToggle && root) {
    themeToggle.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % themes.length;
      themes.forEach((t) => root.classList.remove(t));
      root.classList.add(themes[nextIndex]);
      currentIndex = nextIndex;
      setFavicon(themes[nextIndex]);

      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, themes[nextIndex]);
        }
      } catch (_) {
        // ignore storage errors (private mode, blocked cookies, etc.)
      }
    });
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mobilePanel = document.getElementById("mobileNav");
  const mobileClose = document.querySelector(".mobile-nav-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
  const mobileContent = document.querySelector(".mobile-nav-content");

  const setMenuState = (open) => {
    if (!menuToggle || !mobilePanel) return;
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    mobilePanel.classList.toggle("active", open);
    mobilePanel.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("mobile-nav-open", open);
  };

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.contains("active");
      setMenuState(!isOpen);
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", () => setMenuState(false));
  }

  mobileLinks.forEach((link) =>
    link.addEventListener("click", () => {
      setMenuState(false);
    })
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobilePanel || !menuToggle) return;
    if (!mobilePanel.classList.contains("active")) return;
    const target = event.target;
    const insidePanel = mobileContent && mobileContent.contains(target);
    const onToggle = menuToggle.contains(target);
    if (insidePanel || onToggle) return;
    setMenuState(false);
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const initPointerGlow = () => {
    if (!root || typeof window === "undefined") return null;

    const state = {
      x: 0.5,
      y: 0.3,
      raf: null,
    };

    const commit = () => {
      state.raf = null;
      root.style.setProperty("--bg-pointer-x", `${state.x * 100}%`);
      root.style.setProperty("--bg-pointer-y", `${state.y * 100}%`);
    };

    const schedule = () => {
      if (state.raf) return;
      state.raf = requestAnimationFrame(commit);
    };

    const setRatios = (ratioX, ratioY) => {
      state.x = clamp(ratioX, 0, 1);
      state.y = clamp(ratioY, 0, 1);
      schedule();
    };

    const updateFromPoint = (clientX, clientY) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      setRatios(clientX / width, clientY / height);
    };

    const handleMouseMove = (event) => {
      updateFromPoint(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateFromPoint(touch.clientX, touch.clientY);
    };

    const resetToCenter = () => {
      setRatios(0.5, 0.35);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", resetToCenter);
    window.addEventListener("touchend", resetToCenter);

    return { setRatios };
  };

  const initTiltMotion = (pointerController) => {
    if (!root || typeof window === "undefined") return;
    const body = document.body;
    if (!body || !("DeviceOrientationEvent" in window)) return;

    const applyTilt = (event) => {
      const beta = event.beta ?? 0; // front-back tilt
      const gamma = event.gamma ?? 0; // left-right tilt
      const pitchRatio = clamp(beta, -45, 45) / 45;
      const rollRatio = clamp(gamma, -35, 35) / 35;

      root.style.setProperty("--tilt-rotate-pitch", `${pitchRatio * -8}deg`);
      root.style.setProperty("--tilt-rotate-roll", `${rollRatio * 8}deg`);
      root.style.setProperty("--tilt-shift-x", `${rollRatio * -18}px`);
      root.style.setProperty("--tilt-shift-y", `${pitchRatio * 18}px`);
      root.style.setProperty("--tilt-bg-shift-x", `${rollRatio * 35}px`);
      root.style.setProperty("--tilt-bg-shift-y", `${pitchRatio * 35}px`);

      if (pointerController && typeof pointerController.setRatios === "function") {
        const pointerX = clamp(0.5 + rollRatio * 0.4, 0, 1);
        const pointerY = clamp(0.35 - pitchRatio * 0.35, 0, 1);
        pointerController.setRatios(pointerX, pointerY);
      }
    };

    const activateTilt = () => {
      body.classList.add("tilt-enabled");
      window.addEventListener("deviceorientation", applyTilt, true);
    };

    const requestPermissionIfNeeded = () => {
      const DeviceOrientation = window.DeviceOrientationEvent;
      if (DeviceOrientation && typeof DeviceOrientation.requestPermission === "function") {
        DeviceOrientation.requestPermission()
          .then((state) => {
            if (state === "granted") {
              activateTilt();
            }
          })
          .catch(() => {
            // ignored - user rejected or not secure origin
          });
      } else {
        activateTilt();
      }
    };

    const handleFirstInteraction = () => {
      requestPermissionIfNeeded();
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("click", handleFirstInteraction, { passive: true });
  };

  const initFluidCard = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    const canvas = container ? container.querySelector("canvas.hero-fluid") : null;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: 0, y: 0, active: false };
    let animationFrameId;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const initParticles = () => {
      particles = [];
      const count = 60;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 24 + Math.random() * 26,
          alpha: 0.06 + Math.random() * 0.12,
        });
      }
    };

    const update = () => {
      for (const p of particles) {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radius = 200;
          if (distSq < radius * radius && distSq > 9) {
            const force = -900 / distSq;
            const invDist = 1 / Math.sqrt(distSq);
            p.vx += (dx * invDist) * force;
            p.vy += (dy * invDist) * force;
          }
        }

        p.vx *= 0.93;
        p.vy *= 0.93;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(
        mouse.x || width / 2,
        mouse.y || height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      gradient.addColorStop(0, "rgba(129, 140, 248, 0.3)");
      gradient.addColorStop(0.4, "rgba(236, 72, 153, 0.25)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.0)");

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      update();
      render();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouse = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const start = () => {
      if (animationFrameId) return;
      mouse.active = true;
      loop();
    };

    const stop = () => {
      mouse.active = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      // On stop, keep a faint static render instead of clearing completely
      render();
    };

    resize();
    initParticles();
    render(); // initial static glow even without hover

    window.addEventListener("resize", () => {
      resize();
      initParticles();
      render();
    });

    container.addEventListener("mouseenter", start);
    container.addEventListener("mouseleave", stop);
    container.addEventListener("mousemove", handleMouse);
  };

  initFluidCard(".hero-main");
  initFluidCard(".hero-card");
  const pointerController = initPointerGlow();
  initTiltMotion(pointerController);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
