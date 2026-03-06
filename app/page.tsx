'use client';

import { useState } from 'react';
import ProductCard, { Product } from './components/ProductCard';

const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Crimson Rose Gothic Gown',
    price: '$289',
    category: 'dresses',
    image: '/download (3).jpg',
  },
  {
    id: 'prod_002',
    name: 'Black Leather Crop Moto Vest',
    price: '$495',
    category: 'outerwear',
    image: '/download (4).jpg',
  },
  {
    id: 'prod_003',
    name: 'Black Satin Ruched Mini Dress',
    price: '$79',
    category: 'dresses',
    image: '/download (5).jpg',
  },
  {
    id: 'prod_004',
    name: 'Burgundy Satin Wrap Mini Dress',
    price: '$64',
    category: 'dresses',
    image: '/download (6).jpg',
  },
  {
    id: 'prod_005',
    name: 'Gold Strapless Mermaid Gown',
    price: '$320',
    category: 'dresses',
    image: '/download (7).jpg',
  },
  {
    id: 'prod_006',
    name: 'White Monogram Utility Vest',
    price: '$1,250',
    category: 'outerwear',
    image: '/download (8).jpg',
  },
  {
    id: 'prod_007',
    name: 'Bronze Sport Shield Sunglasses',
    price: '$185',
    category: 'accessories',
    image: '/download (9).jpg',
  },
  {
    id: 'prod_008',
    name: 'White Strapless Cutout Mini Dress',
    price: '$88',
    category: 'dresses',
    image: '/download (10).jpg',
  },
  {
    id: 'prod_009',
    name: 'Black Red-Sole Chelsea Boots',
    price: '$640',
    category: 'shoes',
    image: '/download (11).jpg',
  },
  {
    id: 'prod_010',
    name: 'Verdusa Sweetheart Lantern Sleeve Mini Dress',
    price: '$52',
    category: 'dresses',
    image: "/Verdusa Women's Long Sleeve Sweetheart Neck Lantern Sleeve Ruched Bust Ruffle Trim Mini Dress.jpg",
  },
  {
    id: 'prod_011',
    name: 'Plus Size Zipper Puff Hem Mini Dress',
    price: '$46',
    category: 'dresses',
    image: '/Plus Size Zipper Puff Hem Sleeveless Mini Dress.jpg',
  },
  {
    id: 'prod_012',
    name: 'ASPHALT White Cargo Pants',
    price: '$135',
    category: 'bottoms',
    image: '/asphalt-cargo-pants.jpg',
  },
];

const categories = ['all', 'dresses', 'outerwear', 'bottoms', 'shoes', 'accessories'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">NOIR</h1>
            <p className="text-xs text-gray-400 tracking-widest uppercase">Editorial Fashion</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
            <span>✨</span>
            <span>Powered by Nima Virtual Try-On</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-3">
          New Collection
        </p>
        <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Wear it before you buy it.
        </h2>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Try any piece virtually with Nima AI. Click{' '}
          <span className="font-semibold text-gray-700">Try on with Nima</span> on any product.
        </p>
      </section>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            No products in this category.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-400">
          NOIR Fashion &mdash; Virtual try-on powered by{' '}
          <span className="font-medium text-gray-600">Nima</span>
        </div>
      </footer>
    </div>
  );
}
