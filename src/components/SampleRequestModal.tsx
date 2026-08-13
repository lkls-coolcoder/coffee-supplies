import React, { useState } from 'react';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [cafeName, setCafeName] = useState('Artisanal Espresso Lab');
  const [address, setAddress] = useState('78 Bras Basah Rd, Singapore');
  const [roastPreference, setRoastPreference] = useState('Light Roast (Espresso / Filter)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-6 shadow-2xl border border-black space-y-5 text-[#1A1A1A]">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-black">science</span>
            <h3 className="font-headline text-lg font-light uppercase tracking-wider">
              Request Sample Pack
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black p-1 cursor-pointer font-bold">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-black text-white rounded-none mx-auto flex items-center justify-center text-2xl font-bold border border-black">
              ✓
            </div>
            <h4 className="font-headline text-xl font-light uppercase tracking-wider text-black">
              Sample Kit Dispatched
            </h4>
            <p className="text-xs font-mono text-gray-600 uppercase">
              3 x 250g sample packs dispatched to <span className="font-bold text-black">{cafeName}</span>. Expected in 1-2 days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <p className="text-gray-600 uppercase">
              Commercial cafes receive 3 complimentary 250g sample bags of our direct-trade reserves to dial in before placing bulk orders.
            </p>

            <div>
              <label className="block text-black font-bold uppercase mb-1">
                Establishment / Cafe Name
              </label>
              <input
                type="text"
                required
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-black font-bold uppercase mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-black font-bold uppercase mb-1">
                Preferred Roast Profile
              </label>
              <select
                value={roastPreference}
                onChange={(e) => setRoastPreference(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
              >
                <option value="Light Roast (Espresso / Filter)">Light Roast (Floral / Bergamot / Washed)</option>
                <option value="Medium Roast (Balanced Caramel)">Medium Roast (Caramel / Chocolate / Cream)</option>
                <option value="Dark Roast (Full Body Nutty)">Dark Roast (Low Acidity / Heavy Crema)</option>
                <option value="Assorted Tasting Trio">Assorted Tasting Trio (Light, Medium & Dark)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
            >
              Ship Free Sample Kit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
