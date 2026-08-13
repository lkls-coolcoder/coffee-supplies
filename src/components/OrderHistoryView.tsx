import React from 'react';
import { Order } from '../types';

interface OrderHistoryViewProps {
  orders: Order[];
  onReorder: (order: Order) => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  orders,
  onReorder,
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-3 flex justify-between items-end">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 block mb-1">
            04 / TRANSACTION LOG
          </span>
          <h3 className="font-headline text-2xl font-light uppercase tracking-wider text-black">
            Wholesale Order History
          </h3>
        </div>
        <p className="text-xs text-gray-500 max-w-sm hidden md:block">
          Track dispatched coffee shipments, download tax invoices, or re-order frequent roastery blends with one click.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 border border-gray-200 space-y-4 hover:border-black transition-all"
          >
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-gray-100 pb-3 text-xs font-mono">
              <div>
                <span className="font-bold text-sm text-black uppercase">{order.id}</span>
                <span className="text-gray-500 ml-3">PLACED ON {order.date}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-black text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {order.status}
                </span>
                <span className="text-black font-bold text-sm">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Item list */}
            <div className="space-y-2 font-mono">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs text-black">
                  <span>{it.name} ({it.quantity})</span>
                  <span className="font-bold">${it.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Tracking & Actions */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-2 border-t border-gray-100 text-xs font-mono">
              <div className="text-gray-500 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                <span>TRACKING: <span className="font-bold text-black">{order.trackingNumber}</span></span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Tax Invoice for ${order.id} downloaded successfully.`)}
                  className="bg-white border border-gray-300 text-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Invoice
                </button>

                <button
                  onClick={() => onReorder(order)}
                  className="bg-black text-white border border-black px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
                >
                  Re-Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
