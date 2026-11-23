import React, { useState } from 'react';
import { DishVisualMotif } from '../types';

interface DishVisualProps {
  name: string;
  imageSrc?: string;
  expectedImagePath: string;
  motif: DishVisualMotif;
  accentTone: string;
  isVeg: boolean;
  size?: 'card' | 'modal' | 'thumb';
}

function renderMotifSvg(motif: DishVisualMotif, isVeg: boolean) {
  const stroke = isVeg ? '#2B5B37' : '#6B1420';
  const fillAccent = '#C9922A';

  switch (motif) {
    case 'idli':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <circle cx="60" cy="60" r="39" stroke="#EFE7DA" strokeWidth="1.2" />
          <ellipse cx="47" cy="54" rx="13" ry="11" fill="#FAF7F2" stroke={stroke} strokeWidth="1.6" />
          <ellipse cx="73" cy="54" rx="13" ry="11" fill="#FAF7F2" stroke={stroke} strokeWidth="1.6" />
          <ellipse cx="60" cy="72" rx="13" ry="11" fill="#FAF7F2" stroke={stroke} strokeWidth="1.6" />
          <circle cx="60" cy="40" r="4" fill={fillAccent} fillOpacity="0.45" />
        </svg>
      );
    case 'dosa':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <path
            d="M26 70C36 44 60 34 94 48C86 68 62 80 26 70Z"
            fill="#F3DFB8"
            stroke={stroke}
            strokeWidth="1.6"
          />
          <circle cx="42" cy="79" r="7" fill="#FAF7F2" stroke={fillAccent} strokeWidth="1.4" />
          <circle cx="62" cy="82" r="7" fill="#F2D7BA" stroke={stroke} strokeWidth="1.4" />
        </svg>
      );
    case 'pongal':
    case 'rice':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <circle cx="60" cy="60" r="30" fill="#F8EED8" stroke={stroke} strokeWidth="1.6" />
          <circle cx="52" cy="54" r="2.5" fill={fillAccent} />
          <circle cx="66" cy="57" r="2.5" fill={stroke} />
          <circle cx="58" cy="67" r="2.5" fill={fillAccent} />
          <path d="M56 48C60 44 66 45 69 49" stroke="#2B5B37" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'vada':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <circle cx="48" cy="58" r="14" fill="#E8C284" stroke={stroke} strokeWidth="1.6" />
          <circle cx="48" cy="58" r="4.5" fill="#FFFFFF" stroke={stroke} strokeWidth="1.2" />
          <circle cx="74" cy="64" r="14" fill="#E8C284" stroke={stroke} strokeWidth="1.6" />
          <circle cx="74" cy="64" r="4.5" fill="#FFFFFF" stroke={stroke} strokeWidth="1.2" />
        </svg>
      );
    case 'meals':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <path
            d="M20 62C20 40 42 28 96 34C102 52 98 84 62 90C34 94 20 80 20 62Z"
            fill="#DAE8D1"
            stroke="#2B5B37"
            strokeWidth="1.6"
          />
          <circle cx="58" cy="64" r="13" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="1.2" />
          <circle cx="42" cy="46" r="6" fill="#F4DFB8" stroke={fillAccent} strokeWidth="1.2" />
          <circle cx="60" cy="44" r="6" fill="#EED2BA" stroke={stroke} strokeWidth="1.2" />
          <circle cx="78" cy="47" r="6" fill="#F8EED8" stroke={fillAccent} strokeWidth="1.2" />
        </svg>
      );
    case 'biryani':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <path
            d="M32 62C32 45 88 45 88 62C88 79 75 88 60 88C45 88 32 79 32 62Z"
            fill="#F3DEC0"
            stroke={stroke}
            strokeWidth="1.6"
          />
          <path d="M44 46C48 39 54 39 57 45" stroke={fillAccent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M62 45C66 38 72 39 75 45" stroke="#2B5B37" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="80" cy="72" r="8" fill="#FAF7F2" stroke="#D5C8B5" strokeWidth="1.2" />
        </svg>
      );
    case 'curry-veg':
    case 'curry-nonveg':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <circle
            cx="60"
            cy="60"
            r="28"
            fill={isVeg ? '#F4DFB8' : '#EBC6B8'}
            stroke={stroke}
            strokeWidth="1.6"
          />
          <circle cx="52" cy="56" r="5" fill="#FFFFFF" fillOpacity="0.65" />
          <circle cx="68" cy="62" r="4" fill={fillAccent} fillOpacity="0.65" />
          <path d="M55 68C59 64 64 64 68 68" stroke="#2B5B37" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'seafood':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <path
            d="M32 60C44 44 68 44 82 58L91 49V71L82 62C68 76 44 76 32 60Z"
            fill="#EFC7B5"
            stroke={stroke}
            strokeWidth="1.6"
          />
          <circle cx="44" cy="57" r="2" fill={stroke} />
          <circle cx="76" cy="80" r="7" fill="#F4E7A9" stroke="#C9922A" strokeWidth="1.2" />
        </svg>
      );
    case 'parotta':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <circle cx="55" cy="58" r="22" fill="#F4E1BF" stroke={stroke} strokeWidth="1.6" />
          <circle cx="55" cy="58" r="14" stroke={fillAccent} strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="78" cy="74" r="10" fill="#E9C8B8" stroke={stroke} strokeWidth="1.4" />
        </svg>
      );
    case 'noodles':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <path d="M34 58H86C84 76 74 86 60 86C46 86 36 76 34 58Z" fill="#FAF7F2" stroke={stroke} strokeWidth="1.6" />
          <path d="M40 54C46 46 54 54 60 46C66 54 74 46 80 54" stroke={fillAccent} strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="34" x2="88" y2="48" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="72" y1="31" x2="90" y2="43" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'sweet':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <path d="M36 62H84C82 78 72 86 60 86C48 86 38 78 36 62Z" fill="#FAF7F2" stroke={stroke} strokeWidth="1.6" />
          <circle cx="51" cy="57" r="8" fill="#DDA15E" stroke={stroke} strokeWidth="1.4" />
          <circle cx="69" cy="57" r="8" fill="#DDA15E" stroke={stroke} strokeWidth="1.4" />
          <circle cx="60" cy="48" r="8" fill="#E9B872" stroke={stroke} strokeWidth="1.4" />
        </svg>
      );
    case 'beverage':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <path d="M44 42H76L71 76H49L44 42Z" fill="#F2DEC5" stroke={stroke} strokeWidth="1.6" />
          <path d="M39 76H81C80 84 72 88 60 88C48 88 40 84 39 76Z" fill="#FAF7F2" stroke={fillAccent} strokeWidth="1.6" />
          <path d="M52 34C52 30 55 29 55 26" stroke={fillAccent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M64 34C64 30 67 29 67 26" stroke={fillAccent} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'snack':
    default:
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#DFD5C5" strokeWidth="2" />
          <circle cx="50" cy="56" r="10" fill="#E8C284" stroke={stroke} strokeWidth="1.4" />
          <circle cx="70" cy="58" r="10" fill="#E8C284" stroke={stroke} strokeWidth="1.4" />
          <circle cx="60" cy="70" r="10" fill="#F0CF97" stroke={stroke} strokeWidth="1.4" />
        </svg>
      );
  }
}

