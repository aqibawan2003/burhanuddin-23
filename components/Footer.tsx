"use client";

import { site } from "@/content/site";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="text-center py-10 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
      role="contentinfo"
    >
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Made with{" "}
          <span role="img" aria-label="love" style={{ color: "#c0392b" }}>
            ♥
          </span>{" "}
          for Burhanuddin &mdash; {new Date().getFullYear()}
        </p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Developed by{" "}
          <a
            href={site.madeByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--accent-2)" }}
          >
            {site.madeBy}
          </a>
        </p>
        <button
          onClick={scrollTop}
          className="text-xs px-4 py-2 rounded-full transition-colors"
          style={{
            color: "var(--muted)",
            border: "1px solid var(--border)",
          }}
          aria-label="Back to top"
        >
          Back to top &uarr;
        </button>
      </div>
    </footer>
  );
}
