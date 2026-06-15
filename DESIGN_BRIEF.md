# Sports Bridge International Foundation — Design Brief
## Direction: Sport Editorial × Field Geometry
### Handoff for implementation. This brief is binding — deviations need a stated reason.

---

## 1. The concept in one paragraph

The foundation's site is designed like a **sports journal printed on a pitch**. Light, paper-like ground; enormous condensed headlines; hard editorial grid; and a graphic system built entirely from **sports field markings** — touchlines, halfway lines, center circles, penalty arcs, corner quarter-circles — drawn as fine ink lines. Stats are set like league tables. Sections are numbered like fixtures. The site should feel like it was art-directed by a sports magazine, not assembled from a nonprofit template. It must read as the **sibling of the SBI store** (sportsbridgeintl.com / the Shopify store): same teal, same pink, same condensed display voice — but where the store is dark and commercial, the foundation is light, warm, and human.

The one thing a visitor remembers: **the field-line graphic system** — section dividers that are halfway lines, a hero framed by touchlines, a center circle that draws itself as you scroll.

---

## 2. Design tokens

```css
:root {
  /* Ground & ink */
  --paper:        #FAF7F1;  /* warm off-white — page background */
  --paper-dim:    #F1ECE3;  /* slightly deeper panel tone */
  --ink:          #101714;  /* near-black with green undertone — text & lines */
  --ink-soft:     #4A544F;  /* secondary text */

  /* Brand DNA (shared with SBI store — do not change) */
  --teal:         #1D9E75;
  --teal-deep:    #14735A;  /* large color fields, hovers */
  --pink:         #D4537E;  /* HOT accent — scarce by design */

  /* Lines */
  --line:         1.5px solid var(--ink);
  --line-soft:    1px solid rgba(16, 23, 20, 0.18);
}
```

**Color discipline:**
- Paper dominates. Ink does the work. Teal is the primary brand color (buttons, links, large section fields, duotone imagery). 
- Pink appears ONLY for: stat numerals' highlights, one hero hover state (the existing pink↔teal hover split per PROJECT_LOG.md §8), and small "live" markers. If pink exceeds ~3% of any viewport, it's overused.
- One or two full-bleed `--teal-deep` sections per page (e.g., the Beyond Borders band) for rhythm. Never gradients between brand colors (except the logo, which is untouched and out of scope here).

## 3. Typography

| Role | Font | Treatment |
|---|---|---|
| Display / headlines | **Oswald** (Google Fonts) | Uppercase, weight 500–600, tracking -1% to 0, set HUGE — hero headline `clamp(2.5rem, 10.5vw, 9.5rem)` (as implemented; supersedes an earlier 12–16vw spec, which overflowed at tablet/mobile with the verbatim headline copy), section heads 4–6rem. Line-height 0.95–1.0. |
| Body | **Figtree** | 1rem–1.125rem, line-height 1.6, `--ink-soft` for long passages |
| Data / labels / eyebrows | **IBM Plex Mono** | 0.75–0.8125rem, uppercase, letter-spacing 0.08em — used for eyebrows, stat labels, timeline years, table headers, footer meta |

Oswald + Figtree are the same families as the SBI store — this is intentional brand glue. The mono is the foundation's own addition: it gives the editorial/data flavor (fixture lists, stat sheets) and exists nowhere on the store.

Type rules:
- Section pattern: mono eyebrow (plain text, e.g. `Who we are`) → Oswald headline → Figtree body. The section index number appears ONLY in the divider circle, not repeated in the eyebrow — repeating it read as duplication. Legal pages (privacy/terms), which have no divider circles, may still use a numbered label style (e.g. `01 / Agreement`) since there's no duplication there.
- Big numerals (stats, timeline years) set in Oswald, with the unit/label in mono beneath.
- No italic serifs anywhere. No Fraunces, no Playfair, no decorative scripts.

## 4. The field-geometry graphic system

Build a small SVG/CSS vocabulary and reuse it everywhere. All lines `--ink` at 1.5px (or `--paper` at 1.5px on teal sections):

