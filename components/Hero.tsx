"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, ChevronDown } from "lucide-react";
import { photos } from "@/content/photos";

interface Props {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoColRef = useRef<HTMLDivElement>(null);

  // Parallax: photo drifts up slightly as page scrolls
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, -70]);

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

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    const pts: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.08,
      a: Math.random() * 0.45 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.a})`;
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

      {/* ────────────────────────────────────────────────────────
          MOBILE  (< 768 px) — full-bleed portrait photo
          ──────────────────────────────────────────────────────── */}
      <div
        className="md:hidden relative flex flex-col items-center justify-center"
        style={{ minHeight: "100dvh" }}
      >
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
              background:
                "linear-gradient(to bottom, rgba(8,6,3,0.38) 0%, rgba(8,6,3,0.1) 30%, rgba(8,6,3,0.55) 68%, rgba(8,6,3,0.96) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-sm mx-auto flex flex-col items-center gap-5 py-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-[0.3em] shimmer-eyebrow"
          >
            September 16, 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black leading-[1.05] text-[clamp(2.4rem,10vw,3.6rem)]"
            style={{ color: "#f7f5f0" }}
          >
            Happy{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #d4af37, #fde68a, #c8973a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              23rd Birthday
            </span>
            ,<br />Burhanuddin
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-sm leading-relaxed"
            style={{ color: "rgba(247,245,240,0.72)" }}
          >
            From the streets of Lahore to the hearts of every student you&rsquo;ve taught.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCTAClick}
            className="btn-glow flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #d4af37, #c8973a)",
              color: "#1a1a1a",
            }}
          >
            <Gift size={18} strokeWidth={2.5} />
            Open Your Surprise
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 2, duration: 1.6, repeat: Infinity }}
            aria-hidden="true"
          >
            <ChevronDown size={20} style={{ color: "rgba(212,175,55,0.7)" }} />
          </motion.div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          DESKTOP  (≥ 768 px) — two-column split
          Left:  aurora animated background + text + CTA
          Right: portrait photo (fits naturally, no cropping)
          ──────────────────────────────────────────────────────── */}
      <div
        className="hidden md:grid grid-cols-2"
        style={{ minHeight: "100dvh" }}
      >
        {/* Left column — aurora animated panel */}
        <div className="aurora-bg relative flex flex-col justify-center px-12 lg:px-20 py-16 overflow-hidden">
          {/* Aurora colour orbs */}
          <div className="orb orb-a" aria-hidden="true" />
          <div className="orb orb-b" aria-hidden="true" />
          <div className="orb orb-c" aria-hidden="true" />

          {/* Floating gold particles */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col gap-7 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-[0.3em] shimmer-eyebrow"
            >
              September 16, 2026
            </motion.p>

            <h1
              className="blur-reveal font-display font-bold leading-[1.06] text-[clamp(2.8rem,4.5vw,5rem)]"
              style={{ color: "var(--text)", animationDelay: "0.35s" }}
            >
              Happy{" "}
              <span className="gradient-text">23rd</span>
              <br />Birthday,
              <br />Burhanuddin
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base lg:text-lg leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              From the streets of Lahore to the hearts of every student
              you&rsquo;ve taught &mdash; here&rsquo;s to 23 incredible years.
            </motion.p>

            {/* Glowing CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCTAClick}
              className="btn-glow self-start flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #d4af37, #c8973a)",
                color: "#1a1a1a",
              }}
            >
              <Gift size={18} strokeWidth={2.5} />
              Open Your Surprise
            </motion.button>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 7, 0] }}
              transition={{ delay: 2.2, duration: 1.6, repeat: Infinity }}
              className="flex items-center gap-2"
              aria-hidden="true"
            >
              <ChevronDown size={16} style={{ color: "var(--muted)" }} />
              <span className="text-xs" style={{ color: "var(--muted)" }}>Scroll to explore</span>
            </motion.div>
          </div>
        </div>

        {/* Right column — portrait photo with parallax */}
        <div ref={photoColRef} className="relative overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: photoY }}>
          {/* Thin gold accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] z-10"
            style={{
              background: "linear-gradient(to bottom, transparent 5%, #d4af37 40%, #c8973a 60%, transparent 95%)",
            }}
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

          {/* Bottom fade into page background */}
          <div
            className="absolute bottom-0 inset-x-0 h-28"
            style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
            aria-hidden="true"
          />

          {/* "23 Years" floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, type: "spring", damping: 14 }}
            className="absolute bottom-10 right-8 px-5 py-3 rounded-2xl text-center"
            style={{
              background: "rgba(253,251,247,0.94)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(212,175,55,0.35)",
              boxShadow: "0 4px 20px rgba(212,175,55,0.2)",
            }}
          >
            <p className="font-display text-2xl font-black" style={{ color: "#d4af37" }}>23</p>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>Years</p>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
