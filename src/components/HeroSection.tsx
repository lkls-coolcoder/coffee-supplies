import React from 'react';

interface HeroSectionProps {
  onShopBulk: () => void;
  onRequestSamples: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopBulk,
  onRequestSamples,
}) => {
  return (
    <section className="relative w-full h-[480px] md:h-[540px] border border-gray-200 bg-[#1A1A1A] text-white mt-6 overflow-hidden flex flex-col justify-between p-8 md:p-14">
      {/* Background image tint */}
      <div className="absolute inset-0 opacity-30 mix-blend-luminosity pointer-events-none">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUw_v5ly2dcRy2eLlp3QFweIGEt36VJ_ibRUFcEz4Qmop6z0plqqeN6TNEwYOXfVvBpHT6-D6xjWAgMDnaR-a4XJKW4eKvPAmbdvQ4eWYHav5vB6iT6MrpobDdJDk-cB2S5rff1XjxkjBW7ZdQItMAfR43ik3aRdlyN1uRe-PxUollXB1hmHkU_3eacpfQhbfRg7Zuh2GQv4EwwAUJ5730yzE31qawMqyoMdKAi41opThmcikDJ972zMhatRAUCTGuxg"
          alt="Freshly Roasted Coffee Beans"
        />
      </div>

      {/* Top Header Tag */}
      <div className="flex justify-between items-start z-10">
        <span className="text-xs font-bold uppercase tracking-widest border-b-2 border-white pb-1">
          01 / Wholesale Reserve
        </span>
        <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
          DIRECT TRADE • 2026
        </span>
      </div>

      {/* Hero Content */}
      <div className="z-10 max-w-2xl my-auto">
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
          Structural Precision in Coffee Roasting
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-300 mb-8 max-w-lg leading-relaxed font-normal">
          Direct trade single-origin reserves and custom cafe blends. Scaled with mathematical consistency for high-volume commercial excellence.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={onShopBulk}
            className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 border border-white hover:bg-gray-200 transition-all cursor-pointer"
          >
            Explore Catalog →
          </button>

          <button
            onClick={onRequestSamples}
            className="bg-transparent text-white border border-white/60 font-semibold text-xs uppercase tracking-widest px-8 py-4 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Request Sample Kit
          </button>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="flex justify-between items-end text-xs text-gray-400 border-t border-white/20 pt-4 z-10">
        <span>Bulk Tiers: 5kg / 10kg / 25kg+</span>
        <span className="font-mono">Logistics: Next Business Morning</span>
      </div>
    </section>
  );
};
