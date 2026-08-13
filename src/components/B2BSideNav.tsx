import React from 'react';
import { ActiveTab } from '../types';

interface B2BSideNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSupport: () => void;
}

export const B2BSideNav: React.FC<B2BSideNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSupport,
}) => {
  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-[90px] h-[calc(100vh-100px)] border-r border-gray-200 pr-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="font-headline text-xl text-[#1A1A1A] font-light uppercase tracking-widest">
          B2B Portal
        </h2>
        <p className="text-xs text-gray-500 uppercase tracking-tight mt-1">Bulk Specialist Account</p>
      </div>

      <nav className="flex flex-col gap-1.5">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-200 hover:border-black hover:text-black'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            <span>01 / Catalog</span>
          </div>
          <span className="text-xs">→</span>
        </button>

        <button
          onClick={() => setActiveTab('deals')}
          className={`flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
            activeTab === 'deals'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-200 hover:border-black hover:text-black'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">switch_left</span>
            <span>02 / Bulk Deals</span>
          </div>
          <span className="text-xs">→</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
            activeTab === 'rewards'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-200 hover:border-black hover:text-black'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">military_tech</span>
            <span>03 / Rewards</span>
          </div>
          <span className="text-xs">→</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-200 hover:border-black hover:text-black'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">history</span>
            <span>04 / Order History</span>
          </div>
          <span className="text-xs">→</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('support');
            onOpenSupport();
          }}
          className={`flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
            activeTab === 'support'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-200 hover:border-black hover:text-black'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">support_agent</span>
            <span>05 / Support</span>
          </div>
          <span className="text-xs">→</span>
        </button>
      </nav>

      {/* Account summary widget */}
      <div className="mt-auto p-4 bg-white border border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-black uppercase tracking-widest border-b border-black pb-0.5">
            VERIFIED B2B
          </span>
          <span className="w-2 h-2 rounded-none bg-black" />
        </div>
        <p className="text-xs text-gray-500 leading-normal">
          Commercial tier active. Direct roastery access.
        </p>
      </div>
    </aside>
  );
};
