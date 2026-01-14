import React from 'react';

export const CatalogHeader: React.FC = () => {
  return (
    <header className="flex w-full max-w-[1000px] gap-4 py-6">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h1 className="text-2xl text-[#121415] font-medium tracking-[0.24px] leading-none">
          Product catalogs
        </h1>
        <p className="text-[#6D6E70] text-sm font-normal leading-none tracking-[0.09px] mt-1 max-md:max-w-full">
          Get closer to your first sale by adding products, or import your existing product inventory.
        </p>
      </div>
    </header>
  );
};
