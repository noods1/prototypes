import React from 'react';

function Watermark() {
  // Create SVG data URI for watermark pattern - smaller pattern for more repetition
  // Opacity set to 0.05 (5%)
  const svgContent = '<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="w" x="0" y="0" width="400" height="200" patternUnits="userSpaceOnUse"><text x="50" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="black" fill-opacity="0.05" transform="rotate(-45 50 100)">Prototype only. Not ready for production.</text><text x="250" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="black" fill-opacity="0.05" transform="rotate(-45 250 180)">Prototype only. Not ready for production.</text><text x="50" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="black" fill-opacity="0.05" transform="rotate(-45 50 180)">Prototype only. Not ready for production.</text><text x="250" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="black" fill-opacity="0.05" transform="rotate(-45 250 100)">Prototype only. Not ready for production.</text></pattern></defs><rect width="100%" height="100%" fill="url(#w)"/></svg>';
  // encodeURIComponent will convert # to %23 which is what we need
  const watermarkSvg = encodeURIComponent(svgContent);

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,${watermarkSvg}")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}

export default Watermark;
