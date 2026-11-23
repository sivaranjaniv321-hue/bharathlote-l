import React from 'react';
import { MessageCircle, RotateCcw, ShoppingBag } from 'lucide-react';
import { DishVisual } from '../components/DishVisual';
import { useStore } from '../context/StoreContext';
import { buildRestaurantWhatsAppUrl } from '../utils/whatsapp';

export const OrdersPage: React.FC = () => {
  const { orders, reorderToCart, navigate } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="pb-6 border-b border-[#E4D9C8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
            Order History
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[#2A1812]">My Orders</h1>
          <p className="mt-1.5 text-sm text-[#4C382E]">
            Your placed orders are saved locally in this browser for quick reference and
            reordering.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('menu')}
          className="px-5 py-2.5 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold self-start sm:self-auto cursor-pointer"
        >
          Order More Food
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F2EAE0] border border-[#E4D9C8] text-[#6B1420] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold text-[#2A1812]">
            No Orders Placed Yet
          </h2>
          <p className="mt-2 text-sm text-[#664E43] max-w-md mx-auto">
            Once you add dishes to your cart and complete checkout, your order summary and
            WhatsApp receipt will appear here.
          </p>
          <button
            type="button"
            onClick={() => navigate('menu')}
            className="mt-6 px-6 py-3 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold cursor-pointer"
          >
            View Menu
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <article
              key={order.orderNumber}
              className="bg-white rounded-xl border border-[#E6DAC8] p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F2EAE0]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#664E43]">
                    <span className="font-bold text-[#2A1812] tabular-nums">
                      {order.orderNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {new Date(order.createdAt).toLocaleString('en-IN')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#1F7A3E]">{order.orderStatus}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#4C382E]">
                    Deliver to: <strong className="text-[#2A1812]">{order.customer.fullName}</strong>{' '}
                    ({order.customer.area}, {order.customer.city})
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-lg font-bold text-[#6B1420] tabular-nums">
                    ₹{order.grandTotal}
                  </p>
                  <p className="text-xs text-[#664E43]">
                    {order.paymentMethod} · {order.paymentStatus}
                  </p>
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EFE6D8]"
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                      <DishVisual
                        name={item.name}
                        imageSrc={item.imageSrc}
                        expectedImagePath={item.expectedImagePath}
                        motif={item.motif}
                        accentTone={item.accentTone}
                        isVeg={item.isVeg}
                        size="thumb"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#2A1812] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#664E43] tabular-nums">
                        Qty {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-[#F2EAE0] flex flex-wrap items-center justify-between gap-3">
                <a
                  href={buildRestaurantWhatsAppUrl(order)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-[#1F7A3E] text-[#1F7A3E] hover:bg-[#E6F4EA] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Send Order via WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => reorderToCart(order)}
                  className="px-4 py-2 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  Reorder Items
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
