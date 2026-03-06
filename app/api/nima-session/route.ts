import { NextRequest, NextResponse } from 'next/server';

// Use NIMA_API_URL from env to switch between dev Convex URL and Nima's hosted API
const NIMA_URL =
  process.env.NIMA_API_URL ?? 'https://gallant-tortoise-992.convex.site/api/v1/sessions';

export async function POST(req: NextRequest) {
  console.log('\n[nima-session] ── Incoming request ──────────────────────────');

  const body = await req.json();
  const { productImagePath, externalProductId, productName, productCategory } = body;

  console.log('[nima-session] Request body:', JSON.stringify(body, null, 2));

  const origin =
    process.env.NIMA_PUBLIC_BASE_URL ??
    req.headers.get('origin') ??
    `${req.headers.get('x-forwarded-proto') ?? 'http'}://${req.headers.get('host') ?? 'localhost:3000'}`;

  const encodedPath = productImagePath
    .split('/')
    .map((segment: string) => encodeURIComponent(segment))
    .join('/');

  const productImageUrl = `${origin}${encodedPath}`;

  console.log('[nima-session] NIMA_PUBLIC_BASE_URL set:', !!process.env.NIMA_PUBLIC_BASE_URL);
  console.log('[nima-session] Resolved origin:', origin);
  console.log('[nima-session] Product image URL sent to Nima:', productImageUrl);
  console.log('[nima-session] API key present:', !!process.env.NIMA_API_KEY);
  console.log('[nima-session] NIMA_API_URL override set:', !!process.env.NIMA_API_URL);
  console.log('[nima-session] Calling Nima API:', NIMA_URL);

  const nimaPayload = { productImageUrl, externalProductId, productName, productCategory };
  console.log('[nima-session] Body being sent to Nima:', JSON.stringify(nimaPayload, null, 2));

  let res: Response;
  try {
    res = await fetch(NIMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NIMA_API_KEY}`,
      },
      body: JSON.stringify(nimaPayload),
    });
  } catch (err) {
    console.error('[nima-session] Network error reaching Nima API:', err);
    return NextResponse.json({ error: 'Failed to reach Nima API' }, { status: 502 });
  }

  console.log('[nima-session] Nima response status:', res.status, res.statusText);
  console.log('[nima-session] Nima response headers:', Object.fromEntries(res.headers.entries()));

  const rawBody = await res.text();
  console.log('[nima-session] Nima response body:', rawBody);

  if (!res.ok) {
    console.error('[nima-session] Nima returned an error ─────────────────────');
    return NextResponse.json({ error: rawBody }, { status: res.status });
  }

  let data: unknown;
  try {
    data = JSON.parse(rawBody);
  } catch {
    console.error('[nima-session] Failed to parse Nima response as JSON');
    return NextResponse.json({ error: 'Invalid JSON from Nima' }, { status: 502 });
  }

  console.log('[nima-session] Success:', JSON.stringify(data, null, 2));
  console.log('[nima-session] ─────────────────────────────────────────────────\n');

  return NextResponse.json(data);
}
