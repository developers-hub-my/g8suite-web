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

The home route (`src/pages/index.astro`) composes the marketing sections in order via `.astro` components. Section order is intentional — it walks an enterprise buyer from problem → platform → fit → differentiation → product surface → architecture → roadmap → CTA. Do not reorder without a copy reason. Alongside it, the **products collection** drives a lineup index (`/products`) and one detail page per product (`/products/[code]`).

```
src/
├── components/
│   ├── Nav.astro, Footer.astro, Hero.astro
│   ├── ProblemSection.astro, PlatformOverview.astro, BuiltFor.astro
│   ├── Differentiators.astro, TwoStageStrategy.astro
│   ├── Stage1Products.astro, Stage2Products.astro   # homepage lineup — read the collection
│   ├── ArchitecturalFoundations.astro, Roadmap.astro, CTA.astro
│   └── ui/  → SectionHeader, PrincipleCard
├── content/
│   ├── config.ts               # Zod schema for the `products` collection
│   └── products/<code>.md      # one file per product — single source of truth (26 files)
├── lib/
│   ├── taxonomy.ts             # stage/status/tier/deployment/engine → label + badge maps
│   └── products.ts             # getProducts() / getStageProducts() — the shared fetch
├── layouts/BaseLayout.astro    # SEO + JSON-LD Organization schema lives here
├── pages/
│   ├── index.astro
│   └── products/index.astro, products/[slug].astro
└── styles/global.css
```

**Product data is a typed Astro content collection.** One Markdown file per product under `src/content/products/`, validated by the Zod schema in `src/content/config.ts`; the filename **is** the `code` **is** the slug. Nav, Footer, `Stage1Products`, `Stage2Products` and both `/products` pages all read it via `src/lib/products.ts` — never hard-code product names/status in components, and add a product by dropping in a Markdown file (no template edits). The build fails on any schema violation. See `documentation/products.md` for the full content-model spec.

**Three-stage product model** (26 products):
- **Stage 1 · IT Operations (16):** g8stack, g8connect, g8id, g8shield, g8vault, g8key, g8scope, g8monitor, g8deck, g8flow, g8work, g8test, g8mail, g8audit, g8board, g8desk.
- **Stage 2 · Business Operations (6):** g8hr, g8finance, g8docs, g8procure, g8crm, g8cdp.
- **Stage 3 · Industry Applications (4):** g8member, g8gather (gatherhub), g8pos (warung.my), g8research (kajian.space) — built in the suite, sold standalone under their own brands.
- **Status** is one of `live | upcoming | in_progress | roadmap | brd`; the detail-page **tier** (Full/Preview/Interest) and every badge derive from it — never store a separate tier. `live` gets the green pill.
- **g8desk** is live and classified as a **Stage 1** service-management product (it was previously sequenced under business operations).
- **External-brand products** (`alias` + `domain`: g8scope→nadi.pro, g8mail→waumail.my, g8gather→gatherhub.app, g8pos→warung.my, g8research→kajian.space) **link out** to their own domain from their detail page — never redirect inward, so brand equity stays with them. `g8scope` is the observability product delivered as the **nadi.pro** app.
- **Pricing is never displayed.** The `pricing` frontmatter field is internal record only; every price surface renders "Contact us for more details" (enterprise sales motion).

## Design system — "Sovereign Instrument"

The site runs a **light-default theme with an opt-in dark mode toggle** (nav sun/moon button; choice persisted to `localStorage.theme`; a no-flash `is:inline` init script sits in `BaseLayout` `<head>`). Light is the credible "official face" for gov/bank/defence buyers; dark is the console alternative.

**Tokens are semantic CSS variables, not raw palette classes.** They live as RGB channels in `src/styles/global.css` (`:root` = light, `.dark` = overrides) and are mapped in `tailwind.config.mjs` via `rgb(var(--x) / <alpha-value>)`, so opacity modifiers (`bg-brass/40`) work and every value flips per theme. **Write each component once with semantic classes — do NOT scatter `dark:` variants.** SVG diagrams use `fill-*/stroke-*` utilities so they theme automatically.

```
Semantic class → --var        light            dark
bg            → --bg          #FCFCFA          #0A1628 (deep navy)
soft         → --soft         #F4F6F9          #0F2138   (alt band / fills)
card / card-2→ --card/-2      #FFFFFF / #F1F5F9  #0F2138 / #16294A
line / -strong→ --line/-strong hairlines
body / muted / faint → text primary / secondary / caption
brass        → --brass        #3B5998 (navy-500) #7BB3E8 (sky-400)   ← the accent
brass-soft/on→ hover / text-on-accent
green        → --green        #059669          #34D399   (non-negotiable ONLY)
```

- **Accent is the brand blue family, never gold/brown.** `brass` is a legacy token *name* only — its value is navy-blue on light, sky-blue on dark. Predominantly white/navy on light; navy ground + sky accent on dark.
- **Typography is normal — no wide letter-spacing, no spaced-out uppercase labels** (an explicit, firm user preference). Fonts (self-hosted): **Archivo** (`font-display`, normal width — not stretched) for headings, **Inter** (`font-sans`) for body, **IBM Plex Mono** (`font-mono`, via `.code`) *only* for real data (product codes, coordinates). Use the `.eyebrow` class (normal-case sans + small accent tick) for section eyebrows.
- **Signature:** the `.perimeter` frame (hairline border + accent corner ticks) wraps the Hero and CTA as bookends. A faint themed blueprint grid (`.grid-ground`) sits behind the hero.
- **Never use the word "spine"** (explicit, firm user preference — swept out deliberately), and never replace it with "foundation", "core", "backbone", or any equivalent. The whole central-dependency metaphor is rejected, not just its name.
- **Never frame g8suite as resting on 3 core services.** Do not present g8id/g8audit/g8flow as a mandatory core, do not say products "rely on", "stand on", "inherit from", or "orbit" them, and do not draw a base/hub with products attached. The user explicitly disagrees with this framing. **Positioning is generic and holistic:** g8suite is one ecosystem of {total} products across IT, business and industry operations; identity, audit and workflow are **capabilities every product shares** because it was built as one suite — described generically ("one identity model", "one audit trail"), not routed through three product names. The `spine[]` frontmatter field is a legacy internal name only; it renders as "Works with" and is never shown to users.
- Section rhythm: `py-20 lg:py-28` (`.section`). Container: `.container-page` (`max-w-7xl px-6 lg:px-8`).
- Borders over shadows: `border-line`. Elevation: `shadow-elevated` (theme-aware via `--shadow`).
- Illustrations are **inline SVG line-art** (monochrome fills via `fill-card/soft/card-2/line`, accent via `fill-brass`/`stroke-brass`, apex highlighted in the accent). **No stock photos. No AI imagery.**
- Honour `prefers-reduced-motion`. No gradients except a ≤8% accent radial on the hero background.
- **Favicon** (`public/favicon.svg`) is the **`g8`** monogram only; the full **`g8suite`** wordmark is the primary logo (Nav + Footer).

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
