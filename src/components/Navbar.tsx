import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';
import { BrandLogo } from './BrandLogo';

const NAV_LINKS: { label: string; route: PageRoute }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Menu', route: 'menu' },
  { label: 'About Us', route: 'about' },
  { label: 'My Orders', route: 'orders' },
  { label: 'Reviews', route: 'reviews' },
  { label: 'Contact', route: 'contact' },
];

export const Navbar: React.FC = () => {
  const { currentPage, navigate, navigateToMenuWith, cartCount } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (route: PageRoute) => {
    setMobileOpen(false);
    navigate(route);
  };

  const handleSearchClick = () => {
    setMobileOpen(false);
    navigateToMenuWith({ focusSearch: true });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E4D9C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1420] rounded-lg"
          aria-label="Bharath Delights Home"
        >
          <BrandLogo variant="dark" />
        </button>

        {/* Zone 2: Primary Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.route;
            return (
              <button
                key={link.route}
                type="button"
                onClick={() => handleNavClick(link.route)}
                className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:text-[#6B1420] ${
                  isActive
                    ? 'text-[#6B1420] font-semibold'
                    : 'text-[#4C382E] hover:text-[#2A1812]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#6B1420] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search & Cart Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSearchClick}
            className="w-10 h-10 rounded-lg border border-[#E4D9C8] bg-white hover:bg-[#F2EAE0] text-[#2A1812] inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1420]"
            aria-label="Search menu dishes"
            title="Search menu"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('cart')}
            className="relative h-10 px-3.5 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white inline-flex items-center gap-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9922A]"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md bg-[#C9922A] text-[#2A1812] text-xs font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden w-10 h-10 rounded-lg border border-[#E4D9C8] bg-white hover:bg-[#F2EAE0] text-[#2A1812] inline-flex items-center justify-center transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E4D9C8] bg-white px-4 py-3 shadow-lg">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const isActive = currentPage === link.route;
              return (
                <button
                  key={link.route}
                  type="button"
                  onClick={() => handleNavClick(link.route)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF7F2] text-[#6B1420] font-semibold'
                      : 'text-[#2A1812] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
