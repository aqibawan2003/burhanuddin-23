"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────
//  Happy Birthday melody — Web Audio synthesis (no MP3 needed)
//  The melody itself is public domain (US copyright expired 2016).
// ─────────────────────────────────────────────────────────────────
const FREQ: Record<string, number> = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, Bb4: 466.16, C5: 523.25,
};

// [note, beats]  — "Happy Birthday to You" in 3/4 feel, key of F
const MELODY: [string, number][] = [
  ["C4", 0.75], ["C4", 0.25], ["D4", 1],  ["C4", 1],  ["F4", 1],  ["E4", 2],
  ["C4", 0.75], ["C4", 0.25], ["D4", 1],  ["C4", 1],  ["G4", 1],  ["F4", 2],
  ["C4", 0.75], ["C4", 0.25], ["C5", 1],  ["A4", 1],  ["F4", 1],  ["E4", 1], ["D4", 2],
  ["Bb4",0.75], ["Bb4",0.25], ["A4", 1],  ["F4", 1],  ["G4", 1],  ["F4", 2.5],
];

const BPM = 68;
const BEAT = 60 / BPM;
const TOTAL_BEATS = MELODY.reduce((s, [, d]) => s + d, 0);
const TOTAL_SEC = TOTAL_BEATS * BEAT + 1.5; // +1.5s tail before loop

function playMelody(ctx: AudioContext, masterGain: GainNode, startAt: number) {
  let t = startAt;
  for (const [note, beats] of MELODY) {
    const dur = beats * BEAT;
    const freq = FREQ[note];
    if (!freq) { t += dur; continue; }

    // Two oscillators for a soft music-box/piano timbre
    for (const [type, gain] of [["sine", 0.55], ["triangle", 0.2]] as const) {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();

      osc.type = type;
      osc.frequency.value = freq;

      // ADSR: short attack, quick decay, low sustain, gentle release
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(gain, t + 0.012);
      env.gain.exponentialRampToValueAtTime(gain * 0.55, t + 0.08);
      env.gain.setValueAtTime(gain * 0.55, t + dur - 0.12);
      env.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.12);

      osc.connect(env);
      env.connect(masterGain);
      osc.start(t);
      osc.stop(t + dur + 0.2);
    }

    t += dur;
  }
  return t; // returns time when melody ends
}

interface Props {
  started: boolean;
}

export default function MusicToggle({ started }: Props) {
  const ctxRef    = useRef<AudioContext | null>(null);
  const gainRef   = useRef<GainNode | null>(null);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("music_muted") !== "false";
  });
  const [playing, setPlaying] = useState(false);

  // Schedule one full play + reschedule loop
  const scheduleLoop = useCallback((ctx: AudioContext, gain: GainNode) => {
    const endAt = playMelody(ctx, gain, ctx.currentTime + 0.05);
    const msUntilEnd = (endAt - ctx.currentTime) * 1000;
    loopTimer.current = setTimeout(() => scheduleLoop(ctx, gain), msUntilEnd);
  }, []);

  const startAudio = useCallback(() => {
    if (ctxRef.current) return;
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const master = ctx.createGain();
    // Fade in from silence over 2 seconds
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 2);
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    gainRef.current = master;
    scheduleLoop(ctx, master);
    setPlaying(true);
  }, [scheduleLoop]);

  const stopAudio = useCallback(() => {
    if (loopTimer.current) clearTimeout(loopTimer.current);
    gainRef.current?.disconnect();
    ctxRef.current?.close();
    ctxRef.current = null;
    gainRef.current = null;
    setPlaying(false);
  }, []);

  // React to started prop + muted state
  useEffect(() => {
    if (started && !muted) {
      startAudio();
    } else if (muted && playing) {
      // Fade out smoothly before stopping
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.4);
        setTimeout(stopAudio, 450);
      } else {
        stopAudio();
      }
    }
  }, [started, muted, playing, startAudio, stopAudio]);

  // Cleanup on unmount
  useEffect(() => () => stopAudio(), [stopAudio]);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem("music_muted", String(next));
  };

  const DELAYS = ["0s", "0.15s", "0.3s", "0.1s", "0.25s"];

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 rounded-full flex items-center gap-2 px-3 h-11 glass"
      style={{
        border: "1px solid var(--border)",
        boxShadow: playing && !muted ? "0 0 18px rgba(212,175,55,0.35)" : "none",
      }}
      aria-label={muted ? "Unmute music" : "Mute music"}
      title={muted ? "Unmute music" : "Mute music"}
    >
      {/* Visualizer bars — only visible when playing */}
      {playing && !muted && (
        <span className="flex items-end gap-[2px] h-5" aria-hidden="true">
          {DELAYS.map((d, i) => (
            <span
              key={i}
              className="viz-bar"
              style={{
                height: "16px",
                animationDelay: d,
                animationDuration: `${0.7 + i * 0.08}s`,
              }}
            />
          ))}
        </span>
      )}

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
