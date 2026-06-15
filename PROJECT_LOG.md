# Project Log — Sports Bridge International Foundation Website

A record of the decisions, implementations, and deviations made while building this site. Written as a handoff so anyone (you, a contractor, or a future session) can understand *why* the site is the way it is, not just what it contains.

**As of:** 12 June 2026
**Repo:** https://github.com/Kachi-Obata/SportsBridgeIntlFoundation (`main`)
**Status:** All 12 pages built, reviewed in-browser, committed and pushed. Not yet deployed to Vercel; pre-launch SWAP items still open (see §10).
**Source-of-truth documents:** `CLAUDE.md` (constraints + integrations), `DESIGN_BRIEF.md` (art direction), `CONTENT.md` (copy). All three are versioned in the repo but excluded from the deployed site via `.vercelignore`.

---

## 1. Snapshot of what was built

12 pages, plain HTML + one shared CSS file + one small JS file. No framework, no build step, no dependencies.

```
index.html  about.html  programmes.html  impact.html
news.html   article.html  contact.html   donate.html
thank-you.html  privacy.html  terms.html  404.html
assets/styles.css   assets/main.js
assets/logo.png  assets/logo-nav.png  assets/favicon.png
assets/favicon-32.png  assets/apple-touch-icon.png
assets/og.png  assets/sbi-store-ikoyi.jpg
sitemap.xml  robots.txt  README.md  PRODUCT.md
```

---

## 2. Stack & architecture decisions

- **Plain HTML/CSS/vanilla JS, no build step.** Mandated by `CLAUDE.md`. One shared `assets/styles.css`, one `assets/main.js`. Confirmed: no React, no Tailwind, no bundler.
- **Design tokens centralised** at the top of `styles.css` (`:root`) exactly as specified in the brief — change a token once, it propagates everywhere.
- **Shared nav + footer markup repeated per page** rather than injected by JS. Reason: the site must work with JavaScript disabled (a `CLAUDE.md` requirement). The trade-off is that nav/footer edits must be made in all 12 files; noted in the README.
- **Progressive enhancement throughout.** Page is fully readable and navigable with JS off: the mobile menu is a CSS-only checkbox toggle, scroll reveals are gated behind a `.js` class so content is visible by default, and stat numerals are rendered at their final value in the HTML (JS only animates the count-up).
- **Semantic z-index scale** (`--z-arc` → `--z-nav`), no arbitrary `9999` values.
- **Local preview** via `python3 -m http.server` (wired into `.claude/launch.json` for the in-editor preview). No tooling needed to view the site.

---

## 3. Tooling decisions (this session)

Before building, three design-skill packages were installed at your request:
- **impeccable** (`npx impeccable skills install`) — design-quality command suite; used its `craft` flow and its anti-pattern detector as a final gate.
- **taste-skill** (13 skills) and **design-motion-principles** — installed into `.agents/skills/` with symlinks for Claude Code, Cursor, Gemini.

All of this tooling lives in gitignored folders (`.claude/`, `.agents/`, `.cursor/`, `.gemini/`, `skills-lock.json`) and is **not** part of the site or the repo content.

