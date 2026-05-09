import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-block px-4 py-2 bg-[#f1efff] text-[#635bff] text-sm font-semibold rounded-full ${className}`}>
      {children}
    </span>
  );
}
