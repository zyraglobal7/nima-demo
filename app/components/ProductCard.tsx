'use client';

import Link from 'next/link';
import { Product } from '../lib/products';

export type { Product };

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
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

      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