A `PRODUCT.md` was generated (impeccable's project-context file). It is committed but excluded from deployment.

---

## 4. Design-system implementation

Built to `DESIGN_BRIEF.md`'s "Sport Editorial × Field Geometry" direction.

- **Tokens** — paper/ink/teal/pink palette used verbatim from the brief (hex values unchanged, including the "do not change" brand DNA: `--teal #1D9E75`, `--teal-deep #14735A`, `--pink #D4537E`).
- **Type** — Oswald (display) + Figtree (body) + IBM Plex Mono (data/labels), loaded via Google Fonts with preconnect + `display=swap`. No other fonts.
- **Field-geometry vocabulary** (the identity, built once and reused):
  - Touchline hero frame with corner quarter-circle arcs, drawn via `stroke-dashoffset` on load.
  - Halfway-line section dividers with a numbered center circle that draws itself on scroll.
  - The **Bridge motif** — the Journey's 4-step pathway rendered as an arched line with step circles seated on the deck, drawn on scroll. This is the site's signature animation.
  - Penalty arcs as low-opacity background geometry.
  - League-table rows for programme/impact stats (no floating cards).
- **Motion** — athletic easing `cubic-bezier(0.22,1,0.36,1)`; line-draw on scroll; stat roll-up (eased, ~900ms); marquee trust bar paused on hover; one orchestrated hero entrance. Full `prefers-reduced-motion` alternative disables all non-essential motion.
- **Color discipline** — pink kept scarce (stat highlight `+`, donate CTA, one hero hover). Two `--teal-deep` full-bleed bands max per page.

---

## 5. Page-by-page implementation notes

- **index** — touchline hero, ruled stat trio, marquee, Mission with ruled 2×2 pillars, the Bridge Journey, programmes as a league table, impact snapshot with roll-up numerals, three-column Get Involved, teal donate band.
- **about** — story hero, real storefront photo (duotone), ruled mission/vision, huge Oswald pull quote, 3×2 values grid, vertical-rail timeline with year circles, 4-up duotone team grid.
- **programmes** — six programmes as alternating editorial rows separated by halfway-line dividers; deep-linkable (`#grassroots-academies` etc.) from the index league table.
- **impact** — big-numeral stat sheet, outcomes as ruled rows, teal full-bleed featured-story band, measurement copy in two columns, six-up SDG grid.
- **news / article** — broadsheet listing with a bordered feature block + ruled rows; article is a narrow clean measure with an icon-button share row.
- **contact** — two columns (mono-labelled details + underline-style form), Google Map embed, Formspree handler.
- **donate** — segmented ruled amount control (one-time/monthly toggle, six tiers + custom), live impact line, Paystack flow.
- **thank-you / 404** — center-circle layout; thank-you reads the Paystack reference from the URL; 404 is "Out of Bounds".
- **privacy / terms** — narrow legal measure, plain-language policies, marked for legal review.

---

## 6. Integrations (preserved per CLAUDE.md)

- **Paystack (donate.html)** — inline popup flow replicated from the original package; restyled UI only. Public key in a single `PAYSTACK_PUBLIC_KEY` const, currently the test key, marked `<!-- SWAP: live Paystack key before launch -->`. Donor flow: tiers + custom amount, one-time/monthly toggle, name+email, popup, redirect to thank-you.html with the reference.
- **Formspree (contact.html)** — `FORMSPREE_ID = ""` (empty), shows a friendly client-side success message in demo mode. Marked for swap.
- **Newsletter footer box** — UI only, non-functional, marked `<!-- SWAP: connect to email tool -->`.

---

## 7. Deviations from the source documents

The brief states deviations need a stated reason. Here is every one I'm aware of.

### From DESIGN_BRIEF.md
1. **Hero headline scale is smaller than specified.** Brief §3 calls for 12–16vw; implemented as `clamp(2.5rem, 10.5vw, 9.5rem)` — capped around 9.5rem.
   *Reason:* the verbatim headline copy ("From the street to the start line — building Africa's next generation through sport.") is long; at 12vw+ it overflowed at tablet/mobile widths, which the brief also bans (§8, "text that overflows its container"). The lockup compensates by stacking two huge display lines and setting the back half as a smaller sub-line. Copy is unchanged.
2. **Section eyebrows no longer repeat the index number.** Brief §3 shows the pattern as `01 / WHO WE ARE`; implemented as just `Who we are`, with the number appearing only in the divider circle.
   *Reason:* your explicit review instruction — the number in both the divider circle and the eyebrow read as duplication. Brief §6 ("mono index in the divider circle") is still satisfied. (Legal pages still carry `01 / Agreement`-style labels because they have no divider circles, so there's no duplication there.)

### From CONTENT.md
3. **Donate-band copy was authored, not lifted.** CONTENT.md points to "the donation prompt copy pattern from the original index.html." I wrote new in-voice copy ("Your gift becomes a boot, a coach, a chance.") rather than copying the original verbatim.
   *Reason:* the original copy carried the old design's tone; this reads truer to the new art direction. Flagging it because it is the one place I generated body copy rather than using CONTENT.md verbatim. **Easy to revert to the original wording if you'd prefer.**
4. **News & article copy is freshly authored placeholder, not the original package's stories.** CONTENT.md says reuse the originals verbatim. The originals were themselves placeholders; I wrote new placeholder stories in the new voice, each marked `<!-- SWAP: placeholder article -->`.
   *Reason:* they were going to be replaced before launch either way, and the new ones match the site's tone. Note this clearly since it's a departure from "verbatim."

### From CLAUDE.md / the original package
5. **Social links trimmed to the two real accounts.** The original footer had Instagram, X, LinkedIn, Facebook. Kept only Instagram and LinkedIn — the two real URLs given in `CLAUDE.md`. Implemented as inline SVG icons (icon fonts and emoji are banned).
   *Reason:* no real X/Facebook URLs were provided; shipping dead `#` links is worse than omitting them. Add them back if those accounts exist.
6. **Second contact email dropped.** The original had both `hello@…` and `partnerships@…`. Per `CLAUDE.md`, only one foundation mailbox exists, so everything points to `info@sportsbridgeintl.com`.
7. **Donate-page emoji removed.** The original used 🎁/🔒 decoratively; emoji-as-icons are banned by the brief, so the meaning is carried by copy and the ruled layout instead.

### Imagery note (within brief limits, but worth stating)
8. **Team photos are full-colour Unsplash images run through the teal duotone CSS.** The brief bans "full-color Unsplash heroes" but permits duotone-treated placeholders. They are placeholders marked for swap. Total photo count is 5 (1 real storefront + 4 team), inside the brief's "~5 max." The only genuinely real photo is `assets/sbi-store-ikoyi.jpg` (the SBI store at Ikoyi Club, from your Downloads).

---

## 8. Decisions made during your review rounds

- Hero stat dividers shortened to vertical pseudo-elements inset from the row edges, and the hero got bottom padding, so the stat block clears the touchline frame's corner arcs.
- A **Home** nav link was added to every page (logo still links home too); `aria-current="page"` marks the active page.
- Social links converted from text to inline SVG icons (footer + article share row).
- Article "Share this story" row redesigned: the label is now a quiet non-interactive caption and the three networks (X, LinkedIn, WhatsApp) are bordered square icon buttons, so the CTA reads as "pick one of these," not as a fourth option.
- **"See our impact"** hero button hovers **pink** (with ink text + pink border for AA contrast) while "Join the Movement" hovers teal — a deliberate green↔pink dynamic. Scoped to the hero only, to respect the pink budget.
- All image assets optimised: nav logo 124KB→38KB, favicon 193KB→29KB, storefront photo 1.2MB→424KB. Favicon set (32px + apple-touch-icon) derived from the logo; OG image generated on-brand.

---

## 9. Repo, deploy & privacy decisions

- **Git identity:** commits are authored solely by you — no "Co-Authored-By" / AI attribution lines, and messages are written plainly in your voice. This is a standing rule for your repos.
- **`.gitignore`** excludes local AI tooling (`.claude/`, `.agents/`, `.cursor/`, `.gemini/`, `skills-lock.json`) and `.DS_Store`.
- **`.vercelignore`** keeps the project docs (`CLAUDE.md`, `DESIGN_BRIEF.md`, `CONTENT.md`, `PRODUCT.md`, `README.md`, `.gitignore`) out of the *deployed* site. Reason: on a static Vercel deploy every repo file is publicly fetchable; the briefs are internal. They stay versioned in git for reference.
- **Deploy path (not yet done):** GitHub → Vercel, framework preset "Other", no build command, output = root. Then point `sportsbridgefoundation.com` DNS at Vercel. Full steps in `README.md`.

---

## 10. Outstanding before launch (the SWAP checklist)

Everything below is marked in-code with `<!-- SWAP -->` comments. `grep -rn "SWAP" *.html` lists them all.

- [ ] **Paystack live key** — replace the test key in `donate.html`.
- [ ] **Formspree ID** — paste the form ID in `contact.html`.
- [ ] **Newsletter box** — wire the footer form to an email tool.
- [ ] **Statistics** — every figure on index/programmes/impact is a placeholder.
- [ ] **Timeline** — the about-page timeline is illustrative.
- [ ] **Team** — names, roles, bios, photos are placeholders.
- [ ] **Testimonial** — the impact-page quote needs a real, consented quote.
- [ ] **News/article** — all stories are placeholder copy.
- [ ] **Photos** — replace placeholders with real programme photography (keep the `.duotone` treatment).
- [ ] **Legal review** — privacy.html and terms.html.
- [ ] **Vercel deploy + domain DNS.**

---

# Update — 15 June 2026 (Beyond Borders migration)

Per `MIGRATION_BRIEF.md` + updated `DESIGN_BRIEF.md` / `CONTENT.md` / new `IMAGE_MANIFEST.md`. Site is now **10 pages** and image-led.

## Money signaling removed (hard rule)
- Deleted `donate.html` and `thank-you.html`, the Paystack integration, and every nav/footer/sitemap reference.
- Nav CTA: pink "Donate" → ink **"Get Involved"** → contact.html (pink is no longer budgeted for a nav button per updated brief §2).
- The recurring teal "donate band" on every sub-page → a non-money **"Get Involved" band** (→ contact.html); removed entirely on contact.html (the form is the action).
- `index` donate band → the new **Beyond Borders** section (06).
- Rewrote `privacy.html` and `terms.html` to drop all donation/Paystack/receipts content (renumbered sections); they now cover only the contact form, newsletter and cookies.
- Scrubbed stray money words in copy (team bio "sponsor", impact "funding partners"/"sponsors", contact form options, article "donors"). `grep -riE 'donat|paystack|sponsor|fund|your gift|gift|donor'` over built HTML returns nothing.

## Beyond Borders (real content, from press materials)
- Homepage section 06 added: Rerhe Idonije quote, the Lagos-tournament context line, and the "what's next" list (migrant tournaments, workshops for mothers/female migrants, multi-sport pathways, support beyond the social).
- New **`article-beyond-borders.html`** (real deep-dive) created; homepage Beyond Borders and the news feature both link to it.
- The news **feature block** is now Beyond Borders (was the freshly-authored "From FIFA to first team" placeholder). That Tunde placeholder was **moved into the listing** as a regular item still pointing at `article.html`, which stays as the generic placeholder/template.

## Hero is now video
- Full-viewport `<video>` (muted/autoplay/loop/playsinline) with heavy teal duotone tint + touchline frame; headline/CTAs overlaid in paper. Stat trio relocated to a ruled **stat strip** directly below the hero. No scroll cue, no scroll-snap.
- Placeholder `Temp-SBI-VidHero.mp4` (owner's Downloads, 12MB, 19.7s) re-encoded → `assets/hero.mp4` (1.0MB) + `assets/hero.webm` (1.4MB), 8s loop @1280, plus `assets/hero-poster.jpg`. **The placeholder footage carries a visible "for Preview" watermark — that's inherent to the owner's temp file, marked SWAP.**
- `prefers-reduced-motion`: JS removes autoplay and shows the poster only.

## Imagery (supersedes the old ~5-photo cap)
- 18 duotone placeholder photos added across home (mission, 4 journey thumbs, 2 Beyond Borders), programmes (6 rows, alternating), impact (featured-story portrait), and the Beyond Borders article (hero + 2 inline). Sources: Unsplash, each URL verified to resolve (HTTP 200) before use; every slot marked `<!-- SWAP: real photo -->`.
- Trust bar gained the SelectUSA line; About timeline gained the "What's next" expansion-cities entry; Mission paragraph 1 updated to the new "strangers together as teammates" wording.
- A `.duotone-paper` treatment (shadows → paper, not teal) was added so photos on the teal bands read lighter than the band instead of disappearing.

## New deviations / decisions (this update)
1. **Sub-page "Get Involved" band copy is authored** ("There's a place for you on the team…") — connective CTA copy, not from CONTENT.md, avoids all banned words. Easy to change.
2. **ABOUT-01 not duplicated** — the existing real storefront photo (16:9, Ikoyi Club setting) already fills the about-hero/setting slot the manifest describes; no second hero image was added.
3. **article.html kept** as the generic placeholder article/template (its Tunde story is now also the first news-listing item).

## Repo hygiene
- Synced updated `CLAUDE.md` / `DESIGN_BRIEF.md` / `CONTENT.md` into the repo; added `IMAGE_MANIFEST.md` + `MIGRATION_BRIEF.md`; both new docs added to `.vercelignore`. Logo untouched; `<!-- SWAP: logo pending -->` markers added near every logo reference.

## Updated pre-launch SWAP checklist
- [ ] **Hero video** — replace `Temp-SBI-VidHero.mp4`-derived `hero.mp4/.webm/.jpg` (watermarked) with real footage
- [ ] **Beyond Borders** — confirm tournament date, and final photo selections (HOME-04A/B, ARTICLE-01–03)
- [ ] **All placeholder photos** — swap the 18 Unsplash placeholders for real programme/event photography (keep `.duotone`)
- [ ] **Formspree ID** (contact.html) · **Newsletter** footer box
- [ ] **Statistics / timeline / team / testimonial** placeholders
- [ ] **Legal review** — privacy.html, terms.html
- [ ] **Logo** — drop-in swap when the new logo arrives (markers in place)
- [ ] **Vercel deploy + domain DNS**
- [x] ~~Paystack live key~~ — removed; no payments on the site
