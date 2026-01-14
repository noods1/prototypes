import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CatalogFiltersProps {
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onCreateNew: () => void;
  availableCatalogTypes?: string[];
  isDrawerOpen?: boolean;
}

const catalogTypeOptions = [
  { value: 'ecommerce', title: 'Ecommerce', description: 'Products that are sold online' },
  { value: 'auto-inventory', title: 'Auto - Inventory', description: 'Display specific information about the vehicle' },
  { value: 'auto-model', title: 'Auto - Model', description: 'Display auto make and model' },
  { value: 'media-entertainment', title: 'Media and entertainment', description: 'From streaming services' },
  { value: 'destination', title: 'Destination', description: 'Online bookings for tours, tickets, and activites' },
  { value: 'hotel', title: 'Hotel', description: 'Hotel reservations' },
  { value: 'flight', title: 'Flight', description: 'Flight bookings and tickets' },
  { value: 'live-events', title: 'Live Events', description: 'For concerts and other live events' },
  { value: 'local-services', title: 'Local services', description: 'For services found locally near customers' }
];

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  onSearchChange,
  onFilterChange,
  onCreateNew,
  availableCatalogTypes = [],
  isDrawerOpen = false
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      setIsFilterOpen(false);
    }
  }, [isDrawerOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleFilterSelect = (value: string) => {
    setFilterValue(value);
    setIsFilterOpen(false);
    onFilterChange(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className="items-center flex min-w-60 gap-4 text-sm font-normal tracking-[0.09px] leading-none flex-wrap max-md:max-w-full">
      <div className="justify-center items-stretch flex flex-col text-[#121415] w-60 rounded-md relative" ref={filterRef}>
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFilterOpen(!isFilterOpen);
          }}
          className="items-center border flex w-full gap-2 bg-white px-3 py-2 rounded-md border-solid border-[#D3D4D5] hover:bg-gray-50 transition-colors"
          style={{ borderRadius: '4px' }}
        >
          <div className="flex items-center gap-2 flex-1 shrink basis-[0%]">
            <div className="text-[#121415] text-ellipsis flex-1 shrink basis-[0%] text-left">
              Catalog type: {filterValue}
            </div>
          </div>
          <ChevronDown 
            className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            style={{ 
              width: '16px', 
              height: '16px',
              strokeWidth: 1.5,
              color: '#121415'
            }}
          />
        </button>
        {isFilterOpen && (
          <div
            className="absolute top-full left-0 mt-1"
            style={{
              display: 'flex',
              width: '100%',
              minWidth: '240px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderRadius: '8px',
              background: '#FFF',
              boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
              padding: '4px',
              zIndex: 40
            }}
          >
            <button
              type="button"
              onClick={() => handleFilterSelect('All')}
              className="w-full text-left transition-colors"
              style={{
                display: 'flex',
                padding: '8px',
                alignItems: 'center',
                gap: '8px',
                alignSelf: 'stretch',
                borderRadius: '4px',
                background: '#FFF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F1F2F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFF';
              }}
            >
              <div
                style={{
                  overflow: 'hidden',
                  color: '#121415',
                  textOverflow: 'ellipsis',
                  fontFamily: 'TikTok Sans, sans-serif',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '20px',
                  letterSpacing: '0.094px'
                }}
              >
                All
              </div>
            </button>
            {catalogTypeOptions
              .filter(option => availableCatalogTypes.includes(option.value))
              .map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFilterSelect(option.title)}
                  className="w-full text-left transition-colors"
                  style={{
                    display: 'flex',
                    padding: '8px',
                    alignItems: 'center',
                    gap: '8px',
                    alignSelf: 'stretch',
                    borderRadius: '4px',
                    background: '#FFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F1F2F2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFF';
                  }}
                >
                  <div
                    style={{
                      overflow: 'hidden',
                      color: '#121415',
                      textOverflow: 'ellipsis',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '20px',
                      letterSpacing: '0.094px'
                    }}
                  >
                    {option.title}
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>
      <div className="items-stretch border flex min-h-9 gap-2 overflow-hidden text-[#A9ABAC] w-60 bg-white px-3 py-2 rounded-md border-solid border-[#D3D4D5]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b54784adaba5499f643067e9d7c1dd2445896b06?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-4 shrink-0"
          alt="Search icon"
        />
        <div className="items-center flex gap-2.5 h-full flex-1 shrink basis-[0%]">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search by name or ID"
            className="text-[#A9ABAC] text-ellipsis flex-1 shrink basis-[0%] bg-transparent border-none outline-none placeholder:text-[#A9ABAC]"
          />
        </div>
      </div>
      <button
        onClick={onCreateNew}
        className="justify-center items-center flex gap-1 overflow-hidden text-white font-medium text-center bg-[#009995] px-4 h-9 rounded-md hover:bg-[#008882] transition-colors"
      >
        <span className="text-white">Create new</span>
      </button>
    </div>
  );
};
