import { useState, useRef, useEffect } from 'react';
import DownIcon from './DownIcon';

function Dropdown({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select...",
  className = "" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || { label: placeholder };

  return (
    <div className={`relative w-60 ${className}`} ref={dropdownRef}>
      {/* Input/Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-[#d3d4d5] rounded h-9 px-3 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        <span className="text-sm text-[#121415] truncate leading-5">
          {selectedOption.label}
        </span>
        <DownIcon size={16} className="text-[#87898b] flex-shrink-0" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-[#d3d4d5] rounded shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="py-0.5">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 h-9 text-left text-sm text-[#121415] hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  value === option.value ? 'bg-[#e8fbf9]' : 'bg-white'
                }`}
              >
                <span className="leading-5">{option.label}</span>
                {value === option.value && (
                  <svg 
                    className="w-3.5 h-3.5 text-[#87898b] flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;

