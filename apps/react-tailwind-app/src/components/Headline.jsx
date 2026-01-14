function Headline({ 
  title, 
  subtitle, 
  size = "large", 
  className = "" 
}) {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-3xl"
  };

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <h2 className={`font-semibold text-gray-900 ${sizeClasses[size]} leading-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1 leading-5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Headline;

