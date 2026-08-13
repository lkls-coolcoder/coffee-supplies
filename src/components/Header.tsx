import React from 'react';
import { ActiveTab, CartItem, UserProfile } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  user: UserProfile;
  isMobileSimulator: boolean;
  setIsMobileSimulator: (val: boolean) => void;
  onOpenSampleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartItems,
  onOpenCart,
  user,
  isMobileSimulator,
  setIsMobileSimulator,
  onOpenSampleModal,
}) => {
  const totalCartCount = cartItems.reduce((sum, item) => sum + (item.itemType === 'bundle' ? 1 : item.quantityKg), 0);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-10 py-3 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
        <div className="w-10 h-10 bg-black text-white rounded-none flex items-center justify-center font-bold text-lg tracking-tighter">
          A
        </div>
        <div className="flex flex-col">
          <span className="font-headline text-xl md:text-2xl text-[#1A1A1A] font-bold tracking-wider uppercase leading-none">
            Artisanal Roast Co.
          </span>
          <span className="text-[10px] tracking-widest uppercase text-gray-500 font-medium mt-0.5">
            01 / B2B Coffee Portal
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8 items-center">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
            activeTab === 'catalog'
              ? 'text-black border-b-2 border-black pb-1'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          Single Origin
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
            activeTab === 'catalog' ? 'text-gray-500 hover:text-black' : 'text-gray-500 hover:text-black'
          }`}
        >
          Blends
        </button>

        <button
          onClick={() => setActiveTab('deals')}
          className={`text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
            activeTab === 'deals'
              ? 'text-black border-b-2 border-black pb-1'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          Wholesale
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'rewards'
              ? 'text-black border-b-2 border-black pb-1'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <span>Rewards</span>
          <span className="bg-black text-white text-[10px] px-2 py-0.5 font-mono font-bold">
            {user.pointsBalance} PTS
          </span>
        </button>
      </nav>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Sample Request Button */}
        <button
          onClick={onOpenSampleModal}
          className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-gray-100 text-[#1A1A1A] text-xs uppercase tracking-wider font-semibold px-3 py-2 border border-gray-300 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm text-black">science</span>
          <span>Samples</span>
        </button>

        {/* View Switcher Toggle */}
        <button
          onClick={() => setIsMobileSimulator(!isMobileSimulator)}
          title="Toggle Mobile View Simulator"
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-black text-white px-3 py-2 hover:bg-gray-800 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">
            {isMobileSimulator ? 'desktop_windows' : 'smartphone'}
          </span>
          <span className="hidden sm:inline">
            {isMobileSimulator ? 'Web Portal' : 'Mobile View'}
          </span>
        </button>

        {/* Account Button */}
        <button
          onClick={() => setActiveTab('account')}
          className={`transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-2 border ${
            activeTab === 'account'
              ? 'bg-black text-white border-black'
              : 'bg-white text-[#1A1A1A] border-gray-300 hover:bg-gray-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">person</span>
          <span className="hidden md:inline">{user.firstName || 'Account'}</span>
        </button>

        {/* Cart Drawer Trigger */}
        <button
          onClick={onOpenCart}
          className="relative bg-white text-[#1A1A1A] hover:bg-gray-100 border border-gray-300 transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-2"
        >
          <span className="material-symbols-outlined text-base">shopping_cart</span>
          <span className="hidden md:inline">Cart</span>
          {totalCartCount > 0 && (
            <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.2 min-w-[18px] text-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