1. **Touchline frame** — a thin inset border framing the hero (like the boundary of a pitch), with corner quarter-circle arcs in the four corners.
2. **Halfway line + center circle** — the standard section divider: a full-width horizontal rule with a circle (≈64–88px) centered on it, optionally containing the section index number in mono.
3. **Penalty arc** — large quarter/semi arcs bleeding off section edges as quiet background geometry (very low ink opacity, ~8–12%).
4. **Corner arcs** — small quarter-circles hooked onto card/table corners instead of border-radius.
5. **The Bridge motif** — for the "Journey" 4-step pathway: a single continuous line that travels through the four steps (Connect → Play → Grow → Rise), drawn on scroll. This is the site's signature animation.
6. **League-table stats** — programme stats and impact figures presented as ruled table rows (mono headers, Oswald numerals), not floating cards.

Cards in general: square corners or corner-arc treatment, `--line-soft` borders, NO drop shadows, NO border-radius > 2px.

## 5. Motion principles

Respect `prefers-reduced-motion` globally. Otherwise:

- **Easing:** athletic, decisive — `cubic-bezier(0.22, 1, 0.36, 1)` (fast out, soft landing). Durations 350–600ms. Nothing bouncy.
- **Line-draw on scroll:** field markings (center circle, the Bridge line, arcs) animate via `stroke-dashoffset` when entering viewport. IntersectionObserver, once per element.
- **Stat roll-up:** numerals count up on first reveal (≤900ms, eased). 
- **Trust bar:** infinite marquee (CSS keyframes, duplicated track), pauses on hover.
- **Hero load:** the touchline frame draws in over the ambient video background; headline lines stagger up (80ms apart) on top. Restrained — the video is background texture, not the moment.
- **Hero video:** muted, autoplay, loop, `playsinline`. `prefers-reduced-motion` → no autoplay, poster image only (same duotone treatment). No scroll-cue indicator anywhere on the page — normal scroll, no scroll-snap.
- **Hover:** links get an underline that draws left→right; buttons invert (paper↔ink or teal fill slides in). 100–200ms.
- **Banned motion:** generic fade-up on every element, parallax backgrounds, scroll-jacking (JS that hijacks/redirects scroll input — CSS-only smooth scrolling and standard anchor links are fine), scroll-snap, scroll-cue arrows/"scroll to explore" indicators, floating/levitating cards, pulsing glows.

## 6. Layout principles

- **Hard grid, asymmetric placement.** 12-col mental grid; headlines may span 10 and start at col 2; body copy in 5–6 col measures. Avoid centered-everything.
- **Ruled structure:** horizontal rules organize the page like a broadsheet. Generous whitespace between sections (8–12rem desktop).
- **Numbered sections** on every page (mono index in the divider circle).
- Breakpoints: 900px (tablet/desktop split), 480px (mobile) — consistent with our other properties.
- Max content width ~1280px with the touchline frame extending nearer the viewport edge.

## 7. Imagery strategy (revised — image-led storytelling)

Owner feedback was explicit: the site should be more of a storyteller, with more imagery and less text. This reverses the earlier "photo-light" stance — the field-geometry system now provides the *frame and rhythm* for photography, not a replacement for it.

- Every major section gets a photographic anchor. See **IMAGE_MANIFEST.md** for the full slot-by-slot plan (description, aspect ratio, placeholder search terms, alt-text guidance).
- **Teal duotone treatment** on every photographic image — grayscale base + teal multiply/screen overlay via a shared `.duotone` CSS class. This is what makes a mix of placeholder/stock images read as one cohesive art direction rather than generic stock.
- Field-geometry elements (touchline frame, corner arcs, halfway lines) now frame and crop photography rather than substituting for it — e.g. the hero image sits inside the touchline frame; programme images get corner-arc crops instead of plain rectangles.
- All placeholder images are marked `<!-- SWAP: real photo -->` (or more specific notes per IMAGE_MANIFEST.md) so they're trivial to find and replace once real programme/event photography is available.
- NEVER: smiling-stock-kids montages, hands-in-huddle clichés, generic corporate-stock framing, or full-color images without the duotone treatment (consistency is what makes placeholders feel intentional).
- **This supersedes the earlier "~5 photos max" guidance** (PROJECT_LOG.md §7 item 8). Existing images (the real storefront photo, the four team placeholders) stay in their slots; everything in IMAGE_MANIFEST.md is additive.

