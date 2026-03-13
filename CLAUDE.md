# CLAUDE.md — Bikotic Project Context

## Instructions for Claude

- **Keep this file updated.** Any decisions, new context, or changes agreed during a session should be added here before the session ends. This is the only persistent memory across sessions — if it's not in here, it's lost.

---

## What is Bikotic?

A cycling-focused website combining a content magazine (articles, reviews, tools/calculators) with a **hero app**: a visual bike comparison tool that lets users fade/wipe between two bike images side-by-side. The comparison tool is the core product — everything else supports it.

**Live site:** Deployed via Vercel, auto-publishes on push to `main`.
**Repo:** `bikotic-genesis` on GitHub (maccavamzoo).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + @tailwindcss/typography |
| Content | MDX via next-mdx-remote + gray-matter |
| Charts | Recharts |
| Icons | Lucide React |
| Database | Vercel Postgres (Neon), London region, free tier |
| Images | Currently on Hostpapa — migrating to Cloudflare R2 |
| Deployment | Vercel (GitHub integration, auto-deploy on main) |

---

## Current Codebase Structure

```
app/layout.tsx          — Root layout (sticky header, nav, footer)
app/page.tsx            — Homepage (hero CTA links to /compare, latest articles/tools/reviews)
app/compare/page.tsx    — Compare page (client component, "Show Random Bike" button, fetches from DB)
app/api/random-bike/    — API route returning a random bike from the DB (force-dynamic, no cache)
app/articles/[slug]/    — Dynamic MDX article renderer
app/reviews/[slug]/     — Dynamic MDX review renderer (YouTube embeds)
app/tools/              — 6 interactive calculators (gear, VO2, KOM power, lap timer, track cycling, bike business)
lib/db.ts               — Neon DB connection helper (uses DATABASE_URL env var)
lib/mdx.ts              — Reads/parses MDX from content/articles/ and content/reviews/
lib/tools.ts            — Aggregates tool metadata from per-tool metadata.json files
mdx-components.tsx      — Custom MDX component mappings
content/articles/       — 5 MDX articles (bike comparisons)
content/reviews/        — MDX video review pages
public/images/          — Bike comparison photos
migrations/             — SQL migration files (001_initial_schema_fixed.sql is the one to use)
```

---

## The Hero App — Visual Bike Comparison Tool

### What it replaces

The original tool (source preserved in the `claude/explain-codebase-mmnbn77mhdbejcr5-9inOT` branch under `OLD-CODEBASE-V3/`) was:

- Vanilla HTML + Canvas API + Perl CGI + MySQL
- Entire UI drawn on a `<canvas>` element (no DOM elements for the comparison view)
- Core mechanic: two bike images on same canvas, alpha/fade slider blends between them, plus a wipe mode (hard vertical/horizontal split)
- Scaling via `factor = window.innerWidth / 1920.0`
- Zoom + pan on canvas
- Optional hill rotation mode (tilts bike on a slope)
- Filter system (FILTER-V4) hitting Perl API for bike selection
- Additional modules: comments, messenger, share/URL shortening, similar bikes, winning bikes (popularity stats), recent bikes viewed
- Images served as .webp from `https://bikotic.com/SLRGT/BIKE-IMAGES/LRG-WEBP/`

### What we're building

**MVP features:**
- Fade/wipe between two chosen bikes (canvas-based React component)
- Bike picker/filter UI (proper React/DOM, not canvas)
- SEO-friendly URLs: `/compare/[bike1-slug]-vs-[bike2-slug]`
- Individual bike pages: `/bikes/[slug]` (specs, geometry, "Compare this bike" button)
- OG image auto-generation for social sharing (Next.js ImageResponse)
- Server-rendered pages with proper title, description, OG tags

**Future features (design for extensibility now, build later):**
- Geometry diagram overlays on the comparison view
- Different bike sizes from geometry charts
- Measurement lines on the display (measure bikes and geo overlays)
- User "Garage" feature (see Monetisation below)

### Architecture decision: Canvas vs DOM

Canvas is the right choice for the comparison view — needed for pixel-level control once geometry overlays and measurement lines come in. But everything around it (bike picker, filters, UI chrome) should be proper React/DOM.

The canvas component must be designed as an **extensible layer system from day 1**:
1. Base images layer
2. Geometry overlay layer
3. Measurement lines layer
4. UI handles layer

---

## Database

### Current state

- **Vercel Postgres (Neon) database created** — connected to the bikotic-genesis project, London region, free tier
- **Database name:** neon-chestnut-lever
- **All MySQL data migrated to Postgres** — all 4 tables (bikes ~1,196 rows, manufacturers 165, groupset 71, models) populated successfully via psql
- **App is live and querying the DB** — the `/compare` page and `/api/random-bike` route are confirmed working against the Neon database
- **Random bike confirmed working** — uses JS `Math.random()` offset rather than `ORDER BY RANDOM()` (Neon was caching the Postgres random query). Queries all 1,196 bikes with no filters.
- **DB package installed:** `@neondatabase/serverless`
- **DB connection:** `lib/db.ts` uses `DATABASE_URL` env var (confirmed present in Vercel env vars)
- **Fixed migration file** saved at `migrations/001_initial_schema_fixed.sql` on `claude/check-token-usage-yRW2W` (MySQL escape chars fixed for PostgreSQL compatibility)
- **Conversion script:** `scripts/mysql_to_postgres.py` on the `claude/explain-codebase-mmnbn77mhdbejcr5-9inOT` branch

