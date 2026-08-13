import React, { useState } from 'react';
import { Product } from '../types';

interface CustomPalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddCustomPalletToCart: (palletItems: { name: string; kg: number; price: number }[]) => void;
}

export const CustomPalletModal: React.FC<CustomPalletModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddCustomPalletToCart,
}) => {
  const [items, setItems] = useState<Record<string, number>>({
    'ethiopia-yirgacheffe': 10,
    'colombia-huila': 10,
    'brazil-cerrado': 10,
  });

  if (!isOpen) return null;

  const handleQtyChange = (id: string, delta: number) => {
    const current = items[id] || 0;
    const next = Math.max(0, current + delta * 5); // step 5kg
    setItems({ ...items, [id]: next });
  };

  const totalKg = (Object.values(items) as number[]).reduce((a: number, b: number) => a + b, 0);

  const calculatePalletTotal = () => {
    let sum = 0;
    products.forEach((p) => {
      const kg = items[p.id] || 0;
      // 20% discount for pallet quantity
      const unitPrice = p.basePricePerKg * 0.8;
      sum += kg * unitPrice;
    });
    return sum;
  };

  const handleAddToCart = () => {
    const palletList = products
      .filter((p) => (items[p.id] || 0) > 0)
      .map((p) => ({
        name: p.name,
        kg: items[p.id],
        price: items[p.id] * p.basePricePerKg * 0.8,
      }));

    if (palletList.length === 0) return;

    onAddCustomPalletToCart(palletList);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full p-6 shadow-2xl border border-black space-y-5 text-[#1A1A1A]">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-black">inventory</span>
            <h3 className="font-headline text-lg font-light uppercase tracking-wider">
              Build Custom Pallet
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black p-1 cursor-pointer font-bold">
            ✕
          </button>
        </div>

        <p className="text-xs font-mono text-gray-600 uppercase">
          Mix and match single origins in 5kg steps. Orders exceeding 25kg automatically qualify for the <span className="font-bold text-black">20% Wholesale Tier</span>.
        </p>

        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {products.map((prod) => {
            const qty = items[prod.id] || 0;
            const discountedRate = (prod.basePricePerKg * 0.8).toFixed(2);

            return (
              <div
                key={prod.id}
                className="bg-gray-50 p-3 border border-gray-200 flex items-center justify-between hover:border-black transition-all"
              >
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-black">{prod.name}</h5>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    ${discountedRate} / KG (Pallet Rate)
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-300 px-2 py-1">
                  <button
                    onClick={() => handleQtyChange(prod.id, -1)}
                    className="text-xs font-bold px-1.5 text-black cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono font-bold min-w-[32px] text-center">{qty} KG</span>
                  <button
                    onClick={() => handleQtyChange(prod.id, 1)}
                    className="text-xs font-bold px-1.5 text-black cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-black text-white p-4 flex justify-between items-center text-xs font-mono">
          <div>
            <div>TOTAL WEIGHT: <span className="font-bold">{totalKg} KG</span></div>
            <div className="text-[10px] text-gray-400 uppercase">20% Wholesale Savings Applied</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase text-gray-400">ESTIMATED COST</div>
            <div className="font-headline text-2xl text-white font-light">
              ${calculatePalletTotal().toFixed(2)}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={totalKg === 0}
          className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
            totalKg > 0
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
          }`}
        >
          Add Custom Pallet to Cart (${calculatePalletTotal().toFixed(2)})
        </button>
      </div>
    </div>
  );
};
