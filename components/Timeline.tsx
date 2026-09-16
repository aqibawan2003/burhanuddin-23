"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import SectionHeading from "./ui/SectionHeading";

export default function Timeline() {
  return (
    <section id="timeline" className="section" aria-label="Timeline">
      <SectionHeading eyebrow="Chapters of You" title="The Story So Far" />

      <div className="relative max-w-xl mx-auto">
        {/* Vertical gold rail */}
        <div
          className="absolute left-[18px] top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, var(--accent) 15%, var(--accent) 85%, transparent)" }}
          aria-hidden="true"
        />

        <ol className="relative space-y-5">
          {site.timeline.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-12"
            >
              {/* Dot */}
              <div
                className="absolute left-[13px] top-[22px] w-[11px] h-[11px] rounded-full ring-2 ring-[var(--bg)]"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(212,175,55,0.5)" }}
                aria-hidden="true"
              />

              <div
                className="card-glass card-shine px-5 py-4 rounded-2xl"
                style={{
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <span
                  className="font-display text-2xl font-bold block mb-0.5"
                  style={{ color: "var(--accent)" }}
                >
                  {item.year}
                </span>
                <h3
                  className="font-display font-semibold text-base mb-1"
                  style={{ color: "var(--text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
