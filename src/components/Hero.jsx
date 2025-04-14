import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Listen for resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  const bannerSrc = isMobile ? '/banner5.png' : '/banner5.jpg';

  return (
    <div className='dark:bg-gray-900'>
      <div className="container relative w-full max-w-[1900px] h-[60vh] max-h-[1024px] mx-auto px-6 lg:px-8">
        <Image 
          src={bannerSrc}
          alt="Epimech Engineering Solutions" 
          fill
          priority
          className="object-cover" 
        />
        <div className="absolute inset-0 mask-t-from-50% flex flex-col items-start justify-center bg-gradient-to-r from-black to-transparent px-4 sm:px-6 md:px-12 lg:px-24">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left max-w-3xl leading-tight">
            We are <span className="text-blue-400">Epimech</span>
          </h1>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2 sm:mt-4 text-left max-w-2xl leading-tight text-white">
            Delivering <span className="text-blue-200">OEM-Quality Parts</span> <br />
            that Keep Ships Sailing & Engines Running
          </h3>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-4 text-left max-w-md sm:max-w-lg md:max-w-2xl">
            Innovative solutions for modern engineering challenges, specializing in automation, precision manufacturing, and sustainable design.
          </p>
          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-row gap-3 sm:gap-4 w-full xs:w-auto">
            <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:px-6 rounded-md transition-colors duration-300 text-center">
              Our Products
            </Link>
            <Link href="/contact" className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-2 px-4 sm:px-6 rounded-md transition-colors duration-300 text-center">
              Contact Us
            </Link>
          </div>
          <div className="mt-6 md:mt-10 lg:mt-12 hidden sm:flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex items-center">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="ml-2 text-white text-sm md:text-base">ISO 9001 Certified</span>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="ml-2 text-white text-sm md:text-base">20+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
