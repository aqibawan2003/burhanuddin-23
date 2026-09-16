# 🎂 Happy 23rd Birthday, Burhanuddin

A cinematic, single-page birthday tribute website built for Burhanuddin's 23rd birthday.

**Live site:** https://happy-birthday-burhanuddin.vercel.app

---

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS v4** with CSS custom properties
- **Framer Motion** for scroll reveals, transitions, micro-animations
- **Lucide React** for SVG icons
- **next/font** (Playfair Display, Plus Jakarta Sans, Caveat)
- **canvas-confetti** (lazy-loaded on interaction)

---

## Sections

| Section | Description |
|---|---|
| Hero | Two-column desktop (aurora bg + portrait photo), full-bleed mobile |
| Countdown | Live countdown strip — switches to birthday message on the day |
| Gallery | 19-photo masonry grid, custom swipe lightbox |
| Timeline | 6 milestone cards, alternating desktop / single-rail mobile |
| Letter | Personal letter with Caveat signature font |
| Cake | Interactive CSS cake with 23 candles + confetti burst |
| Work & Education | Two-column experience + education cards |
| Wishes Wall | 6 wish cards with spotlight hover effect |
| Footer | Developer credit with link |

---

## Editing Content

All text lives in **two files** — no need to touch any component:

### `content/site.ts`
- `BIRTHDAY_DATE` — birthday date constant
- `site.heroSubline` — subtitle under the headline
- `site.timeline` — 6 timeline milestones (year, title, description)
- `site.workExperience` — work and education cards
- `site.letter` — full letter body paragraphs + signature
- `site.wishes` — wish cards (author + text)
- `site.madeBy` / `site.madeByUrl` — footer credit

### `content/photos.ts`
- Array of 19 photo objects — `src`, `alt`, `caption`, `blurDataURL`
- Captions show in the lightbox under each photo

---

## Photos

Photos live in `public/photos/` as `01.jpg` … `20.jpg` (06.jpg removed as duplicate).

### Adding or replacing photos

1. Place original files in `public/photos/originals/` named `01.jpg` … `20.jpg`
2. Run the optimization pipeline:

```bash
npm run optimize:images
```

This will:
- Resize to max 1600px long edge
- Export AVIF + WebP versions
- Generate base64 blur placeholders and write them into `content/photos.ts`
- Strip all EXIF / GPS metadata
- Report a size table and fail loudly if any output exceeds 250 KB

**Note:** `public/photos/originals/` is gitignored — keep a local backup of your originals.

---

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint check
npx tsc --noEmit   # TypeScript check
```

---

## Optional: Background Music

Drop a birthday MP3 at `public/audio/birthday.mp3`. The music toggle (bottom-right corner) will activate it. If the file is absent the site loads without errors — music is off by default and only starts after the user clicks the CTA.

---

## Deployment

The site auto-deploys to Vercel on every push to `main` via the connected GitHub integration.

**Project:** `happy-birthday-burhanuddin` on Vercel  
**Alias:** https://happy-birthday-burhanuddin.vercel.app

---

## Privacy

- `<meta name="robots" content="noindex, nofollow">` is set in `app/layout.tsx`
- `app/robots.ts` disallows all crawlers
- All photo EXIF / GPS metadata is stripped by the optimize script

---

## Developer

Built with love by **[Aqib Ejaz](https://aqibawan2003.vercel.app)**
