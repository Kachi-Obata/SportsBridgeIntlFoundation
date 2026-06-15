# IMAGE_MANIFEST.md — Placeholder image plan

The site is now image-led (per owner feedback: "more storyteller, less wordy"). Every slot below needs a placeholder image at launch, each marked `<!-- SWAP: real photo -->` in the HTML so it's easy to find later. All photographic images get the **teal duotone treatment** from DESIGN_BRIEF.md §7 (grayscale base + teal tint), applied identically across the site so a mix of stock/placeholder images still reads as one cohesive art direction.

**Placeholder sourcing:** Unsplash and Pexels are both free-to-use and good sources. Search terms below are starting points — prioritize images with: natural light (not studio/posed), candid action over posed smiling-at-camera, diverse ages/genders matching the section's subject, and Africa/Lagos settings where the search allows it. Avoid: stretcher clichés (hands-in-huddle, single basketball mid-hoop), anything that looks like a corporate stock-photo set, and crowded/busy backgrounds that will fight the duotone treatment.

**Treatment recap:** grayscale base, teal (`--teal` #1D9E75) overlay at low opacity via `mix-blend-mode: multiply` or `screen` depending on the source image's tonal range — test both, use whichever preserves facial detail. Apply via a shared CSS class (e.g. `.duotone`) so the treatment is centrally adjustable.

---

## HOME (index.html)

**HOME-01 — Hero video background**
What: Full-viewport `<video>`, muted/autoplay/loop/playsinline — a montage of different sports (placeholder file: `Temp-SBI-VidHero.mp4`, owner-provided real footage to follow). <!-- SWAP: replace placeholder hero video with owner-provided footage -->
**Compression target:** the placeholder file is currently 12.1MB — too heavy for an autoplay hero on a static site. Re-encode before use: H.264 mp4 + VP9/AV1 webm, max ~1280px wide, trim to the shortest loop that still feels like a montage (aim 6–10s), target bitrate that lands the file under ~2–3MB total. This applies to the placeholder now, not just the eventual real footage — a 12MB placeholder still loads on every visit until swapped.
Treatment: This is a deliberately understated background element, not a focal visual — apply a heavy teal duotone tint (higher opacity than the standard `.duotone` treatment used elsewhere) so the footage reads as ambient texture, not "watch this clip." Headline, sub-text and the two CTA buttons sit on top in paper-color; the touchline frame overlays as a border on top of everything.
Poster image: a still frame from the video, same heavy duotone treatment. Used as the `<video poster>` and as the entire visual for `prefers-reduced-motion` (video does not autoplay; poster only).
No stat trio and no scroll-cue indicator in the hero — stats moved to the strip immediately below (see Stat strip in CONTENT.md).

**HOME-02 — Mission section image**
What: A coach or mentor with one or two young people — a quieter, relational moment (coaching conversation, demonstrating a skill). Contrasts with the energy of HOME-01.
Where: Beside the Mission section copy (01 / WHO WE ARE), in a portrait frame.
Aspect: 4:5. Duotone.
Search terms: "coach mentoring young athlete", "football coach talking to player"

**HOME-03A to 03D — The Journey (four step thumbnails)**
What: One small image per step, each illustrating the stage:
- 03A (Connect): gaming/esports setup — controller, screen, headset, young person gaming
- 03B (Play): kids on an outdoor pitch, first-touch/taster-day energy
- 03C (Grow): structured academy training — drills, coaching, kit
- 03D (Rise): an older teen/young adult in a more "graduated" context — coaching others, in a classroom, or in workwear at a sports facility
Where: Alongside each step on the Bridge-line pathway graphic.
Aspect: 1:1. Duotone.
Search terms: "esports gaming setup", "football training drill Africa", "youth football academy", "young coach mentoring"

**HOME-04A, 04B — Beyond Borders section**
What: Real photos from the international tournament (confirmed available). 04A: a wide/group shot that visibly shows the mix of nationalities — this is the anchor image for the section and doubles as ARTICLE-01. 04B: a candid interaction shot — people from different backgrounds talking, playing, or sharing a moment together.
Where: Full-bleed teal section, images as accents alongside the quote and "what's next" content.
Aspect: 04A 3:2, 04B 4:5. Apply the standard `.duotone` treatment, but since these sit on the teal band, use a paper-tone tint rather than teal-on-teal (same note as IMPACT-01).
Note: <!-- SWAP: confirm final crops/selections with owner -->. If additional tournament photos are available, 1–2 more can supply ARTICLE-02/03 below — saves sourcing placeholders for those slots.

---

## ABOUT (about.html)

**ABOUT-01 — Hero image**
What: A different angle on the foundation's setting — could be the Ikoyi Club grounds, a wider community shot, or a group of participants from multiple programmes together. Should feel like "the bigger picture" vs. the homepage's action focus.
Where: About page hero, beside/behind the headline.
Aspect: 16:9. Duotone.
Search terms: "sports club grounds Lagos", "community sports field Nigeria"

**ABOUT-02A to 02D — Team photos**
What: Four placeholder headshots for `[Founder Name]` and three `[Name]` slots. Use neutral, professional headshot placeholders — square crop, similar lighting/background across all four so they read as a set.
Where: Team grid.
Aspect: 1:1, minimum 400×400px. Duotone.
Search terms: "professional headshot portrait" (choose a consistent style/lighting across all four)
Note: <!-- SWAP: real team photos, names, roles, bios -->

---

## PROGRAMMES (programmes.html)

One image per programme row, alternating left/right in the editorial layout. All 3:2, duotone.

- **PROG-01 (Grassroots Academies):** kids training on an outdoor pitch, multiple sports/equipment visible if possible. Search: "youth grassroots sports training"
- **PROG-02 (Bridge Gaming League):** esports/gaming session, screens and players visible, energetic. Search: "esports tournament players"
- **PROG-03 (Girls on the Ball):** girls/young women playing football, action shot. Search: "girls football team Africa"
- **PROG-04 (School Leagues & Scholarships):** school sports day, trophy presentation, or inter-school match. Search: "school sports day Africa", "students sports trophy"
- **PROG-05 (Estate Tournaments):** community tournament with a crowd/spectators, pop-up/local feel. Search: "community football tournament crowd"
- **PROG-06 (Coach & Career Academy):** coaching session or classroom/training-room setting with adults. Search: "coaching certification training session"

---

## IMPACT (impact.html)

**IMPACT-01 — Featured story image**
What: Portrait of a young person (placeholder until Tunde A.'s real photo/consent), thoughtful/confident expression, not posed-smiling. Pairs with the testimonial in the full-bleed teal band.
Where: Beside or behind the featured testimonial.
Aspect: 4:5. Duotone (paper-tone, same note as HOME-04).
Search terms: "young football player portrait confident"
Note: <!-- SWAP: real, consented photo and quote -->

---

## NEWS / ARTICLE

**NEWS-01 — Beyond Borders listing thumbnail**
What: Same or cropped version of ARTICLE-01.
Aspect: 16:9. Duotone.

**ARTICLE-01 — Beyond Borders hero image**
What: The strongest available image from the international tournament — wide group shot if possible (can reuse HOME-04A).
Aspect: 16:9. Duotone.

**ARTICLE-02, ARTICLE-03 — Beyond Borders inline images**
What: Real tournament photos confirmed available — use 1–2 more from the same set (action shots, candid moments). Only fall back to placeholders (a multi-sport moment, or a community/workshop-style gathering) if additional tournament photos aren't suitable.
Aspect: 4:3. Duotone.
Search terms (fallback only): "golf players diverse group", "community workshop group Africa"

Other placeholder news articles: thumbnails follow the same 16:9 duotone treatment; specific images not critical since these are lower-priority placeholders, marked <!-- SWAP: placeholder article -->.

---

## Pages with no new image requirements
- **contact.html** — no image required; form + details only. Optional: small location/map graphic (not photographic).
- **privacy.html / terms.html / 404.html** — graphic/typographic only, no photos (per DESIGN_BRIEF.md).
