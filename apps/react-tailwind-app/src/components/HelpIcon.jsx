function HelpIcon({ className = "", size = 14 }) {
  const sizeClass = size === 14 ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className={`${sizeClass} rounded-full border border-gray-400 flex items-center justify-center ${className}`}>
      <span className="text-[10px] text-gray-600">?</span>
    </div>
  );
}

export default HelpIcon;

