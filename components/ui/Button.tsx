import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center h-14 px-8 rounded-full font-semibold text-base transition-all duration-200 whitespace-nowrap';

  const variantStyles = {
    primary: 'bg-[#635bff] text-white hover:bg-[#5047e5] shadow-md hover:shadow-lg',
    secondary: 'bg-white text-[#0f172a] border-2 border-slate-200 hover:border-[#635bff] hover:text-[#635bff]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
