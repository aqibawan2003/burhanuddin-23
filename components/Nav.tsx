"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Moments", href: "#gallery" },
  { label: "Chapters", href: "#timeline" },
  { label: "Letter", href: "#letter" },
  { label: "Cake", href: "#cake" },
  { label: "Wishes", href: "#wishes" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop — top pill (unchanged) */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            aria-label="Site navigation"
          >
            <div
              className="glass flex items-center gap-1 px-4 py-2 rounded-full"
              style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:text-[var(--accent)] focus-visible:outline-[var(--accent)]"
                  style={{ color: "var(--muted)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile — fixed bottom bar (never overlaps content) */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 inset-x-0 z-50 md:hidden"
            aria-label="Site navigation"
            style={{
              background: "var(--glass)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderTop: "1px solid var(--border)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="flex items-center justify-around px-2 py-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-xs font-medium transition-colors min-w-[44px] min-h-[44px] justify-center"
                  style={{ color: "var(--muted)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
