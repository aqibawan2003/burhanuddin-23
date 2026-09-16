"use client";

import { useEffect, useState } from "react";
import { BIRTHDAY_DATE, site } from "@/content/site";

function getTimeLeft() {
  const now = new Date();
  const diff = BIRTHDAY_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, mins, secs };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="w-full py-4 px-6 flex items-center justify-center gap-4 text-center"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      {time === null ? (
        <p className="font-semibold text-sm md:text-base flex items-center gap-2" style={{ color: "var(--accent)" }}>
          <span aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          </span>
          {site.birthdayBand}
        </p>
      ) : (
        <p className="text-sm md:text-base" style={{ color: "var(--muted)" }}>
          <span style={{ color: "var(--accent)" }} className="font-semibold">{site.countdownLabel}: </span>
          {time.days}d {time.hours}h {time.mins}m {time.secs}s
        </p>
      )}
    </div>
  );
}
