# lockd_web

Marketing site / landing page for **Lockd** — the commitment layer that turns a
fitness intention into a funded promise.

> Stake USDC on a goal. Workouts are verified from the trackers you already use.
> Hit it and you **crack** the Lock and your stake comes back. Miss it and you're
> **locked out** and it goes where you chose up front.

## Start here

**[`BRIEF.md`](./BRIEF.md)** — positioning, banned claims, brand tokens, the
normative vocabulary, and what each screenshot is for. Read it before writing
code.

## Repo family

| Repo | Role |
|---|---|
| `lockd_docs` | **Canonical product law.** Vision, PRD, UX, glossary. Link to it, don't copy it |
| `lockd_mobile` | Expo / React Native app. Source of the screenshots here |
| `lockd_backend` | API + settlement |
| `lockd_contracts` | Stellar / Soroban |
| `lockd_web` | This repo |

## Assets

`src/assets/screens/` — five real iOS captures (iPhone 17 Pro, iOS 26.1). These are
the only approved product imagery. See `BRIEF.md` §6.

They live under `src/` rather than `public/` so `astro:assets` can process them:
each is emitted as AVIF at several widths with intrinsic dimensions inlined.
`intro.png` ships at 64KB on a phone instead of its 4.3MB source.

## Running it

```sh
npm install
npm run dev      # localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built output — use this to verify, not dev
```

Node 20+. No environment variables are required to build.

### Waitlist endpoint

The primary CTA posts to `PUBLIC_WAITLIST_ENDPOINT` if it is set at build time:

```sh
PUBLIC_WAITLIST_ENDPOINT="https://…" npm run build
```

With no endpoint configured the form is replaced by a `mailto:` link, so the page
never pretends to have captured an address it did not store.

## Stack

Astro 5, static output, TypeScript, plain CSS custom properties, vanilla islands.

| Choice | Why |
|---|---|
| Astro | Ships zero JavaScript by default. The built page loads no external script at all — the two interactive pieces are inlined and total well under budget |
| `astro:assets` | AVIF plus responsive `srcset` and intrinsic width/height, so the screenshots are optimised and CLS stays at 0 without hand-rolling a pipeline |
| Static output | Deploys anywhere, no server, no runtime cost |
| Plain CSS custom properties | The palette is eight colours and one accent. `src/styles/tokens.css` maps 1:1 to `BRIEF.md` §5, so token drift is auditable in one file. Tailwind would add build surface for no gain at this size |
| Vanilla TS islands | The interactive pieces are a range input and a details list. A framework runtime would cost more than the code it carried |

Rejected: Next.js (a React runtime and server semantics for one static page) and
plain Vite (would mean hand-building the responsive image pipeline).

Measured on the built output at 390px: CLS 0, LCP 208ms, 0 external scripts,
8.0KB gzipped HTML, 5.4KB gzipped CSS.

## Design tokens

**`BRIEF.md` §5 is the source of truth.** Do not read `lockd_mobile/src/theme.ts`
— the copy on `main` is pre-redesign and gives the wrong accent. The accent is
`#DBFD00`, which is what the shipped screenshots actually contain (verified by
counting pixels: 193,709 in `home.png`, 190,762 in `lock-stake.png`, exact match).

## Open questions — assumptions taken

These were open in `BRIEF.md` §9. Each was assumed, not answered. Change freely.

| Question | Assumption | Reasoning |
|---|---|---|
| Primary CTA | **Waitlist** | No App Store or TestFlight URL exists in any source, and inventing one would be a fabricated claim. Swapping to a store link is a one-line change in `src/data/site.ts` |
| Wordmark locked? | **No** — rendered as styled text | No image asset to swap in yet. Brand-colour cycling from the app logo is deliberately not implemented: one accent, per `AGENTS.md` |
| Legal pages at launch? | **No invented legal copy** | A factual line beside the email field states what the address is used for. Footer legal slots are wired but commented out until real copy exists. Flagged for the founder |

## Status

Built. Verified in a real browser at 1440px and 390px, keyboard-only, and with
`prefers-reduced-motion` forced. Every claim on the page traces to a document in
`lockd_docs`; see the commit history for the three that did not and were removed.
