import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { B2BSideNav } from './components/B2BSideNav';
import { CatalogSection } from './components/CatalogSection';
import { BulkTiersWidget } from './components/BulkTiersWidget';
import { BundlesSection } from './components/BundlesSection';
import { RewardsSection } from './components/RewardsSection';
import { MyAccountView } from './components/MyAccountView';
import { CartDrawer } from './components/CartDrawer';
import { SampleRequestModal } from './components/SampleRequestModal';
import { CustomPalletModal } from './components/CustomPalletModal';
import { OrderHistoryView } from './components/OrderHistoryView';
import { SupportModal } from './components/SupportModal';

import {
  INITIAL_PRODUCTS,
  INITIAL_BUNDLES,
  INITIAL_USER,
  INITIAL_ORDERS,
} from './data/mockData';

import { ActiveTab, CartItem, FormatSize, Order, Product, Bundle, UserProfile, RewardItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isCustomPalletOpen, setIsCustomPalletOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Helper for adding single origin to cart
  const handleAddToCart = (product: Product, formatSize: FormatSize) => {
    let kg = 5;
    let mult = 1;
    if (formatSize === '10kg') {
      kg = 10;
      mult = 0.88;
    } else if (formatSize === '25kg+') {
      kg = 25;
      mult = 0.8;
    }

    const pricePerKg = product.basePricePerKg * mult;
    const totalPrice = pricePerKg * kg;
    const itemId = `${product.id}-${formatSize}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.id === itemId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newKg = existing.quantityKg + kg;
        updated[existingIndex] = {
          ...existing,
          quantityKg: newKg,
          totalPrice: pricePerKg * newKg,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: itemId,
          itemType: 'product',
          productId: product.id,
          name: product.name,
          origin: product.origin,
          formatSize,
          pricePerKg,
          quantityKg: kg,
          totalPrice,
          image: product.image,
        },
      ];
    });
  };

  // Add bundle to cart
  const handleAddBundleToCart = (bundle: Bundle) => {
    const itemId = `bundle-${bundle.id}`;
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === itemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === itemId
            ? {
                ...ci,
                quantityKg: ci.quantityKg + 3,
                totalPrice: ci.totalPrice + bundle.price,
              }
            : ci
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          itemType: 'bundle',
          bundleId: bundle.id,
          name: bundle.name,
          formatSize: '10kg',
          pricePerKg: bundle.price / 3,
          quantityKg: 3,
          totalPrice: bundle.price,
          image: bundle.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  // Add custom pallet
  const handleAddCustomPalletToCart = (palletItems: { name: string; kg: number; price: number }[]) => {
    palletItems.forEach((it) => {
      const itemId = `custom-pallet-${it.name.toLowerCase().replace(/\s+/g, '-')}`;
      setCartItems((prev) => [
        ...prev,
        {
          id: itemId,
          itemType: 'product',
          name: `Custom Pallet: ${it.name}`,
          formatSize: '25kg+',
          pricePerKg: it.price / it.kg,
          quantityKg: it.kg,
          totalPrice: it.price,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300',
        },
      ]);
    });
    setIsCartOpen(true);
  };

  // Cart item modifications
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const step = ci.itemType === 'bundle' ? 1 : 5;
            const newKg = ci.quantityKg + delta * step;
            if (newKg <= 0) return null;
            return {
              ...ci,
              quantityKg: newKg,
              totalPrice: ci.pricePerKg * newKg,
            };
          }
          return ci;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  // Add completed order
  const handleAddOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    // Earn 1 reward point per $1 spent
    const earnedPoints = Math.floor(order.total);
    setUser((prev) => ({
      ...prev,
      pointsBalance: prev.pointsBalance + earnedPoints,
    }));
  };

  // Redeem reward
  const handleRedeemReward = (reward: RewardItem) => {
    setUser((prev) => ({
      ...prev,
      pointsBalance: prev.pointsBalance - reward.pointsCost,
    }));
  };

  // Re-order past order
  const handleReorder = (order: Order) => {
    order.items.forEach((it) => {
      const itemId = `reorder-${order.id}-${it.name.toLowerCase().replace(/\s+/g, '-')}`;
      setCartItems((prev) => [
        ...prev,
        {
          id: itemId,
          itemType: 'product',
          name: it.name,
          formatSize: '10kg',
          pricePerKg: 22,
          quantityKg: parseInt(it.quantity) || 10,
          totalPrice: it.price,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300',
        },
      ]);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#1f1b14] flex flex-col font-sans selection:bg-[#ffca98] selection:text-[#7a532a]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        isMobileSimulator={isMobileSimulator}
        setIsMobileSimulator={setIsMobileSimulator}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
      />

      {/* Main Container */}
      {isMobileSimulator || activeTab === 'account' ? (
        /* Mobile Simulator Mode or Mobile My Account View */
        <main className="flex-1 pt-[88px] pb-16 px-4 flex flex-col items-center justify-center bg-[#f6ece1]/60">
          <div className="w-full max-w-md my-4">
            <div className="text-center mb-4">
              <span className="bg-[#25160e] text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-sm">smartphone</span>
                <span>Mobile App View (Artisanal Roast Co. Account)</span>
              </span>
            </div>

            <MyAccountView
              user={user}
              onUpdateUser={setUser}
              onNavigateHome={() => {
                setActiveTab('catalog');
                setIsMobileSimulator(false);
              }}
              onNavigateTab={(tab) => {
                if (tab === 'catalog') setActiveTab('catalog');
                if (tab === 'deals') setActiveTab('deals');
                if (tab === 'support') setIsSupportOpen(true);
                setIsMobileSimulator(false);
              }}
              isMobileFrame={true}
            />
          </div>
        </main>
      ) : (
        /* Full Desktop B2B Web Application Portal */
        <main className="w-full max-w-[1280px] mx-auto px-4 md:px-10 pt-[88px] pb-24 flex flex-col gap-12">
          {/* Hero Banner */}
          {activeTab === 'catalog' && (
            <HeroSection
              onShopBulk={() => setActiveTab('catalog')}
              onRequestSamples={() => setIsSampleModalOpen(true)}
            />
          )}

          {/* Two-Column Layout with Sticky Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            <B2BSideNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenSupport={() => setIsSupportOpen(true)}
            />

            {/* Content Canvas */}
            <div className="flex-1 flex flex-col gap-12">
              {activeTab === 'catalog' && (
                <>
                  <CatalogSection
                    products={INITIAL_PRODUCTS}
                    onAddToCart={handleAddToCart}
                  />
                  <BulkTiersWidget />
                  <BundlesSection
                    bundles={INITIAL_BUNDLES}
                    onAddBundle={handleAddBundleToCart}
                    onConfigureCustomPallet={() => setIsCustomPalletOpen(true)}
                  />
                  <RewardsSection
                    user={user}
                    onRedeemReward={handleRedeemReward}
                  />
                </>
              )}

              {activeTab === 'deals' && (
                <div className="space-y-8">
                  <BulkTiersWidget />
                  <BundlesSection
                    bundles={INITIAL_BUNDLES}
                    onAddBundle={handleAddBundleToCart}
                    onConfigureCustomPallet={() => setIsCustomPalletOpen(true)}
                  />
                  <CatalogSection
                    products={INITIAL_PRODUCTS}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              )}

              {activeTab === 'rewards' && (
                <RewardsSection
                  user={user}
                  onRedeemReward={handleRedeemReward}
                />
              )}

              {activeTab === 'orders' && (
                <OrderHistoryView
                  orders={orders}
                  onReorder={handleReorder}
                />
              )}
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8 bg-black text-white border-t border-gray-800 mt-auto">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              alt="Artisanal Roast Co. Logo"
              className="h-10 w-10 object-cover border border-gray-700 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp7W1IrTlvW7ieLrqEevDbIv8HIjGiphaMUpzVI9GkuFV1E5Aw4pWR678QjO9dE9fInVx0suEj6nsK6AWrm-adpD_kDtIc5j90NEi_gbtj0Do-_zsKFjMlnuXoWdMc8kWI81ieEvXHx6kQVmiCp_iHdzdSVZVO--o6Y4rXSVpCxnrhsWqd-oDuuEnD7sqgYms8H62QBJuJ8C7pZNYwgyr9NWEytJIhMg8-XuFIWRCsWQepcrwoXSJ3"
            />
            <span className="font-headline text-2xl text-white font-light uppercase tracking-wider">
              Artisanal Roast Co.
            </span>
          </div>

          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            Premium coffee bean supplier catering to connoisseurs and bulk buyers. Grounded, transparent, and expert logistics for commercial establishments.
          </p>

          <div className="flex items-center gap-2 text-white text-xs font-mono font-bold bg-gray-900 w-max px-3 py-1.5 border border-gray-800 uppercase">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>Certified Food Safe Facility</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 text-xs font-mono">
          <h4 className="font-bold text-white uppercase tracking-wider mb-1">
            Operations
          </h4>
          <a href="#" className="text-gray-400 hover:text-white underline">
            Food Safety Standards
          </a>
          <a href="#" className="text-gray-400 hover:text-white underline">
            Delivery Logistics
          </a>
          <a href="#" className="text-gray-400 hover:text-white underline">
            Wholesale Account Setup
          </a>
        </div>

        <div className="flex flex-col gap-2.5 text-xs font-mono">
          <h4 className="font-bold text-white uppercase tracking-wider mb-1">
            Legal
          </h4>
          <a href="#" className="text-gray-400 hover:text-white underline">
            Terms of Sale
          </a>
          <a href="#" className="text-gray-400 hover:text-white underline">
            Privacy Policy
          </a>
          <p className="text-[10px] text-gray-500 uppercase mt-auto pt-4">
            © 2026 Artisanal Roast Co. Professional Bulk Solutions.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onAddOrder={handleAddOrder}
      />

      <SampleRequestModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />

      <CustomPalletModal
        isOpen={isCustomPalletOpen}
        onClose={() => setIsCustomPalletOpen(false)}
        products={INITIAL_PRODUCTS}
        onAddCustomPalletToCart={handleAddCustomPalletToCart}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
