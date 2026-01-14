import React from 'react';
import {
  imgVector,
  imgVector1,
  imgVector2,
  imgVector3,
  img,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
} from '../assets/navbar-icons';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121415] flex items-center justify-center px-6 py-3 h-[60px]">
      <div className="flex items-center justify-between w-full">
        {/* Left Section */}
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center gap-5">
            {/* Workspace Switch */}
            <div className="bg-[#343435] flex items-center gap-2 pl-[10px] pr-1 py-1 rounded-[100px]">
              <div className="relative size-4">
                <div className="absolute h-[10.208px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[14.167px]">
                  <img alt="Menu" className="block max-w-none size-full" src={img6} />
                </div>
              </div>
              <div className="bg-[#009995] overflow-clip relative rounded-[24px] size-7">
              <div className="absolute flex flex-col font-tiktok-text font-normal justify-center leading-0 left-[10px] text-sm text-white top-[14px] tracking-[0.0938px] -translate-y-1/2">
                <p className="leading-5">Y</p>
              </div>
            </div>
          </div>

          {/* TikTok Logo and Ads Manager */}
          <div className="h-[26px] relative w-[187px]">
            <div className="absolute h-5 left-0 top-[calc(50%-3px)] -translate-y-1/2 w-[83.966px]">
              <div className="absolute h-5 left-[calc(50%-33.26px)] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[17.436px]">
                <img alt="TikTok Logo Icon" className="block max-w-none size-full" src={img4} />
              </div>
              <div className="absolute h-[14.616px] left-[calc(50%+10.36px)] top-[calc(50%+2.07px)] -translate-x-1/2 -translate-y-1/2 w-[63.243px]">
                <img alt="TikTok Text" className="block max-w-none size-full" src={img5} />
              </div>
            </div>
            <div className="absolute flex flex-col font-tiktok-text font-normal justify-center leading-0 left-[89.66px] text-base text-white text-nowrap top-[calc(50%+0.37px)] tracking-[0.0304px] -translate-y-1/2">
              <p className="leading-6">Ads Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Dashboard */}
          <div className="flex flex-col h-9 items-start justify-center">
            <div className="flex gap-1 h-11 items-center justify-center w-full">
              <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 text-base text-[#87898b] text-nowrap tracking-[0.0304px]">
                <p className="leading-6">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Campaign */}
          <div className="flex flex-col h-9 items-start justify-center">
            <div className="flex gap-1 h-11 items-center justify-center w-full">
              <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 text-base text-[#87898b] text-nowrap tracking-[0.0304px]">
                <p className="leading-6">Campaign</p>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="flex flex-col h-9 items-start justify-center">
            <div className="flex gap-1 h-11 items-center justify-center w-full">
              <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 text-base text-[#87898b] text-nowrap tracking-[0.0304px]">
                <p className="leading-6">Tools</p>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="flex flex-col h-9 items-start justify-center">
            <div className="flex gap-1 h-11 items-center justify-center w-full">
              <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 text-base text-[#87898b] text-nowrap tracking-[0.0304px]">
                <p className="leading-6">Analytics</p>
              </div>
            </div>
          </div>

          {/* GMV Max */}
          <div className="flex flex-col h-9 items-start justify-center">
            <div className="flex gap-1 h-11 items-center justify-center w-full">
              <div className="flex flex-col font-tiktok-text font-medium justify-center leading-0 text-base text-[#87898b] text-nowrap tracking-[0.0304px]">
                <p className="leading-6">GMV Max</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Utility Buttons */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="bg-transparent flex items-center justify-center overflow-clip p-1 size-9 rounded">
            <div className="flex items-start p-[2.4px]">
              <div className="bg-transparent relative size-6">
                <div className="absolute h-5 left-[3px] top-0.5 w-[18.767px]">
                  <img alt="notification" className="block max-w-none size-full" src={img3} />
                </div>
              </div>
            </div>
          </button>

          {/* Help */}
          <button className="bg-transparent flex items-center justify-center overflow-clip p-1 size-9 rounded">
            <div className="flex items-start p-[2.4px]">
              <div className="bg-transparent relative size-6">
                <div className="absolute h-[21.507px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[21.507px]">
                  <img alt="help" className="block max-w-none size-full" src={img1} />
                </div>
              </div>
            </div>
          </button>

          {/* Service */}
          <button className="bg-transparent flex items-center justify-center overflow-clip p-1 size-9 rounded">
            <div className="flex items-start p-[2.4px]">
              <div className="bg-transparent relative size-6">
                <div className="absolute h-[21.5px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[21.827px]">
                  <img alt="service" className="block max-w-none size-full" src={img2} />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Account Switch */}
        <div className="border border-[#87898b] border-solid flex h-9 items-center justify-between overflow-clip px-[10px] py-2 w-[180px] rounded">
          <p className="font-tiktok-text font-normal h-4 leading-4 overflow-hidden text-xs text-white text-nowrap tracking-[0.1608px] w-[140px]">
            TTAM Demo Account - Admin (please do not change the account name)
          </p>
            <div className="relative size-[14px]">
              <div className="absolute h-[6.069px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11.5px]">
                <img alt="chevron down" className="block max-w-none size-full" src={img9} />
              </div>
            </div>
          </div>

          {/* Coupon Icon */}
          <div className="overflow-clip relative size-6">
            <div className="absolute inset-[12.5%_20.83%_66.67%_18.75%]">
              <div className="absolute inset-[-20.01%_-6.9%]">
                <img alt="coupon" className="block max-w-none size-full" src={imgVector} />
              </div>
            </div>
            <div className="absolute inset-[33.33%_8.33%_16.67%_8.33%]">
              <div className="absolute inset-[-8.33%_-5%]">
                <img alt="coupon" className="block max-w-none size-full" src={imgVector1} />
              </div>
            </div>
            <div className="absolute inset-[52.88%_52.08%_47.12%_35.42%]">
              <div className="absolute inset-[-1px_-33.33%]">
                <img alt="coupon" className="block max-w-none size-full" src={imgVector2} />
              </div>
            </div>
            <div className="absolute inset-[65.38%_35.42%_34.62%_35.42%]">
              <div className="absolute inset-[-1px_-14.29%]">
                <img alt="coupon" className="block max-w-none size-full" src={imgVector3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
