# CLAUDE.md — Sports Bridge International Foundation website

## What this project is
Static marketing/impact website for the Sports Bridge International Foundation — the social-impact arm of Sports Bridge International (SBI), an Adidas-franchise sports retailer at Ikoyi Club 1938, Lagos. The site lives at **https://sportsbridgefoundation.com**, repo `https://github.com/Kachi-Obata/SportsBridgeIntlFoundation` (`main`).

**This is an update to an already-built site, not a fresh build.** The site described in `PROJECT_LOG.md` (12 pages, dated 12 June 2026) is the current state of the repo. This update removes the donate/thank-you pages and money-related framing, adds a real "Beyond Borders" section and article, expands imagery, and leaves the logo untouched. Read `PROJECT_LOG.md` first for full context on what already exists and why — then `MIGRATION_BRIEF.md` for exactly what changes now — then the files below, which supersede their earlier versions where they conflict with PROJECT_LOG.md.

## Source-of-truth files (read in this order before writing any code)
1. `PROJECT_LOG.md` — current state of the build: what exists, deviations already made and accepted, decisions from review rounds. Treat §7 deviations as accepted/canonical, not as things to "fix."
2. `MIGRATION_BRIEF.md` — the delta: exactly what's changing in this update and what to leave alone.
3. `DESIGN_BRIEF.md` — binding art direction, tokens, graphic system, motion rules, banned patterns, page-by-page notes. Updated to reconcile with PROJECT_LOG.md's accepted deviations.
4. `CONTENT.md` — all page copy. Use it VERBATIM. Never invent, paraphrase, or "improve" copy. Placeholder stats stay as-is (they will be swapped before launch) and must keep their `<!-- SWAP -->` comments in the built HTML.
5. `IMAGE_MANIFEST.md` — every image slot on the site: description, aspect ratio, treatment, and placeholder-sourcing guidance. The site is now image-led — this supersedes the earlier "~5 photos max" guidance noted in PROJECT_LOG.md §7 item 8.

## Logo — do not touch
Earlier exploratory logo concepts were rejected by the owner. A new logo is being produced separately (designer or owner). **Do not generate, redesign, or modify any logo.** Keep using the existing `assets/logo.png` / `assets/logo-nav.png` exactly as already implemented. When a new logo arrives later it will be a drop-in asset swap — leave a `<!-- SWAP: logo pending -->` comment near each logo `<img>`/reference if not already present.

## Hard constraints
- **Stack:** plain HTML + CSS + vanilla JS. NO React, NO frameworks, NO build step, NO bundlers, NO Tailwind, NO CSS frameworks. One shared `assets/styles.css`, one small `assets/main.js`.
- **Hosting:** GitHub repo → Vercel (static). Root must contain `index.html` directly.
- **Pages (10):** index, about, programmes, impact, news, article-beyond-borders (+ other already-built article placeholders), contact, privacy, terms, 404. Delete `donate.html` and `thank-you.html` from the repo and from nav/footer/sitemap everywhere they're linked.
- **Breakpoints:** 900px (tablet/desktop split), 480px (mobile). Mobile-first or desktop-first is implementer's choice; results must be flawless at 360px, 480px, 768px, 900px, 1280px, 1440px.
- **Fonts:** Oswald + Figtree + IBM Plex Mono via Google Fonts (preconnect + display=swap). No other fonts.
- **Hero video:** the hero (HOME-01) is now a full-viewport `<video>` background, not a static image — see IMAGE_MANIFEST.md. Placeholder file `Temp-SBI-VidHero.mp4` is in the owner's Downloads folder (local filesystem, not the repo); reference it by path for now and mark `<!-- SWAP: replace placeholder hero video with owner-provided footage -->`. Real footage will be supplied later as a drop-in swap. Heavy duotone tint, muted/autoplay/loop/playsinline, poster image fallback for `prefers-reduced-motion`. No scroll-cue indicators and no scroll-snap anywhere on the page (see DESIGN_BRIEF.md §5).
- **Accessibility:** semantic landmarks, single h1 per page, visible focus styles (ink 2px outline offset), alt text on all images (see IMAGE_MANIFEST.md for guidance per image), color contrast AA on all text, `prefers-reduced-motion` disables all non-essential animation.
- **Performance:** no JS libraries. IntersectionObserver for scroll triggers. Inline SVG for field-geometry graphics. Lighthouse performance ≥ 95 on a static host. Optimize/compress all placeholder images (existing assets were already optimized per PROJECT_LOG.md §8 — keep that standard for new images).
- **SEO basics:** `donate.html`/`thank-you.html` removed from `sitemap.xml`; everything else (titles, meta descriptions, OG tags, canonical URLs, favicon) stays as already implemented.

