import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pacitan Explorer Logo"
    >
      <g className="stroke-primary group-hover:stroke-primary-foreground transition-colors duration-300" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 70 Q 30 50, 50 70 T 90 70" className="stroke-primary" />
        <path d="M20 85 Q 40 65, 60 85 T 100 85" className="stroke-primary" />
        <circle cx="65" cy="35" r="15" className="stroke-primary fill-primary/20" />
      </g>
    </svg>
  );
}