### Schema (4 tables)

| Table | Records | Purpose |
|-------|---------|---------|
| bikes | ~1,196 | Core data — geometry (reach, stack, wheelbase, head_angle, chainstay, bb_drop), specs (weight, price, frame_material, gearing), photo metadata (photo_frame_size for alignment) |
| groupset | 71 | Groupset options across Shimano, SRAM, Campagnolo, MicroShift etc. |
| manufacturers | 165 | Manufacturers with country, founding year, description, link |
| models | — | Bike model names linked to manufacturer |

### Key schema notes

- `bikes` links via `manufacturer_id` → `manufacturers` and `model_id` → `models`
- `photo_frame_size` field stores photo alignment data per bike
- Original MySQL was MyISAM throughout — migrated to PostgreSQL with proper types
- SERIAL primary keys with correct ALTER SEQUENCE RESTART values (bikes at 1399, models at 501, etc.)
- MySQL types mapped: year→SMALLINT, mediumtext→TEXT, float→REAL, enum→TEXT
- No URL slugs in the DB currently — need to generate them from manufacturer + model + year on import

### What still needs doing

1. Generate URL slugs for all bikes

---

## Images

- ~1,196 bike images as .webp files
- Consistently named with an ID number in each filename, stored in the DB
- Currently hosted on Hostpapa at `https://bikotic.com/SLRGT/BIKE-IMAGES/LRG-WEBP/`
- **Plan: Migrate to Cloudflare R2** (zero egress costs, CDN built-in, effectively free at this scale)
- Migration is straightforward: export images, upload to R2, update base URL path in one place

---

## URL / SEO Strategy

This is a major improvement over the old tool (which had zero SEO due to canvas-only rendering).

- `/bikes/[slug]` — Individual bike page (specs, geometry, photo, "Compare this bike" CTA). ~1,196 indexable pages.
- `/compare/[bike1-slug]-vs-[bike2-slug]` — Comparison page. Thousands of possible combinations, each indexable.
- Both page types link to each other naturally.
- Every page server-rendered with proper meta tags and auto-generated OG images.

---

## Monetisation Plan

Priority order:

1. **Affiliate links** (low effort, immediate) — Link to retailers (Chain Reaction, Wiggle, etc.) from bike pages
2. **Pro/Garage tier** (the main revenue engine) — £1.99/month subscription:
   - Users upload their own bike photos
   - Backend alignment tool to match photos to Bikotic coordinate system
   - Compare their bike against all 1,196+ in the database
   - Keep a personal "garage" of their bikes
3. **Future ideas:** Dealer/brand listings, embed widget for cycling blogs, sponsored comparisons, Pro tier (save unlimited comparisons, export PDF spec sheets)

### Garage feature will need new tables:
```
users           — id, email, password_hash, created_at, subscription_status
user_bikes      — id, user_id, bike_name, photo_path, alignment_data (JSON), created_at
subscriptions   — id, user_id, stripe_customer_id, status, started_at, ends_at
```

---

## Git Workflow

Ben is learning Git. The established workflow is:

1. Claude creates a **new branch per task** (e.g. `claude/add-comparison-tool-xyz`)
2. Claude makes changes and pushes to that branch
3. **Vercel auto-creates a preview URL** for the branch — Ben checks it
4. When happy, Ben opens a **Pull Request** on GitHub and clicks **Merge**
5. Vercel sees `main` updated → rebuilds → live site updates
6. **Delete the branch** after merging (branches are copies, not pointers — safe to delete post-merge)

**Important:** Never delete a branch that hasn't been merged if it contains work you still need.

**Simple changes** (deleting a folder, tiny text fix) can be done directly on `main` via GitHub UI — no branch needed.

---

## Known Issues / Technical Debt

- Homepage uses synchronous fs calls at render time — not using Next.js static generation (generateStaticParams, cache)
- No `loading.tsx` or `error.tsx` boundaries anywhere
- Tools are client-side calculators but may be missing `'use client'` directives — needs verification
- README.md is basically empty
- The old codebase analysis branch (`claude/explain-codebase-mmnbn77mhdbejcr5-9inOT`) still exists — migration files have been extracted to main branch, can be deleted when convenient
- `.gitignore` added to repo (was missing)
- Next.js version has a known security vulnerability — needs upgrading at some point

---

## Ben's Preferences

- Direct, no-nonsense communication — don't waffle
- Give info in stages, not all at once
- Deep cycling domain knowledge (track cycling especially)
- Accounting/bookkeeping background — understands business metrics
- Learning Git — explain simply when needed, don't assume knowledge
- Prefers practical, reliable solutions over complexity
- Gets frustrated when Claude loses context or pretends to know things it doesn't — be honest about limitations
