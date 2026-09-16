"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 23, label: "Years of Life",      suffix: "",  icon: "🌟" },
  { value: 3,  label: "Jobs Held",           suffix: "+", icon: "💼" },
  { value: 2,  label: "Universities",        suffix: "",  icon: "🎓" },
  { value: 1,  label: "Full-Stack Dev",      suffix: "",  icon: "💻" },
];

function useCountUp(target: number, duration = 1400, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, active]);
  return count;
}

function StatCard({ value, label, suffix, icon, delay }: typeof stats[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1200, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="card-glass card-shine spotlight-card flex flex-col items-center gap-2 px-6 py-7 rounded-2xl"
      style={{ border: "1px solid rgba(212,175,55,0.2)" }}
    >
      <span className="text-3xl" role="img" aria-hidden="true">{icon}</span>
      <p
        className="font-display font-black text-4xl md:text-5xl gradient-text leading-none"
      >
        {count}{suffix}
      </p>
      <p className="text-xs font-semibold uppercase tracking-widest text-center" style={{ color: "var(--muted)" }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="section-warm py-14 px-6" aria-label="Life in numbers">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] shimmer-eyebrow mb-8">
          23 in Numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
