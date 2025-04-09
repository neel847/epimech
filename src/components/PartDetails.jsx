'use client';
import React, { useState, useEffect } from 'react';
import { Carousel, Image } from 'antd';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

const PartDetails = ({ part, onBack }) => {
  const [carouselRef, setCarouselRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isValidImage, setIsValidImage] = useState(true);
  const fallbackImage = '/fallback.png';

  const subImages = part.subimages ? Object.values(part.subimages) : [];
  const allImages = [part.image, ...subImages];

  const handleImageError = () => {
    setIsValidImage(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleThumbnailClick = (index) => {
    if (carouselRef) {
      carouselRef.goTo(index);
      setActiveIndex(index);
    }
  };

  const handleCarouselChange = (current) => {
    setActiveIndex(current);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero */}
      <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-r from-gray-700 via-blue-900 to-blue-600 dark:from-black dark:via-blue-900 dark:to-blue-700">
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-md"
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-40 w-24 h-24 bg-blue-400/10 rounded-full blur-md"
          animate={{ y: [0, 30, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.h1
            className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-blue-300">Product</span>
          </motion.h1>
          <motion.p
            className="text-gray-100 text-lg md:text-xl max-w-3xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {part.part_name}
          </motion.p>
        </div>
      </div>

      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-16"
      >
        {/* Back to Products */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center">
              <Package className="text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{part.part_name}</h2>
            </div>
          </div>

          <div className="p-6 lg:flex lg:gap-8">

            {/* Image */}
            <div className="lg:w-[40%]">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden mb-4">
                <Carousel
                  autoplay
                  ref={setCarouselRef}
                  afterChange={handleCarouselChange}
                  className="part-details-carousel"
                >
                  {allImages.map((img, index) => (
                    <div key={index}>
                      <div className="relative aspect-square flex items-center justify-center bg-white dark:bg-gray-900 p-8">
                        <Image
                          src={isValidImage ? img : fallbackImage}
                          onError={handleImageError}
                          alt={`${part.part_name} view ${index + 1}`}
                          preview={isValidImage}
                          className="max-h-80 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`h-16 w-16 flex-shrink-0 rounded overflow-hidden border transition-all ${activeIndex === idx
                          ? 'ring-2 ring-blue-500 dark:ring-blue-400 opacity-100'
                          : 'opacity-70 hover:opacity-100 border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      <Image
                        src={isValidImage ? img : fallbackImage}
                        alt={`Thumbnail ${idx + 1}`}
                        preview={false}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:w-[60%] mt-8 lg:mt-0 lg:ml-6">
              {/* Part Numbers */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Part Numbers
                </h3>
                <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-base font-medium text-gray-700 dark:text-gray-300 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-base font-medium text-gray-700 dark:text-gray-300 uppercase">
                          Part Number
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {Object.entries(part.part_number).map(([type, number], idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                            {type}
                          </td>
                          <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-300">
                            {number !== '-' ? number : <span className="text-gray-400">Not Available</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Description */}
              {part.description && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg leading-relaxed">
                    {part.description}
                  </p>
                </div>
              )}

              {/* Specs */}
              {part.specifications && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Specifications</h3>
                  <ul className="list-disc list-inside bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-4 rounded-lg space-y-1">
                    {part.specifications.map((spec, idx) => (
                      <li key={idx}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PartDetails;
