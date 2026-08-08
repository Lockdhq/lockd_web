# lockd_web — build brief

Everything the landing page needs, in one file. Canonical product law lives in
**`../lockd_docs`** (same machine). This brief is a working extract — where the
two disagree, `lockd_docs` wins.

---

## 1. What we're building

A marketing landing page for **Lockd**. Modern, interactive, fun. It must show the
real product — five genuine iOS screenshots are already in `public/screens/`.

Not a dashboard, not the app. A page that makes someone want to lock in.

---

## 2. What Lockd is (say this)

> A thin, trustworthy layer that turns a personal fitness intention into a funded
> commitment, verified from data the user already produces, settled without asking
> them to become a crypto power user.

The wedge, in plain words: people already know what they should do and already own
the watches and the apps. What they lack is **a credible cost to abandonment** —
small enough to start, real enough to sting, fair enough to trust.

You stake USDC on a fitness goal. Workouts are verified from trackers you already
use (Strava, Apple Health, Health Connect). Hit it and your stake comes back. Miss
it and it goes to your Spotter or a charity you picked up front.

Micro-stakes start at **$2**. That's a feature, not a limitation — it's what makes
the habit-formation use case work.

## 3. What Lockd is NOT (do not imply any of this)

From the anti-vision. Marketing that drifts here is a real failure, not a nitpick.

| Not… | Why it matters for the page |
|---|---|
| A fitness tracking app | We read from trackers; we don't compete with them |
| A Strava / Apple Fitness replacement | Never frame as "switch from" |
| An activity social network | No feeds, kudos, leaderboards imagery |
| A sportsbook or casino | **Never** use betting/odds/wager language. Users must not feel they're betting *against Lockd* |
| A seed-phrase wallet product | No web3 aesthetics, no wallet jargon, no "connect wallet" |
| A yield / DeFi wrapper | Money is escrowed, not farmed |
| A shame platform | Accountability is chosen and bounded |

Also banned: "web3 aesthetics to excuse poor consumer UX." This should look like a
great consumer app site that happens to settle on-chain.

Do not invent claims, metrics, testimonials, user counts, or press logos.

---

## 4. Vocabulary — normative, and counterintuitive

From `lockd_docs/docs/00-foundation/glossary.md`. **UI and copy must match.**

| Term | Meaning |
|---|---|
| **Lock** | One commitment: stake + goal + deadline + parties |
| **Locking In** | Creating the Lock and escrowing USDC |
| **Crack / Cracked** | ✅ **SUCCESS** — stake returned |
| **Locked Out** | ❌ **FAILURE** — stake goes to the forfeit recipient |
| **Challenger** | The person who creates and stakes the Lock |
| **Spotter** | One designated human verifier |
| **Vault** | Passkey-backed Stellar account. No seed phrase, ever |
| **Evaluating** | Post-deadline decision phase |

⚠️ **"Cracked" means you won.** It is the single easiest thing to get backwards and
it would invert the meaning of the whole page. The mobile app ships a dedicated
"How it works" screen because of this. Consider teaching it explicitly on the page.

---

## 5. Brand tokens

Lifted verbatim from `lockd_mobile/src/theme.ts`. The app and the site must match.

### Colour

```
bg              #000000
bgElevated      #0A0A0A
panel           #101010
surface         #141414
surfaceStrong   #232323
glass           rgba(255,255,255,0.08)
border          rgba(255,255,255,0.12)
borderStrong    rgba(255,255,255,0.24)

text            #FFFFFF
textMuted       rgba(255,255,255,0.72)
textDim         rgba(255,255,255,0.46)

accent          #DBFD00   ← brand lime, single source of truth
accentSoft      #EFFF8C
accentDim       rgba(219,253,0,0.18)

onLight         #FFFAFA
controlLight    #D9D9D9

danger          #FF5757   ← Locked Out
warning         #FFB020   ← deadline pressure
bronze          #C8A590
```

Brand variants used in logo cycling: `#FF5A1F` orange, `#1E3FFF` blue, `#B6F4E2` mint.

**The palette is near-black + one lime.** Its power is restraint. Don't add a
second accent hue.

### Type scale

