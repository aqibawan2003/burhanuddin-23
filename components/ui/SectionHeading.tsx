"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center mb-12 md:mb-16 ${className}`}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3 shimmer-eyebrow">
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
