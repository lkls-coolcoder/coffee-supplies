import React from 'react';

export const BulkTiersWidget: React.FC = () => {
  return (
    <div className="bg-[#1A1A1A] text-white p-6 md:p-8 border border-gray-200 my-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white text-xl">local_shipping</span>
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">DISCOUNT STRUCTURE</span>
            <h4 className="font-headline text-lg text-white font-light uppercase tracking-wider">Bulk Volume Tiers</h4>
          </div>
        </div>
        <span className="text-xs font-mono text-gray-400">AUTOMATIC DISCOUNT ENGINE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Tier 1 */}
        <div className="bg-black border border-gray-800 p-5 text-center">
          <div className="text-[10px] uppercase font-mono text-gray-400 tracking-widest mb-1">TIER 01 / STANDARD</div>
          <div className="font-headline text-3xl text-white font-light">5 KG</div>
          <div className="text-xs text-gray-400 font-mono mt-2 uppercase">Base Wholesale Price</div>
        </div>

        {/* Tier 2 (Most Popular) */}
        <div className="bg-white text-black border-2 border-white p-5 text-center relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white border border-white px-3 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap">
            MOST POPULAR
          </div>
          <div className="text-[10px] uppercase font-mono text-gray-600 tracking-widest mb-1">TIER 02 / CAFE</div>
          <div className="font-headline text-3xl text-black font-semibold">10 KG</div>
          <div className="text-xs text-black font-mono font-bold mt-2 uppercase">12% Volume Discount</div>
        </div>

        {/* Tier 3 */}
        <div className="bg-black border border-gray-800 p-5 text-center">
          <div className="text-[10px] uppercase font-mono text-gray-400 tracking-widest mb-1">TIER 03 / ROASTERY</div>
          <div className="font-headline text-3xl text-white font-light">25 KG+</div>
          <div className="text-xs text-white font-mono font-bold mt-2 uppercase">20% Volume Discount</div>
        </div>
      </div>
    </div>
  );
};
