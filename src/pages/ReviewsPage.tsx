import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReviewsPage: React.FC = () => {
  const { reviews, addReview } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [dishTried, setDishTried] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerName.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 8) {
      setError('Please write a brief review (at least 8 characters).');
      return;
    }

    setError(null);
    addReview({
      customerName,
      rating,
      dishTried,
      reviewText,
    });
    setCustomerName('');
    setDishTried('');
    setReviewText('');
    setRating(5);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="pb-6 border-b border-[#E4D9C8]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B1420]">
          Customer Reviews
        </p>
        <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-[#2A1812]">
          Guest Experiences at Bharath Delights
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#4C382E] max-w-2xl">
          Read sample demonstration reviews below or submit your own rating and dining feedback.
          Initial demonstration entries are clearly marked as sample reviews.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Reviews List */}
        <div className="lg:col-span-7 space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white rounded-xl border border-[#E6DAC8] p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-[#C9922A] text-[#C9922A]'
                          : 'text-[#D6C8B5]'
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 text-xs font-bold text-[#2A1812] tabular-nums">
                    {review.rating}.0
                  </span>
                </div>

                <span className="text-xs font-medium text-[#664E43]">
                  {review.isSample ? 'Sample Review (Demo)' : 'Submitted by Visitor'}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#2A1812] leading-relaxed">
                {review.reviewText}
              </p>

              <div className="mt-4 pt-3 border-t border-[#F2EAE0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#664E43]">
                <div>
                  <span className="font-semibold text-[#2A1812]">{review.customerName}</span>
                  {review.dishTried && (
                    <span>
                      {' '}
                      · Ordered: <span className="text-[#4C382E]">{review.dishTried}</span>
                    </span>
                  )}
                </div>
                <span className="tabular-nums">{review.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Review Submission Form */}
        <aside className="lg:col-span-5 bg-white rounded-xl border border-[#E6DAC8] p-6 sm:p-7 sticky top-24">
          <h2 className="font-display text-xl font-bold text-[#2A1812]">
            Write a Review
          </h2>
          <p className="mt-1 text-xs text-[#664E43]">
            Share your experience with our food, packaging, or delivery service.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="reviewerName"
                className="block text-xs font-semibold text-[#2A1812] mb-1.5"
              >
                Your Name <span className="text-[#8B1E24]">*</span>
              </label>
              <input
                id="reviewerName"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#2A1812] mb-1.5">
                Your Rating <span className="text-[#8B1E24]">*</span>
              </span>
              <div className="flex items-center gap-1.5" role="group" aria-label="Select star rating">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    className="p-1.5 rounded-md hover:bg-[#FAF7F2] cursor-pointer"
                    aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        starValue <= rating
                          ? 'fill-[#C9922A] text-[#C9922A]'
                          : 'text-[#D6C8B5]'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-semibold text-[#4C382E] tabular-nums">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="dishTried"
                className="block text-xs font-semibold text-[#2A1812] mb-1.5"
              >
                Dish Tried (Optional)
              </label>
              <input
                id="dishTried"
                type="text"
                value={dishTried}
                onChange={(e) => setDishTried(e.target.value)}
                placeholder="e.g., Masala Dosa, Chicken Biryani"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
              />
            </div>

            <div>
              <label
                htmlFor="reviewText"
                className="block text-xs font-semibold text-[#2A1812] mb-1.5"
              >
                Your Review <span className="text-[#8B1E24]">*</span>
              </label>
              <textarea
                id="reviewText"
                rows={4}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us what you enjoyed..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4C3AD] bg-[#FAF7F2] text-sm text-[#2A1812] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1420]"
              />
            </div>

            {error && <p className="text-xs font-medium text-[#8B1E24]">{error}</p>}

            {submitted && (
              <p className="text-xs font-medium text-[#1F7A3E] bg-[#E6F4EA] rounded-lg px-3 py-2">
                Your review has been added to the list!
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-[#6B1420] hover:bg-[#4E0D16] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};
