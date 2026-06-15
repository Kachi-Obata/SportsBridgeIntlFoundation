# MIGRATION_BRIEF.md — Updating the existing build

**Read this after PROJECT_LOG.md and before the updated DESIGN_BRIEF.md / CONTENT.md / IMAGE_MANIFEST.md.**

PROJECT_LOG.md describes the site as it exists right now (12 pages, repo `Kachi-Obata/SportsBridgeIntlFoundation`, dated 12 June 2026). Since that build, three pieces of owner feedback came in. This document is the delta — what changes, what doesn't, and why. The updated DESIGN_BRIEF.md, CONTENT.md, and the new IMAGE_MANIFEST.md supersede their earlier versions where they conflict with PROJECT_LOG.md, but everything in PROJECT_LOG.md §7–§9 that ISN'T addressed below should be left exactly as-is.

---

## 1. No money-related signaling, anywhere — not just "remove the donate button"

The owner's instruction was broader than removing donate.html: **the site should not signal in any way that the foundation collects money.** This affects more than donate.html:

- Delete `donate.html` and `thank-you.html` entirely. Remove the Paystack integration (`PAYSTACK_PUBLIC_KEY` and related code), and every nav/footer/sitemap reference to either page.
- Remove the donate band from index.html (PROJECT_LOG.md §7 item 3 — the freshly-authored "Your gift becomes a boot, a coach, a chance" copy). This is replaced by the new **Beyond Borders** section (see CONTENT.md §06) — different content, different purpose, not a funding ask.
- The "Get Involved" section (CONTENT.md §05) is rewritten: it was "Back a Programme" with funding/in-kind/backing language in an earlier draft of CONTENT.md — that draft was never built, but if any of that language exists anywhere, replace it. The final version is "Partner With Us," "Volunteer & Coach," "Enrol a Child" — partnership, time, and access only.
- Banned words anywhere on the site, in any language variant: "donate," "donation," "fund," "funding," "self-funded," "back," "backing," "sponsorship," "your gift."

## 2. New Beyond Borders content (real, not placeholder)

Add section 06 to index.html per CONTENT.md — the migrant-integration story built from real press materials (the Lagos tournament, the Rerhe Idonije quote, the national-expansion plans, and the "what's next" future programming). This is genuine content, not a placeholder, though the tournament date and photos still need confirming (marked accordingly).

Also add a Beyond Borders article. PROJECT_LOG.md §7 item 4 notes the news/article pages currently hold freshly-authored placeholder stories (a deviation from CONTENT.md's original "verbatim from the original package" instruction, which was itself moot since the originals were placeholders too). **Replace one of those freshly-authored placeholders with the real Beyond Borders story** per CONTENT.md — pick whichever existing placeholder is most generic/easiest to swap, update news.html's listing to point to it, and add the new images (NEWS-01, ARTICLE-01–03).

## 3. Imagery expands — IMAGE_MANIFEST.md supersedes the "~5 max" guidance

PROJECT_LOG.md §7 item 8 notes the build stayed within "the brief's ~5 max" photo count (1 real storefront + 4 team placeholders). That cap is superseded — the owner wants the site to be more visual, with images at every major section. Work through IMAGE_MANIFEST.md (new file) for the full plan. The existing 5 images stay exactly where they are; everything in the manifest is additive. Apply the same `.duotone` treatment already established for the team photos.

## 4. About timeline addition

Add the new "What's next" entry (Abuja/Port Harcourt/Kano/Ibadan expansion) to the existing vertical-rail timeline per updated CONTENT.md. Same year-circle treatment as the existing entries.

## 5. Trust bar addition

Add the SelectUSA line to the existing marquee per updated CONTENT.md. No structural change — it's one more item in the loop.

## 6. Mission section copy update

Paragraph 1 of the Mission section (01 / Who we are) has new wording per CONTENT.md — incorporates "strangers together as teammates" and "the underserved, the overlooked, and the newly arrived" as a bridge into the Beyond Borders theme. Swap the text; no layout change.

## 7. Logo — hands off

A new logo is being made separately (designer or owner's own work). Do not generate, redesign, or touch the logo in any way. Keep `assets/logo.png` / `assets/logo-nav.png` / favicons exactly as PROJECT_LOG.md describes them (already optimized: nav logo 124KB→38KB, favicon 193KB→29KB). If a `<!-- SWAP: logo pending -->` marker isn't already near the logo references, add one — that's the only logo-related change.

## 8. Everything else stays as-is

In particular, preserve all of PROJECT_LOG.md §7's accepted deviations (hero headline clamp, eyebrow pattern without repeated index numbers, trimmed social links as inline SVG, single contact email) and §8's review-round decisions (hero stat dividers, Home nav link, `aria-current`, hover color split, article share-row treatment). DESIGN_BRIEF.md has been updated to reflect these as canonical, so there's no conflict to resolve — just don't "fix" them back toward the original spec.

## 9. After this update

Append a new dated section to PROJECT_LOG.md documenting: the donate/thank-you removal, the Beyond Borders addition (homepage section + article, including which placeholder article was replaced), the new images added and their sources, and an updated SWAP checklist (drop the Paystack item, add anything new from IMAGE_MANIFEST.md and the tournament date/photos). Same format as the existing log — this is how the next handoff stays accurate.

## 10. Hero becomes a video background (new since the build described in PROJECT_LOG.md)

The hero was built per PROJECT_LOG.md §4–5 as a touchline-framed static layout with an orchestrated headline-stagger entrance and a stat trio. That layout now changes:

- The hero background becomes a full-viewport `<video>` (HOME-01 in IMAGE_MANIFEST.md) — muted, autoplay, loop, `playsinline`, heavy duotone tint so it reads as ambient texture rather than a clear scene. Placeholder file `Temp-SBI-VidHero.mp4` (owner's Downloads folder, local path) stands in until real footage arrives — mark accordingly.
- The stat trio moves OUT of the hero into a new compact ruled "stat strip" immediately below it (see CONTENT.md). This is the first thing in view on scroll — no scroll-cue arrow needed or wanted.
- `prefers-reduced-motion` → video doesn't autoplay, poster image (same duotone still) is shown instead. This was already a requirement for other motion on the page; now it also covers the hero.
- No scroll-snap. A full-viewport-video-then-snap idea was considered and dropped — normal scroll behavior throughout, consistent with the rest of the site.
- Touchline frame, headline stagger, and CTA placement are otherwise unchanged from the existing implementation — only the background and the stat-trio position change.

---

## Resulting page list (10)
`index.html` · `about.html` · `programmes.html` · `impact.html` · `news.html` · article pages (one now Beyond Borders, real content) · `contact.html` · `privacy.html` · `terms.html` · `404.html`
