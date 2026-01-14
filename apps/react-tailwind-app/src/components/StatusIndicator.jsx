import HelpIcon from './HelpIcon';

function StatusIndicator({ 
  variant = "neutral", 
  text, 
  showHelp = false,
  className = "" 
}) {
  const variantColors = {
    neutral: "bg-gray-400",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-2 h-5 rounded-full ${variantColors[variant]}`} />
      {text && (
        <span className="text-sm text-gray-900">{text}</span>
      )}
      {showHelp && <HelpIcon size={14} />}
    </div>
  );
}

export default StatusIndicator;

