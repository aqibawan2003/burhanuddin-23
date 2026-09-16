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
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          aria-label="Site navigation"
        >
          {/* Desktop pill */}
          <div
            className="glass hidden md:flex items-center gap-1 px-4 py-2 rounded-full"
            style={{ border: "1px solid var(--border)" }}
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

          {/* Mobile pill */}
          <div className="md:hidden relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ color: "var(--text)", border: "1px solid var(--border)" }}
              aria-expanded={open}
              aria-label="Open navigation"
            >
              <span style={{ color: "var(--accent)" }}>&#9670;</span>
              Menu
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="glass absolute top-full mt-2 left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden min-w-[140px]"
                  style={{ border: "1px solid var(--border)" }}
                >
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleLink(link.href)}
                      className="block w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--muted)" }}
                    >
                      {link.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
