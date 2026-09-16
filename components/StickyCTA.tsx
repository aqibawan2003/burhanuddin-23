"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";

interface Props {
  onCTAClick: () => void;
}

export default function StickyCTA({ onCTAClick }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight * 0.9);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only show on desktop (the bottom mobile bar already has nav)
  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: "rgba(253,251,247,0.92)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(212,175,55,0.35)",
            boxShadow: "0 8px 32px rgba(212,175,55,0.25), 0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            Explore the full tribute
          </span>
          <button
            onClick={onCTAClick}
            className="btn-glow flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #d4af37, #c8973a)",
              color: "#1a1a1a",
            }}
          >
            <Gift size={15} strokeWidth={2.5} />
            Open Surprise
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="ml-1 w-6 h-6 flex items-center justify-center rounded-full opacity-40 hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)" }}
            aria-label="Dismiss"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
