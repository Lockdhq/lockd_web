# AGENTS.md — lockd_web

## Read first

**[`BRIEF.md`](./BRIEF.md)** is the working spec: positioning, banned claims, brand
tokens, normative vocabulary, screenshot inventory. Read it before writing code.

Canonical product law is **`../lockd_docs`** on this machine — start with
`docs/00-foundation/vision.md` and `docs/00-foundation/glossary.md`. Where this
repo and `lockd_docs` disagree, `lockd_docs` wins. Link to it; never copy it.

## Non-negotiables

1. **"Cracked" means SUCCESS. "Locked Out" means FAILURE.** Easiest thing in this
   product to get backwards, and getting it backwards inverts the whole page.
2. **Never use betting, wagering, odds or casino language.** Users must not feel
   they are betting against Lockd. This is an explicit anti-vision refusal.
3. **No web3 aesthetics and no wallet jargon.** No "connect wallet", no seed
   phrases. It's a passkey-backed vault; that's the whole point.
4. **Never invent claims** — no metrics, testimonials, user counts, press logos,
   or screenshots of screens that don't exist.
5. **One accent colour: `#DBFD00` on near-black.** The restraint is the brand.
6. **500ms is a hard ceiling** on any transition (mobile motion guidelines). Honour
   `prefers-reduced-motion`.

## Design tokens

Mirror `lockd_mobile/src/theme.ts` exactly — full table in `BRIEF.md` §5. If the
app's tokens change, this repo follows.

Voice: headlines are **lowercase** with tight negative tracking ("your locks",
"lock it in"). Sentence-case body. Direct, physical, unhyped.

## Working style

- Verify in a real browser before claiming something works. Check mobile widths.
- Optimise the screenshots (WebP/AVIF, responsive sizes) — `intro.png` is ~4.3MB
  raw and must not ship as-is.
- Accessibility is not optional: contrast, keyboard paths, semantic headings, alt
  text on every screenshot.
- Use conventional commits.
