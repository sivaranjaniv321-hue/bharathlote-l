import React, { useState } from 'react';
import { CheckCircle2, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sentTicketId, setSentTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneOrEmail.trim() || !message.trim()) {
      setError('Please fill in your name, phone or email, and message.');
      return;
    }
    setError(null);
    const ticket = `MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    setSentTicketId(ticket);
    setName('');
    setPhoneOrEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="pb-6 border-b border-[#E4D9C8]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
          Get In Touch
        </p>
        <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-[#2A1812]">
          Contact {RESTAURANT_CONFIG.name}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#4C382E] max-w-2xl">
          Reach out for catering enquiries, family meal bookings, feedback, or order support.
          Note: Address, phone, and WhatsApp values below are clearly marked placeholders until
          configured with your live restaurant details.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Details & Map Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#E6DAC8] p-6 space-y-5">
            <h2 className="font-display text-xl font-bold text-[#2A1812]">
              Restaurant Information
            </h2>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#6B1420] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#664E43]">
                  Address (Placeholder)
                </p>
                <p className="mt-0.5 text-sm text-[#2A1812]">
                  {RESTAURANT_CONFIG.addressPlaceholder}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#6B1420] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#664E43]">
                  Phone Number (Placeholder)
                </p>
                <p className="mt-0.5 text-sm text-[#2A1812]">
                  {RESTAURANT_CONFIG.phoneDisplay}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle
                className="w-5 h-5 text-[#1F7A3E] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#664E43]">
                  WhatsApp Contact (Placeholder)
                </p>
                <p className="mt-0.5 text-sm text-[#2A1812]">
                  {RESTAURANT_CONFIG.restaurantWhatsAppDisplay}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#6B1420] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#664E43]">
                  Opening Hours
                </p>
                <p className="mt-0.5 text-sm text-[#2A1812]">
                  {RESTAURANT_CONFIG.openingHours}
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Placeholder */}
          <div className="bg-[#F2EAE0] rounded-xl border border-[#DFC9A4] p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-white border border-[#E4D9C8] text-[#6B1420] mx-auto flex items-center justify-center">
              <MapPin className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-[#2A1812]">
              Google Maps Location Placeholder
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#4C382E] leading-relaxed">
              Insert your verified Google Maps iframe embed URL for{' '}
              <strong>Bharath Delights</strong> here once your final restaurant street address
              is confirmed.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E6DAC8] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[#2A1812]">
            Send Us a Message
          </h2>
          <p className="mt-1 text-sm text-[#664E43]">
            Fill out the form below and our team will respond during opening hours.
          </p>

          {sentTicketId && (
            <div className="mt-5 p-4 rounded-xl bg-[#E6F4EA] border border-[#B7DFC2] flex items-start gap-3">
              <CheckCircle2
                className="w-5 h-5 text-[#1F7A3E] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="text-sm text-[#175D2E]">
                <p className="font-semibold">
                  Thank you! Your message has been recorded (Ref: {sentTicketId}).
                </p>
                <p className="text-xs mt-0.5">
                  Note: Connect a backend email or WhatsApp webhook endpoint to forward contact
                  enquiries automatically to your inbox.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  Your Name <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="contactName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
              </div>

              <div>
                <label
                  htmlFor="contactPhoneEmail"
                  className="block text-xs font-semibold text-[#2A1812] mb-1.5"
                >
                  Mobile Number or Email <span className="text-[#8B1E24]">*</span>
                </label>
                <input
                  id="contactPhoneEmail"
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="Phone or email address"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contactSubject"
                className="block text-xs font-semibold text-[#2A1812] mb-1.5"
              >
                Subject
              </label>
              <input
                id="contactSubject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Party Catering, Bulk Meals, Order Question"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
              />
            </div>

            <div>
              <label
                htmlFor="contactMessage"
                className="block text-xs font-semibold text-[#2A1812] mb-1.5"
              >
                Message <span className="text-[#8B1E24]">*</span>
              </label>
              <textarea
                id="contactMessage"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you today?"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
              />
            </div>

            {error && <p className="text-xs font-medium text-[#8B1E24]">{error}</p>}

            <button
              type="submit"
              className="px-7 py-3 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
