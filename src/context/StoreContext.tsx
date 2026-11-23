import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { calculateDeliveryCharge, RESTAURANT_CONFIG } from '../config/restaurant';
import { INITIAL_SAMPLE_REVIEWS, MENU_ITEMS } from '../data/menuData';
import {
  CartItem,
  CustomerDetails,
  FilterTab,
  MenuItem,
  Order,
  PageRoute,
  PaymentMethod,
  Review,
} from '../types';

interface StoreContextValue {
  currentPage: PageRoute;
  navigate: (page: PageRoute) => void;
  navigateToMenuWith: (options: { tab?: FilterTab; query?: string; focusSearch?: boolean }) => void;
  activeFilterTab: FilterTab;
  setActiveFilterTab: (tab: FilterTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  shouldFocusSearch: boolean;
  clearFocusSearch: () => void;

  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  addToCart: (dish: MenuItem, quantity?: number) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;
  getItemQuantity: (dishId: string) => number;

  selectedDish: MenuItem | null;
  openDishModal: (dish: MenuItem) => void;
  closeDishModal: () => void;

  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (customer: CustomerDetails, paymentMethod: PaymentMethod) => Order;
  reorderToCart: (order: Order) => void;

  reviews: Review[];
  addReview: (review: {
    customerName: string;
    rating: number;
    reviewText: string;
    dishTried?: string;
  }) => void;

  toastMessage: string | null;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'bharath_delights_cart_v1';
const ORDERS_STORAGE_KEY = 'bharath_delights_orders_v1';
const REVIEWS_STORAGE_KEY = 'bharath_delights_reviews_v1';

const ROUTE_TO_HASH: Record<PageRoute, string> = {
  home: '#/',
  menu: '#/menu',
  about: '#/about',
  orders: '#/orders',
  reviews: '#/reviews',
  contact: '#/contact',
  cart: '#/cart',
  checkout: '#/checkout',
  'order-success': '#/order-success',
};

function parseHashToRoute(hash: string): PageRoute {
  const cleaned = hash.replace(/^#\/?/, '').toLowerCase();
  switch (cleaned) {
    case 'menu':
      return 'menu';
    case 'about':
      return 'about';
    case 'orders':
      return 'orders';
    case 'reviews':
      return 'reviews';
    case 'contact':
      return 'contact';
    case 'cart':
      return 'cart';
    case 'checkout':
      return 'checkout';
    case 'order-success':
      return 'order-success';
    default:
      return 'home';
  }
}

function safeReadLocalStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    parseHashToRoute(window.location.hash)
  );
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = safeReadLocalStorage<{ id: string; quantity: number }[]>(CART_STORAGE_KEY, []);
    const restored: CartItem[] = [];
    for (const entry of saved) {
      const dish = MENU_ITEMS.find((item) => item.id === entry.id);
      if (dish && entry.quantity > 0) {
        restored.push({ dish, quantity: entry.quantity });
      }
    }
    return restored;
  });

  const [orders, setOrders] = useState<Order[]>(() =>
    safeReadLocalStorage<Order[]>(ORDERS_STORAGE_KEY, [])
  );
  const [lastPlacedOrderNumber, setLastPlacedOrderNumber] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>(() =>
    safeReadLocalStorage<Review[]>(REVIEWS_STORAGE_KEY, INITIAL_SAMPLE_REVIEWS)
  );

  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(parseHashToRoute(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    try {
      const minimalCart = cart.map((c) => ({ id: c.dish.id, quantity: c.quantity }));
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimalCart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    try {
      window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore storage quota errors
    }
  }, [reviews]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const navigate = (page: PageRoute) => {
    const targetHash = ROUTE_TO_HASH[page];
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMenuWith = (options: {
    tab?: FilterTab;
    query?: string;
    focusSearch?: boolean;
  }) => {
    if (options.tab !== undefined) {
      setActiveFilterTab(options.tab);
    }
    if (options.query !== undefined) {
      setSearchQuery(options.query);
    }
    if (options.focusSearch) {
      setShouldFocusSearch(true);
    }
    navigate('menu');
  };

  const clearFocusSearch = () => setShouldFocusSearch(false);

  const addToCart = (dish: MenuItem, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { dish, quantity }];
    });
    showToast(`Added ${quantity} × ${dish.name} to cart`);
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.dish.id === dishId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const clearCart = () => setCart([]);

  const getItemQuantity = (dishId: string) => {
    return cart.find((c) => c.dish.id === dishId)?.quantity ?? 0;
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0),
    [cart]
  );

  const deliveryCharge = useMemo(() => calculateDeliveryCharge(subtotal), [subtotal]);
  const grandTotal = subtotal + deliveryCharge;

  const openDishModal = (dish: MenuItem) => setSelectedDish(dish);
  const closeDishModal = () => setSelectedDish(null);

  const placeOrder = (customer: CustomerDetails, paymentMethod: PaymentMethod): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `BD-${new Date().getFullYear()}-${randomSuffix}`;
    const order: Order = {
      orderNumber,
      createdAt: new Date().toISOString(),
      customer,
      items: cart.map((c) => ({
        id: c.dish.id,
        name: c.dish.name,
        price: c.dish.price,
        quantity: c.quantity,
        isVeg: c.dish.isVeg,
        imageSrc: c.dish.imageSrc,
        expectedImagePath: c.dish.expectedImagePath,
        motif: c.dish.motif,
        accentTone: c.dish.accentTone,
      })),
      subtotal,
      deliveryCharge,
      grandTotal,
      paymentMethod,
      paymentStatus:
        paymentMethod === 'Cash on Delivery'
          ? 'Pay on Delivery'
          : 'Demo Selection (Pending Gateway Verification)',
      orderStatus: 'Received · Preparing',
      estimatedDeliveryTime: RESTAURANT_CONFIG.estimatedDeliveryTime,
    };

    setOrders((prev) => [order, ...prev]);
    setLastPlacedOrderNumber(orderNumber);
    setCart([]);
    navigate('order-success');
    return order;
  };

  const reorderToCart = (order: Order) => {
    let added = 0;
    setCart((prev) => {
      const next = [...prev];
      for (const orderItem of order.items) {
        const dish = MENU_ITEMS.find((m) => m.id === orderItem.id);
        if (!dish) continue;
        added += orderItem.quantity;
        const existingIndex = next.findIndex((c) => c.dish.id === dish.id);
        if (existingIndex >= 0) {
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + orderItem.quantity,
          };
        } else {
          next.push({ dish, quantity: orderItem.quantity });
        }
      }
      return next;
    });
    if (added > 0) {
      showToast(`Added ${added} items from ${order.orderNumber} to cart`);
      navigate('cart');
    }
  };

  const lastPlacedOrder = useMemo(
    () => orders.find((o) => o.orderNumber === lastPlacedOrderNumber) ?? null,
    [orders, lastPlacedOrderNumber]
  );

  const addReview = (input: {
    customerName: string;
    rating: number;
    reviewText: string;
    dishTried?: string;
  }) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      customerName: input.customerName.trim(),
      rating: input.rating,
      reviewText: input.reviewText.trim(),
      dishTried: input.dishTried?.trim() || undefined,
      date: new Date().toISOString().slice(0, 10),
      isSample: false,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you for sharing your review');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        navigate,
        navigateToMenuWith,
        activeFilterTab,
        setActiveFilterTab,
        searchQuery,
        setSearchQuery,
        shouldFocusSearch,
        clearFocusSearch,
        cart,
        cartCount,
        subtotal,
        deliveryCharge,
        grandTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        selectedDish,
        openDishModal,
        closeDishModal,
        orders,
        lastPlacedOrder,
        placeOrder,
        reorderToCart,
        reviews,
        addReview,
        toastMessage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
