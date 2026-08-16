// Rasterizes the same brand-mark geometry as src/brand/logo.ts into the PNG
// assets iOS/social platforms require but can't take as SVG:
//   - public/apple-touch-icon.png (180x180) — iOS home-screen icon. Safari
//     silently ignores an SVG apple-touch-icon, so favicon.svg alone never
//     showed up there.
//   - public/og-image.png (1200x630) — link-preview card (iMessage, Slack,
//     X, WhatsApp…). There was no og:image/twitter:image at all before this,
//     so shared links rendered as bare text.
// Run with `node scripts/generate-social-assets.mjs` whenever the mark or
// copy changes; the outputs are committed, not generated at build time.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PADLOCK_PATH =
  'M0 85V29h15.5v-4a25 25 0 0 1 25-25h14a25 25 0 0 1 25 25v4H94v56z' +
  'M36.7 29a10.8 10.8 0 1 0 21.6 0 10.8 10.8 0 1 0-21.6 0z' +
  'M23 50.5V66h48V51.2A41.6 41.6 0 0 1 23 50.5z';

const WORDMARK_LETTERS_PATH =
  'M0 29L23 29L23 66L47 66L47 85L0 85Z' +
  'M172 28L191 28L191 29L197 30L197 31L199 31L199 32L203 33L204 35L206 35L206 36L210 39L210 41L211 41L211 43L212 43L212 45L213 45L213 50L208 50L208 51L203 51L203 52L198 52L198 53L193 53L193 54L190 54L190 51L189 51L189 49L188 49L188 48L186 48L186 47L184 47L184 46L179 46L179 47L175 48L175 49L173 50L173 52L172 52L172 61L173 61L173 64L174 64L176 67L179 67L179 68L184 68L184 67L186 67L186 66L188 66L188 65L189 65L190 60L193 60L193 61L198 61L198 62L203 62L203 63L213 64L213 69L212 69L211 73L209 74L209 76L208 76L206 79L204 79L203 81L201 81L201 82L199 82L199 83L197 83L197 84L195 84L195 85L191 85L191 86L172 86L172 85L169 85L169 84L166 84L166 83L164 83L164 82L160 81L159 79L157 79L157 78L153 75L153 73L152 73L152 71L151 71L151 69L150 69L150 67L149 67L149 47L150 47L150 45L151 45L151 43L152 43L153 39L154 39L157 35L159 35L160 33L162 33L162 32L164 32L164 31L166 31L166 30L168 30L168 29L172 29Z' +
  'M217 29L240 29L240 45L241 45L241 44L242 44L242 43L243 43L243 42L244 42L244 41L245 41L245 40L249 37L249 35L250 35L250 34L251 34L251 33L252 33L255 29L281 29L281 30L280 30L280 31L279 31L279 32L278 32L275 36L273 36L273 37L272 37L272 38L271 38L271 39L270 39L270 40L269 40L269 41L268 41L268 42L267 42L267 43L266 43L266 44L265 44L265 45L264 45L264 46L260 49L261 53L263 54L263 56L265 57L265 59L267 60L267 62L269 63L269 65L271 66L271 68L273 69L273 71L275 72L275 74L276 74L276 75L277 75L277 77L279 78L279 80L281 81L281 83L282 83L283 85L255 85L255 83L253 82L253 80L252 80L251 76L249 75L249 73L248 73L248 71L247 71L246 67L243 65L243 66L240 68L240 85L217 85Z' +
  'M284 29L321 29L321 30L328 31L328 32L330 32L330 33L334 34L335 36L337 36L337 37L341 40L341 42L343 43L344 48L345 48L345 53L346 53L346 61L345 61L345 66L344 66L343 71L341 72L341 74L340 74L338 77L337 77L336 79L334 79L334 80L332 80L332 81L328 82L328 83L325 83L325 84L320 84L320 85L284 85ZM307 47L307 48L306 48L306 66L307 66L307 67L315 67L315 66L318 66L318 65L319 65L319 64L321 63L321 61L322 61L322 53L321 53L321 51L320 51L318 48L315 48L315 47Z';

const ACCENT = '#DBFD00';
const BG = '#000000';

const outDir = fileURLToPath(new URL('../public', import.meta.url));
mkdirSync(outDir, { recursive: true });

async function makeAppleTouchIcon() {
  const size = 180;
  const pad = 34; // breathing room so the mark isn't edge-to-edge
  const scale = (size - pad * 2) / 94;
  const h = 85 * scale;
  const x = pad;
  const y = (size - h) / 2;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${BG}" />
      <g transform="translate(${x}, ${y}) scale(${scale})">
        <path d="${PADLOCK_PATH}" fill="${ACCENT}" fill-rule="evenodd" />
      </g>
    </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`${outDir}/apple-touch-icon.png`);
}

async function makeOgImage() {
  const width = 1200;
  const height = 630;
  // One lockup, matching LogoMark.astro variant="wordmark": the letters and
  // the padlock (acting as the O) share a single coordinate space, the
  // padlock offset by WORDMARK_PADLOCK_OFFSET_X — not a separate icon beside
  // separate text.
  const wordmarkScale = 1.7;
  const wordmarkX = 96;
  const wordmarkY = 110;
  const padlockOffsetX = 52;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="glow" cx="30%" cy="0%" r="75%">
          <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.16" />
          <stop offset="60%" stop-color="${ACCENT}" stop-opacity="0" />
        </radialGradient>
        <style>
          .word { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; font-weight: 700; letter-spacing: -0.03em; fill: #ffffff; }
          .accentword { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; font-weight: 700; letter-spacing: -0.03em; fill: ${ACCENT}; }
          .sub { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; font-weight: 500; fill: rgba(255,255,255,0.72); }
        </style>
      </defs>
      <rect width="${width}" height="${height}" fill="${BG}" />
      <rect width="${width}" height="${height}" fill="url(#glow)" />

      <g transform="translate(${wordmarkX}, ${wordmarkY}) scale(${wordmarkScale})">
        <path d="${WORDMARK_LETTERS_PATH}" fill="#ffffff" fill-rule="evenodd" />
        <g transform="translate(${padlockOffsetX}, 0)">
          <path d="${PADLOCK_PATH}" fill="${ACCENT}" fill-rule="evenodd" />
        </g>
      </g>

      <text x="96" y="400" class="word" font-size="72">put money on it.</text>
      <text x="96" y="480" class="accentword" font-size="72">then go get it back.</text>
      <text x="98" y="548" class="sub" font-size="30">Stake from \$2 on a fitness goal you set yourself.</text>
    </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(`${outDir}/og-image.png`);
}

await makeAppleTouchIcon();
await makeOgImage();
console.log('Wrote public/apple-touch-icon.png and public/og-image.png');
