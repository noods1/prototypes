import React from 'react';

function Select({ value, onChange, children, className = '', disabled, ...props }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`bg-white border border-[#d3d4d5] border-solid h-9 items-center pl-2 pr-8 py-1 relative w-full rounded font-tiktok-text font-normal text-sm tracking-[0.0938px] focus:outline-none focus:ring-2 focus:ring-[#009995] focus:border-[#009995] appearance-none ${disabled ? 'bg-[#f8f8f9] text-[#87898b] cursor-not-allowed' : 'text-[#404142]'}`}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-[#6d6e70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default Select;
