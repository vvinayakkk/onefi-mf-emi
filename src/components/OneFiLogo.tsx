import React from 'react';

export const OneFiLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="#6366F1" />
      {/* Upward Arrow merged with '1' */}
      <path
        d="M17 12L11 18H15V28H19V12H17Z"
        fill="white"
      />
      {/* 'F' & 'i' */}
      <path
        d="M23 15H31V18H26V20H30V23H26V28H23V15Z"
        fill="white"
      />
      <circle cx="34" cy="16" r="1.5" fill="#A5B4FC" />
      <rect x="33" y="19.5" width="2" height="8.5" rx="1" fill="#A5B4FC" />
    </svg>
  );
};
