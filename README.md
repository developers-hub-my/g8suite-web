# g8suite.com

Marketing landing page for **g8suite** — the sovereign enterprise operations platform built by Developers Hub Sdn Bhd.

Built with Astro + Tailwind CSS. Static output, deployed to Netlify.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
```

## Scripts

| Command           | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Local dev server with HMR                                 |
| `npm run build`   | Type-check (`astro check`) and build static site to `dist/` |
| `npm run preview` | Preview the built site                                    |
| `npm run astro`   | Pass-through to the Astro CLI                             |

## Project layout

```
src/
├── components/
│   ├── Nav.astro, Footer.astro, Hero.astro
│   ├── ProblemSection.astro, PlatformOverview.astro, BuiltFor.astro
│   ├── Differentiators.astro, TwoStageStrategy.astro
│   ├── Stage1Products.astro, Stage2Products.astro
│   ├── ArchitecturalFoundations.astro, Roadmap.astro, CTA.astro
│   └── ui/  → SectionHeader, ProductCard, PrincipleCard
├── content/products.ts        # Product data — single source of truth
├── layouts/BaseLayout.astro   # SEO, OG tags, JSON-LD Organization schema
├── pages/index.astro          # Composes the 13 sections
└── styles/global.css
```

## Editing content

| Where                                       | Edit this                                           |
| ------------------------------------------- | --------------------------------------------------- |
| Product list, status pills, Stage 2 waves   | `src/content/products.ts`                           |
| Hero copy, CTAs                             | `src/components/Hero.astro`                         |
| Section copy (problem, differentiators, …)  | The relevant `src/components/<Section>.astro`       |
| SEO title, description, OG image            | `src/layouts/BaseLayout.astro` props                |
| JSON-LD Organization schema (address, etc.) | `src/layouts/BaseLayout.astro` (`orgSchema` object) |
| Contact email (CTA, footer, schema)         | `src/components/CTA.astro` and `BaseLayout.astro`   |
| Brand colours / type                        | `tailwind.config.mjs`                               |
| Security headers / cache rules              | `netlify.toml`                                      |

The contact email is `hello@devhub.my`. Replace in both `CTA.astro` and `BaseLayout.astro` if it changes.

## Content tone — non-negotiable

These rules govern every word that ships:

1. Business-operations language, never infrastructure jargon.
2. **G8ID is identity governance (IGA).** Never authentication, SSO, or access management. Competes with SailPoint and Saviynt — not Okta.
3. **Never mention Keycloak.** Internal implementation detail.
4. No "AI-powered", "revolutionary", "next-generation".
5. **British English** — organisation, centre, programme, behaviour.
6. Sovereignty leads. It is the value, not a feature.
7. Do not invent claims, statistics, capabilities, or customer logos.

## Deploy to Netlify

The repo includes `netlify.toml` with build command, publish directory, security headers (CSP, X-Frame-Options, Permissions-Policy), and immutable caching for `/_astro/*` and `/assets/*`.

1. Push the repo to GitHub.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml`. Click **Deploy site**.
4. Add the custom domain `g8suite.com` under **Domain management**.

CSP: `script-src 'self' 'unsafe-inline'`. `'self'` covers Astro's hashed `/_astro/*.js` bundles; `'unsafe-inline'` is needed because Astro inlines small bundled `<script type="module">` blocks directly into HTML (the Nav script is below the inline threshold). No third-party scripts, no `'unsafe-eval'`, no CDN dependencies.

## Performance budget

Targets:

- Lighthouse Performance ≥ 95
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

Near-zero client-side JS. The only script is a small (~1KB) bundled vanilla JS handler in `Nav.astro` for the mobile menu and sticky-nav scroll state.

## Stack

- **Astro v4** — static output, TypeScript strict
- **Tailwind CSS v3** — design tokens in `tailwind.config.mjs`
- **Vanilla JS** in Astro `<script>` blocks — bundled by Astro for the mobile menu and scroll state
- **astro-icon + @iconify-json/lucide** — inline SVG icons
- **@fontsource-variable/inter** — self-hosted variable font

## Out of scope (v1)

Blog, case studies, customer logos, login/auth, pricing page, multilingual.

## Licence

Proprietary © Developers Hub Sdn Bhd.
