"use client";

import { useState, useCallback } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Letter from "@/components/Letter";
import Cake from "@/components/Cake";
import WorkExperience from "@/components/WorkExperience";
import Wishes from "@/components/Wishes";
import Stats from "@/components/Stats";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  const [musicStarted, setMusicStarted] = useState(false);

  const handleCTA = useCallback(async () => {
    setMusicStarted(true);
    const { default: confetti } = await import("canvas-confetti");
    confetti({
      particleCount: 130,
      spread: 72,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f4a261", "#fde68a", "#fff", "#c8973a"],
    });
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="pb-16 md:pb-0">
      <Nav />
      <Hero onCTAClick={handleCTA} />
      <Countdown />

      <SectionDivider />
      <Gallery />

      <SectionDivider />
      <div className="section-warm">
        <Timeline />
      </div>

      <SectionDivider />
      <Stats />

      <SectionDivider />
      <Letter />

      <SectionDivider />
      <div className="section-warm">
        <Cake />
      </div>

      <SectionDivider />
      <WorkExperience />

      <SectionDivider />
      <div className="section-warm">
        <Wishes />
      </div>

      <SectionDivider />
      <Footer />

      <MusicToggle started={musicStarted} />
      <StickyCTA onCTAClick={handleCTA} />
    </main>
  );
}
