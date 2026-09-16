"use client";

import { useState, useCallback } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Letter from "@/components/Letter";
import Cake from "@/components/Cake";
import Wishes from "@/components/Wishes";
import WorkExperience from "@/components/WorkExperience";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  const [musicStarted, setMusicStarted] = useState(false);

  const handleCTA = useCallback(async () => {
    setMusicStarted(true);
    // Fire confetti on CTA click
    const { default: confetti } = await import("canvas-confetti");
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e9c46a", "#f4a261", "#e76f51", "#fff"],
    });
    // Smooth scroll to gallery
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="pb-16 md:pb-0">
      <Nav />
      <Hero onCTAClick={handleCTA} />
      <Countdown />
      <Gallery />
      <Timeline />
      <Letter />
      <Cake />
      <WorkExperience />
      <Wishes />
      <Footer />
      <MusicToggle started={musicStarted} />
      <StickyCTA onCTAClick={handleCTA} />
    </main>
  );
}
