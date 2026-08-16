import { existsSync, mkdirSync, readFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Waitlist storage: append-only JSON Lines file, not a hosted service.
 *
 * "A little backend" for a pre-launch waitlist — no external account, no
 * secrets to provision. If volume ever outgrows a flat file, swap this module
 * for a real table in lockd_backend without touching the API route or the form.
 */
const DATA_DIR = fileURLToPath(new URL('../../data', import.meta.url));
const WAITLIST_FILE = `${DATA_DIR}/waitlist.jsonl`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value);
}

function readEmails(): Set<string> {
  if (!existsSync(WAITLIST_FILE)) return new Set();
  const lines = readFileSync(WAITLIST_FILE, 'utf8').split('\n').filter(Boolean);
  const emails = new Set<string>();
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      if (typeof entry.email === 'string') emails.add(entry.email);
    } catch {
      // skip malformed line
    }
  }
  return emails;
}

export type AddResult = 'added' | 'duplicate';

/** Adds an email to the waitlist. Idempotent — a repeat email is not an error. */
export function addToWaitlist(rawEmail: string): AddResult {
  const email = rawEmail.trim().toLowerCase();
  const existing = readEmails();
  if (existing.has(email)) return 'duplicate';

  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  const entry = { email, createdAt: new Date().toISOString() };
  appendFileSync(WAITLIST_FILE, `${JSON.stringify(entry)}\n`, 'utf8');
  return 'added';
}
