/**
 * Site-wide config and the few externally-owned values.
 *
 * OPEN QUESTION (BRIEF.md §9): primary CTA is waitlist, TestFlight, or App Store?
 * ASSUMPTION: waitlist. No store or TestFlight URL exists in any source document,
 * and publishing one we don't have would be an invented claim. Set
 * PUBLIC_WAITLIST_ENDPOINT to a real form endpoint to enable submission; with it
 * unset the form degrades to an honest mailto: rather than faking a success state.
 * Swapping to a store link later is a one-line change here.
 */
export const site = {
  name: 'Lockd',
  url: 'https://lockd.app',
  title: 'Lockd — put money on your fitness goal, and get it back',
  description:
    'Stake from $2 on a fitness goal. Workouts are verified from the trackers you already use. Crack the Lock and your stake comes back. Get locked out and it goes where you chose up front.',
  contactEmail: 'hello@lockd.app',
} as const;

export const waitlistEndpoint = import.meta.env.PUBLIC_WAITLIST_ENDPOINT ?? '';

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