export const DishVisual: React.FC<DishVisualProps> = ({
  name,
  imageSrc,
  expectedImagePath,
  motif,
  accentTone,
  isVeg,
  size = 'card',
}) => {
  const [hasError, setHasError] = useState(false);

  if (imageSrc && !hasError) {
    return (
      <img
        src={imageSrc}
        alt={`${name} served at Bharath Delights`}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
      />
    );
  }

  if (size === 'thumb') {
    return (
      <div
        className="w-full h-full flex items-center justify-center border border-[#E4D9C8]"
        style={{ backgroundColor: accentTone }}
        title={`Photo pending (${expectedImagePath})`}
      >
        <div className="scale-75">{renderMotifSvg(motif, isVeg)}</div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none border-b border-[#EFE6D8]"
      style={{
        background: `radial-gradient(circle at 50% 42%, #FFFFFF 0%, ${accentTone} 100%)`,
      }}
    >
      <div className={size === 'modal' ? 'scale-125 mb-3' : 'mb-2'}>
        {renderMotifSvg(motif, isVeg)}
      </div>
      <p className="font-display text-sm sm:text-base font-semibold text-[#2A1812] leading-snug max-w-[85%] line-clamp-2">
        {name}
      </p>
      <p className="mt-1 text-[11px] font-medium text-[#664E43]/85 tracking-normal">
        Studio photo pending · {expectedImagePath}
      </p>
    </div>
  );
};
