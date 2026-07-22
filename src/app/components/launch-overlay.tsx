/**
 * LaunchOverlay — Premium Inauguration Experience
 * ================================================
 * Plays once when the Chairperson clicks "Launch Website".
 * Sequence (≈4–5 s total):
 *   0.0 s  – Full-screen overlay shown; launch button centred with glow
 *   0.0 s  – Click → button presses inward + ripple + energy lines
 *   0.8 s  – ASCENDRIX logo fades in with soft glow
 *   1.5 s  – Circular progress ring sweeps 0 → 100 %
 *   3.2 s  – Ambient light burst + particle sweep
 *   3.8 s  – Overlay fades out; homepage slides up with staggered entrance
 *   4.5 s  – Overlay removed from DOM; scroll + pointer restored
 *
 * Customisation anchors (search "// ✏️ CUSTOMISE"):
 *   - Logo / wordmark text
 *   - Button label
 *   - Animation durations
 *   - Brand colours
 *   - Loading messages
 *   - Transition timing
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";

/* ─────────────────────────────────────────────
   ✏️ CUSTOMISE — Brand colours
   ───────────────────────────────────────────── */
const GOLD = "#D4AF37";
const CRIMSON = "#7A0019";
const BG = "#000000";

/* ✏️ CUSTOMISE — Button label */
const BUTTON_LABEL = "Launch Website";

/* ✏️ CUSTOMISE — Wordmark shown inside overlay */
const WORDMARK = "ASCENDRIX";

/* ✏️ CUSTOMISE — Subtitle under wordmark */
const SUBTITLE = "The Student Council of Tagore Engineering College";

/* ✏️ CUSTOMISE — Loading messages (cycles through) */
const LOADING_MESSAGES = [
  "Initialising…",
  "Loading experience…",
  "Preparing for launch…",
  "Almost there…",
  "Welcome.",
];

/* ✏️ CUSTOMISE — Key durations (milliseconds) */
const DUR = {
  PRESS: 150,           // Button press-down
  RIPPLE: 600,          // Ripple expansion
  ENERGY_LINES: 800,    // Energy lines spread
  LOGO_IN: 700,         // Logo fade-in
  LOGO_HOLD: 500,       // How long logo shows before progress starts
  PROGRESS: 1600,       // Progress ring sweep duration
  BURST: 600,           // Particle / light burst
  OVERLAY_FADE: 700,    // Overlay fade-out
  CONTENT_STAGGER: 120, // Stagger between homepage elements
  CLEANUP: 200,         // Extra time before DOM removal
} as const;

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface EnergyLine {
  id: number;
  angle: number;
  length: number;
  delay: number;
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

/** Returns true when user prefers reduced motion */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Generates random energy lines radiating from centre */
function makeEnergyLines(count: number): EnergyLine[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * (360 / count) * 0.5,
    length: 40 + Math.random() * 60, // % of half-screen
    delay: Math.random() * 0.3,
  }));
}

/** Generates burst particles */
function makeBurstParticles(
  cx: number,
  cy: number,
  count: number
): Particle[] {
  const colors = [GOLD, "#FFD700", "#FFF8DC", "#F5C842", "#E8C96B", "#ffffff", CRIMSON];
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 120 + Math.random() * 180;
    return {
      id: i,
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.9 + Math.random() * 0.1,
    };
  });
}

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

