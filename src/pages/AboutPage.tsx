import React from 'react';
import { ArrowRight, Award, Flame, Leaf, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { VERIFIED_PHOTOS } from '../data/menuData';

export const AboutPage: React.FC = () => {
  const { navigateToMenuWith, navigate } = useStore();

  const pillars = [
    {
      icon: Leaf,
      title: 'Fresh, Honest Ingredients',
      description:
        'Every morning begins with stone-fermented rice and urad dal batters, cold-pressed gingelly and coconut oils, farm-fresh curry leaves, and whole spices.',
    },
    {
      icon: Flame,
      title: 'Regional Tamil Nadu Mastery',
      description:
        'From comforting Chennai-style Ven Pongal and Sambar Rice to aromatic Dindigul and Ambur biryanis and pepper-forward Karaikudi Chettinad curries.',
    },
    {
      icon: ShieldCheck,
      title: 'Clean Preparation & Packaging',
      description:
        'Strict kitchen hygiene, separate vegetarian and non-vegetarian prep stations, and spill-resistant food-grade containers that preserve heat and aroma.',
    },
    {
      icon: Award,
      title: 'Consistent Homestyle Taste',
      description:
        'Balanced seasoning without artificial colourings or shortcuts—recipes honouring traditional South Indian family kitchens.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Intro Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b border-[#E4D9C8]">
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
            About Bharath Delights
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1812] leading-tight text-balance">
            Honouring the Culinary Heritage of Tamil Nadu
          </h1>
          <p className="mt-5 text-base text-[#4C382E] leading-relaxed">
            Bharath Delights was created with a simple promise: to bring authentic, freshly
            prepared Tamil Nadu and South Indian meals from our kitchen to your dining table
            with zero compromise on ingredient purity, traditional technique, or hospitality.
          </p>
          <p className="mt-4 text-base text-[#4C382E] leading-relaxed">
            Whether it is steamed idlis and frothy degree filter coffee at sunrise, a full
            banana leaf vegetarian lunch at noon, or seeraga samba biryani and flaky parotta
            with salna at dinner, every dish is cooked fresh in small batches.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigateToMenuWith({ tab: 'All' })}
              className="px-6 py-3 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              Explore Our Menu
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="px-6 py-3 rounded-lg border border-[#D4C3AD] bg-white hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-semibold transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-xl overflow-hidden border border-[#E4D9C8] bg-white">
            <img
              src={VERIFIED_PHOTOS.venPongal}
              alt="Traditional Ven Pongal garnished with roasted cashews and ghee"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-[#E4D9C8] bg-white">
            <img
              src={VERIFIED_PHOTOS.gheeRice}
              alt="Aromatic Ghee Rice served neatly with vegetable kurma"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Food Philosophy */}
      <section className="py-12 border-b border-[#E4D9C8]">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
            Our Food Philosophy
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#2A1812]">
            Why Guests Choose Bharath Delights
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-xl border border-[#E6DAC8] p-6 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-[#FAF7F2] border border-[#E6DAC8] text-[#6B1420] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#2A1812]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#4C382E] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quality & Taste Promise */}
      <section className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#F2EAE0] rounded-xl border border-[#E4D9C8] p-6">
          <p className="font-display text-xl font-bold text-[#2A1812]">
            Freshly Ground Masalas
          </p>
          <p className="mt-2 text-sm text-[#4C382E] leading-relaxed">
            Our sambar podi, rasam powder, idli milagai podi, and Chettinad spice blends are
            roasted and ground in-house for genuine aroma.
          </p>
        </div>
        <div className="bg-[#F2EAE0] rounded-xl border border-[#E4D9C8] p-6">
          <p className="font-display text-xl font-bold text-[#2A1812]">
            Dedicated Veg & Non-Veg Care
          </p>
          <p className="mt-2 text-sm text-[#4C382E] leading-relaxed">
            Every menu item clearly displays the Vegetarian or Non-Vegetarian symbol and is
            handled with separate cookware and utensils.
          </p>
        </div>
        <div className="bg-[#F2EAE0] rounded-xl border border-[#E4D9C8] p-6">
          <p className="font-display text-xl font-bold text-[#2A1812]">
            Made To Order Daily
          </p>
          <p className="mt-2 text-sm text-[#4C382E] leading-relaxed">
            Dosas are poured crisp to order, biryanis are steamed in traditional batches, and
            filter coffee is brewed fresh throughout the day.
          </p>
        </div>
      </section>
    </div>
  );
};
