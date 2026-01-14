import Avatar from './Avatar';
import DownIcon from './DownIcon';

function Navbar() {
  return (
    <nav className="bg-[#121415] h-16 flex items-center justify-between px-6 w-full">
      {/* Left side - Logo and Title */}
      <div className="flex items-center gap-1 h-4">
        {/* TikTok Logo */}
        <div className="h-4 flex items-center">
          <span className="text-white font-semibold text-base leading-4">TikTok</span>
        </div>
        {/* Catalog Manager Text */}
        <div className="text-white text-sm font-normal leading-[22px] ml-1">
          Catalog Manager
        </div>
      </div>

      {/* Right side - Language, Avatar, Help */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <button className="h-6 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-transparent">
          <span className="text-[12px] font-medium text-[#87898b] leading-4 tracking-[0.1608px]">
            English
          </span>
          <DownIcon size={12} className="text-[#87898b] ml-1" />
        </button>

        {/* Avatar */}
        <Avatar size="md" bgColor="bg-purple-200" />

        {/* Help Icon */}
        <button className="w-5 h-5 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-transparent p-0">
          <div className="w-4 h-4 rounded-full border border-[#929496] flex items-center justify-center">
            <span className="text-[10px] text-[#929496] leading-none">?</span>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

