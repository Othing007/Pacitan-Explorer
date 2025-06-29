import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pacitan Explorer Logo"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      >
        {/* Sun */}
        <circle cx="50" cy="38" r="12" className="text-accent" />
        
        {/* Waves */}
        <path d="M20 70 Q 35 55, 50 70 T 80 70" className="text-primary" />
        <path d="M20 85 Q 35 70, 50 85 T 80 85" className="text-primary/70" />
      </g>
    </svg>
  );
}
