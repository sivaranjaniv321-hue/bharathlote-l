export const RESTAURANT_CONFIG = {
  name: 'Bharath Delights',
  tagline: 'Taste the Tradition of Tamil Nadu',
  // IMPORTANT: Replace this placeholder with your actual fixed restaurant WhatsApp number (country code + number, digits only).
  restaurantWhatsAppDigits: '919000000000',
  restaurantWhatsAppDisplay: '+91 90000 00000 (Restaurant WhatsApp Placeholder)',
  phoneDisplay: '+91 90000 00000 (Restaurant Phone Placeholder)',
  emailDisplay: 'orders@bharathdelights.example (Placeholder Email)',
  addressPlaceholder:
    'No. 42, Temple Heritage Street, Mylapore, Chennai, Tamil Nadu 600004 (Placeholder Address)',
  openingHours: '7:00 AM – 10:30 PM (Monday – Sunday)',
  deliveryCharge: 40,
  freeDeliveryThreshold: 499,
  estimatedDeliveryTime: '35–45 mins (Configurable Estimate)',
  upiDemoId: 'bharathdelights@demo-upi',
} as const;

export function calculateDeliveryCharge(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= RESTAURANT_CONFIG.freeDeliveryThreshold
    ? 0
    : RESTAURANT_CONFIG.deliveryCharge;
}
