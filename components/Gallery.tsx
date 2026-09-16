"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { photos } from "@/content/photos";
import Lightbox from "./Lightbox";
import SectionHeading from "./ui/SectionHeading";

// Split photos into columns for masonry
function buildColumns(count: number, numCols: number): number[][] {
  const cols: number[][] = Array.from({ length: numCols }, () => []);
  for (let i = 0; i < count; i++) {
    cols[i % numCols].push(i);
  }
  return cols;
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)), []);

  const cols2 = buildColumns(photos.length, 2);
  const cols4 = buildColumns(photos.length, 4);

  return (
    <section id="gallery" className="section" aria-label="Photo gallery">
      <SectionHeading eyebrow="23 Moments" title="A Life Well Lived" />

      {/* Mobile: 2 columns */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {cols2.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3">
            {col.map((idx) => {
              const p = photos[idx];
              const isPortrait = p.height > p.width;
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                  onClick={() => open(idx)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group focus-visible:outline-[var(--accent)]"
                  style={{ aspectRatio: isPortrait ? "3/4" : "1/1" }}
                  aria-label={`View photo: ${p.caption}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={p.blurDataURL}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Desktop: 4 columns masonry */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {cols4.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-4">
            {col.map((idx) => {
              const p = photos[idx];
              const isPortrait = p.height > p.width;
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: ci * 0.1 + (idx % 5) * 0.05 }}
                  onClick={() => open(idx)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group focus-visible:outline-[var(--accent)]"
                  style={{ aspectRatio: isPortrait ? "3/4" : "1/1" }}
                  aria-label={`View photo: ${p.caption}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={p.blurDataURL}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                    <p className="text-xs text-white/80 text-left">{p.caption}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
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
