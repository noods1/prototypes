import React from 'react';
import thumbnail1 from '../assets/leftrail/thumbnail1.png';
import thumbnail2 from '../assets/leftrail/thumbnail2.png';
import chevronIcon from '../assets/leftrail/chevron.svg';
import chevronStrokeIcon from '../assets/leftrail/chevron-stroke.svg';
import moreVerticalIcon from '../assets/leftrail/more-vertical.svg';

function Accordion({ className }) {
  return (
    <div className={className}>
      <div className="overflow-clip relative shrink-0 size-4">
        <div className="absolute bottom-[35.42%] flex items-center justify-center left-1/4 right-1/4 top-[39.58%]">
          <div className="flex-none h-3 rotate-90 w-1.5">
            <div className="relative size-full">
              <img alt="" className="block max-w-none size-full" src={chevronIcon} />
            </div>
          </div>
        </div>
        <div className="absolute flex inset-[35.42%_20.83%_31.25%_20.83%] items-center justify-center">
          <div className="flex-none h-3.5 rotate-90 w-2">
            <div className="relative size-full">
              <img alt="" className="block max-w-none size-full" src={chevronStrokeIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftRail() {
  return (
    <div className="flex flex-col items-start relative h-full w-full">
      <div className="bg-white flex flex-col gap-1 h-auto items-start px-2 py-4 relative shrink-0 w-full">
        {/* Campaign Item */}
        <div className="bg-white flex gap-1 h-11 items-center p-3 relative rounded w-full">
          <div className="basis-0 flex flex-col font-tiktok-display font-medium grow justify-center leading-0 min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-base text-nowrap">
            <p className="leading-6 overflow-ellipsis overflow-hidden">Sales website 0216</p>
          </div>
        </div>

        {/* Ad Group Item */}
        <div className="flex gap-1 h-11 items-center overflow-clip p-3 relative rounded w-full">
          <Accordion className="flex items-center justify-center p-0.5 relative shrink-0 size-5" />
          <div className="basis-0 flex flex-col font-tiktok-display font-medium grow h-[22px] justify-center leading-0 min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-sm text-nowrap">
            <p className="leading-[22px] overflow-ellipsis overflow-hidden">Ad group name 1</p>
          </div>
        </div>

        {/* Ad Item - Selected */}
        <div className="bg-[#f2fdfc] flex gap-2 h-11 items-center pl-9 pr-3 py-3 relative rounded shrink-0 w-full">
          <div className="overflow-clip relative rounded shrink-0 size-6">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded">
              <img alt="" className="absolute max-w-none object-[50%_50%] object-cover rounded size-full" src={thumbnail1} />
              <img alt="" className="absolute max-w-none object-[50%_50%] object-cover rounded size-full" src={thumbnail2} />
            </div>
          </div>
          <div className="basis-0 flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
            <div className="flex flex-col font-tiktok-text font-medium h-5 justify-center leading-0 overflow-ellipsis overflow-hidden relative shrink-0 text-[#121212] text-sm text-nowrap w-full">
              <p className="leading-[22px] overflow-ellipsis overflow-hidden">Smart ad name 1</p>
            </div>
          </div>
          <div className="relative shrink-0 size-4">
            <div className="absolute h-[11.25px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2.5px]">
              <img alt="more options" className="block max-w-none size-full" src={moreVerticalIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftRail;
