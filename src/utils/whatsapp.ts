import { RESTAURANT_CONFIG } from '../config/restaurant';
import { Order } from '../types';

export function buildOrderWhatsAppMessage(order: Order): string {
  const addressParts = [
    order.customer.houseNumber,
    order.customer.streetName,
    order.customer.area,
    order.customer.city,
    order.customer.district,
    `PIN: ${order.customer.pinCode}`,
  ]
    .map((part) => part.trim())
    .filter(Boolean);

  const itemLines = order.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} × ${item.quantity} — ₹${item.price * item.quantity} (₹${item.price} each)`
    )
    .join('\n');

  const lines = [
    `*${RESTAURANT_CONFIG.name} — New Food Order*`,
    `Order Number: ${order.orderNumber}`,
    `Order Time: ${new Date(order.createdAt).toLocaleString('en-IN')}`,
    ``,
    `*Customer Details*`,
    `Name: ${order.customer.fullName}`,
    `Mobile Number: ${order.customer.mobileNumber}`,
    `WhatsApp Number: ${order.customer.whatsappNumber}`,
    `Delivery Address: ${addressParts.join(', ')}`,
    order.customer.deliveryInstructions
      ? `Delivery Instructions: ${order.customer.deliveryInstructions}`
      : null,
    ``,
    `*Ordered Food Items*`,
    itemLines,
    ``,
    `*Bill Summary*`,
    `Subtotal: ₹${order.subtotal}`,
    `Delivery Charge: ${order.deliveryCharge === 0 ? 'Free' : `₹${order.deliveryCharge}`}`,
    `Total Amount: ₹${order.grandTotal}`,
    `Payment Method: ${order.paymentMethod} (${order.paymentStatus})`,
  ].filter((line): line is string => line !== null);

  return lines.join('\n');
}

export function buildRestaurantWhatsAppUrl(order: Order): string {
  const message = buildOrderWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT_CONFIG.restaurantWhatsAppDigits}?text=${encodedMessage}`;
}
