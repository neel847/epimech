'use client';
import React from 'react';
import WatermarkedImage from '@/components/WaterMarkedImage';
import { motion } from 'framer-motion';

const PartCard = ({ part, onClick }) => {
  // Handle case where part.part_name might be an object
  const displayName = typeof part.part_name === 'object' 
    ? Object.keys(part.part_name).join(', ') 
    : part.part_name;
    
    const partNumber = part.part_number['EMD 710 / EMD 645'] || part.part_number['EMD 645'] || part.part_number['DLW'];
  return (
    <motion.div
      onClick={() => onClick(part)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-color-gray-900 rounded-2xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden border border-color-gray-100 dark:border-color-gray-800"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-white dark:bg-white p-6">
        <WatermarkedImage
          src={part.image || '/fallback.png'}
          alt={displayName || 'Part image'}
          watermark="© Epimech"
          className="!object-contain"
        />
      </div>
      
      {/* Divider */}
      <div className="h-px w-full bg-color-gray-100 dark:bg-color-gray-800"></div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-medium text-color-gray-900 dark:text-white text-center">
          {displayName}
        </h3>
        <div className="h-px my-2 w-full bg-gray-300 dark:bg-gray-600"></div>

        <h3 className="text-sm font-normal text-gray-500 dark:text-gray-400 text-center mt-1">
          {partNumber ? `Part Number: ${partNumber}` : 'No Part Number Available'}
        </h3>
      </div>
    </motion.div>
  );
};

export default PartCard;