"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import SectionHeading from "./ui/SectionHeading";

export default function Letter() {
  return (
    <section id="letter" className="section" aria-label="Birthday letter">
      <SectionHeading eyebrow="From the Heart" title="A Letter to You" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <div
          className="relative p-8 md:p-12 rounded-3xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 0 60px rgba(233,196,106,0.05)",
          }}
        >
          {/* Decorative quote mark */}
          <span
            className="absolute top-6 left-8 font-display text-8xl leading-none select-none opacity-10"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div className="relative space-y-5">
            <p
              className="font-semibold text-lg"
              style={{ color: "var(--accent)" }}
            >
              {site.letter.greeting}
            </p>

            {site.letter.body.map((para, i) => (
              <p
                key={i}
                className="text-base leading-[1.85] font-body"
                style={{ color: "var(--muted)" }}
              >
                {para}
              </p>
            ))}

            <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
                {site.letter.signoff}
              </p>
              <p
                className="font-signature text-3xl"
                style={{ color: "var(--accent)" }}
              >
                {site.letter.signature}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