/** Circular SVG progress ring */
function ProgressRing({
  progress,
  size = 160,
  stroke = 2.5,
}: {
  progress: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(212,175,55,0.12)"
        strokeWidth={stroke}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#progGrad)`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.05s linear" }}
        filter="url(#progGlow)"
      />
      <defs>
        <linearGradient id="progGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={CRIMSON} />
        </linearGradient>
        <filter id="progGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */

export interface LaunchOverlayProps {
  /** Called when the overlay finishes and the site is fully revealed */
  onComplete?: () => void;
}

type Phase =
  | "countdown"  // 5-second countdown before button appears
  | "idle"       // Waiting for click
  | "pressed"    // Button press animation
  | "ripple"     // Ripple + energy lines
  | "logo"       // Logo fade-in
  | "loading"    // Progress ring
  | "burst"      // Light burst
  | "fading"     // Overlay fade-out
  | "done";      // Overlay removed

export function LaunchOverlay({ onComplete }: LaunchOverlayProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("countdown");
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [energyLines] = useState<EnergyLine[]>(() => makeEnergyLines(16));
  const [mounted, setMounted] = useState(true);

  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const clickedRef = useRef(false);
  const btnControls = useAnimationControls();

  /* 5-second countdown before showing button */
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setPhase("idle");
    }
  }, [phase, countdown]);

  /* Message cycling during loading */
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, DUR.PROGRESS / LOADING_MESSAGES.length);
    return () => clearInterval(interval);
  }, [phase]);

  /* Smooth progress animation */
  useEffect(() => {
    if (phase !== "loading") return;

    let start: number | null = null;
    const duration = DUR.PROGRESS;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("burst");
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  /* Burst → fading pipeline */
  useEffect(() => {
    if (phase !== "burst") return;

    // Spawn particles at screen centre
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setParticles(makeBurstParticles(cx, cy, 40));

    const t1 = setTimeout(() => setPhase("fading"), DUR.BURST);
    return () => clearTimeout(t1);
  }, [phase]);

  /* After fading, remove from DOM and notify parent */
  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => {
      setMounted(false);
      setPhase("done");
      onComplete?.();
    }, DUR.OVERLAY_FADE + DUR.CLEANUP);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  /* Main click handler */
  const handleLaunch = useCallback(() => {
    if (clickedRef.current) return;
    clickedRef.current = true;

    if (reducedMotion) {
      // Simplified: just fade away
      setPhase("fading");
      return;
    }

    /* 1. Press button inward */
    setPhase("pressed");
    
    // We use setTimeout instead of awaiting motion promises for reliability
    // as motion promises can sometimes hang if interrupted
    btnControls.start({
      scale: 0.88,
      transition: { duration: DUR.PRESS / 1000, ease: "easeIn" },
    }).then(() => {
      btnControls.start({
        scale: 1,
        transition: { duration: DUR.PRESS / 1000, ease: "easeOut" },
      });
    });

    setTimeout(() => {
      /* 2. Ripple + energy lines */
      setPhase("ripple");

      setTimeout(() => {
        /* 3. Logo fades in */
        setPhase("logo");

        setTimeout(() => {
          /* 4. Progress starts after logo hold */
          setProgress(0);
          setPhase("loading");
        }, DUR.LOGO_IN + DUR.LOGO_HOLD);

      }, DUR.RIPPLE);

    }, DUR.PRESS);
  }, [reducedMotion, btnControls]);

  /* Keyboard activation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleLaunch();
      }
    },
    [handleLaunch]
  );

  if (!mounted) return null;

  const showOverlay = phase !== "done";
  const showButton = phase === "idle" || phase === "pressed";
  const showRipple = phase === "ripple" || phase === "logo" || phase === "loading" || phase === "burst";
  const showEnergyLines = showRipple;
  const showLogo = phase === "logo" || phase === "loading" || phase === "burst";
  const showProgress = phase === "loading" || phase === "burst";
  const showBurst = phase === "burst" || phase === "fading";
  const fadeOut = phase === "fading";

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          ref={overlayRef}
          key="launch-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.OVERLAY_FADE / 1000, ease: "easeInOut" }}
          aria-modal="true"
          aria-label="Website Launch Overlay"
          role="dialog"
          className="launch-overlay"
          style={{
            position: "fixed",
            inset: 0,
            // Keep overlay below z-999999 so GlitterCursor canvas (z-999999)
            // renders on top and the custom cursor ring is always visible
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: BG,
            // 'none' hides the OS arrow; the GlitterCursor canvas above
            // provides the visible cursor indicator
            cursor: "none",
          }}
        >
          {/* ── Ambient radial background glow ── */}
          <motion.div
            aria-hidden="true"
            animate={{
              opacity: showBurst ? 1 : showLogo ? 0.6 : 0.3,
              scale: showBurst ? 1.6 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${CRIMSON}33 0%, ${GOLD}11 40%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* ── Energy Lines ── */}
          {showEnergyLines && (
            <div
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {energyLines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 0.7, 0] }}
                  transition={{
                    duration: DUR.ENERGY_LINES / 1000,
                    delay: line.delay,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${line.length}vmin`,
                    height: "1px",
                    transformOrigin: "left center",
                    transform: `rotate(${line.angle}deg)`,
                    background: `linear-gradient(to right, ${GOLD}cc, transparent)`,
                    boxShadow: `0 0 6px ${GOLD}88`,
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Ripple rings ── */}
          {showRipple && (
            <div
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ width: 100, height: 100, opacity: 0.9, borderRadius: "50%" }}
                  animate={{
                    width: ["100px", "100vmax"],
                    height: ["100px", "100vmax"],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: DUR.RIPPLE / 1000 + i * 0.25,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    border: `1px solid ${GOLD}`,
                    boxShadow: `0 0 20px ${GOLD}44`,
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Logo block ── */}
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DUR.LOGO_IN / 1000, ease: "easeOut" }}
              aria-label={`${WORDMARK} — ${SUBTITLE}`}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textAlign: "center",
                pointerEvents: "none",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* ✏️ CUSTOMISE — Swap the wordmark for an <img> tag if you have an image logo */}
              <div
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  background: `linear-gradient(135deg, ${GOLD}, #ffffff, ${GOLD})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 24px ${GOLD}88)`,
                  lineHeight: 1.1,
                }}
              >
                {WORDMARK}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.75rem, 2vw, 1rem)",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.05em",
                  maxWidth: "28rem",
                  padding: "0 1rem",
                }}
              >
                {SUBTITLE}
              </div>

              {/* Progress ring + loading message */}
              {showProgress && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "16px",
                  }}
                >
                  <div style={{ position: "relative", width: 160, height: 160 }}>
                    <ProgressRing progress={progress} />
                    {/* Percentage label */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2px",
                      }}
                    >
                      <span
                        style={{
                          color: GOLD,
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                          filter: `drop-shadow(0 0 8px ${GOLD}88)`,
                        }}
                      >
                        {Math.floor(progress)}
                        <span style={{ fontSize: "0.9rem" }}>%</span>
                      </span>
                    </div>
                  </div>

                  {/* ✏️ CUSTOMISE — loading messages */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={msgIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {LOADING_MESSAGES[msgIndex]}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Burst particles (canvas-drawn via DOM elements for simplicity) ── */}
          {showBurst &&
            particles.map((p) => (
              <motion.div
                key={p.id}
                aria-hidden="true"
                initial={{ x: p.x, y: p.y, opacity: p.opacity, scale: 1 }}
                animate={{
                  x: p.x + (p.vx * DUR.BURST) / 1000,
                  y: p.y + (p.vy * DUR.BURST) / 1000,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: DUR.BURST / 1000, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                  pointerEvents: "none",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              />
            ))}

          {/* ── Ambient light sweep on burst ── */}
          {showBurst && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0] }}
              transition={{ duration: DUR.BURST / 1000, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${GOLD}66, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          )}

          {/* ── Countdown Phase ── */}
          {phase === "countdown" && (
            <motion.div
              key={countdown}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(4rem, 12vw, 8rem)",
                  fontWeight: 700,
                  color: GOLD,
                  textShadow: `0 0 20px ${GOLD}88`,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                {countdown}
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.85rem" }}>
                Preparing System
              </div>
            </motion.div>
          )}

          {/* ── Launch button ── */}
          {showButton && (
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Pulsing outer beacon ring — makes the button easy to locate
                  even before hovering (no cursor visible yet at first glance) */}
              {phase === "idle" && (
                <>
                  <motion.div
                    aria-hidden="true"
                    animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      width: "clamp(160px, 25vmin, 220px)",
                      height: "clamp(160px, 25vmin, 220px)",
                      borderRadius: "50%",
                      border: `1px solid ${GOLD}`,
                      pointerEvents: "none",
                    }}
                  />
                  <motion.div
                    aria-hidden="true"
                    animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    style={{
                      position: "absolute",
                      width: "clamp(160px, 25vmin, 220px)",
                      height: "clamp(160px, 25vmin, 220px)",
                      borderRadius: "50%",
                      border: `1px solid ${GOLD}`,
                      pointerEvents: "none",
                    }}
                  />
                </>
              )}

              <motion.button
                ref={btnRef}
                id="launch-website-btn"
                onClick={handleLaunch}
                onKeyDown={handleKeyDown}
                animate={btnControls}
                tabIndex={0}
                aria-label={BUTTON_LABEL}
                aria-disabled={phase === "pressed"}
                whileHover={
                  phase === "idle"
                    ? { scale: 1.06, boxShadow: `0 0 60px ${GOLD}aa, 0 0 120px ${GOLD}44` }
                    : undefined
                }
                whileTap={phase === "idle" ? { scale: 0.93 } : undefined}
                style={{
                  position: "relative",
                  /* ✏️ CUSTOMISE — Button size */
                  width: "clamp(160px, 25vmin, 220px)",
                  height: "clamp(160px, 25vmin, 220px)",
                  borderRadius: "50%",
                  border: `1.5px solid ${GOLD}`,
                  background: `radial-gradient(circle at 40% 35%, rgba(212,175,55,0.22), rgba(122,0,25,0.18) 60%, rgba(0,0,0,0.65))`,
                  // Always 'none' — GlitterCursor provides the visual cursor above
                  cursor: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  color: GOLD,
                  fontWeight: 600,
                  fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  /* ✏️ CUSTOMISE — Button glow */
                  boxShadow: `0 0 40px ${GOLD}55, 0 0 80px ${GOLD}22, inset 0 0 30px rgba(212,175,55,0.1)`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  outline: "none",
                  userSelect: "none",
                  transition: "box-shadow 0.3s ease",
                  // Ensure button is interactive — no pointer-events override
                  pointerEvents: phase === "pressed" ? "none" : "auto",
                }}
              >
                {/* Inner decorative ring */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "10px",
                    borderRadius: "50%",
                    border: `1px solid ${GOLD}44`,
                    pointerEvents: "none",
                  }}
                />
                {/* Sparkle icon */}
                <svg
                  aria-hidden="true"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ filter: `drop-shadow(0 0 8px ${GOLD})` }}
                >
                  <path
                    d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 19L13.09 14.74L12 21L10.91 14.74L5 19L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z"
                    fill={GOLD}
                  />
                </svg>
                {/* ✏️ CUSTOMISE — Button label */}
                <span>{BUTTON_LABEL}</span>
              </motion.button>
            </div>
          )}

          {/* ── Decorative corner accents ── */}
          {["tl", "tr", "bl", "br"].map((pos) => {
            const isTop = pos.startsWith("t");
            const isLeft = pos.endsWith("l");
            return (
              <motion.div
                key={pos}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.35, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  [isTop ? "top" : "bottom"]: "clamp(16px, 3vw, 32px)",
                  [isLeft ? "left" : "right"]: "clamp(16px, 3vw, 32px)",
                  width: "clamp(24px, 4vw, 48px)",
                  height: "clamp(24px, 4vw, 48px)",
                  borderTop: isTop ? `1.5px solid ${GOLD}` : "none",
                  borderBottom: !isTop ? `1.5px solid ${GOLD}` : "none",
                  borderLeft: isLeft ? `1.5px solid ${GOLD}` : "none",
                  borderRight: !isLeft ? `1.5px solid ${GOLD}` : "none",
                  pointerEvents: "none",
                }}
              />
            );
          })}

          {/* ── Subtle scanline texture ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
              pointerEvents: "none",
            }}
          />

          {/* ── Bottom tagline ── */}
          {phase === "idle" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                position: "absolute",
                bottom: "clamp(20px, 4vw, 40px)",
                left: 0,
                right: 0,
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
                fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                pointerEvents: "none",
              }}
            >
              {/* ✏️ CUSTOMISE — Bottom tagline text */}
              Leadership · Innovation · Student Empowerment
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
