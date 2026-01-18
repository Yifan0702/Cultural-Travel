import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackText = '',
  loading = 'lazy'
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    setImgSrc(src);
  }, [src]);

  const generateFallbackSVG = (text: string) => {
    const encodedText = encodeURIComponent(text);
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8B2323;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#D4AF37;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#009080;stop-opacity:0.8" />
          </linearGradient>
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect width="100%" height="100%" fill="url(#pattern)"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              font-family="serif" font-size="120" font-weight="bold" fill="rgba(255,255,255,0.9)">
          ${encodedText}
        </text>
        <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" 
              font-family="sans-serif" font-size="32" font-weight="600" fill="rgba(255,255,255,0.6)" letter-spacing="8">
          PROVINCE ARCHIVE
        </text>
      </svg>
    `)}`;
  };

  if (error) {
    return (
      <img 
        src={generateFallbackSVG(fallbackText || alt)}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ display: 'block' }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 animate-pulse" style={{ zIndex: 1 }} />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={loading}
        style={{ display: 'block', width: '100%', height: '100%', transform: 'translateZ(0)' }}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={(e) => {
          console.error('[ImageWithFallback] Failed to load image:', imgSrc, e);
          setError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ImageWithFallback;
