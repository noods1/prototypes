import React, { useState } from 'react';

function AdNameSection() {
  const [adName, setAdName] = useState('Smart ad name 1');

  return (
    <div className="bg-white flex flex-col gap-[10px] items-start p-6 relative w-full rounded-md">
      <div className="flex flex-col font-tiktok-display font-medium justify-center leading-0 relative shrink-0 text-[#121212] text-xl text-nowrap" style={{ letterSpacing: '1.5%' }}>
        <p className="leading-7">Ad name</p>
      </div>
      <div className="flex flex-col gap-0 items-start justify-center overflow-clip p-0 relative shrink-0 w-[516px]">
        <input
          type="text"
          value={adName}
          onChange={(e) => setAdName(e.target.value)}
          className="bg-white border border-[#d3d4d5] border-solid flex gap-2 h-9 items-center pl-2 pr-2 py-1 relative shrink-0 w-full rounded font-tiktok-text font-normal text-sm text-[#404142] tracking-[0.0938px] focus:outline-none focus:ring-2 focus:ring-[#009995] focus:border-[#009995]"
          placeholder="Smart ad name 1"
        />
      </div>
    </div>
  );
}

export default AdNameSection;
