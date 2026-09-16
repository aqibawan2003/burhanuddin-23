"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { site } from "@/content/site";

interface Wish {
  id: string;
  name: string;
  message: string;
  ts: number;
}

const STORAGE_KEY = "burhanuddin_guestbook";

function loadWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Wish[]) : [];
  } catch {
    return [];
  }
}

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWishes(loadWishes());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim().slice(0, 40),
      message: message.trim().slice(0, 160),
      ts: Date.now(),
    };
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* quota */ }
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Seed wishes from site.ts so it doesn't look empty on first load
  const displayWishes: (Wish | { id: string; name: string; message: string; ts: number })[] =
    mounted && wishes.length > 0
      ? wishes
      : site.wishes.map((w, i) => ({ id: `seed-${i}`, name: w.author, message: w.text, ts: i }));

  return (
    <section id="guestbook" className="section" aria-label="Guestbook">
      <SectionHeading eyebrow="Leave a Message" title="Sign the Guestbook" />

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mb-12 p-6 md:p-8 rounded-3xl flex flex-col gap-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Write a birthday wish for Burhanuddin — it&rsquo;ll appear below instantly.
        </p>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-shadow focus:ring-2"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />

        <textarea
          placeholder="Write your wish here… (max 160 characters)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={160}
          required
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none transition-shadow focus:ring-2"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {message.length}/160
          </span>
          <button
            type="submit"
            className="btn-glow px-6 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #d4af37, #c8973a)", color: "#1a1a1a" }}
          >
            Send Wish 🎂
          </button>
        </div>

        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium text-center"
              style={{ color: "#22c55e" }}
            >
              Your wish was added! 🎉
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>

      {/* Wishes masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-5xl mx-auto space-y-4">
        {displayWishes.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="spotlight-card card-glass card-shine card-border-hover break-inside-avoid p-5 rounded-2xl flex flex-col gap-2"
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              &ldquo;{w.message}&rdquo;
            </p>
            <p className="text-xs font-semibold shimmer-eyebrow">— {w.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
