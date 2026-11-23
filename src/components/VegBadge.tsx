import React from 'react';

interface VegBadgeProps {
  isVeg: boolean;
  showLabel?: boolean;
}

export const VegBadge: React.FC<VegBadgeProps> = ({ isVeg, showLabel = false }) => {
  const color = isVeg ? '#1F7A3E' : '#8B1E24';
  const label = isVeg ? 'Vegetarian' : 'Non-Vegetarian';

  return (
    <span className="inline-flex items-center gap-1.5 shrink-0" title={label}>
      <span
        className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] border-[1.5px] bg-white shrink-0"
        style={{ borderColor: color }}
        aria-label={label}
      >
        {isVeg ? (
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        ) : (
          <span
            className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent"
            style={{ borderBottomColor: color }}
          />
        )}
      </span>
      {showLabel && (
        <span className="text-xs font-medium text-[#664E43] whitespace-nowrap">
          {label}
        </span>
      )}
    </span>
  );
};
