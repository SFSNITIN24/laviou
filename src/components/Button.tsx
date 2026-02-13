import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  onClick,
  className = '',
  disabled = false,
  htmlType = 'button'
}: ButtonProps) {
  const baseClasses = 'font-medium transition-colors rounded-lg text-center text-sm sm:text-base flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-[#8A9078] text-white hover:bg-[#7A8068]',
    secondary: 'bg-white text-[#8A8A8A] border border-[#E9E7E2] ',
    outline: 'text-[#8A8A8A] border border-[#E9E7E2] hover:bg-gray-50'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  // Generate proper Tailwind classes for dimensions
  const buttonClasses = `${combinedClasses} font-[400] cursor-pointer`;

  if (href) {
    return (
      <Link 
        href={href} 
        className={buttonClasses}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={htmlType}
    >
      {children}
    </button>
  );
}
