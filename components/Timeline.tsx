"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import SectionHeading from "./ui/SectionHeading";

export default function Timeline() {
  return (
    <section id="timeline" className="section" aria-label="Timeline">
      <SectionHeading eyebrow="Chapters of You" title="The Story So Far" />

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
          style={{ background: "linear-gradient(to bottom, transparent, var(--accent), transparent)" }}
          aria-hidden="true"
        />
        {/* Mobile line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px md:hidden"
          style={{ background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }}
          aria-hidden="true"
        />

        <ol className="relative space-y-8 md:space-y-0">
          {site.timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li key={i} className="relative md:grid md:grid-cols-2 md:gap-8 md:mb-12">
                {/* Desktop: alternate left/right */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`
                    hidden md:flex flex-col
                    ${isLeft ? "md:col-start-1 md:text-right md:items-end" : "md:col-start-2 md:text-left md:items-start"}
                  `}
                >
                  <div
                    className="px-5 py-4 rounded-2xl"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <span
                      className="font-display text-2xl font-bold block mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>

                {/* Dot (desktop) */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-5 w-3 h-3 rounded-full hidden md:block"
                  style={{ background: "var(--accent)", boxShadow: "0 0 10px rgba(233,196,106,0.5)" }}
                  aria-hidden="true"
                />

                {/* Mobile: single column */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className="md:hidden flex gap-5 pl-14"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-[18px] top-5 w-3 h-3 rounded-full"
                    style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(233,196,106,0.4)" }}
                    aria-hidden="true"
                  />
                  <div
                    className="px-5 py-4 rounded-2xl flex-1"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <span
                      className="font-display text-xl font-bold block mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-base mb-1" style={{ color: "var(--text)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
