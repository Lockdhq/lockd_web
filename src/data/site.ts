/**
 * Site-wide config and the few externally-owned values.
 *
 * OPEN QUESTION (BRIEF.md §9): primary CTA is waitlist, TestFlight, or App Store?
 * ASSUMPTION: waitlist. No store or TestFlight URL exists in any source document,
 * and publishing one we don't have would be an invented claim. Swapping to a
 * store link later is a one-line change here.
 *
 * The waitlist posts to this site's own `/api/waitlist` route (see
 * src/pages/api/waitlist.ts) by default — no email required to sign up. Set
 * PUBLIC_WAITLIST_ENDPOINT to point submissions at a different endpoint instead
 * (e.g. once lockd_backend has a real waitlist table).
 */
export const site = {
  name: 'Lockd',
  url: 'https://lockd.app',
  title: 'Lockd — put money on your fitness goal, and get it back',
  description:
    'Stake from $2 on a fitness goal. Workouts are verified from the trackers you already use. Crack the Lock and your stake comes back. Get locked out and it goes where you chose up front.',
  contactEmail: 'hello@lockd.app',
} as const;

export const waitlistEndpoint = import.meta.env.PUBLIC_WAITLIST_ENDPOINT ?? '/api/waitlist';

/** Stake bounds — PRD F-ST-1: $2–$25 USDC inclusive. */
export const stake = {
  min: 2,
  max: 25,
  default: 10,
  presets: [5, 10, 15, 25],
} as const;

/**
 * Verification sources — fitness-oracle.md §7 provider matrix.
 * Read-only. Lockd does not write activity to any of these.
 */
export const providers = [
  { name: 'Strava', note: 'Runs, rides and gym sessions you already post' },
  { name: 'Apple Health', note: 'Whatever your iPhone and Watch already record' },
  { name: 'Health Connect', note: 'The Android hub your tracker already writes to' },
] as const;
