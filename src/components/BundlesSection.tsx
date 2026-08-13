import React from 'react';
import { Bundle } from '../types';

interface BundlesSectionProps {
  bundles: Bundle[];
  onAddBundle: (bundle: Bundle) => void;
  onConfigureCustomPallet: () => void;
}

export const BundlesSection: React.FC<BundlesSectionProps> = ({
  bundles,
  onAddBundle,
  onConfigureCustomPallet,
}) => {
  return (
    <section className="bg-white p-6 md:p-8 border border-gray-200 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-4">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1">
            02 / Curated Bundles
          </span>
          <h3 className="font-headline text-2xl md:text-3xl text-[#1A1A1A] font-light uppercase tracking-wider mt-2">
            High-Volume Bean Bundles
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-tight mt-1">
            Optimized logistics for cafes. Curated starter packs and high-rotation blends ready to ship.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => {
          if (bundle.isCustom) {
            return (
              <div
                key={bundle.id}
                className="bg-white p-5 border border-gray-200 hover:border-black transition-colors cursor-pointer group flex flex-col h-full"
              >
                <div className="aspect-[4/3] bg-gray-50 mb-4 border border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-4xl text-black">tune</span>
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-black mt-2">Custom Pallet Mix</p>
                  </div>
                </div>

                <h4 className="font-headline text-lg text-[#1A1A1A] font-light uppercase tracking-wider mb-1">
                  {bundle.name}
                </h4>
                <p className="text-xs text-gray-500 leading-snug flex-1">
                  {bundle.description}
                </p>

                <button
                  onClick={onConfigureCustomPallet}
                  className="w-full mt-4 bg-black text-white border border-black py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Configure Pallet
                </button>
              </div>
            );
          }

          return (
            <div
              key={bundle.id}
              className="bg-white p-5 border border-gray-200 hover:border-black transition-colors cursor-pointer group flex flex-col h-full"
            >
              <div className="aspect-[4/3] bg-gray-50 mb-4 overflow-hidden relative border border-gray-100">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={bundle.image}
                  alt={bundle.name}
                />
                {bundle.badge && (
                  <div className="absolute bottom-2 right-2 bg-black text-white px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border border-white">
                    {bundle.badge}
                  </div>
                )}
              </div>

              <h4 className="font-headline text-lg text-[#1A1A1A] font-light uppercase tracking-wider mb-1">
                {bundle.name}
              </h4>
              <p className="text-xs text-gray-500 leading-snug flex-1">
                {bundle.description}
              </p>

              <button
                onClick={() => onAddBundle(bundle)}
                className="w-full mt-4 bg-white text-black border border-black py-2.5 text-xs font-bold uppercase tracking-wider group-hover:bg-black group-hover:text-white transition-colors cursor-pointer"
              >
                Add Bundle (${bundle.price.toFixed(2)})
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
