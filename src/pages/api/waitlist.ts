import type { APIRoute } from 'astro';
import { addToWaitlist, isValidEmail } from '../../lib/waitlist';

export const prerender = false;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') ?? '';
  let email: unknown;

  try {
    if (contentType.includes('application/json')) {
      email = (await request.json())?.email;
    } else {
      email = (await request.formData()).get('email');
    }
  } catch {
    return json({ ok: false, error: 'Malformed request.' }, 400);
  }

  if (!isValidEmail(email)) {
    return json({ ok: false, error: 'Enter a valid email address.' }, 400);
  }

  addToWaitlist(email);
  return json({ ok: true });
};
