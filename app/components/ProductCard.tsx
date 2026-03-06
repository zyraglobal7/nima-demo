'use client';

import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const { sessionToken, widgetUrl } = data;
      const url = widgetUrl ?? `https://www.shopnima.ai/connect?session=${sessionToken}`;
      console.log('[nima] Opening widget:', url);
      window.open(url, 'nimaConnect', 'width=640,height=720,resizable=yes');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 text-xs font-medium uppercase tracking-widest bg-white/80 backdrop-blur-sm text-gray-600 px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {product.price}
          </span>
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          onClick={handleTryOn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-black text-white text-sm font-medium py-2.5 px-4 hover:bg-gray-800 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
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
  );
}
