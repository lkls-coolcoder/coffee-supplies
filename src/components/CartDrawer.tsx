import React, { useState } from 'react';
import { CartItem, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddOrder,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Calculate total weight in kg
  const totalWeightKg = cartItems.reduce((sum, item) => {
    if (item.itemType === 'bundle') return sum + 3; // ~3kg average for bundle
    return sum + item.quantityKg;
  }, 0);

  // Bulk Tier discount calculation based on total weight
  let tierDiscountPercent = 0;
  if (totalWeightKg >= 25) {
    tierDiscountPercent = 20;
  } else if (totalWeightKg >= 10) {
    tierDiscountPercent = 12;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * tierDiscountPercent) / 100;
  const shippingFee = subtotal >= 100 ? 0 : 15.0;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().split('T')[0],
        items: cartItems.map((ci) => ({
          name: `${ci.name} (${ci.formatSize})`,
          quantity: `${ci.quantityKg}kg`,
          price: ci.totalPrice,
        })),
        total: grandTotal,
        status: 'Processing',
        trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}-SG`,
      };

      onAddOrder(newOrder);
      setOrderSuccess(newOrder);
      onClearCart();
      setIsCheckingOut(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col text-[#1A1A1A]">
          {/* Header */}
          <div className="px-6 py-4 bg-black text-white flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-lg">shopping_bag</span>
              <h3 className="font-headline text-lg font-light uppercase tracking-wider">Wholesale Cart</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 cursor-pointer font-bold text-sm"
            >
              ✕
            </button>
          </div>

          {orderSuccess ? (
            /* Order Success View */
            <div className="flex-1 p-8 flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-3xl font-bold border border-black">
                ✓
              </div>
              <h4 className="font-headline text-2xl font-light uppercase tracking-wider text-black">
                Order Confirmed
              </h4>
              <p className="text-xs text-gray-600 max-w-xs leading-relaxed uppercase font-mono">
                Thank you for your bulk purchase. Order <span className="font-bold text-black">{orderSuccess.id}</span> dispatched to roastery floor.
              </p>

              <div className="bg-gray-50 p-4 border border-gray-200 text-left w-full space-y-1 text-xs font-mono text-black">
                <div><span className="font-bold">Tracking #:</span> {orderSuccess.trackingNumber}</div>
                <div><span className="font-bold">Estimated Delivery:</span> Next Business Morning</div>
                <div><span className="font-bold">Total Paid:</span> ${orderSuccess.total.toFixed(2)}</div>
              </div>

              <button
                onClick={() => {
                  setOrderSuccess(null);
                  onClose();
                }}
                className="w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer mt-4"
              >
                Back to Catalog
              </button>
            </div>
          ) : (
            /* Cart Items View */
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-gray-500 space-y-3">
                  <span className="material-symbols-outlined text-5xl text-gray-300">
                    remove_shopping_cart
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest">Your wholesale cart is empty.</p>
                  <p className="text-xs text-gray-400">Add single origin bags or bundles to calculate bulk discounts.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 border border-gray-200 flex gap-3 relative group hover:border-black transition-colors"
                  >
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200'}
                      alt={item.name}
                      className="w-16 h-16 object-cover border border-gray-200"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-xs uppercase tracking-wider text-black">{item.name}</h5>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-black text-xs cursor-pointer font-bold"
                        >
                          ✕
                        </button>
                      </div>

                      <span className="inline-block bg-black text-white text-[10px] font-mono px-2 py-0.5 uppercase font-bold my-1">
                        Format: {item.formatSize}
                      </span>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-xs font-bold px-1 text-black cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-bold min-w-[20px] text-center">
                            {item.quantityKg}KG
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-xs font-bold px-1 text-black cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono font-bold text-sm text-black">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Footer Summary & Checkout */}
          {!orderSuccess && cartItems.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-3">
              {/* Weight & Tier Banner */}
              <div className="bg-white p-3 border border-gray-200 space-y-1">
                <div className="flex justify-between text-xs font-mono text-black">
                  <span>Total Order Weight:</span>
                  <span className="font-bold">{totalWeightKg} KG</span>
                </div>

                {tierDiscountPercent > 0 ? (
                  <div className="text-xs font-mono font-bold text-black flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Bulk Tier Applied: {tierDiscountPercent}% OFF</span>
                  </div>
                ) : (
                  <div className="text-[10px] font-mono text-gray-500 uppercase">
                    Add {10 - totalWeightKg}KG more to unlock 12% discount!
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-1 text-xs font-mono text-gray-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-black font-bold">
                    <span>Bulk Discount ({tierDiscountPercent}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Logistics Shipping:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-gray-200">
                  <span>Grand Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckoutSubmit} className="pt-2">
                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className="w-full bg-black text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">local_shipping</span>
                      <span>Place Order (${grandTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
