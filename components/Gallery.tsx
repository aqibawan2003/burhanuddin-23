"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { photos } from "@/content/photos";
import Lightbox from "./Lightbox";
import SectionHeading from "./ui/SectionHeading";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)), []);

  return (
    <section id="gallery" className="section" aria-label="Photo gallery">
      <SectionHeading eyebrow="23 Moments" title="A Life Well Lived" />

      {/* Uniform square grid — 2 cols mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {photos.map((p, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (idx % 8) * 0.05 }}
            onClick={() => open(idx)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group focus-visible:outline-[var(--accent)]"
            style={{
              aspectRatio: "1 / 1",
              boxShadow: "var(--shadow)",
            }}
            aria-label={`View photo: ${p.caption}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              loading={idx < 4 ? "eager" : "lazy"}
              decoding="async"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={p.blurDataURL}
            />
            {/* Hover overlay + caption */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
            <div
              className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent)" }}
            >
              <p className="text-xs text-white/85 text-left leading-snug">{p.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
