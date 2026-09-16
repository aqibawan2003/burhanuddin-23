"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const CANDLE_COUNT = 23;

export default function Cake() {
  const [blown, setBlown] = useState<boolean[]>(Array(CANDLE_COUNT).fill(false));
  const [showModal, setShowModal] = useState(false);
  const confettiRef = useRef<(() => void) | null>(null);
  const blowingRef = useRef(false);

  const allBlown = blown.every(Boolean);

  const blowAll = useCallback(async () => {
    if (blowingRef.current) return;
    blowingRef.current = true;

    // Blow candles one by one
    for (let i = 0; i < CANDLE_COUNT; i++) {
      await new Promise<void>((res) =>
        setTimeout(() => {
          setBlown((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
          res();
        }, i * 80)
      );
    }

    // Show celebration
    setTimeout(async () => {
      setShowModal(true);
      // Lazy-load and fire confetti
      if (!confettiRef.current) {
        const mod = await import("canvas-confetti");
        const confetti = mod.default;
        confettiRef.current = () => {
          confetti({
            particleCount: 180,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#e9c46a", "#f4a261", "#e76f51", "#fff", "#ffd6a5"],
          });
        };
      }
      confettiRef.current();
    }, CANDLE_COUNT * 80 + 200);

    blowingRef.current = false;
  }, []);

  const reset = useCallback(() => {
    setBlown(Array(CANDLE_COUNT).fill(false));
    setShowModal(false);
    blowingRef.current = false;
  }, []);

  // Lay out candles in rows
  const rows = [8, 8, 7];
  let candleIndex = 0;
  const candleRows: number[][] = rows.map((count) => {
    const row = Array.from({ length: count }, (_, i) => candleIndex + i);
    candleIndex += count;
    return row;
  });

  return (
    <section id="cake" className="section" aria-label="Birthday cake interaction">
      <SectionHeading eyebrow="Make a Wish" title="Blow the Candles" />

      <div className="flex flex-col items-center gap-8">
        {/* Cake SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative select-none"
          aria-label="Birthday cake with 23 candles"
        >
          {/* Candles */}
          <div className="flex flex-col items-center gap-2 mb-1">
            {candleRows.map((row, ri) => (
              <div key={ri} className="flex gap-2 md:gap-3">
                {row.map((ci) => (
                  <div key={ci} className="flex flex-col items-center">
                    {/* Flame */}
                    <AnimatePresence>
                      {!blown[ci] && (
                        <motion.div
                          initial={{ scaleY: 1 }}
                          animate={{ scaleY: [1, 1.1, 0.9, 1], x: [0, 0.5, -0.5, 0] }}
                          exit={{ scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-2 h-3 rounded-full"
                          style={{
                            background: "linear-gradient(to top, #f4a261, #ffe066)",
                            boxShadow: "0 0 6px 2px rgba(244,162,97,0.6)",
                            transformOrigin: "bottom",
                          }}
                        />
                      )}
                    </AnimatePresence>
                    {/* Candle body */}
                    <div
                      className="w-2 h-6 md:h-8 rounded-t-sm"
                      style={{
                        background: blown[ci]
                          ? "var(--surface-2)"
                          : `hsl(${(ci * 17) % 360}, 70%, 65%)`,
                        transition: "background 0.4s",
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Cake body */}
          <div
            className="relative w-72 md:w-96 rounded-t-[40%] rounded-b-2xl overflow-hidden"
            style={{ height: "90px", background: "linear-gradient(135deg, #e9c46a, #f4a261)" }}
          >
            {/* Frosting drips */}
            <div
              className="absolute top-0 inset-x-0 h-5"
              style={{
                background: "rgba(255,255,255,0.7)",
                borderRadius: "0 0 60% 60%/0 0 40px 40px",
              }}
            />
            {/* "23" text */}
            <span
              className="absolute inset-0 flex items-center justify-center font-display font-black text-4xl"
              style={{ color: "rgba(11,11,15,0.6)" }}
            >
              23
            </span>
          </div>
          {/* Base layer */}
          <div
            className="w-72 md:w-96 h-10 rounded-b-2xl"
            style={{ background: "linear-gradient(135deg, #c77dff22, var(--surface))", border: "2px solid var(--border)", borderTop: "none" }}
          />
        </motion.div>

        {/* Button */}
        {!allBlown ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={blowAll}
            className="px-8 py-4 rounded-full text-base font-semibold cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#0b0b0f",
              boxShadow: "0 0 24px rgba(233,196,106,0.3)",
            }}
          >
            Blow the Candles 💨
          </motion.button>
        ) : (
          <button
            onClick={reset}
            className="text-sm underline"
            style={{ color: "var(--muted)" }}
          >
            Light them again
          </button>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setShowModal(false)}
            role="alertdialog"
            aria-label="Birthday celebration"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 14 }}
              className="text-center p-10 rounded-3xl max-w-sm mx-4"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-6xl mb-4">🎉</p>
              <h2 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--accent)" }}>
                Happy Birthday!
              </h2>
              <p className="text-base" style={{ color: "var(--muted)" }}>
                Wishing you 23 more years of joy, adventure, and everything you deserve.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-6 py-2 rounded-full text-sm font-semibold"
                style={{ background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)" }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
