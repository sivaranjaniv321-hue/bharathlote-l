import React from 'react';
import { Minus, Plus, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MenuItem } from '../types';
import { DishVisual } from './DishVisual';
import { VegBadge } from './VegBadge';

interface FoodCardProps {
  dish: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ dish }) => {
  const { addToCart, updateQuantity, getItemQuantity, openDishModal } = useStore();
  const quantity = getItemQuantity(dish.id);

  return (
    <article className="group bg-white rounded-xl border border-[#E6DAC8] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* 1:1 Square Food Visual */}
      <button
        type="button"
        onClick={() => openDishModal(dish)}
        className="relative w-full aspect-square overflow-hidden bg-[#FAF7F2] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1420]"
        aria-label={`View details for ${dish.name}`}
      >
        <DishVisual
          name={dish.name}
          imageSrc={dish.imageSrc}
          expectedImagePath={dish.expectedImagePath}
          motif={dish.motif}
          accentTone={dish.accentTone}
          isVeg={dish.isVeg}
          size="card"
        />
      </button>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#664E43] mb-1.5">
            <span className="inline-flex items-center gap-1.5 min-w-0 truncate">
              <VegBadge isVeg={dish.isVeg} />
              <span className="truncate">{dish.sectionGroup}</span>
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#2A1812] tabular-nums shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#C9922A] text-[#C9922A]" aria-hidden="true" />
              {dish.rating.toFixed(1)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => openDishModal(dish)}
            className="text-left w-full focus-visible:outline-none focus-visible:underline"
          >
            <h3 className="font-display text-[17px] font-semibold text-[#2A1812] leading-snug group-hover:text-[#6B1420] transition-colors">
              {dish.name}
            </h3>
          </button>

          <p className="mt-1 text-sm text-[#664E43] leading-relaxed line-clamp-2">
            {dish.shortDescription}
          </p>
        </div>

        {/* Price + Action Row */}
        <div className="pt-2.5 border-t border-[#F2EAE0] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-base font-bold text-[#2A1812] tabular-nums">
              ₹{dish.price}
            </span>
            {dish.originalPrice && (
              <span className="text-xs text-[#8D776A] line-through tabular-nums">
                ₹{dish.originalPrice}
              </span>
            )}
            {dish.discountLabel && (
              <span className="text-xs font-semibold text-[#6B1420] whitespace-nowrap">
                {dish.discountLabel}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(dish, 1)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#6B1420] hover:bg-[#4E0D16] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9922A]"
            >
              Add
            </button>
          ) : (
            <div className="inline-flex items-center border border-[#6B1420] rounded-lg bg-[#FAF7F2] shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(dish.id, quantity - 1)}
                className="w-8 h-8 inline-flex items-center justify-center text-[#6B1420] hover:bg-[#F2EAE0] rounded-l-lg transition-colors cursor-pointer"
                aria-label={`Decrease quantity of ${dish.name}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-[#2A1812] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(dish.id, quantity + 1)}
                className="w-8 h-8 inline-flex items-center justify-center text-[#6B1420] hover:bg-[#F2EAE0] rounded-r-lg transition-colors cursor-pointer"
                aria-label={`Increase quantity of ${dish.name}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
