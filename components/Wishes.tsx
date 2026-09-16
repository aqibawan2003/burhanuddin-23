"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import SectionHeading from "./ui/SectionHeading";

export default function Wishes() {
  return (
    <section id="wishes" className="section" aria-label="Birthday wishes">
      <SectionHeading eyebrow="From Everyone Who Loves You" title="The Wishes Wall" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {site.wishes.map((wish, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="spotlight-card card-glass card-shine card-border-hover p-6 rounded-2xl flex flex-col gap-3"
            style={{
              background: "var(--surface)",
            }}
          >
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: "var(--muted)" }}
            >
              &ldquo;{wish.text}&rdquo;
            </p>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--accent)" }}
            >
              — {wish.author}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
