'use client';
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const PartCard = ({ part, onClick, isFavorite, onToggleFavorite }) => {
  const fallbackImage = "/fallback.png"; // 🔁 Your default image here
  const [isValidImage, setIsValidImage] = useState(true);

  const handleImageError = () => {
    setIsValidImage(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl cursor-pointer border border-gray-200 dark:border-gray-700 transition-all relative overflow-hidden"
    >
      {/* Top ribbon for status/category */}
      {part.category && (
        <div className="absolute top-0 right-0 left-0 bg-blue-500 text-white text-xs py-1 px-3 text-center">
          {part.category}
        </div>
      )}

      {/* Favorite button */}
      {/* <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite && onToggleFavorite(part.id);
        }}
        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-700 rounded-full p-1 shadow-sm"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star 
          size={18} 
          className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400 dark:text-gray-300"}
        />
      </button> */}

      {/* Image container with gradient overlay */}
      <div className="h-44 w-full flex items-center justify-center dark:from-gray-800 dark:to-gray-900 rounded-lg mb-4 overflow-hidden relative">
        <Image
          src={isValidImage ? part.image : fallbackImage}
          fill
          alt={part.part_name}
          onError={handleImageError}
          className="object-contain h-full w-full p-2 transition-transform duration-300 hover:scale-110"

        />
      </div>

      {/* Content section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold capitalize text-black dark:text-white">
          {part.part_name}
        </h3>

        {/* {part.price && (
          <p className="text-green-600 dark:text-green-400 font-medium">
            ${part.price.toFixed(2)}
          </p>
        )}
        
        {part.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {part.description}
          </p>
        )}
        
        {part.inventory_status && (
          <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block
            ${part.inventory_status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
              part.inventory_status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' : 
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}
          `}>
            {part.inventory_status}
          </div>
        )} */}
      </div>

      {/* View details with arrow */}
      {/* <div className="mt-4 flex items-center justify-end">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group">
          View details 
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div> */}
    </motion.div>
  );
};

export default PartCard;