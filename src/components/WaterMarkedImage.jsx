'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const WatermarkedImage = ({ src, alt = '', watermark = '© Epimech', className = '' }) => {
  const [image, setImage] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImage('/fallback.png');
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Sync state if `src` prop changes
  useEffect(() => {
    setImage(src);
    setIsLoading(true);
  }, [src]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
      )}

      {/* Image */}
      <div className="relative w-full h-full w-[100%] h-[100%] overflow-hidden rounded-md">
        <Image
          src={image}
          alt={alt}
          fill
          onError={handleError}
          onLoadingComplete={handleLoad}
          className={`rounded-md object-contain transition-opacity duration-300 w-[100%] h-[100%] ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* Watermark */}
      {image !== '/fallback.png' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm md:text-base bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm 
                          pointer-events-none select-none font-medium tracking-wide shadow-md
                          dark:bg-black/50">
            {watermark}
          </span>
        </div>
      )}
    </div>
  );
};

export default WatermarkedImage;