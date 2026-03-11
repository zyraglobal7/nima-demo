import { NextRequest, NextResponse } from 'next/server';

const NIMA_TRACK_URL = process.env.NIMA_TRACK_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionToken, event, itemValue, currency, trackingId } = body;

  if (!sessionToken || !event) {
    return NextResponse.json({ error: 'sessionToken and event are required' }, { status: 400 });
  }

  const payload: Record<string, unknown> = { sessionToken, event };
  if (itemValue !== undefined) payload.itemValue = itemValue;
  if (currency) payload.currency = currency;
  if (trackingId) payload.trackingId = trackingId;

  console.log('[nima-track] Sending:', JSON.stringify(payload, null, 2));

  let res: Response;
  try {
    res = await fetch(NIMA_TRACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NIMA_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[nima-track] Network error:', err);
    return NextResponse.json({ error: 'Failed to reach Nima API' }, { status: 502 });
  }

  const rawBody = await res.text();
  console.log('[nima-track] Response:', res.status, rawBody);

  if (!res.ok) {
    return NextResponse.json({ error: rawBody }, { status: res.status });
  }

  return NextResponse.json({ ok: true });
}
