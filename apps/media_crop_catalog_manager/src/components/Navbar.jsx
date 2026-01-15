function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] bg-[#121212] h-[64px] flex items-center justify-between px-6">
      {/* Left side - Branding */}
      <div className="flex items-center gap-3">
        {/* TikTok Logo */}
        <div className="flex items-center">
          <span className="text-white font-bold text-lg tracking-tight">
            Tik
            <span className="relative inline-block">
              <span className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-[#FF0050] rounded-full"></span>
              <span className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-[#00F2EA] rounded-full"></span>
              o
            </span>
            k
          </span>
        </div>
        {/* App Name */}
        <span className="text-gray-300 text-sm font-medium">Catalog Manager</span>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <button className="text-gray-400 text-sm hover:text-gray-300 transition-colors">
          English
        </button>

        {/* User Profile Icon */}
        <div className="w-8 h-8 rounded-full bg-[#E91E63] border border-[#C2185B] flex items-center justify-center cursor-pointer hover:bg-[#C2185B] transition-colors">
          <span className="text-white text-sm font-semibold">Q</span>
        </div>

        {/* Help Icon */}
        <div className="w-8 h-8 rounded-full bg-transparent border border-gray-500 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
          <span className="text-white text-sm font-semibold">?</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
