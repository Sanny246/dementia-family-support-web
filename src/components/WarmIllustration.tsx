import React from 'react';

interface WarmIllustrationProps {
  className?: string;
  variant?: 'hero' | 'walking' | 'holding-hands' | 'tea-chat';
}

export const WarmIllustration: React.FC<WarmIllustrationProps> = ({
  className = 'w-full h-auto max-w-lg',
  variant = 'hero'
}) => {
  if (variant === 'holding-hands') {
    return (
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="兩雙手溫柔交握，象徵陪伴與支持"
      >
        <defs>
          <linearGradient id="bgWarm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8EE" />
            <stop offset="100%" stopColor="#F5ECE0" />
          </linearGradient>
          <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Soft rounded background canvas */}
        <rect width="400" height="300" rx="24" fill="url(#bgWarm)" />

        {/* Warm sun circle */}
        <circle cx="200" cy="110" r="75" fill="url(#sunGlow)" />

        {/* Gentle supportive leaves */}
        <path
          d="M70 240 C90 190, 140 180, 150 240"
          stroke="#A7BCA6"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M260 250 C280 195, 330 190, 340 250"
          stroke="#C8A584"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Stylized holding hands */}
        {/* Parent hand (gentle, elder) */}
        <path
          d="M110 190 C130 150, 180 130, 215 150 C240 165, 255 190, 260 215 C265 240, 210 245, 175 225 Z"
          fill="#E7BA99"
          opacity="0.9"
        />
        {/* Adult child supportive hand wrapping around */}
        <path
          d="M290 180 C265 145, 210 135, 180 160 C155 180, 160 215, 190 230 C220 245, 275 235, 290 180 Z"
          fill="#D69E7B"
          opacity="0.85"
        />

        {/* Small warm heart spark in center */}
        <path
          d="M200 135 C195 125, 182 125, 182 135 C182 145, 200 158, 200 158 C200 158, 218 145, 218 135 C218 125, 205 125, 200 135 Z"
          fill="#E07A5F"
        />
      </svg>
    );
  }

  // Default 'hero' walking together in warm morning light
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 540 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto drop-shadow-sm ${className}`}
        aria-label="家人並肩在溫暖陽光下慢步散步插畫"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F0" />
            <stop offset="60%" stopColor="#F9EEDD" />
            <stop offset="100%" stopColor="#EDE0CC" />
          </linearGradient>
          <linearGradient id="warmSun" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="groundHill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2EFE0" />
            <stop offset="50%" stopColor="#D4E7D0" />
            <stop offset="100%" stopColor="#C4DEC0" />
          </linearGradient>
        </defs>

        {/* Rounded tranquil background card */}
        <rect width="540" height="380" rx="32" fill="url(#skyGrad)" />

        {/* Big warm morning sun */}
        <circle cx="410" cy="110" r="85" fill="url(#warmSun)" />

        {/* Gentle background mountain / rolling hills */}
        <path
          d="M0 260 C120 220, 240 240, 360 210 C440 190, 500 205, 540 215 L540 380 L0 380 Z"
          fill="#E7DFD3"
          opacity="0.6"
        />
        <path
          d="M0 280 C140 250, 280 275, 420 250 C480 240, 510 245, 540 255 L540 380 L0 380 Z"
          fill="url(#groundHill)"
        />

        {/* Soft park trees in background */}
        {/* Tree 1 */}
        <path d="M75 190 C75 150, 110 130, 130 160 C150 140, 185 160, 180 195 C175 220, 140 240, 95 230 C80 220, 75 205, 75 190 Z" fill="#9FB89A" opacity="0.8" />
        <rect x="123" y="210" width="8" height="45" rx="3" fill="#8C7A6B" />

        {/* Tree 2 */}
        <path d="M440 210 C440 180, 465 160, 485 180 C505 165, 525 180, 520 210 C515 230, 490 240, 460 235 C445 228, 440 220, 440 210 Z" fill="#B4C7A8" opacity="0.85" />
        <rect x="477" y="225" width="7" height="35" rx="3" fill="#8C7A6B" />

        {/* Gentle footpath */}
        <path
          d="M120 380 C200 340, 260 300, 320 270 C360 250, 390 248, 410 248"
          stroke="#D8C3AA"
          strokeWidth="32"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Human figures walking side by side holding hands */}
        {/* Figure 1: Elderly Parent (Silver hair, warm terracotta coat, gentle slow walk) */}
        <g transform="translate(205, 148)">
          {/* Silver hair */}
          <ellipse cx="36" cy="22" rx="14" ry="13" fill="#D3D3D8" />
          {/* Face profile */}
          <circle cx="36" cy="25" r="11" fill="#E8BFA6" />
          <ellipse cx="34" cy="22" rx="12" ry="7" fill="#C5C5CC" />
          {/* Gentle body/coat */}
          <path d="M22 36 C22 36, 16 55, 14 92 C14 102, 58 102, 58 92 C56 55, 50 36, 50 36 Z" fill="#C46D52" />
          {/* Scarf */}
          <path d="M24 38 C32 46, 42 46, 48 38 C44 45, 34 50, 24 38 Z" fill="#EFE5D8" />
          {/* Left leg walking slow */}
          <path d="M24 92 L22 135 L16 137" stroke="#3D3B3A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right leg */}
          <path d="M46 92 L48 134 L54 136" stroke="#3D3B3A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Parent hand reached out to hold */}
          <path d="M46 54 C54 68, 64 78, 70 86" stroke="#C46D52" strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* Figure 2: Adult Child (Daughter/Son, warm navy/forest sweater, holding parent's hand) */}
        <g transform="translate(262, 140)">
          {/* Dark hair */}
          <ellipse cx="32" cy="20" rx="13" ry="12" fill="#3D342C" />
          {/* Face */}
          <circle cx="32" cy="24" r="10" fill="#ECC5AC" />
          {/* Hair back */}
          <path d="M22 20 C22 28, 25 36, 32 36 C34 32, 33 24, 30 20 Z" fill="#3D342C" />
          {/* Torso/jacket */}
          <path d="M18 36 C18 36, 12 58, 10 98 C10 108, 52 108, 52 98 C50 58, 44 36, 44 36 Z" fill="#3E5C56" />
          {/* Left arm reaching out holding parent's hand */}
          <path d="M18 52 C12 66, 6 78, 12 88" stroke="#3E5C56" strokeWidth="7" strokeLinecap="round" />
          {/* Left leg */}
          <path d="M20 98 L18 143 L12 145" stroke="#4A4541" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right leg */}
          <path d="M42 98 L44 142 L50 144" stroke="#4A4541" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Gentle interlocking hands glow */}
        <circle cx="274" cy="232" r="7" fill="#F4A261" />
        <circle cx="274" cy="232" r="11" fill="#FDE68A" opacity="0.4" />

        {/* Warm floating leaf / breeze motifs */}
        <path d="M360 160 C375 155, 385 165, 375 175 C365 170, 360 165, 360 160 Z" fill="#D98A6C" opacity="0.7" />
        <path d="M170 120 C180 115, 190 120, 185 128 C175 125, 170 122, 170 120 Z" fill="#8CA885" opacity="0.7" />
        <path d="M330 90 C340 85, 348 90, 344 96 C336 94, 332 92, 330 90 Z" fill="#E5B26E" opacity="0.6" />

        {/* Gentle reassuring caption inside illustration */}
        <g transform="translate(30, 342)">
          <rect x="0" y="0" width="180" height="26" rx="13" fill="#FFFFFF" fillOpacity="0.85" />
          <text x="12" y="17" fill="#5A4E42" fontSize="12" fontWeight="500" fontFamily="sans-serif">
            步調放慢，我們一起走
          </text>
        </g>
      </svg>
    </div>
  );
};
