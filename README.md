# Sports Bridge International Foundation — Website

Static site for **https://sportsbridgefoundation.com** — the social-impact arm of Sports Bridge International (Ikoyi Club 1938, Lagos). Plain HTML + CSS + vanilla JS; no frameworks, no build step.

Art direction: **Sport Editorial × Field Geometry** (see `DESIGN_BRIEF.md`). All copy from `CONTENT.md` (verbatim). Project constraints in `CLAUDE.md`.

## Structure

```
index.html            Home
about.html            Story, mission/vision, values, timeline, team
programmes.html       The six programmes
impact.html           Stat sheet, outcomes, story, SDG alignment
news.html             Broadsheet news listing
article.html          Single story (duplicate this file for new posts)
contact.html          Enquiry form (Formspree)
donate.html           Donations (Paystack inline popup)
thank-you.html        Post-donation confirmation
privacy.html          Privacy policy
terms.html            Terms of use
404.html              Out of bounds
assets/styles.css     One shared stylesheet (design tokens at the top)
assets/main.js        Scroll triggers, count-ups, nav a11y (enhancement only)
sitemap.xml, robots.txt
```

## Local preview

No build step. Either double-click `index.html`, or serve the folder so all
pages and assets resolve cleanly:

```bash
python3 -m http.server 4173
# then open http://localhost:4173
```

## Deploy (GitHub → Vercel)

1. Push this folder to a GitHub repository (`index.html` must be at the repo root).
2. In [Vercel](https://vercel.com): **Add New → Project**, import the repo.
3. Framework preset: **Other**. Build command: *none*. Output directory: *root*. Deploy.
4. Vercel automatically serves `404.html` for unknown routes on static sites.
5. Add the custom domain `sportsbridgefoundation.com` under **Project → Settings → Domains**, then point the domain's DNS (A record to `76.76.21.21`, or CNAME `cname.vercel-dns.com` for `www`) at Vercel.

Every push to the default branch redeploys automatically.

## Pre-launch SWAP checklist

Search the codebase for `SWAP` — every placeholder is marked with an HTML comment. Before going live:

- [ ] **Paystack live key** — `donate.html`, replace `pk_test_...` in `PAYSTACK_PUBLIC_KEY` with the live public key from the [Paystack dashboard](https://dashboard.paystack.com/#/settings/developers)
- [ ] **Formspree ID** — `contact.html`, paste the form ID into `FORMSPREE_ID` (create a free form at [formspree.io](https://formspree.io))
- [ ] **Newsletter box** — footer form is UI-only; connect to your email tool
- [ ] **Statistics** — all stats on index, programmes and impact are placeholders (`<!-- SWAP: verify before launch -->`)
- [ ] **Timeline** — about.html timeline is illustrative
- [ ] **Team** — about.html names, roles, bios and photos are placeholders
- [ ] **Testimonial** — impact.html quote needs a real, consented quote
- [ ] **News articles** — all stories are placeholders; `article.html` is the template
- [ ] **Photos** — replace placeholder photos with real programme photography (keep the teal duotone treatment: the CSS class `duotone` applies it)
- [ ] **Legal review** — privacy.html and terms.html
- [ ] **Domain DNS** — point sportsbridgefoundation.com at Vercel

## Editing notes

- Design tokens (colors, type, spacing, motion) live at the top of `assets/styles.css` — change them once, they apply everywhere.
- Shared nav and footer are repeated in each page file; keep them in sync when editing.
- All motion respects `prefers-reduced-motion` and the site is fully readable with JavaScript disabled.
