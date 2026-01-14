import React, { useState } from 'react';
import Select from './Select';

function ProductDetailsCard() {
  const [selectedProduct, setSelectedProduct] = useState('All products');

  return (
    <div className="bg-white flex flex-col items-start overflow-clip relative w-full rounded-md mt-4">
      {/* Header */}
      <div className="bg-white flex flex-col items-start max-w-[800px] pb-2 pt-6 px-6 relative shrink-0 w-full">
        <div className="flex items-center justify-between relative shrink-0 w-full">
          <div className="flex gap-2 items-center relative shrink-0 w-[500px]">
            <div className="flex flex-col font-tiktok-display font-medium justify-center leading-0 relative shrink-0 text-xl text-[#121415] text-nowrap" style={{ letterSpacing: '1.5%' }}>
              <p className="leading-7">Product details</p>
            </div>
          </div>
          <div className="h-5 shrink-0 w-[75px]" />
        </div>
        <div className="flex flex-col font-tiktok-text font-normal justify-center leading-0 relative shrink-0 text-sm text-[#6d6e70] tracking-[0.0938px] w-full">
          <p className="leading-5">
            <span>Add products from: </span>
            <span className="text-[#121415]">ABC store</span>
          </p>
        </div>
      </div>

      {/* Section */}
      <div className="bg-white flex flex-col gap-4 items-start pb-6 pt-4 px-6 relative shrink-0 w-full">
        <div className="flex flex-col gap-2 items-start relative shrink-0 w-[500px]">
          <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 relative shrink-0 text-sm text-[#121415] text-nowrap tracking-[0.6700000166893005px]">
            <p className="leading-5">Products</p>
          </div>
          <div className="flex gap-2 items-start relative shrink-0 w-full">
            <Select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1"
            >
              <option value="All products">All products</option>
            </Select>
            <button className="bg-transparent flex items-center justify-center p-2 relative size-9 rounded hover:bg-gray-100">
              <svg className="w-5 h-5 text-[#6d6e70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
