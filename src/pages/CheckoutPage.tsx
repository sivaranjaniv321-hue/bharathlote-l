import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Info, ShieldCheck } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import { useStore } from '../context/StoreContext';
import { CustomerDetails, PaymentMethod } from '../types';

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'Cash on Delivery',
    title: 'Cash on Delivery',
    subtitle: 'Pay directly in cash or UPI upon delivery. Order confirms immediately.',
  },
  {
    id: 'GPay',
    title: 'GPay (Demo Selection)',
    subtitle: 'Safe demo selection — real online verification requires a payment gateway.',
  },
  {
    id: 'PhonePe',
    title: 'PhonePe (Demo Selection)',
    subtitle: 'Safe demo selection — real online verification requires a payment gateway.',
  },
  {
    id: 'Paytm',
    title: 'Paytm (Demo Selection)',
    subtitle: 'Safe demo selection — real online verification requires a payment gateway.',
  },
  {
    id: 'UPI',
    title: 'UPI ID / QR (Demo Selection)',
    subtitle: 'Safe demo selection — pay at delivery or configure Razorpay/Cashfree gateway.',
  },
];

type FormErrors = Partial<Record<keyof CustomerDetails, string>>;

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, deliveryCharge, grandTotal, placeOrder, navigate } = useStore();

  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    houseNumber: '',
    streetName: '',
    area: '',
    city: '',
    district: '',
    pinCode: '',
    deliveryInstructions: '',
  });
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [errors, setErrors] = useState<FormErrors>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-[#2A1812]">
          No Items to Checkout
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#4C382E]">
          Your cart is currently empty. Add dishes from the Bharath Delights menu before
          proceeding to checkout.
        </p>
        <button
          type="button"
          onClick={() => navigate('menu')}
          className="mt-6 px-6 py-3 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          View Menu
        </button>
      </div>
    );
  }

  const updateField = (field: keyof CustomerDetails, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'mobileNumber' && sameAsMobile) {
        next.whatsappNumber = value;
      }
      return next;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSameAsMobileToggle = (checked: boolean) => {
    setSameAsMobile(checked);
    if (checked) {
      setForm((prev) => ({ ...prev, whatsappNumber: prev.mobileNumber }));
      setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    const pinRegex = /^\d{6}$/;

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const cleanMobile = form.mobileNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanMobile)) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number.';
    }

    const cleanWhatsapp = (sameAsMobile ? cleanMobile : form.whatsappNumber).replace(/\D/g, '');
    if (!phoneRegex.test(cleanWhatsapp)) {
      nextErrors.whatsappNumber = 'Enter a valid 10-digit WhatsApp number.';
    }

    if (!form.houseNumber.trim()) {
      nextErrors.houseNumber = 'House / flat number is required.';
    }
    if (!form.streetName.trim()) {
      nextErrors.streetName = 'Street name is required.';
    }
    if (!form.area.trim()) {
      nextErrors.area = 'Area / locality is required.';
    }
    if (!form.city.trim()) {
      nextErrors.city = 'City is required.';
    }
    if (!form.district.trim()) {
      nextErrors.district = 'District is required.';
    }

    const cleanPin = form.pinCode.replace(/\D/g, '');
    if (!pinRegex.test(cleanPin)) {
      nextErrors.pinCode = 'Enter a valid 6-digit PIN code.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanCustomer: CustomerDetails = {
      ...form,
      fullName: form.fullName.trim(),
      mobileNumber: form.mobileNumber.replace(/\D/g, ''),
      whatsappNumber: (sameAsMobile ? form.mobileNumber : form.whatsappNumber).replace(/\D/g, ''),
      houseNumber: form.houseNumber.trim(),
      streetName: form.streetName.trim(),
      area: form.area.trim(),
      city: form.city.trim(),
      district: form.district.trim(),
      pinCode: form.pinCode.replace(/\D/g, ''),
      deliveryInstructions: form.deliveryInstructions.trim(),
    };

    placeOrder(cleanCustomer, paymentMethod);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
        type="button"
        onClick={() => navigate('cart')}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B1420] hover:underline mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to Cart
      </button>

      <div className="pb-6 border-b border-[#E4D9C8]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
          Delivery & Payment
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-[#2A1812]">Checkout</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Customer Details & Payment Method */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer & Delivery Details */}
          <section className="bg-white rounded-xl border border-[#E6DAC8] p-6 sm:p-7">
            <h2 className="font-display text-xl font-bold text-[#2A1812] mb-5">
              Customer & Delivery Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  Full Name <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  Mobile Number <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  required
                  maxLength={10}
                  value={form.mobileNumber}
                  onChange={(e) => updateField('mobileNumber', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.mobileNumber && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="whatsappNumber"
                    className="block text-xs font-semibold text-[#2A1812]"
                  >
                    WhatsApp Number <span className="text-[#8B1E24]">*</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-[#4C382E] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsMobile}
                      onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                      className="accent-[#6B1420]"
                    />
                    Same as mobile
                  </label>
                </div>
                <input
                  id="whatsappNumber"
                  type="tel"
                  required
                  maxLength={10}
                  disabled={sameAsMobile}
                  value={sameAsMobile ? form.mobileNumber : form.whatsappNumber}
                  onChange={(e) => updateField('whatsappNumber', e.target.value)}
                  placeholder="10-digit WhatsApp number"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] tabular-nums disabled:opacity-70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.whatsappNumber && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="houseNumber"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  House / Flat Number <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="houseNumber"
                  type="text"
                  required
                  value={form.houseNumber}
                  onChange={(e) => updateField('houseNumber', e.target.value)}
                  placeholder="e.g., No. 14, Flat 2B"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.houseNumber && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">
                    {errors.houseNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="streetName"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  Street Name <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="streetName"
                  type="text"
                  required
                  value={form.streetName}
                  onChange={(e) => updateField('streetName', e.target.value)}
                  placeholder="e.g., Gandhi Road"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.streetName && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">
                    {errors.streetName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  Area / Locality <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="area"
                  type="text"
                  required
                  value={form.area}
                  onChange={(e) => updateField('area', e.target.value)}
                  placeholder="e.g., Mylapore"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.area && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">{errors.area}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  City <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="e.g., Chennai"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  District <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="district"
                  type="text"
                  required
                  value={form.district}
                  onChange={(e) => updateField('district', e.target.value)}
                  placeholder="e.g., Chennai"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.district && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">{errors.district}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pinCode"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  PIN Code <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="pinCode"
                  type="text"
                  required
                  maxLength={6}
                  value={form.pinCode}
                  onChange={(e) => updateField('pinCode', e.target.value)}
                  placeholder="6-digit PIN code"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
                {errors.pinCode && (
                  <p className="mt-1 text-xs text-[#8B1E24] font-medium">{errors.pinCode}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="deliveryInstructions"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  id="deliveryInstructions"
                  rows={2}
                  value={form.deliveryInstructions}
                  onChange={(e) => updateField('deliveryInstructions', e.target.value)}
                  placeholder="Landmark, gate code, or spice preference"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
              </div>
            </div>
          </section>

          {/* Payment Options */}
          <section className="bg-white rounded-xl border border-[#E6DAC8] p-6 sm:p-7">
            <h2 className="font-display text-xl font-bold text-[#2A1812] mb-2">
              Payment Method
            </h2>
            <p className="text-xs text-[#664E43] mb-5">
              Choose how you would like to settle this order. We never ask for your UPI PIN,
              banking password, or card credentials here.
            </p>

            <div className="space-y-3" role="radiogroup" aria-label="Payment method">
              {PAYMENT_OPTIONS.map((option) => {
                const selected = paymentMethod === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                      selected
                        ? 'border-[#6B1420] bg-[#FAF7F2]'
                        : 'border-[#E6DAC8] bg-white hover:bg-[#FAF7F2]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={selected}
                      onChange={() => setPaymentMethod(option.id)}
                      className="mt-1 accent-[#6B1420]"
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-semibold text-[#2A1812]">
                        {option.title}
                      </span>
                      <span className="block text-xs text-[#664E43] mt-0.5">
                        {option.subtitle}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {paymentMethod !== 'Cash on Delivery' && (
              <div className="mt-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#DFC9A4] text-xs text-[#4C382E] space-y-1.5">
                <p className="font-semibold text-[#2A1812] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#C9922A] shrink-0" aria-hidden="true" />
                  Demo Payment Instructions ({paymentMethod})
                </p>
                <p>
                  Because a live payment gateway (such as Razorpay or Stripe) is not connected
                  yet, selecting {paymentMethod} records your preferred payment method as{' '}
                  <strong>Pending Verification</strong> without charging your account. You may
                  pay via {paymentMethod} at delivery or scan the restaurant&apos;s verified UPI QR
                  upon confirmation (Demo UPI ID: <code>{RESTAURANT_CONFIG.upiDemoId}</code>).
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Complete Order Summary */}
        <aside className="lg:col-span-5 bg-white rounded-xl border border-[#E6DAC8] p-6 sm:p-7 sticky top-24">
          <h2 className="font-display text-xl font-bold text-[#2A1812] pb-4 border-b border-[#F2EAE0]">
            Complete Order Summary
          </h2>

          <ul className="mt-4 divide-y divide-[#F2EAE0] max-h-80 overflow-y-auto pr-1">
            {cart.map(({ dish, quantity }) => (
              <li key={dish.id} className="py-3 flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-[#2A1812] truncate">{dish.name}</p>
                  <p className="text-xs text-[#664E43] tabular-nums">
                    {quantity} × ₹{dish.price}
                  </p>
                </div>
                <span className="font-semibold text-[#2A1812] tabular-nums shrink-0">
                  ₹{dish.price * quantity}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 pt-4 border-t border-[#E4D9C8] space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-[#4C382E]">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-[#2A1812] tabular-nums">₹{subtotal}</dd>
            </div>
            <div className="flex items-center justify-between text-[#4C382E]">
              <dt>Delivery Charge</dt>
              <dd className="font-semibold text-[#2A1812] tabular-nums">
                {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
              </dd>
            </div>
            <div className="pt-3 border-t border-[#E4D9C8] flex items-center justify-between text-base font-bold text-[#2A1812]">
              <dt>Total Amount</dt>
              <dd className="text-xl text-[#6B1420] tabular-nums">₹{grandTotal}</dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-6 w-full py-3.5 px-6 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9922A]"
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            {paymentMethod === 'Cash on Delivery'
              ? 'Confirm Cash on Delivery Order'
              : `Confirm Order (${paymentMethod} Demo)`}
          </button>

          <p className="mt-3 text-xs text-[#664E43] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1F7A3E] shrink-0" aria-hidden="true" />
            Order details can be sent directly to Bharath Delights on WhatsApp next.
          </p>
        </aside>
      </form>
    </div>
  );
};