## Funding language — hard rule
The site must not signal in any way that Sports Bridge International Foundation collects money — this is broader than "no donate button." There is no donate button, no Paystack integration, and no donate/thank-you pages anywhere on the site. Do not use, anywhere: "donate," "donation," "fund," "funding," "self-funded," "back," "backing," "sponsorship," or "your gift." The "Get Involved" section (see CONTENT.md) is the only support pathway, and it is framed purely as partnership, volunteering, and access — never money.

## Integrations
- **Remove entirely:** Paystack integration — delete `donate.html`, `thank-you.html`, the `PAYSTACK_PUBLIC_KEY` const, and any other Paystack script/code references.
- **Contact form (keep as-is):** Formspree pattern in `contact.html` — `FORMSPREE_ID = ""` (empty), friendly client-side success message in demo mode. Still marked `<!-- SWAP: Formspree ID -->`.
- **Newsletter footer box (keep as-is):** UI only, non-functional, marked `<!-- SWAP: connect to email tool -->`.

## Facts (use these, not the old placeholders)
- Contact email everywhere: **info@sportsbridgeintl.com** (foundation mailbox doesn't exist yet — replace every instance of `hello@sportsbridge.foundation` from the old package)
- Phone: **+234 909 392 5792** (replace placeholder +234 0000000000)
- Instagram: https://www.instagram.com/shopsportsbridge_
- LinkedIn: https://www.linkedin.com/company/sports-bridge-interational (the "interational" spelling is the real registered URL — do NOT correct it)
- Parent-company link in footer: https://sportsbridgeintl.com
- Location line: Ikoyi Club 1938, Awolowo Road, Ikoyi, Lagos
- Tagline lockup in footer: "Powered by Sports Bridge International"

## Placeholder policy — applies to EVERYTHING, not just stats
Every placeholder on this site — statistics, the timeline, team members, the testimonial, the hero video, and every image in IMAGE_MANIFEST.md — stays a clearly-marked placeholder until the owner swaps it. Specifically:
- Keep all text/number placeholders exactly as written in CONTENT.md, each wrapped with `<!-- SWAP: verify before launch -->`. Do not invent new numbers, names, quotes, or stories to make something feel more "finished" — a marked placeholder is correct; an unmarked invention is not.
- Every placeholder image and the hero video get their own `<!-- SWAP: ... -->` comment per IMAGE_MANIFEST.md's guidance, even after compression/optimization — optimizing a placeholder doesn't make it real.
- The Beyond Borders section/article is the one place with REAL content from press materials — don't mark that as a placeholder, but do mark the tournament date and confirm final photo selections per IMAGE_MANIFEST.md.
- If in doubt about whether something is a placeholder, check IMAGE_MANIFEST.md and CONTENT.md first — both are written to make this unambiguous. When genuinely unclear, leave the SWAP marker rather than removing it.

## Repo hygiene (per PROJECT_LOG.md §9 — keep doing this)
- Git identity: commits authored solely by the owner, no AI co-author lines, messages in their voice.
- `.vercelignore`: add `IMAGE_MANIFEST.md` and `MIGRATION_BRIEF.md` alongside the existing internal docs (`CLAUDE.md`, `DESIGN_BRIEF.md`, `CONTENT.md`, `PRODUCT.md`, `README.md`, `PROJECT_LOG.md`, `.gitignore`) so they stay versioned but don't deploy.
- After this update, append a new dated section to `PROJECT_LOG.md` describing what changed, any new deviations, and an updated SWAP checklist — same format as the existing log.

## Definition of done
- `donate.html` and `thank-you.html` deleted; no remaining links, nav items, footer references, or sitemap entries point to them
- Get Involved and Beyond Borders sections match updated CONTENT.md exactly; no money-related language anywhere (grep for "donat", "fund", "sponsor", "backing" should return nothing in the built HTML)
- Beyond Borders homepage section (06) and article both live, linked correctly
- Every new image slot in IMAGE_MANIFEST.md is filled with a placeholder image, duotone-treated, and marked per its SWAP guidance; existing images (storefront photo, team placeholders, logo) untouched
- Passes the banned-patterns list in DESIGN_BRIEF.md §8 (including: no donate button anywhere)
- Sibling test (DESIGN_BRIEF.md §10) still holds against the SBI store aesthetic
- Valid HTML, no console errors, all internal links resolve, works with JS disabled
- PROJECT_LOG.md updated with a new dated section per "Repo hygiene" above
