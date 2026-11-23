import React, { useEffect, useState } from 'react';
import { Minus, Plus, Star, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DishVisual } from './DishVisual';
import { VegBadge } from './VegBadge';

export const FoodDetailModal: React.FC = () => {
  const { selectedDish, closeDishModal, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [selectedDish?.id]);

  useEffect(() => {
    if (!selectedDish) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDishModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedDish, closeDishModal]);

  if (!selectedDish) return null;

  const handleAdd = () => {
    addToCart(selectedDish, quantity);
    closeDishModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A1812]/55 backdrop-blur-[2px]"
      onClick={closeDishModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dish-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E6DAC8] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeDishModal}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/95 border border-[#E6DAC8] text-[#2A1812] hover:bg-[#FAF7F2] inline-flex items-center justify-center shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1420]"
          aria-label="Close food details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Portrait 4:5 Food Visual */}
        <div className="md:col-span-5 bg-[#FAF7F2] aspect-[4/5] w-full overflow-hidden">
          <DishVisual
            name={selectedDish.name}
            imageSrc={selectedDish.imageSrc}
            expectedImagePath={selectedDish.expectedImagePath}
            motif={selectedDish.motif}
            accentTone={selectedDish.accentTone}
            isVeg={selectedDish.isVeg}
            size="modal"
          />
        </div>

        {/* Details & Purchase Module */}
        <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#664E43] mb-2">
              <VegBadge isVeg={selectedDish.isVeg} showLabel />
              <span aria-hidden="true">·</span>
              <span>{selectedDish.sectionGroup}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#2A1812] tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#C9922A] text-[#C9922A]" aria-hidden="true" />
                {selectedDish.rating.toFixed(1)}
              </span>
            </div>

            <h2
              id="modal-dish-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#2A1812] leading-tight"
            >
              {selectedDish.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-[#6B1420] tabular-nums">
                ₹{selectedDish.price}
              </span>
              {selectedDish.originalPrice && (
                <span className="text-sm text-[#8D776A] line-through tabular-nums">
                  ₹{selectedDish.originalPrice}
                </span>
              )}
              {selectedDish.discountLabel && (
                <span className="text-xs font-semibold text-[#6B1420]">
                  {selectedDish.discountLabel}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm sm:text-[15px] text-[#4C382E] leading-relaxed">
              {selectedDish.fullDescription}
            </p>

            {!selectedDish.imageSrc && (
              <p className="mt-4 text-xs text-[#664E43] bg-[#FAF7F2] border border-[#E6DAC8] rounded-lg px-3 py-2">
                Note: Dedicated studio photograph for this item is pending (expected path:{' '}
                <code className="font-mono text-[#2A1812]">{selectedDish.expectedImagePath}</code>).
              </p>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t border-[#F2EAE0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="inline-flex items-center justify-between sm:justify-start border border-[#D8C9B4] rounded-lg bg-[#FAF7F2]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 inline-flex items-center justify-center text-[#2A1812] hover:bg-[#F2EAE0] rounded-l-lg transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-[#2A1812] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 inline-flex items-center justify-center text-[#2A1812] hover:bg-[#F2EAE0] rounded-r-lg transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-[#6B1420] hover:bg-[#4E0D16] rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9922A]"
            >
              Add to Cart · ₹{selectedDish.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
