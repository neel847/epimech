import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// SVG Gear Component
const GearSVG = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512" 
    className={className}
    fill="currentColor"
  >
    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
  </svg>
);

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handle initial mounting
    setMounted(true);

    // Handle resize events
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent hydration errors
  if (!mounted) return null;

  // Determine number of gear particles based on screen size
  const particleCount = windowSize.width < 640 ? 3 : windowSize.width < 1024 ? 4 : 6;
  
  // Determine if we're in mobile view
  const isMobile = windowSize.width < 768;

  return (
    <div className="relative w-full h-[520px] sm:h-[650px] grid items-center justify-center overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
          backgroundSize: '100% 100%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating gear particles - conditionally rendered based on screen size */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 rounded-full border border-blue-400/20"
            initial={{ 
              x: Math.random() * 100 - 50 + '%', 
              y: Math.random() * 100 - 50 + '%',
              opacity: 0.1 + Math.random() * 0.2
            }}
            animate={{ 
              x: [
                Math.random() * 100 - 50 + '%', 
                Math.random() * 100 - 50 + '%', 
                Math.random() * 100 - 50 + '%'
              ],
              y: [
                Math.random() * 100 - 50 + '%', 
                Math.random() * 100 - 50 + '%', 
                Math.random() * 100 - 50 + '%'
              ],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Blueprint grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundSize: '20px 20px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px)',
          opacity: 0.1
        }}></div>
      </div>

      {/* Content container */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-0 flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto">
        {/* Text content - stacks vertically on mobile, side by side on larger screens */}
        <motion.div 
          className="w-full md:w-1/2 lg:w-5/12 mb-12 md:mb-0 mt-16 md:mt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 bg-blue-500 mb-4 md:mb-6 hidden sm:block"
          />
          
          <motion.h1 
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            We are <span className="text-blue-400">Epimech</span>
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-48 h-1 bg-blue-500/50 my-3 md:my-4 hidden sm:block"
          />
          
          <motion.h3 
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mt-2 sm:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Delivering <span className="text-blue-200">OEM-Quality Parts</span> <br className="hidden xs:block" />
            that Keep Ships Sailing & Engines Running
          </motion.h3>
          
          <motion.p 
            className="text-white/80 text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            Innovative solutions for modern engineering challenges, specializing in automation, precision manufacturing, and sustainable design.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-3 mt-4 sm:mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Link href="/products">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-5 sm:px-8 rounded-md transition-colors duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Products
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-2 sm:py-3 px-5 sm:px-8 rounded-md transition-colors duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Features/badges - responsive grid */}
          <motion.div 
            className="mt-6 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.div 
              className="flex items-center" 
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <span className="ml-2 sm:ml-3 text-white text-sm sm:text-base">ISO 9001 Certified</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center" 
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <span className="ml-2 sm:ml-3 text-white text-sm sm:text-base">20+ Years Experience</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Image section - responsive sizing and positioning */}
        <motion.div 
          className="relative w-full md:w-1/2 lg:w-5/12 h-64 sm:h-80 md:h-96 lg:h-auto flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Pulsing circles behind the image - responsive sizing */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 rounded-full border-2 border-blue-400/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-64 md:w-72 lg:w-80 h-56 sm:h-64 md:h-72 lg:h-80 rounded-full border-2 border-blue-400/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Product image with floating animation - responsive sizing */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateZ: [0, isMobile ? 2 : 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="relative z-10 w-48 sm:w-56 md:w-64 lg:w-[400px]"
            >
              <Image 
                src="/waterpump/hero-image.png" // Replace with your image path
                alt="Epimech Engineered Part"
                width={400}
                height={400}
                className="object-contain drop-shadow-2xl w-full flex items-center justify-center h-auto"
              />
              
              {/* OEM Quality badge - responsive sizing and positioning */}
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -left-2 sm:-left-3 md:-left-4 bg-blue-400 text-white p-2 sm:p-3 md:p-4 rounded-lg shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.8 
                }}
              >
                <motion.span 
                  className="block text-base sm:text-lg md:text-xl font-bold text-center"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  OEM<br/>Quality
                </motion.span>
              </motion.div>
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-24 -left-2 sm:-left-3 md:left-40 bg-blue-400 text-white p-2 sm:p-3 md:p-4 rounded-lg shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.8 
                }}
              >
                <motion.span 
                  className="block text-base sm:text-lg md:text-xl font-bold text-center"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Fast<br/>Delivery
                </motion.span>
              </motion.div>
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -left-2 sm:-left-3 md:left-[350px] bg-blue-400 text-white p-2 sm:p-3 md:p-4 rounded-lg shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.8 
                }}
              >
                <motion.span 
                  className="block text-base sm:text-lg md:text-xl font-bold text-center"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Rapid<br/>Response
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Gear animations in background - now with responsive positioning and sizing */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute z-10 -top-10 sm:-top-16 md:-top-20 -right-10 sm:-right-16 md:-right-20 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 text-blue-900/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <GearSVG className="w-full h-full" />
              </motion.div>
              <motion.div
                className="absolute z-10 bottom-0 -right-8 sm:-right-12 md:-right-16 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 text-blue-900/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <GearSVG className="w-full h-full" />
              </motion.div>
              <motion.div
                className="absolute z-10 -bottom-5 sm:-bottom-8 md:-bottom-10 right-10 sm:right-16 md:right-20 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 text-blue-900/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <GearSVG className="w-full h-full" />
              </motion.div>
            </>
          )}
          
          {/* Smaller gears only for mobile */}
          {isMobile && (
            <>
              <motion.div
                className="absolute -z-10 -top-6 -right-6 w-24 h-24 text-blue-900/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <GearSVG className="w-full h-full" />
              </motion.div>
              <motion.div
                className="absolute -z-10 -bottom-4 -right-4 w-16 h-16 text-blue-900/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <GearSVG className="w-full h-full" />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;