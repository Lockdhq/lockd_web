import { type ImageMetadata } from 'astro';

import home from '../assets/screens/home.png';
import intro from '../assets/screens/intro.png';
import lockGoal from '../assets/screens/lock-goal.png';
import lockReview from '../assets/screens/lock-review.png';
import lockStake from '../assets/screens/lock-stake.png';

export interface Screen {
  src: ImageMetadata;
  /**
   * Describes what is actually on the screen. Alt text is the only description a
   * screen-reader user gets of the product, so it carries the same content the
   * sighted user sees — never "screenshot of the app".
   */
  alt: string;
}

/**
 * The five real iOS captures (iPhone 17 Pro, iOS 26.1) are the ONLY approved
 * product imagery — BRIEF.md §6. Do not add mockups of screens that don't exist.
 */
export const screens = {
  home: {
    src: home,
    alt: "Lockd's home screen, titled “your locks”. A card reads “At stake right now, $15, across 1 Lock, next settles in 3 days”. A warning below it reads “No tracker connected — without one, this Lock will settle as missed, even if you do the work.” Under “In progress” sits one active Lock for $15: “4 workouts of 45 min+, within 1 week”, a segmented bar showing 2 of 4 done, and “3 days left, 2 to go”.",
  },
  lockGoal: {
    src: lockGoal,
    alt: 'Step 1 of 5 of creating a Lock, headed “what are you committing to?” with the note “Pick a shape, then fine-tune it. Workouts are verified from your connected apps.” Three choices are offered: Gym week (4 sessions in 7 days, 45 minutes each), Run week (3 runs in 7 days, 30 minutes each), and Custom, which is selected and expands to a details panel.',
  },
  lockStake: {
    src: lockStake,
    alt: 'Step 2 of 5 of creating a Lock, headed “how much is it worth?” with the note “Enough to sting, not enough to hurt. This is the amount you get back when you crack it.” A slider is set to $10 USDC between a $2 minimum and a $25 maximum. Two panels show both outcomes side by side: “If you crack it, $10 back in your vault” in lime, and “If you\'re locked out, minus $10 goes to your forfeit” in red.',
  },
  lockReview: {
    src: lockReview,
    alt: 'Step 5 of 5 of creating a Lock, headed “lock it in” with the note “Check it over. Once you sign, the stake moves and the terms are fixed.” A panel reads “You\'re staking $10, USDC on Stellar”. A summary lists goal, window, stake, Spotter and what happens if locked out, each editable. The button reads “Lock in with Face ID”.',
  },
  intro: {
    src: intro,
    alt: "Lockd's opening screen: a full-bleed photograph of five people running up a steep grassy hillside, captioned “Go beyond, be more.”",
  },
} as const satisfies Record<string, Screen>;
