function Avatar({ size = "md", shape = "circle", className = "", bgColor = "bg-gray-200" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const shapeClasses = shape === "circle" ? "rounded-full" : "rounded";

  return (
    <div className={`${sizeClasses[size]} ${shapeClasses} ${bgColor} flex items-center justify-center ${className}`}>
      <span className={`text-xs font-medium ${bgColor.includes('purple') ? 'text-gray-700' : 'text-gray-600'}`}>K</span>
    </div>
  );
}

export default Avatar;

