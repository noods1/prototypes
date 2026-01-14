import React from 'react';

function Button({ children, icon, className = '', ...props }) {
  return (
    <button
      className={`bg-[#F8F8F9] border border-[#d3d4d5] border-solid flex gap-2 h-9 items-center justify-center px-4 py-2 relative shrink-0 rounded font-tiktok-text font-medium text-sm text-[#121415] tracking-[0.6700000166893005px] hover:bg-[#F1F2F2] transition-colors ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
