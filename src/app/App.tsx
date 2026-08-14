/**
 * App.tsx
 * -------
 * Root component.
 * Renders the LaunchOverlay on first load. Once the overlay completes,
 * the homepage content slides up with staggered entrance animations.
 *
 * ✏️ CUSTOMISE — To skip the overlay during development, set
 *   const SKIP_LAUNCH = true;
 */

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Navbar } from "./components/navbar";
import { GlitterCursor } from "./components/glitter-cursor";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { CouncilMembers } from "./components/council-members";
import type { Batch } from "./components/council-members";
import { EventReports } from "./components/event-reports";
import { Gallery } from "./components/gallery";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { LaunchOverlay } from "./components/launch-overlay";

/* ✏️ CUSTOMISE — Set to true to bypass the overlay while developing */
const SKIP_LAUNCH = true;

/* ✏️ CUSTOMISE — Animation durations for homepage entrance (seconds) */
const ENTRANCE_DURATION = 0.7;
const ENTRANCE_STAGGER = 0.1;
const ENTRANCE_DELAY = 0.05; // Extra delay after overlay removed

export default function App() {
  const [launched, setLaunched] = useState(SKIP_LAUNCH);
  /** Shared batch selection — drives CouncilMembers, EventReports & Gallery */
  const [selectedBatch, setSelectedBatch] = useState<Batch>("2026-2027");

  const handleLaunchComplete = useCallback(() => {
    // Small delay so overlay exit animation finishes cleanly
    setTimeout(() => {
      // Force scroll to top and clear any hash so we always start at the Hero section
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      setLaunched(true);
    }, ENTRANCE_DELAY * 1000);
  }, []);

  const sections = [
    { el: <Navbar />,                                                            key: "nav"     },
    { el: <HeroSection />,                                                       key: "hero"    },
    { el: <AboutSection />,                                                      key: "about"   },
    { el: <CouncilMembers selectedBatch={selectedBatch} onBatchChange={setSelectedBatch} />, key: "council" },
    { el: <EventReports selectedBatch={selectedBatch} />,                        key: "events"  },
    { el: <Gallery selectedBatch={selectedBatch} />,                             key: "gallery" },
    { el: <Contact />,                                                           key: "contact" },
    { el: <Footer />,                                                            key: "footer"  },
  ];

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ cursor: "none" }}
    >
      <GlitterCursor />

      {/* Mouse Follow Glow Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background:
            "radial-gradient(600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.15), transparent 80%)",
        }}
        onMouseMove={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.setProperty("--mouse-x", `${e.clientX}px`);
          target.style.setProperty("--mouse-y", `${e.clientY}px`);
        }}
      />

      {/* ── Launch Overlay ─────────────────────────────────────────────────── */}
      {!SKIP_LAUNCH && (
        <LaunchOverlay onComplete={handleLaunchComplete} />
      )}

      {/* ── Homepage Content ────────────────────────────────────────────────── */}
      {/*
        When launched === false, the content is rendered but invisible via
        opacity:0 so the browser has time to paint it before the overlay lifts.
        Once launched, each section animates in with a staggered upward motion.
      */}
      {sections.map(({ el, key }, index) => (
        <motion.div
          key={key}
          initial={SKIP_LAUNCH ? false : { opacity: 0, y: 24 }}
          animate={
            launched
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{
            duration: ENTRANCE_DURATION,
            ease: [0.22, 1, 0.36, 1], // Custom ease-out-quart
            delay: launched ? index * ENTRANCE_STAGGER : 0,
          }}
        >
          {el}
        </motion.div>
      ))}
    </div>
  );
}