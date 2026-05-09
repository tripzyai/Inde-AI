import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover ? 'hover:shadow-md transition-shadow duration-300' : '';

  return (
    <div className={`bg-white border border-slate-200 rounded-3xl p-8 shadow-sm ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
