import React from 'react';
import { ArrowRight, Clock, MapPin, Phone, Star } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { VegBadge } from '../components/VegBadge';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { MENU_ITEMS, VERIFIED_PHOTOS } from '../data/menuData';

export const HomePage: React.FC = () => {
  const { navigate, navigateToMenuWith, openDishModal, reviews } = useStore();

  const dailySpecialDishes = MENU_ITEMS.filter((item) =>
    ['chicken-biryani', 'ven-pongal', 'sambar-rice', 'ghee-rice'].includes(item.id)
  );

  const popularDishes = MENU_ITEMS.filter((item) =>
    [
      'curd-rice',
      'masala-dosa',
      'chettinad-chicken',
      'fish-fry',
      'gulab-jamun',
      'filter-coffee',
    ].includes(item.id)
  );

  const heroFeaturedDish = MENU_ITEMS.find((m) => m.id === 'chicken-biryani');
  const heroPongal = MENU_ITEMS.find((m) => m.id === 'ven-pongal');
  const heroSambar = MENU_ITEMS.find((m) => m.id === 'sambar-rice');
  const heroCurd = MENU_ITEMS.find((m) => m.id === 'curd-rice');

  return (
    <div>
      {/* 1. Welcome Hero Section */}
      <section className="bg-[#FAF7F2] border-b border-[#E4D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#6B1420] mb-3">
                Bharath Delights · Authentic Tamil Nadu Kitchen
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#2A1812] leading-[1.1] text-balance">
                Taste the Tradition of Tamil Nadu
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#4C382E] leading-relaxed max-w-xl">
                From morning steamed idli, golden ghee roast, and Ven Pongal to Chettinad
                spiced curries, seeraga samba biryani, and festive banana leaf meals —
                freshly prepared with pure ingredients and delivered warm to your table.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'All' })}
                  className="px-7 py-3.5 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9922A]"
                >
                  View Menu
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="px-6 py-3.5 rounded-lg border border-[#D4C3AD] bg-white hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-semibold transition-colors cursor-pointer"
                >
                  Our Culinary Story
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E4D9C8] grid grid-cols-3 gap-4 max-w-lg text-sm">
                <div>
                  <p className="font-display text-xl font-bold text-[#2A1812] tabular-nums">
                    {MENU_ITEMS.length}+
                  </p>
                  <p className="text-xs text-[#664E43]">Traditional Dishes</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-[#2A1812]">100%</p>
                  <p className="text-xs text-[#664E43]">Freshly Ground Spices</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-[#2A1812]">7 AM – 10:30 PM</p>
                  <p className="text-xs text-[#664E43]">Daily Kitchen Hours</p>
                </div>
              </div>
            </div>

            {/* Hero Bright Studio Food Showcase */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => heroFeaturedDish && openDishModal(heroFeaturedDish)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-[#E4D9C8] bg-white shadow-sm text-left cursor-pointer"
                aria-label="View Chicken Biryani details"
              >
                <img
                  src={VERIFIED_PHOTOS.chickenBiryani}
                  alt="Chicken Biryani served on a clean ceramic plate with onion raita"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3.5">
                  <p className="text-xs font-medium text-[#F3E3BD]">Signature Biryani</p>
                  <p className="font-display text-base font-semibold text-white">
                    Chicken Biryani · ₹225
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => heroPongal && openDishModal(heroPongal)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-[#E4D9C8] bg-white shadow-sm text-left cursor-pointer"
                aria-label="View Ven Pongal details"
              >
                <img
                  src={VERIFIED_PHOTOS.venPongal}
                  alt="Ven Pongal topped with roasted cashews and black pepper"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3.5">
                  <p className="text-xs font-medium text-[#F3E3BD]">Morning Classic</p>
                  <p className="font-display text-base font-semibold text-white">
                    Ven Pongal · ₹90
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => heroSambar && openDishModal(heroSambar)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-[#E4D9C8] bg-white shadow-sm text-left cursor-pointer"
                aria-label="View Sambar Rice details"
              >
                <img
                  src={VERIFIED_PHOTOS.sambarRice}
                  alt="South Indian Sambar Rice with crispy appalam"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3.5">
                  <p className="text-xs font-medium text-[#F3E3BD]">Comfort Meal</p>
                  <p className="font-display text-base font-semibold text-white">
                    Sambar Rice · ₹95
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => heroCurd && openDishModal(heroCurd)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-[#E4D9C8] bg-white shadow-sm text-left cursor-pointer"
                aria-label="View Curd Rice details"
              >
                <img
                  src={VERIFIED_PHOTOS.curdRice}
                  alt="Creamy South Indian Curd Rice tempered with pomegranate and curry leaves"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3.5">
                  <p className="text-xs font-medium text-[#F3E3BD]">Cooling Favourite</p>
                  <p className="font-display text-base font-semibold text-white">
                    Curd Rice · ₹85
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Special Dishes of the Day */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
              Fresh From Our Kitchen Today
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#2A1812]">
              Special Dishes of the Day
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateToMenuWith({ tab: 'All' })}
            className="text-sm font-semibold text-[#6B1420] hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            Explore Full Menu
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailySpecialDishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* 3. Vegetarian & Non-Vegetarian Categories */}
      <section className="bg-[#F2EAE0]/70 border-y border-[#E4D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
              Browse By Preference
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#2A1812]">
              Vegetarian & Non-Vegetarian Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#E4D9C8] p-6 sm:p-7 flex flex-col justify-between gap-5">
              <div>
                <VegBadge isVeg={true} showLabel />
                <h3 className="mt-3 font-display text-2xl font-bold text-[#2A1812]">
                  Pure Traditional Vegetarian
                </h3>
                <p className="mt-2 text-sm text-[#4C382E] leading-relaxed">
                  Steamed idli, crispy ghee roast, Ven Pongal, Banana Leaf Meals, Sambar
                  Rice, Curd Rice, Paneer Butter Masala, classic sweets, and filter coffee.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Vegetarian' })}
                  className="px-5 py-2.5 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Browse Vegetarian Menu
                </button>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Breakfast' })}
                  className="px-4 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-medium transition-colors cursor-pointer"
                >
                  Breakfast
                </button>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Sweets' })}
                  className="px-4 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-medium transition-colors cursor-pointer"
                >
                  Sweets
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E4D9C8] p-6 sm:p-7 flex flex-col justify-between gap-5">
              <div>
                <VegBadge isVeg={false} showLabel />
                <h3 className="mt-3 font-display text-2xl font-bold text-[#2A1812]">
                  Chettinad & Coastal Non-Vegetarian
                </h3>
                <p className="mt-2 text-sm text-[#4C382E] leading-relaxed">
                  Seeraga samba Chicken & Mutton Biryani, Chettinad Pepper Chicken, Vanjaram
                  Fish Fry, Chicken Kothu Parotta, Prawn Masala, and crisp Chicken 65.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Non-Vegetarian' })}
                  className="px-5 py-2.5 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Browse Non-Veg Menu
                </button>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Biryani' })}
                  className="px-4 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-medium transition-colors cursor-pointer"
                >
                  Biryani
                </button>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Snacks' })}
                  className="px-4 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-medium transition-colors cursor-pointer"
                >
                  Starters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Food Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
              Guest Favourites
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#2A1812]">
              Popular Food Items
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateToMenuWith({ tab: 'All' })}
            className="text-sm font-semibold text-[#6B1420] hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            View All {MENU_ITEMS.length} Items
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* 5. Customer Reviews Preview & Contact Strip */}
      <section className="bg-white border-t border-[#E4D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
                Guest Feedback
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#2A1812]">
                What Our Guests Say
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('reviews')}
              className="text-sm font-semibold text-[#6B1420] hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              Read & Submit Reviews
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-[#E6DAC8] bg-[#FAF7F2] p-6 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < review.rating
                              ? 'fill-[#C9922A] text-[#C9922A]'
                              : 'text-[#D6C8B5]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#664E43]">
                      {review.isSample ? 'Sample Review' : 'Visitor Review'}
                    </span>
                  </div>
                  <p className="text-sm text-[#2A1812] leading-relaxed">{review.reviewText}</p>
                </div>

                <div className="pt-3 border-t border-[#E6DAC8] text-xs text-[#664E43] flex items-center justify-between gap-2">
                  <span className="font-semibold text-[#2A1812]">{review.customerName}</span>
                  <span className="tabular-nums">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information Summary Strip */}
          <div className="mt-12 rounded-xl border border-[#E4D9C8] bg-[#FAF7F2] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#6B1420] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-display text-base font-bold text-[#2A1812]">Location</h3>
                <p className="mt-1 text-sm text-[#4C382E]">{RESTAURANT_CONFIG.addressPlaceholder}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#6B1420] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-display text-base font-bold text-[#2A1812]">Phone & WhatsApp</h3>
                <p className="mt-1 text-sm text-[#4C382E]">{RESTAURANT_CONFIG.phoneDisplay}</p>
                <p className="text-xs text-[#664E43] mt-0.5">
                  {RESTAURANT_CONFIG.restaurantWhatsAppDisplay}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#6B1420] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-display text-base font-bold text-[#2A1812]">Opening Hours</h3>
                <p className="mt-1 text-sm text-[#4C382E]">{RESTAURANT_CONFIG.openingHours}</p>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="mt-1 text-xs font-semibold text-[#6B1420] hover:underline cursor-pointer"
                >
                  Open Contact Form →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
