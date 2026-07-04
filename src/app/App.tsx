import { Navbar } from "./components/navbar";
import { GlitterCursor } from "./components/glitter-cursor";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { CouncilMembers } from "./components/council-members";
import { Coordinators } from "./components/coordinators";
import { UpcomingEvents } from "./components/upcoming-events";
import { EventReports } from "./components/event-reports";
import { Gallery } from "./components/gallery";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ cursor: "none" }}>
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

      <Navbar />
      <HeroSection />
      <AboutSection />
      <CouncilMembers />
      <Coordinators />
      <UpcomingEvents />
      <EventReports />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}