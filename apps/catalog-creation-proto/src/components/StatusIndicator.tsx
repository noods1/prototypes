import React from 'react';

interface StatusIndicatorProps {
  status: string;
  color: string;
  showIcon?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  color, 
  showIcon = true 
}) => {
  return (
    <div className="items-center flex min-h-5 gap-1">
      <div className="items-center flex gap-1">
        <div className="flex flex-col items-stretch justify-center w-2 py-1.5">
          <div 
            className="flex w-2 shrink-0 h-2 rounded-[50%]"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="text-[#121415] text-sm font-normal leading-none tracking-[0.09px]">
          {status}
        </div>
      </div>
      {showIcon && (
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c05bff45332f27d8ea299a092e6772a45b16c3ae?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-3.5 shrink-0"
          alt="Status info"
        />
      )}
    </div>
  );
};
