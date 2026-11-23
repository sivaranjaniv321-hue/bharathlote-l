import React, { useState } from 'react';
import { Check, CheckCircle2, Copy, MessageCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { buildOrderWhatsAppMessage, buildRestaurantWhatsAppUrl } from '../utils/whatsapp';

export const OrderSuccessPage: React.FC = () => {
  const { lastPlacedOrder, navigate } = useStore();
  const [copied, setCopied] = useState(false);

  // Guard: Do not show a fake success page if no order was actually placed
  if (!lastPlacedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-[#2A1812]">
          No Recent Order Submitted
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#4C382E]">
          Please complete checkout to receive an order confirmation, or inspect your past
          orders.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('orders')}
            className="px-6 py-3 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold cursor-pointer"
          >
            View My Orders
          </button>
          <button
            type="button"
            onClick={() => navigate('menu')}
            className="px-6 py-3 rounded-lg border border-[#D4C3AD] bg-white hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-semibold cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const whatsappUrl = buildRestaurantWhatsAppUrl(lastPlacedOrder);
  const whatsappMessage = buildOrderWhatsAppMessage(lastPlacedOrder);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const fullAddress = [
    lastPlacedOrder.customer.houseNumber,
    lastPlacedOrder.customer.streetName,
    lastPlacedOrder.customer.area,
    lastPlacedOrder.customer.city,
    lastPlacedOrder.customer.district,
    `PIN ${lastPlacedOrder.customer.pinCode}`,
  ].join(', ');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="bg-white rounded-2xl border border-[#E6DAC8] p-6 sm:p-10 shadow-sm">
        {/* Confirmation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-[#E4D9C8]">
          <div className="w-12 h-12 rounded-full bg-[#E6F4EA] text-[#1F7A3E] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1F7A3E]">
              Order Confirmed · {lastPlacedOrder.orderStatus}
            </p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#2A1812]">
              Thank you for ordering from Bharath Delights! Your order has been received.
            </h1>
          </div>
        </div>

        {/* Order Metadata Grid */}
        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E6DAC8] text-sm">
          <div>
            <dt className="text-xs text-[#664E43]">Order Number</dt>
            <dd className="mt-0.5 font-bold text-[#2A1812] tabular-nums">
              {lastPlacedOrder.orderNumber}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#664E43]">Customer Name</dt>
            <dd className="mt-0.5 font-semibold text-[#2A1812]">
              {lastPlacedOrder.customer.fullName}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#664E43]">Payment Method</dt>
            <dd className="mt-0.5 font-semibold text-[#2A1812]">
              {lastPlacedOrder.paymentMethod}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#664E43]">Estimated Delivery</dt>
            <dd className="mt-0.5 font-semibold text-[#2A1812]">
              {lastPlacedOrder.estimatedDeliveryTime}
            </dd>
          </div>
        </dl>

        {/* Address & Items */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 space-y-4">
            <div className="p-4 rounded-xl border border-[#E6DAC8] bg-white">
              <h2 className="font-display text-base font-bold text-[#2A1812] mb-2">
                Delivery Address
              </h2>
              <p className="text-sm text-[#4C382E] leading-relaxed">{fullAddress}</p>
              <p className="mt-2 text-xs text-[#664E43] tabular-nums">
                Mobile: {lastPlacedOrder.customer.mobileNumber} · WhatsApp:{' '}
                {lastPlacedOrder.customer.whatsappNumber}
              </p>
              {lastPlacedOrder.customer.deliveryInstructions && (
                <p className="mt-2 text-xs text-[#4C382E]">
                  Note: {lastPlacedOrder.customer.deliveryInstructions}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl border border-[#E6DAC8] bg-white">
              <h2 className="font-display text-base font-bold text-[#2A1812] mb-2">
                Order & Payment Status
              </h2>
              <p className="text-sm font-semibold text-[#6B1420]">
                {lastPlacedOrder.orderStatus}
              </p>
              <p className="text-xs text-[#664E43] mt-1">
                Payment Status: {lastPlacedOrder.paymentStatus}
              </p>
            </div>
          </div>

          <div className="md:col-span-7 p-4 sm:p-5 rounded-xl border border-[#E6DAC8] bg-white">
            <h2 className="font-display text-base font-bold text-[#2A1812] pb-3 border-b border-[#F2EAE0]">
              Ordered Food Items
            </h2>
            <ul className="divide-y divide-[#F2EAE0] text-sm">
              {lastPlacedOrder.items.map((item) => (
                <li key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                  <span className="text-[#2A1812]">
                    {item.name} × <span className="tabular-nums font-semibold">{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-[#2A1812] tabular-nums">
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 pt-3 border-t border-[#E4D9C8] space-y-1.5 text-sm">
              <div className="flex justify-between text-[#4C382E]">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">₹{lastPlacedOrder.subtotal}</dd>
              </div>
              <div className="flex justify-between text-[#4C382E]">
                <dt>Delivery Charge</dt>
                <dd className="tabular-nums">
                  {lastPlacedOrder.deliveryCharge === 0
                    ? 'Free'
                    : `₹${lastPlacedOrder.deliveryCharge}`}
                </dd>
              </div>
              <div className="flex justify-between font-bold text-[#2A1812] pt-1.5 border-t border-[#F2EAE0]">
                <dt>Total Amount</dt>
                <dd className="text-lg text-[#6B1420] tabular-nums">
                  ₹{lastPlacedOrder.grandTotal}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* WhatsApp Order Notification Section */}
        <section className="mt-8 p-5 sm:p-6 rounded-xl bg-[#FAF7F2] border border-[#DFC9A4]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-[#2A1812]">
                Send Order to Bharath Delights on WhatsApp
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#4C382E]">
                Addressed to Restaurant WhatsApp:{' '}
                <strong className="text-[#2A1812]">
                  {RESTAURANT_CONFIG.restaurantWhatsAppDisplay}
                </strong>
                . Your phone number ({lastPlacedOrder.customer.mobileNumber}) is included in
                the message.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-[#1F7A3E] hover:bg-[#175D2E] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Open WhatsApp Order
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-lg border border-[#D4C3AD] bg-white hover:bg-[#F2EAE0] text-[#2A1812] text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1F7A3E]" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    Copy Message
                  </>
                )}
              </button>
            </div>
          </div>

          <pre className="mt-4 p-4 rounded-lg bg-white border border-[#E6DAC8] text-xs text-[#2A1812] whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto">
            {whatsappMessage}
          </pre>

          <p className="mt-3 text-xs text-[#664E43]">
            Note: Clicking &ldquo;Open WhatsApp Order&rdquo; launches WhatsApp with this pre-filled
            message directed to the restaurant&apos;s WhatsApp number. Sending automated messages
            silently in the background without opening WhatsApp requires integrating the
            official Meta WhatsApp Business Cloud API on a backend server.
          </p>
        </section>

        {/* Bottom Navigation Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E4D9C8]">
          <button
            type="button"
            onClick={() => navigate('orders')}
            className="px-6 py-3 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            View My Orders
          </button>
          <button
            type="button"
            onClick={() => navigate('home')}
            className="px-6 py-3 rounded-lg border border-[#D4C3AD] bg-white hover:bg-[#F2EAE0] text-[#2A1812] text-sm font-semibold transition-colors cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
