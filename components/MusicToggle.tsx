"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  started: boolean;
}

export default function MusicToggle({ started }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("music_muted") !== "false";
  });

  useEffect(() => {
    const audio = new Audio("/audio/happy-birthday.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    // Silently swallow 404 / missing file — no console errors
    audio.addEventListener("error", () => { /* file not present, fail silently */ });
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (started && !muted) {
      audio.play().catch(() => {/* browser blocked autoplay */});
    } else {
      audio.pause();
    }
  }, [started, muted]);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem("music_muted", String(next));
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center glass"
      style={{ border: "1px solid var(--border)" }}
      aria-label={muted ? "Unmute music" : "Mute music"}
      title={muted ? "Unmute music" : "Mute music"}
    >
      {muted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--muted)" }}>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent)" }}>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
