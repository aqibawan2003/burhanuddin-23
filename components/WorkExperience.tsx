"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import SectionHeading from "./ui/SectionHeading";

export default function WorkExperience() {
  const work = site.workExperience.filter((e) => e.type === "work");
  const edu = site.workExperience.filter((e) => e.type === "edu");

  const Card = ({
    item,
    i,
  }: {
    item: (typeof site.workExperience)[0];
    i: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="spotlight-card card-glass card-shine card-border-hover flex gap-4 p-5 rounded-2xl"
    >
      <div
        className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
        style={{
          background: item.type === "work" ? "rgba(212,175,55,0.12)" : "rgba(139,69,19,0.1)",
        }}
      >
        {item.type === "work" ? "💼" : "🎓"}
      </div>
      <div>
        <p className="font-semibold text-sm leading-tight" style={{ color: "var(--text)" }}>
          {item.role}
        </p>
        <p className="text-sm mt-0.5" style={{ color: "var(--accent)" }}>
          {item.org}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          {item.period}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section id="work" className="section" aria-label="Work and education">
      <SectionHeading eyebrow="Career & Studies" title="Work & Education" />

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Work */}
        <div>
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "var(--text)" }}
          >
            Experience
          </h3>
          <div className="flex flex-col gap-3">
            {work.map((item, i) => (
              <Card key={i} item={item} i={i} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "var(--text)" }}
          >
            Education
          </h3>
          <div className="flex flex-col gap-3">
            {edu.map((item, i) => (
              <Card key={i} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