| Role | Size / line-height | Weight | Tracking |
|---|---|---|---|
| hero | 52 / 54 | 700 | −1.8 |
| display | 46 / 46 | 700 | −1.6 |
| title | 32 / 36 | 700 | −0.8 |
| subhead | 20 / 23 | 400 | −0.2 |
| body | 16 / 24 | 500 | 0 |
| caption | 13 / 18 | 500 | +0.1 |
| legal | 12 / 18 | 400 | 0 |
| button | 17 / 22 | 600 | −0.2 |
| overline | 12 / 16 | 700 | +1.4, UPPERCASE |

Headlines in the app are **lowercase** ("your locks", "lock it in", "how much is
it worth?"). Tight negative tracking at large sizes. Keep that voice.

### Spacing / radius

```
spacing   xs 4 · sm 8 · md 16 · lg 24 · xl 32 · xxl 48 · xxxl 64
radius    pill 999 · card 20 · button 32 · input 16 · panel 36 · hero 28
```

### Motion

```
instant 80ms · fast 160ms · normal 240ms · slow 360ms · max 500ms (hard ceiling)
enter  cubic-bezier out    exit  cubic-bezier in    move  cubic-bezier in-out
```

`max: 500ms` is a hard ceiling in the mobile motion guidelines. Honour it on the
web too — "interactive and fun" must not mean slow. Respect
`prefers-reduced-motion`.

---

## 6. Screenshots

Real captures, iPhone 17 Pro (1206×2622), iOS 26.1. In `public/screens/`.

| File | Screen | Best used for |
|---|---|---|
| `home.png` | The vault — $15 at stake, live Lock, segmented progress, "3 days left" | **Hero shot.** Shows money + progress + urgency at once |
| `lock-goal.png` | Step 1/5 — pick a goal shape (Gym week / Run week / Custom) | "Set a goal" step |
| `lock-stake.png` | Step 2/5 — stake slider, $2–$25, with crack/locked-out preview | **The clearest single explainer of the product.** Shows both outcomes side by side |
| `lock-review.png` | Step 5/5 — full terms, "Lock it in with Face ID" | "Commit" step |
| `intro.png` | Onboarding — "Go beyond, be more." full-bleed photo | Brand / emotional opener |

Notes:
- They carry a real status bar and (on `intro.png`) the Dynamic Island. Crop or
  frame in a device mockup as you prefer, but **don't fake a different device**.
- `intro.png` is ~4.3MB. Convert to WebP/AVIF and serve responsive sizes. Others
  are 200–620KB and should also be converted.
- These are the *only* approved product imagery. Don't mock up screens that don't
  exist — that's how a landing page starts promising features we don't ship.

---

## 7. Suggested narrative

Not binding — but it follows how the product actually teaches itself.

1. **Hero** — the promise + `home.png`. One line, one CTA.
2. **The problem** — you already know what to do; you lack a cost to quitting.
3. **How it works** — three beats: *Set a goal → Stake from $2 → Crack it or get
   Locked Out.* Teach the vocabulary here. `lock-stake.png` carries this.
4. **Verification** — "we read from the apps you already use." Strava, Apple
   Health, Health Connect. Emphasise: no re-logging workouts inside Lockd.
5. **The money** — non-custodial, passkey vault, USDC on Stellar, no seed phrase.
   Answer "where does my money go?" before it's asked.
6. **Spotter / forfeit** — you choose the recipient *up front*. Never hidden.
7. **CTA** — waitlist or app store. Confirm which with the founder.

Good candidates for interactivity: an interactive stake slider that recomputes
"back in your vault" vs "goes to your forfeit"; a scroll-driven phone that swaps
screenshots per section; a small crack/locked-out toggle.

---

## 8. Constraints

- Modern, interactive, fun — but **fast**. This is a consumer product site.
- Accessible: real contrast (lime on black is fine, lime on white is not), keyboard
  paths, reduced-motion, semantic headings, alt text on every screenshot.
- Mobile-first. Most traffic will be on the device the app runs on.
- No invented claims. No fake social proof.

## 9. Open questions for the founder

- Primary CTA: waitlist, TestFlight, or App Store?
- Is the domain/brand wordmark locked? (mobile cycles brand colours in the logo)
- Legal/privacy pages needed at launch?
