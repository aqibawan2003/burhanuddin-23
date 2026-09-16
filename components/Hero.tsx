"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Gift, ChevronDown } from "lucide-react";
import { photos } from "@/content/photos";

interface Props {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    type Particle = { x: number; y: number; r: number; vx: number; vy: number; alpha: number };
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const hero = photos[0];

  return (
    <section aria-label="Hero" className="relative overflow-hidden" style={{ minHeight: "100dvh" }}>

      {/* ─────────────────────────────────────────
          MOBILE: full-bleed portrait background
          Shown on screens below md (768px)
          ───────────────────────────────────────── */}
      <div className="md:hidden relative flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-top"
            placeholder="blur"
            blurDataURL={hero.blurDataURL}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,8,5,0.4) 0%, rgba(10,8,5,0.15) 35%, rgba(10,8,5,0.6) 70%, rgba(10,8,5,0.95) 100%)",
            }}
          />
        </div>

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

        {/* Mobile text */}
        <MobileContent onCTAClick={onCTAClick} />
      </div>

      {/* ─────────────────────────────────────────
          DESKTOP: two-column — text left, photo right
          Shown on screens md (768px) and above
          ───────────────────────────────────────── */}
      <div
        className="hidden md:grid grid-cols-2"
        style={{ minHeight: "100dvh", background: "var(--bg)" }}
      >
        {/* Left: text column */}
        <div className="relative flex flex-col justify-center px-12 lg:px-20 py-16">
          {/* Subtle warm gradient behind text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 90% 70% at 20% 60%, rgba(212,175,55,0.07) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Canvas particles on left panel */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col gap-6 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}
            >
              September 16, 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black leading-[1.06] text-[clamp(2.8rem,4.5vw,5rem)]"
              style={{ color: "var(--text)" }}
            >
              Happy{" "}
              <span className="gradient-text">23rd</span>
              <br />
              Birthday,
              <br />
              Burhanuddin
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base lg:text-lg leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              From the streets of Lahore to the hearts of every student you&rsquo;ve taught &mdash; here&rsquo;s to 23 incredible years.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(212,175,55,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onCTAClick}
              className="self-start flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold cursor-pointer"
              style={{
                background: "linear-gradient(135deg, var(--accent), #c8973a)",
                color: "#1a1a1a",
                boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
              }}
            >
              <Gift size={18} strokeWidth={2.5} />
              Open Your Surprise
            </motion.button>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
            className="absolute bottom-8 left-12 lg:left-20 flex items-center gap-2"
            aria-hidden="true"
          >
            <ChevronDown size={18} style={{ color: "var(--muted)" }} />
            <span className="text-xs" style={{ color: "var(--muted)" }}>Scroll</span>
          </motion.div>
        </div>

        {/* Right: portrait photo */}
        <div className="relative overflow-hidden">
          {/* Gold accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 z-10"
            style={{ background: "linear-gradient(to bottom, transparent, var(--accent), transparent)" }}
            aria-hidden="true"
          />

          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            fetchPriority="high"
            sizes="50vw"
            className="object-cover object-top"
            placeholder="blur"
            blurDataURL={hero.blurDataURL}
          />

          {/* Bottom fade into page bg */}
          <div
            className="absolute bottom-0 inset-x-0 h-32"
            style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
            aria-hidden="true"
          />

          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-12 right-8 px-5 py-3 rounded-2xl text-center"
            style={{
              background: "rgba(253,251,247,0.92)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(212,175,55,0.3)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <p className="font-display text-2xl font-black" style={{ color: "var(--accent)" }}>23</p>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Years</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Separated mobile content to avoid canvas ref conflicts
function MobileContent({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <div className="relative z-10 text-center px-6 max-w-sm mx-auto flex flex-col items-center gap-5 py-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-xs font-bold uppercase tracking-[0.3em]"
        style={{ color: "#d4af37" }}
      >
        September 16, 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-black leading-[1.05] text-[clamp(2.4rem,10vw,3.8rem)]"
        style={{ color: "#f7f5f0" }}
      >
        Happy{" "}
        <span style={{
          background: "linear-gradient(135deg, #d4af37, #c8973a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          23rd Birthday
        </span>
        ,<br />Burhanuddin
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-sm leading-relaxed"
        style={{ color: "rgba(247,245,240,0.75)" }}
      >
        From the streets of Lahore to the hearts of every student you&rsquo;ve taught.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCTAClick}
        className="flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #d4af37, #c8973a)",
          color: "#1a1a1a",
          boxShadow: "0 4px 24px rgba(212,175,55,0.45)",
        }}
      >
        <Gift size={18} strokeWidth={2.5} />
        Open Your Surprise
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <ChevronDown size={20} style={{ color: "rgba(212,175,55,0.7)" }} />
      </motion.div>
    </div>
  );
}
