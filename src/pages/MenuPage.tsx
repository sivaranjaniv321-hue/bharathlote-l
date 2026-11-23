import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { useStore } from '../context/StoreContext';
import { MENU_FILTER_TABS, MENU_ITEMS } from '../data/menuData';
import { FilterTab } from '../types';

export const MenuPage: React.FC = () => {
  const {
    activeFilterTab,
    setActiveFilterTab,
    searchQuery,
    setSearchQuery,
    shouldFocusSearch,
    clearFocusSearch,
  } = useStore();

  const [dietSubFilter, setDietSubFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      clearFocusSearch();
    }
  }, [shouldFocusSearch, clearFocusSearch]);

  const handleTabClick = (tab: FilterTab) => {
    setActiveFilterTab(tab);
    if (tab === 'Vegetarian' || tab === 'Non-Vegetarian') {
      setDietSubFilter('all');
    }
  };

  const filteredDishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((dish) => {
      // Primary Filter Tab
      if (activeFilterTab === 'Vegetarian' && !dish.isVeg) return false;
      if (activeFilterTab === 'Non-Vegetarian' && dish.isVeg) return false;
      if (
        activeFilterTab !== 'All' &&
        activeFilterTab !== 'Vegetarian' &&
        activeFilterTab !== 'Non-Vegetarian'
      ) {
        if (!dish.tags.includes(activeFilterTab) && dish.category !== activeFilterTab) {
          return false;
        }
      }

      // Secondary Dietary Refinement (when browsing Breakfast/Meals/Biryani/etc.)
      if (
        activeFilterTab !== 'Vegetarian' &&
        activeFilterTab !== 'Non-Vegetarian'
      ) {
        if (dietSubFilter === 'veg' && !dish.isVeg) return false;
        if (dietSubFilter === 'nonveg' && dish.isVeg) return false;
      }

      // Search Query
      if (query) {
        const haystack = [
          dish.name,
          dish.shortDescription,
          dish.sectionGroup,
          dish.category,
          ...(dish.searchAliases ?? []),
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [activeFilterTab, dietSubFilter, searchQuery]);

  // Group dishes cleanly by sectionGroup when no search query is entered, or show flat grid when searching
  const groupedSections = useMemo(() => {
    const map = new Map<string, typeof filteredDishes>();
    for (const dish of filteredDishes) {
      const existing = map.get(dish.sectionGroup) ?? [];
      existing.push(dish);
      map.set(dish.sectionGroup, existing);
    }
    return Array.from(map.entries());
  }, [filteredDishes]);

  const resetAll = () => {
    setActiveFilterTab('All');
    setDietSubFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E4D9C8]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
            Bharath Delights Menu
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-[#2A1812]">
            Traditional Tamil Nadu & South Indian Dishes
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#4C382E]">
            Showing <span className="font-semibold text-[#2A1812] tabular-nums">{filteredDishes.length}</span> of{' '}
            <span className="tabular-nums">{MENU_ITEMS.length}</span> freshly prepared dishes. Click any dish to view full details.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full lg:w-96 relative">
          <Search
            className="w-4 h-4 text-[#664E43] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search idli, dosa, biryani, Chettinad..."
            aria-label="Search food items by name"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#D4C3AD] bg-white text-sm text-[#2A1812] placeholder:text-[#8D776A] focus:outline-none focus:ring-2 focus:ring-[#6B1420] focus:border-[#6B1420]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md text-[#664E43] hover:text-[#2A1812] inline-flex items-center justify-center cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category & Dietary Filter Controls */}
      <div className="py-5 flex flex-col gap-3 border-b border-[#E4D9C8]">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Menu category filters"
        >
          {MENU_FILTER_TABS.map((tab) => {
            const isSelected = activeFilterTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#6B1420] text-white shadow-sm'
                    : 'bg-white border border-[#E4D9C8] text-[#4C382E] hover:bg-[#F2EAE0] hover:text-[#2A1812]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Additional Veg / Non-Veg Combinable Filter when a food category is chosen */}
        {activeFilterTab !== 'Vegetarian' && activeFilterTab !== 'Non-Vegetarian' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#F2EAE0] border border-[#E4D9C8]">
              <button
                type="button"
                onClick={() => setDietSubFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  dietSubFilter === 'all'
                    ? 'bg-white text-[#2A1812] shadow-sm'
                    : 'text-[#664E43] hover:text-[#2A1812]'
                }`}
              >
                All Diets
              </button>
              <button
                type="button"
                onClick={() => setDietSubFilter('veg')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  dietSubFilter === 'veg'
                    ? 'bg-white text-[#1F7A3E] shadow-sm'
                    : 'text-[#664E43] hover:text-[#2A1812]'
                }`}
              >
                Veg Only
              </button>
              <button
                type="button"
                onClick={() => setDietSubFilter('nonveg')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  dietSubFilter === 'nonveg'
                    ? 'bg-white text-[#6B1420] shadow-sm'
                    : 'text-[#664E43] hover:text-[#2A1812]'
                }`}
              >
                Non-Veg Only
              </button>
            </div>

            {(activeFilterTab !== 'All' || dietSubFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={resetAll}
                className="text-xs font-semibold text-[#6B1420] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Menu Grid */}
      {filteredDishes.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto">
          <h2 className="font-display text-2xl font-bold text-[#2A1812]">
            No matching dishes found
          </h2>
          <p className="mt-2 text-sm text-[#664E43]">
            Try clearing your search term or switching back to all categories to browse our
            full Tamil Nadu menu.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-6 px-6 py-2.5 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Show All Dishes
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          {groupedSections.map(([sectionName, dishes]) => (
            <section key={sectionName} aria-label={sectionName}>
              <div className="flex items-baseline justify-between gap-4 mb-5 pb-2 border-b border-[#E6DAC8]">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#2A1812]">
                  {sectionName}
                </h2>
                <span className="text-xs font-medium text-[#664E43] tabular-nums">
                  {dishes.length} {dishes.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dishes.map((dish) => (
                  <FoodCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
