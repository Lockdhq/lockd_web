import type { ImageMetadata } from 'astro';
import appleHealthIcon from '../assets/providers/apple-health.png';
import healthConnectIcon from '../assets/providers/health-connect.png';
import { STRAVA_ICON } from '../brand/providers';

type ProviderIcon =
  | { kind: 'svg'; viewBox: string; path: string; color: string }
  | { kind: 'image'; src: ImageMetadata };

export interface Provider {
  name: string;
  note: string;
  icon: ProviderIcon;
}

/**
 * Verification sources — fitness-oracle.md §7 provider matrix. Read-only.
 * Lockd does not write activity to any of these.
 *
 * Icons are each provider's real mark, not a generic bullet:
 * - Strava: official vector glyph via simple-icons (CC0).
 * - Apple Health: Apple's own icon artwork, via developer.apple.com design
 *   resources (mirrored on Wikimedia Commons — simple-shape, PD-ineligible).
 * - Health Connect: Google's official asset from the Health Connect UI
 *   guidelines on developer.android.com.
 */
export const providers: Provider[] = [
  {
    name: 'Strava',
    note: 'Runs, rides and gym sessions you already post',
    icon: { kind: 'svg', ...STRAVA_ICON },
  },
  {
    name: 'Apple Health',
    note: 'Whatever your iPhone and Watch already record',
    icon: { kind: 'image', src: appleHealthIcon },
  },
  {
    name: 'Health Connect',
    note: 'The Android hub your tracker already writes to',
    icon: { kind: 'image', src: healthConnectIcon },
  },
];
