import React from 'react';

const Button = ({ children, type, onClick, variant, className, disabled }) => {
  const baseClasses = 'px-4 py-2 rounded focus:outline-none transition-all duration-300';
  const variantClasses = variant === 'outline' ? 'border-2 border-blue-500 text-blue-500' : 'bg-blue-500 text-white';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
