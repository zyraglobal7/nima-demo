'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '../../lib/products';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const maybeProduct = products.find((p) => p.id === id);
  if (!maybeProduct) return notFound();
  const product = maybeProduct;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Parse price string like "$289" or "$1,250" into integer cents
  function parsePriceCents(price: string): number {
    return Math.round(parseFloat(price.replace(/[^0-9.]/g, '')) * 100);
  }

  async function handleTryOn() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/nima-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productImagePath: product.image,
          externalProductId: product.id,
          productName: product.name,
          productCategory: product.category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to start try-on session.');
        return;
      }

      const { sessionToken: token, widgetUrl } = data;
      setSessionToken(token);
      const url = widgetUrl ?? `http://localhost:3000/connect?session=${token}`;
      window.open(url, 'nimaConnect', 'width=640,height=720,resizable=yes');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function trackPurchaseEvent(event: 'added_to_cart' | 'purchased', trackingId?: string) {
    if (!sessionToken) {
      console.warn('[nima-track] Skipped — no sessionToken');
      return;
    }
    const payload = {
      sessionToken,
      event,
      itemValue: parsePriceCents(product.price),
      currency: 'USD',
      ...(trackingId && { trackingId }),
    };
    console.log('[nima-track] Sending:', payload);
    try {
      const res = await fetch('/api/nima-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log('[nima-track] Response:', res.status, data);
    } catch (err) {
      console.error('[nima-track] Network error:', err);
    }
  }

  async function handleAddToCart() {
    console.log('[cart] Add to cart clicked — product:', product.id);
    await trackPurchaseEvent('added_to_cart');
    // TODO: real cart logic
  }

  async function handleBuyNow() {
    const orderId = `order_${Date.now()}`;
    console.log('[cart] Buy now clicked — product:', product.id, 'orderId:', orderId);
    await trackPurchaseEvent('purchased', orderId);
    // TODO: real checkout logic
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">NOIR</h1>
              <p className="text-xs text-gray-400 tracking-widest uppercase">Editorial Fashion</p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to collection
          </Link>
        </div>
      </header>

      {/* Product Detail */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-gray-50 aspect-[3/4] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute top-4 left-4 text-xs font-medium uppercase tracking-widest bg-white/80 backdrop-blur-sm text-gray-600 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 pt-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-2xl font-semibold text-gray-800">{product.price}</p>
            </div>

            <div className="h-px bg-gray-100" />

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full rounded-xl bg-black text-white text-sm font-semibold py-3.5 px-6 hover:bg-gray-800 active:scale-95 transition-all duration-150"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full rounded-xl bg-gray-900 text-white text-sm font-semibold py-3.5 px-6 border-2 border-gray-900 hover:bg-gray-700 active:scale-95 transition-all duration-150"
              >
                Buy Now
              </button>

              <button
                onClick={handleTryOn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-gray-900 text-sm font-semibold py-3.5 px-6 border-2 border-gray-900 hover:bg-gray-50 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Starting session...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Try on with Nima
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