## 8. Banned patterns (hard NOs)

- Pill-shaped navbars, glassmorphism nav, floating rounded nav containers
- Mesh/aurora/purple gradients; any two-brand-color gradient
- Fraunces/serif display + cream "AI nonprofit" look (this is what we're replacing)
- Emoji as icons; icon fonts; generic Heroicons rows of three features
- Uniform rounded-2xl card grids with soft shadows
- Inter/Roboto/Arial/system-ui as a design choice
- Centered hero + two pill buttons + screenshot template
- fade-up-on-scroll applied indiscriminately
- Lorem ipsum — all copy comes from CONTENT.md
- Dark theme (that's the store's territory; the foundation is light)
- Any donate button, donation form, payment UI, or "give/fund/back/sponsor" language — the site does not collect money (see CLAUDE.md "Funding language")

## 9. Page-by-page notes (10 pages)

- **index.html** — Hero is a full-viewport video background (HOME-01, heavy duotone tint, ambient/textured rather than a clear scene) framed by the touchline border, with the stacked Oswald headline, sub-text and two CTAs overlaid in paper-color. No stats and no scroll-cue in the hero itself. Immediately below: a compact ruled stat-strip row (the relocated stat trio) — the natural first thing in view on scroll. Then marquee trust bar (now including the SelectUSA line), Mission (01) with HOME-02 image and four pillars as a ruled 2×2, The Journey (02) with the Bridge line animation and four step thumbnails (HOME-03A–D), Programmes preview (03) as league-table rows linking to programmes.html, Impact snapshot (04) with roll-up numerals, Get Involved (05) three ruled columns — "Partner With Us," "Volunteer & Coach," "Enrol a Child" (no funding/backing language), Beyond Borders (06) as a full-bleed teal section replacing the old donate band, with real tournament photos (HOME-04A/B), the Rerhe quote, and "what's next" content, linking to the Beyond Borders article, footer.
- **about.html** — Story hero with ABOUT-01, mission/vision as two ruled columns with the pull quote set huge in Oswald, six values as a 3×2 ruled grid, timeline as a vertical halfway-line with year markers in circles including the new "What's next" expansion-cities entry, team grid (duotone, square crops, existing placeholders).
- **programmes.html** — Six programmes as alternating editorial rows with PROG-01–06 images: index number, Oswald title, body, stat line in mono, image. Each row separated by halfway-line dividers. Deep-linkable from the index league table (existing anchors preserved).
- **impact.html** — Big-numeral stat sheet (league-table), outcomes as ruled rows, featured story as a teal full-bleed section with the quote in large Oswald plus IMPACT-01 image, SDG alignment as a mono-labeled grid of six.
- **news.html / article pages** — The site already has a feature block + ruled-row listing and freshly-authored placeholder articles (PROJECT_LOG.md §7 item 4). Replace ONE of those placeholder articles with the real Beyond Borders story per CONTENT.md (pick the most generic one to repurpose, or add it as the featured block if that slot is free) — add NEWS-01, ARTICLE-01–03 images. Other placeholder articles and their existing share-row treatment stay as-is.
- **contact.html** — unchanged: two ruled columns (mono-labelled details + underline-style form), map embed, Formspree handler. No image required.
- **privacy.html / terms.html / 404.html** — unchanged: narrow legal measure, mono section labels, center-circle "Out of Bounds" 404.

**donate.html and thank-you.html are removed** — delete the files, the Paystack integration, and every reference to them (nav, footer, sitemap). See CLAUDE.md "Funding language" for the broader rule on money-related copy.

## 10. Relationship to the SBI store (sibling test)

Place the store homepage and this site side by side: same teal, same pink, same condensed display voice → clearly one family. Store = dark, dense, commercial. Foundation = light, airy, editorial, human. If the foundation page could be mistaken for a store page with the colors inverted, it's too close; if it shares no visible DNA, it's too far.
