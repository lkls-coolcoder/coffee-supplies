import React, { useState } from 'react';
import { Product, FormatSize } from '../types';

interface CatalogSectionProps {
  products: Product[];
  onAddToCart: (product: Product, formatSize: FormatSize) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onAddToCart,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<Record<string, FormatSize>>({
    'ethiopia-yirgacheffe': '5kg',
    'colombia-huila': '5kg',
    'brazil-cerrado': '5kg',
  });

  const [toastItem, setToastItem] = useState<string | null>(null);

  const getFormatMultiplier = (format: FormatSize): { mult: number; discount: number; kg: number } => {
    switch (format) {
      case '5kg':
        return { mult: 1, discount: 0, kg: 5 };
      case '10kg':
        return { mult: 0.88, discount: 12, kg: 10 };
      case '25kg+':
        return { mult: 0.80, discount: 20, kg: 25 };
    }
  };

  const calculatePrice = (basePrice: number, format: FormatSize) => {
    const { mult } = getFormatMultiplier(format);
    return Math.round(basePrice * mult);
  };

  const handleAddToCartClick = (product: Product) => {
    const format = selectedFormat[product.id] || '5kg';
    onAddToCart(product, format);
    setToastItem(`${product.name} (${format}) added to cart!`);
    setTimeout(() => setToastItem(null), 2500);
  };

  const featuredProduct = products.find((p) => p.featured) || products[0];
  const standardProducts = products.filter((p) => p.id !== featuredProduct.id);

  return (
    <section className="space-y-8">
      {/* Toast Notification */}
      {toastItem && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 shadow-2xl z-50 flex items-center gap-3 border border-gray-700 animate-bounce">
          <span className="material-symbols-outlined text-white">check_circle</span>
          <span className="text-xs font-mono font-semibold uppercase">{toastItem}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1">
            01 / Catalog
          </span>
          <h3 className="font-headline text-2xl md:text-3xl text-[#1A1A1A] font-light uppercase tracking-wider mt-2">
            Single Origin Reserves
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-tight mt-1">
            Available in 5kg, 10kg, and 25kg bulk formats for high-volume roastery supply.
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Featured Card (Large Bento 8 cols) */}
        {featuredProduct && (
          <div className="col-span-12 md:col-span-8 bg-white border border-gray-200 group hover:border-black transition-colors relative h-[420px]">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${featuredProduct.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <span className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest border border-black">
                {featuredProduct.origin}
              </span>
              <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest border border-white">
                In Stock
              </span>
            </div>

            <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4 z-10">
              <div className="max-w-md text-white">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">FEATURED RESERVE</span>
                <h4 className="font-headline text-2xl md:text-3xl font-light uppercase tracking-wider mb-1">
                  {featuredProduct.name}
                </h4>
                <p className="text-xs text-gray-300 mb-3">
                  {featuredProduct.roastLevel} • {featuredProduct.flavorNotes.join(', ')}
                </p>

                {/* Format selection pill buttons */}
                <div className="flex gap-2 my-2">
                  {(['5kg', '10kg', '25kg+'] as FormatSize[]).map((fmt) => {
                    const price = calculatePrice(featuredProduct.basePricePerKg, fmt);
                    const currentFmt = selectedFormat[featuredProduct.id] || '5kg';
                    return (
                      <button
                        key={fmt}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFormat({ ...selectedFormat, [featuredProduct.id]: fmt });
                        }}
                        className={`text-xs px-3 py-1 font-mono uppercase font-bold transition-all cursor-pointer border ${
                          currentFmt === fmt
                            ? 'bg-white text-black border-white'
                            : 'bg-black/60 text-white border-white/40 hover:bg-black'
                        }`}
                      >
                        {fmt} (${price}/kg)
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-mono font-bold text-white tracking-widest uppercase mt-2">
                  From ${calculatePrice(featuredProduct.basePricePerKg, selectedFormat[featuredProduct.id] || '5kg')} / KG
                </div>
              </div>

              <button
                onClick={() => handleAddToCartClick(featuredProduct)}
                className="bg-white text-black w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white border border-white transition-all cursor-pointer flex-shrink-0"
                title="Add to Cart"
              >
                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
              </button>
            </div>
          </div>
        )}

        {/* Standard Product Cards (4 cols each) */}
        {standardProducts.map((prod) => {
          const currentFmt = selectedFormat[prod.id] || '5kg';
          const unitPrice = calculatePrice(prod.basePricePerKg, currentFmt);

          return (
            <div
              key={prod.id}
              className="col-span-12 sm:col-span-6 md:col-span-4 bg-white p-6 border border-gray-200 flex flex-col hover:border-black transition-colors group"
            >
              <div className="w-full h-44 mb-4 overflow-hidden relative border border-gray-100">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src={prod.image}
                  alt={prod.name}
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="bg-white/90 text-black px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest border border-gray-200">
                    {prod.origin}
                  </span>
                </div>
              </div>

              <h4 className="font-headline text-lg text-[#1A1A1A] font-light uppercase tracking-wider mb-1">
                {prod.name}
              </h4>
              <p className="text-xs text-gray-500 flex-1 mb-4 leading-normal">
                {prod.roastLevel} • {prod.flavorNotes.join(', ')}
              </p>

              {/* Format Buttons */}
              <div className="flex gap-1.5 mb-4">
                {(['5kg', '10kg', '25kg+'] as FormatSize[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat({ ...selectedFormat, [prod.id]: fmt })}
                    className={`text-[10px] px-2.5 py-1 font-mono uppercase font-bold border transition-colors cursor-pointer ${
                      currentFmt === fmt
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-3">
                <div className="text-xs font-mono font-bold text-black tracking-wider uppercase">
                  ${unitPrice} / KG
                </div>
                <button
                  onClick={() => handleAddToCartClick(prod)}
                  className="bg-black text-white hover:bg-gray-800 px-3 py-1.5 cursor-pointer transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  <span>Add</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
