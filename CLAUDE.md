# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing landing page for **g8suite.com** — the public face of a sovereign enterprise operations platform built by Developers Hub Sdn Bhd (Johor Bahru, Malaysia).

Audience: enterprise decision-makers (government CIOs, bank CTOs, healthcare IT directors, defence procurement, regulated mid-market) across ASEAN, MENA, and emerging markets. The page must read as **trustworthy, sovereign, and architecturally serious** — closer to Palantir / HashiCorp / Cloudflare enterprise pages than a typical SaaS landing page.

## Stack

- **Astro v4+** (TypeScript strict, `output: 'static'`)
- **Tailwind CSS** via `@astrojs/tailwind`
- **`.astro` components only** — no React/Vue/Svelte islands. For interactive bits (mobile menu, sticky nav scroll state) use **vanilla JS in Astro `<script>` blocks** — Astro bundles them as hashed external files so the CSP can stay tight (`script-src 'self'`, no `unsafe-eval`). Do not reintroduce Alpine.js — its CDN build evaluates expression strings as JS, which requires `'unsafe-eval'` and was previously broken.
- **Icons:** Lucide via `lucide-static` inlined as Astro components (or `astro-icon` with the lucide pack).
- **Fonts:** Self-host Inter via `@fontsource-variable/inter` with `font-display: swap`.
- **Deploy:** Netlify (static), config in `netlify.toml`.
- **Performance budget:** Lighthouse Perf ≥ 95, A11y ≥ 95, Best Practices = 100, SEO = 100. Zero client-side JS by default.

## Common commands

```bash
npm install
npm run dev       # local dev server
npm run build     # static build to dist/
npm run preview   # preview built output
npm run astro -- check    # type-check .astro files
```

No test suite is in scope for v1.

## Architecture

Single-page marketing site. One route (`src/pages/index.astro`) composes 13 sections in order via `.astro` components. Section order is intentional — it walks an enterprise buyer from problem → platform → fit → differentiation → product surface → architecture → roadmap → CTA. Do not reorder without a copy reason.

```
src/
├── components/
│   ├── Nav.astro, Footer.astro, Hero.astro
│   ├── ProblemSection.astro, PlatformOverview.astro, BuiltFor.astro
│   ├── Differentiators.astro, TwoStageStrategy.astro
│   ├── Stage1Products.astro, Stage2Products.astro
│   ├── ArchitecturalFoundations.astro, Roadmap.astro, CTA.astro
│   └── ui/  → SectionHeader, ProductCard, PrincipleCard
├── layouts/BaseLayout.astro    # SEO + JSON-LD Organization schema lives here
├── pages/index.astro
├── content/products.ts         # typed product data — single source of truth
└── styles/global.css
```

**Product data is centralised** in `src/content/products.ts`. The Stage 1 products table and Stage 2 wave layout both read from it — never hard-code product names/status in components.

**Two-stage product model** (this is the spine of the page):
- **Stage 1 (IT Operations, Yrs 1–3):** G8ID, g8stack, g8connect, g8deck, g8shield, g8scope, g8flow, g8audit, g8vault.
- **Stage 2 (Business Operations, Yrs 3–7):** g8hr, g8docs, g8procure, g8crm, g8desk, g8finance — across three Waves.
- **Live today:** G8ID, g8stack, g8desk, g8scope. Mark with a green "Live" pill. Others: "In development" or "Planned".
- Note `g8desk` is technically a Stage 2 product but already live — flag it accordingly in Stage2Products.

## Design system

Brand tokens live in `tailwind.config.mjs` — extend, don't override Tailwind defaults.

```
navy: 900 #0A1F44 / 700 #1E3A6F / 500 #3B5998
sky:  400 #7BB3E8 / 100 #DCE9F5
ink:  900 #0F172A / 600 #475569 / 400 #94A3B8
surface: DEFAULT #FFFFFF / soft #F8FAFC / card #F1F5F9
accent.green #10B981   # used only for the "non-negotiable" callout
```

- Predominantly white/soft surfaces, navy as the anchor. Sky-400 used **sparingly** (the tagline, accent rules).
- Section rhythm: `py-20 lg:py-28`. Container: `max-w-7xl px-6 lg:px-8`.
- Borders over shadows: `border-slate-200`. When elevation is needed: `shadow-sm` or `shadow-[0_4px_20px_-8px_rgba(10,31,68,0.1)]`.
- Headings: `tracking-tight`, semibold/bold, weighty.
- Illustrations are **inline SVG line-art** (geometric, navy strokes, sky-400 accents). **No stock photos. No AI imagery.** The layered architecture diagram in `PlatformOverview` is the page's strongest visual moment — build it as inline SVG.
- Honour `prefers-reduced-motion`. No gradients except ≤5% opacity on hero background.

## Content tone — non-negotiable

These rules override any default phrasing. Violations of (2), (3), or (5) are bugs.

1. **Business-operations language, never infrastructure jargon.** g8suite is an organisational operations platform, not "an IT infrastructure suite."
2. **G8ID is identity governance (IGA).** Never describe it as authentication, SSO, or access management. It competes with **SailPoint and Saviynt, not Okta**.
3. **Never mention Keycloak** anywhere. Internal implementation detail, invisible to customers.
4. **No "AI-powered", "revolutionary", "next-generation",** or similar marketing adjectives.
5. **British English spelling** (organisation, centre, programme, behaviour) — matches Malaysian/ASEAN convention.
6. **Sovereignty leads.** Every section reinforces it implicitly; it is the value, not a feature.
7. **Do not invent** claims, statistics, capabilities, customer logos, or testimonials. Copy is lifted faithfully from the source brief.

## Accessibility

- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`). Every section gets an `id` for anchor links.
- All interactives keyboard-navigable with visible `focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2`.
- Decorative SVGs `aria-hidden="true"`; meaningful ones get a `<title>`.
- Skip link to `#main`. Contrast ≥ 4.5:1 body, ≥ 3:1 large text.

## Netlify

`netlify.toml` ships strict security headers (CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy locking down camera/mic/geolocation) and immutable cache for `/_astro/*` and `/assets/*`. CSP is `script-src 'self' 'unsafe-inline'`: `'self'` covers Astro's hashed `/_astro/*.js` bundles; `'unsafe-inline'` is required because Astro inlines small bundled `<script type="module">` blocks directly into HTML (the Nav script is below the inline threshold). All script content is our own bundled build — no third-party CDN, no `'unsafe-eval'`, no user input on the page.

## Out of scope (do not build)

Blog, case studies, customer logos (none real yet), login/auth, pricing page (deliberately omitted — enterprise sales motion), multilingual (English only v1), animations beyond subtle transitions.

## Contact / ownership

Developers Hub Sdn Bhd, Johor Bahru, Malaysia. Primary contact email used in CTAs and JSON-LD: `hello@devhub.my`. Tagline: *"Sovereign. Integrated. Yours."*
