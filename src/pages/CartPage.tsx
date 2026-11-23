import React from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { DishVisual } from '../components/DishVisual';
import { VegBadge } from '../components/VegBadge';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryCharge,
    grandTotal,
    updateQuantity,
    removeFromCart,
    navigate,
    navigateToMenuWith,
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#F2EAE0] border border-[#E4D9C8] text-[#6B1420] mx-auto flex items-center justify-center">
          <ShoppingBag className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-[#2A1812]">
          Your Cart Is Empty
        </h1>
        <p className="mt-3 text-base text-[#4C382E] max-w-md mx-auto">
          Add authentic Tamil Nadu breakfasts, biryani, banana leaf meals, sweets, or filter
          coffee from our menu to begin your order.
        </p>
        <button
          type="button"
          onClick={() => navigateToMenuWith({ tab: 'All' })}
          className="mt-7 px-7 py-3 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          View Menu
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  const remainingForFreeDelivery = Math.max(
    0,
    RESTAURANT_CONFIG.freeDeliveryThreshold - subtotal
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="pb-6 border-b border-[#E4D9C8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
            Order Basket
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[#2A1812]">Your Cart</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('menu')}
          className="text-sm font-semibold text-[#6B1420] hover:underline self-start sm:self-auto cursor-pointer"
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ dish, quantity }) => (
            <div
              key={dish.id}
              className="bg-white rounded-xl border border-[#E6DAC8] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-[#E6DAC8] bg-[#FAF7F2]">
                  <DishVisual
                    name={dish.name}
                    imageSrc={dish.imageSrc}
                    expectedImagePath={dish.expectedImagePath}
                    motif={dish.motif}
                    accentTone={dish.accentTone}
                    isVeg={dish.isVeg}
                    size="thumb"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <VegBadge isVeg={dish.isVeg} />
                    <span className="text-xs text-[#664E43] truncate">{dish.sectionGroup}</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#2A1812] truncate">
                    {dish.name}
                  </h2>
                  <p className="text-sm text-[#664E43] tabular-nums">₹{dish.price} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F2EAE0]">
                {/* Quantity Controls */}
                <div className="inline-flex items-center border border-[#D4C3AD] rounded-lg bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(dish.id, quantity - 1)}
                    className="w-9 h-9 inline-flex items-center justify-center text-[#2A1812] hover:bg-[#F2EAE0] rounded-l-lg transition-colors cursor-pointer"
                    aria-label={`Decrease ${dish.name} quantity`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-sm font-bold text-[#2A1812] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(dish.id, quantity + 1)}
                    className="w-9 h-9 inline-flex items-center justify-center text-[#2A1812] hover:bg-[#F2EAE0] rounded-r-lg transition-colors cursor-pointer"
                    aria-label={`Increase ${dish.name} quantity`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right min-w-[72px]">
                  <p className="text-base font-bold text-[#2A1812] tabular-nums">
                    ₹{dish.price * quantity}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(dish.id)}
                  className="p-2 rounded-lg text-[#664E43] hover:text-[#8B1E24] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  aria-label={`Remove ${dish.name} from cart`}
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <aside className="lg:col-span-4 bg-white rounded-xl border border-[#E6DAC8] p-6 sticky top-24">
          <h2 className="font-display text-xl font-bold text-[#2A1812] pb-4 border-b border-[#F2EAE0]">
            Order Summary
          </h2>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between text-[#4C382E]">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-[#2A1812] tabular-nums">₹{subtotal}</dd>
            </div>
            <div className="flex items-center justify-between text-[#4C382E]">
              <dt>Delivery Charge</dt>
              <dd className="font-semibold text-[#2A1812] tabular-nums">
                {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
              </dd>
            </div>
            {remainingForFreeDelivery > 0 && (
              <p className="text-xs text-[#664E43] bg-[#FAF7F2] rounded-lg px-3 py-2 border border-[#E6DAC8]">
                Add ₹{remainingForFreeDelivery} more to unlock free delivery (orders ₹
                {RESTAURANT_CONFIG.freeDeliveryThreshold}+).
              </p>
            )}
            <div className="pt-3 border-t border-[#E4D9C8] flex items-center justify-between text-base font-bold text-[#2A1812]">
              <dt>Grand Total</dt>
              <dd className="text-lg text-[#6B1420] tabular-nums">₹{grandTotal}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 px-6 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate('menu')}
              className="w-full py-3 px-6 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-semibold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
