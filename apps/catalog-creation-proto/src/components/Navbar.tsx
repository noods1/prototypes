import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="justify-between items-center flex min-h-[66px] w-full gap-[40px_100px] flex-wrap bg-[#121415] px-6 py-[17px] max-md:max-w-full max-md:px-5">
      <div className="items-center flex gap-10 text-sm text-white font-normal leading-loose">
        <div className="flex h-4 items-center gap-1">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/2f85b5a0e39213a50b499e8565b7d9ea2eca96e5?placeholderIfAbsent=true"
            className="aspect-[4.69] object-contain w-[75px] shrink-0"
            alt="TikTok Ads Manager Logo"
          />
          <div className="text-white">
            Catalog Manager
          </div>
        </div>
      </div>
      <div className="items-center flex gap-6">
        <button className="rotate-[-0.097deg] justify-center items-center flex min-h-6 gap-1 overflow-hidden text-xs text-[#87898B] font-medium whitespace-nowrap text-center tracking-[0.16px] leading-none bg-[rgba(18,20,21,0.00)] px-2 py-1 rounded-md hover:bg-gray-800 transition-colors">
          <span className="text-[#87898B]">English</span>
        </button>
        <div className="items-center flex gap-4">
          <div className="items-center flex gap-2 text-base text-[#A1A1FA] font-medium whitespace-nowrap text-center tracking-[0.03px] w-8 rounded-full">
            <div className="w-8">
              <div className="bg-[#E9EBFF] flex flex-col items-center w-full justify-center h-8 fill-[#E9EBFF] px-[3px] rounded-[50%]">
                <div className="text-[#A1A1FA]">K</div>
              </div>
            </div>
          </div>
          <button className="items-center flex gap-2.5 overflow-hidden w-8 h-8 bg-[rgba(18,20,21,0.00)] p-1 rounded-md hover:bg-gray-800 transition-colors">
            <div className="flex gap-3 p-0.5">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ee99af4eac7218069f0e899889cac03394e857bd?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-5"
                alt="Menu"
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
