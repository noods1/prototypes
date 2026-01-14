import React from 'react';
import gaugeBg from '../assets/rightrail/gauge-bg.svg';
import gaugeFill from '../assets/rightrail/gauge-fill.svg';
import { img9 } from '../assets/navbar-icons';

function RightRail() {
  return (
    <div className="flex flex-col items-start relative w-full h-full">
      <div className="bg-white flex flex-col items-start pb-2 pt-0 px-0 relative shrink-0 w-full rounded-md">
        {/* Header */}
        <div className="flex flex-col gap-0 items-start justify-center max-w-[800px] pb-2 pt-4 px-4 relative shrink-0 w-full">
          <div className="flex flex-col font-tiktok-display font-medium justify-center leading-0 text-base text-[#121212] text-nowrap tracking-[0.1899999976158142px]">
            <p className="leading-6">Recommendation usage</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white flex flex-col gap-0 items-start px-4 py-2 relative shrink-0 w-full">
          <div className="flex gap-2 items-center relative shrink-0 w-full">
            <div className="relative shrink-0 size-[60px]">
              <div className="absolute left-0 size-[60px] top-0">
                <div className="absolute inset-[-0.63%]">
                  <img alt="" className="block max-w-none size-full" src={gaugeBg} />
                </div>
                <div className="absolute flex inset-0 items-center justify-center">
                  <div className="flex-none scale-y-[-100%] size-[60px]">
                    <div className="relative size-full">
                      <div className="absolute inset-[-0.63%]">
                        <img alt="" className="block max-w-none size-full" src={gaugeFill} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex flex-col font-tiktok-text font-medium justify-center leading-0 left-1/2 text-xs text-[#121415] text-center text-nowrap top-[calc(50%-0.5px)] tracking-[0.1608px] -translate-x-1/2 -translate-y-1/2">
                <p className="leading-4">100%</p>
              </div>
            </div>
            <p className="basis-0 font-tiktok-text font-normal grow leading-5 min-h-px min-w-px relative shrink-0 text-sm text-[#121415] tracking-[0.0938px]">
              Ad group is fully optimized.
            </p>
          </div>
        </div>

        {/* Show all link */}
        <div className="bg-white flex flex-col gap-4 items-start px-4 py-2 relative shrink-0 w-full">
          <div className="flex gap-1 items-center relative shrink-0">
            <p className="font-tiktok-text font-normal leading-5 relative shrink-0 text-sm text-[#017976] text-nowrap tracking-[0.0938px]">
              Show all
            </p>
            <div className="relative shrink-0 size-[14px]">
              <div className="absolute h-[6.069px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11.5px]">
                <img alt="chevron down" className="block max-w-none size-full" src={img9} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightRail;
