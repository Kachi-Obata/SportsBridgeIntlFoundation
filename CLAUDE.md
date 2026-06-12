# CLAUDE.md — Sports Bridge International Foundation website

## What this project is
Static marketing/impact website for the Sports Bridge International Foundation — the social-impact arm of Sports Bridge International (SBI), an Adidas-franchise sports retailer at Ikoyi Club 1938, Lagos. The foundation site will live at **https://sportsbridgefoundation.com**. A previous version of this site (9 HTML pages, built externally) exists in the reference folder; we are REBUILDING it to the new art direction. Reuse its copy and structure where instructed; do not reuse its visual design.

## Source-of-truth files (read all three before writing any code)
1. `DESIGN_BRIEF.md` — binding art direction, tokens, graphic system, motion rules, banned patterns
2. `CONTENT.md` — all page copy. Use it VERBATIM. Never invent, paraphrase, or "improve" copy. Placeholder stats stay as-is (they will be swapped before launch) and must keep their `<!-- SWAP -->` comments in the built HTML.
3. The original site package from the reference folder (`From Rerhe for the foundation/` or as provided) — source for: `assets/logo.png`, `assets/logo-nav.png`, the Paystack integration pattern in `donate.html`, the Formspree pattern in `contact.html`, and copy for pages not covered by CONTENT.md (news.html, article.html, thank-you.html).

## Hard constraints
- **Stack:** plain HTML + CSS + vanilla JS. NO React, NO frameworks, NO build step, NO bundlers, NO Tailwind, NO CSS frameworks. One shared `assets/styles.css`, one small `assets/main.js`.
- **Hosting:** GitHub repo → Vercel (static). Root must contain `index.html` directly.
- **Pages (12):** index, about, programmes, impact, news, article (template), contact, donate, thank-you, privacy, terms, 404.
- **Breakpoints:** 900px (tablet/desktop split), 480px (mobile). Mobile-first or desktop-first is implementer's choice; results must be flawless at 360px, 480px, 768px, 900px, 1280px, 1440px.
- **Fonts:** Oswald + Figtree + IBM Plex Mono via Google Fonts (preconnect + display=swap). No other fonts.
- **Accessibility:** semantic landmarks, single h1 per page, visible focus styles (ink 2px outline offset), alt text on all images, color contrast AA on all text, `prefers-reduced-motion` disables all non-essential animation.
- **Performance:** no JS libraries. IntersectionObserver for scroll triggers. Inline SVG for field-geometry graphics. Lighthouse performance ≥ 95 on a static host.
- **SEO basics:** unique title + meta description per page, OG tags (og:image = generated brand image), canonical URLs on sportsbridgefoundation.com, `sitemap.xml`, `robots.txt`, favicon set derived from logo.

## Integrations (preserve exactly, do not "modernize")
- **Donations:** Paystack inline popup, public key in a single const: `const PAYSTACK_PUBLIC_KEY = "pk_test_..."` near the bottom of donate.html. Keep the test key from the original package; mark with `<!-- SWAP: live Paystack key before launch -->`. Donor flow: amount tiers + custom amount, one-time/monthly toggle, name + email, popup payment, redirect to thank-you.html with reference. Replicate the original donate.html logic; restyle the UI only.
- **Contact form:** Formspree pattern from the original contact.html — `const FORMSPREE_ID = "";` empty until launch, friendly client-side success message when empty. Mark with `<!-- SWAP: Formspree ID -->`.
- **Newsletter footer box:** UI only, non-functional, marked `<!-- SWAP: connect to email tool -->`.

## Facts (use these, not the old placeholders)
- Contact email everywhere: **info@sportsbridgeintl.com** (foundation mailbox doesn't exist yet — replace every instance of `hello@sportsbridge.foundation` from the old package)
- Phone: **+234 909 392 5792** (replace placeholder +234 0000000000)
- Instagram: https://www.instagram.com/shopsportsbridge_
- LinkedIn: https://www.linkedin.com/company/sports-bridge-interational (the "interational" spelling is the real registered URL — do NOT correct it)
- Parent-company link in footer: https://sportsbridgeintl.com
- Location line: Ikoyi Club 1938, Awolowo Road, Ikoyi, Lagos
- Tagline lockup in footer: "Powered by Sports Bridge International"

## Placeholder policy
All statistics, the timeline, team members, and the testimonial are KNOWN placeholders. Keep them exactly as written in CONTENT.md, each wrapped with an HTML comment `<!-- SWAP: verify before launch -->`. Do not invent new numbers and do not delete these markers.

## Definition of done
- All 12 pages built, linked, and consistent (shared nav/footer markup, identical token usage)
- Passes the banned-patterns list in DESIGN_BRIEF.md §8
- Sibling test (DESIGN_BRIEF.md §10) holds against the SBI store aesthetic
- Valid HTML, no console errors, all internal links resolve, works with JS disabled (content readable, nav usable; animations are enhancement only)
- README.md with: local preview instructions, deploy steps (GitHub → Vercel), and the pre-launch SWAP checklist (Paystack live key, Formspree ID, stats, team, photos, domain DNS)
