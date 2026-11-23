import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { navigate, navigateToMenuWith } = useStore();

  return (
    <footer className="bg-[#2A1812] text-[#F2EAE0] border-t border-[#472A1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <button
              type="button"
              onClick={() => navigate('home')}
              className="text-left cursor-pointer"
            >
              <BrandLogo variant="light" showTagline />
            </button>
            <p className="mt-4 text-sm text-[#D6C7B6] leading-relaxed">
              Celebrating the culinary heritage of Tamil Nadu with freshly ground spices,
              pure ghee, and traditional recipes crafted fresh every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#FAF7F2] mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D6C7B6]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('home')}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'All' })}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('orders')}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('reviews')}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#FAF7F2] mb-4">
              Popular Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D6C7B6]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Breakfast' })}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Traditional Breakfast
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Meals' })}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Tamil Nadu Meals & Chettinad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Biryani' })}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Biryani Varieties
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Sweets' })}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Sweets & Desserts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToMenuWith({ tab: 'Beverages' })}
                  className="hover:text-[#E8BE62] transition-colors cursor-pointer"
                >
                  Filter Coffee & Beverages
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-base font-semibold text-[#FAF7F2] mb-4">
              Visit & Order
            </h3>
            <ul className="space-y-3 text-sm text-[#D6C7B6]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8BE62] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{RESTAURANT_CONFIG.addressPlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#E8BE62] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{RESTAURANT_CONFIG.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E8BE62] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{RESTAURANT_CONFIG.openingHours}</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="mt-4 inline-flex items-center text-xs font-semibold text-[#E8BE62] hover:underline cursor-pointer"
            >
              Contact & Location Details →
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#472A1E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BDA996]">
          <p>© {new Date().getFullYear()} Bharath Delights. Traditional Tamil Nadu Restaurant.</p>
          <p>
            Free delivery on orders above ₹{RESTAURANT_CONFIG.freeDeliveryThreshold} · Standard
            delivery ₹{RESTAURANT_CONFIG.deliveryCharge}
          </p>
        </div>
      </div>
    </footer>
  );
};
