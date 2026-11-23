import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  showTagline = false,
}) => {
  const textColor = variant === 'light' ? 'text-[#FAF7F2]' : 'text-[#2A1812]';
  const accentColor = variant === 'light' ? 'text-[#E8BE62]' : 'text-[#6B1420]';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Outer traditional temple medallion */}
        <circle
          cx="20"
          cy="20"
          r="18.5"
          fill={variant === 'light' ? '#3B2219' : '#6B1420'}
          stroke="#C9922A"
          strokeWidth="1.5"
        />
        {/* Inner subtle gold ring */}
        <circle
          cx="20"
          cy="20"
          r="15"
          stroke="#E5BC66"
          strokeWidth="0.75"
          strokeOpacity="0.65"
        />
        {/* Banana leaf platter arc */}
        <path
          d="M9.5 23.5C12.5 28.5 27.5 28.5 30.5 23.5C26 24.5 14 24.5 9.5 23.5Z"
          fill="#C9922A"
        />
        {/* Traditional brass kuthuvilakku / aroma flame & bowl silhouette */}
        <path
          d="M14 21.5C14 18.4624 16.6863 16 20 16C23.3137 16 26 18.4624 26 21.5H14Z"
          fill="#FAF7F2"
        />
        {/* Sacred culinary flame / spice bud at crown */}
        <path
          d="M20 9.5C20 9.5 22.8 12.2 22.8 14.1C22.8 15.65 21.55 16.8 20 16.8C18.45 16.8 17.2 15.65 17.2 14.1C17.2 12.2 20 9.5 20 9.5Z"
          fill="#E8BE62"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg sm:text-xl font-bold tracking-tight ${textColor}`}
        >
          Bharath <span className={accentColor}>Delights</span>
        </span>
        {showTagline && (
          <span
            className={`text-[11px] font-medium tracking-wide mt-0.5 ${
              variant === 'light' ? 'text-[#D9CBB8]' : 'text-[#664E43]'
            }`}
          >
            Traditional Tamil Nadu Cuisine
          </span>
        )}
      </span>
    </span>
  );
};
