import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center h-14 px-8 rounded-full font-semibold text-base transition-all duration-200 whitespace-nowrap';

  const variantStyles = {
    primary: 'bg-[#635bff] text-white hover:bg-[#5047e5] shadow-md hover:shadow-lg',
    secondary: 'bg-white text-[#0f172a] border-2 border-slate-200 hover:border-[#635bff] hover:text-[#635bff]'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:bg-[#635bff] disabled:hover:border-slate-200`}
      {...props}
    >
      {children}
    </button>
  );
}
