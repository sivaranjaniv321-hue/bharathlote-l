export type MainCategory =
  | 'Breakfast'
  | 'Meals'
  | 'Rice'
  | 'Biryani'
  | 'Snacks'
  | 'Sweets'
  | 'Beverages';

export type FilterTab = 'All' | 'Vegetarian' | 'Non-Vegetarian' | MainCategory;

export type DishVisualMotif =
  | 'idli'
  | 'dosa'
  | 'pongal'
  | 'vada'
  | 'meals'
  | 'rice'
  | 'biryani'
  | 'curry-veg'
  | 'curry-nonveg'
  | 'seafood'
  | 'parotta'
  | 'noodles'
  | 'snack'
  | 'sweet'
  | 'beverage';

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  category: MainCategory;
  tags: MainCategory[];
  sectionGroup: string;
  isVeg: boolean;
  rating: number;
  isPopular?: boolean;
  isDailySpecial?: boolean;
  imageSrc?: string;
  expectedImagePath: string;
  motif: DishVisualMotif;
  accentTone: string;
  searchAliases?: string[];
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

export type PaymentMethod =
  | 'Cash on Delivery'
  | 'GPay'
  | 'PhonePe'
  | 'Paytm'
  | 'UPI';

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  houseNumber: string;
  streetName: string;
  area: string;
  city: string;
  district: string;
  pinCode: string;
  deliveryInstructions: string;
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    isVeg: boolean;
    imageSrc?: string;
    expectedImagePath: string;
    motif: DishVisualMotif;
    accentTone: string;
  }[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pay on Delivery' | 'Demo Selection (Pending Gateway Verification)';
  orderStatus: 'Received · Preparing';
  estimatedDeliveryTime: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  dishTried?: string;
  date: string;
  isSample: boolean;
}

export type PageRoute =
  | 'home'
  | 'menu'
  | 'about'
  | 'orders'
  | 'reviews'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'order-success';
