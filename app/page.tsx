'use client';

import { useState } from 'react';
import ProductCard from './components/ProductCard';
import { products, categories } from './lib/products';

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
          Explore the latest editorial pieces. Click any product to view details and try it on.
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
          NOIR Fashion
        </div>
      </footer>
    </div>
  );
}
