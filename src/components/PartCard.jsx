'use client';
import React from 'react';
import WatermarkedImage from '@/components/WaterMarkedImage';
import { motion } from 'framer-motion';

const PartCard = ({ part, onClick }) => {
  // Handle case where part.part_name might be an object
  const displayName = typeof part.part_name === 'object' 
    ? Object.keys(part.part_name).join(', ') 
    : part.part_name;
    
  return (
    <motion.div
      onClick={() => onClick(part)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-800"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-900 p-6">
        <WatermarkedImage
          src={part.image || '/fallback.png'}
          alt={displayName || 'Part image'}
          watermark="© Epimech"
          className="!object-contain !w-full !h-full"
        />
      </div>
      
      {/* Divider */}
      <div className="h-px w-full bg-gray-100 dark:bg-gray-800"></div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-white text-center">
          {displayName}
        </h3>
      </div>
    </motion.div>
  );
};

export default PartCard;