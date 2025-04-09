import React, { useState } from "react";
import { Carousel, Descriptions, Image } from "antd";
import { motion } from "framer-motion";
import {
  ArrowLeftOutlined,
  ZoomInOutlined,
  InfoCircleOutlined,
  FullscreenOutlined
} from "@ant-design/icons";

const PartDetails = ({ part, onBack }) => {
  const [carouselRef, setCarouselRef] = useState(null);
  const subImages = part.subimages ? Object.values(part.subimages) : [];
  const allImages = [part.image, ...subImages];
  const [activeIndex, setActiveIndex] = useState(0);
  const fallbackImage = "/fallback.png"; // 🔁 Your default image here
  const [isValidImage, setIsValidImage] = useState(true);

  const handleImageError = () => {
    setIsValidImage(false);
  };

  // by defalt scroll up the page when the component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    if (carouselRef) {
      carouselRef.goTo(index);
      setActiveIndex(index);
    }
  };

  // Handle carousel change
  const handleCarouselChange = (current) => {
    setActiveIndex(current);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >


      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header section */}
        <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center">
            <InfoCircleOutlined className="text-blue-500 mr-3 text-lg" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{part.part_name}</h2>
          </div>
        </div>

        <div className="p-6 lg:flex lg:gap-8">
          {/* Image gallery section */}
          <div className="lg:w-[40%]">
            {/* Main carousel */}
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
                        src={isValidImage ? part.image : fallbackImage}
                        onError={handleImageError}
                        alt={`${part.part_name} view ${index + 1}`}
                        preview={isValidImage}
                        className="max-h-80 max-w-full object-contain"
                      />
                      {/* <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs rounded-full p-2 flex items-center gap-1">
                        <ZoomInOutlined />
                        <span>Zoom</span>
                      </div> */}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Thumbnails row */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide ">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    className={`relative h-16 w-16 flex-shrink-0 rounded overflow-hidden transition-all ${activeIndex === idx
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400 opacity-100'
                      : 'opacity-70 hover:opacity-100 border border-gray-200 dark:border-gray-700'
                      }`}
                  >
                    <Image
                      src={isValidImage ? part.image : fallbackImage}
                      onError={handleImageError}
                      alt={`Thumbnail ${idx + 1}`}
                      preview={false}

                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Part details section */}
          <div className="lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
            {/* Part specs section with Ant Design Descriptions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex items-center mb-3">
                <FullscreenOutlined className="text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Part Numbers
                </h3>
              </div>

              <Descriptions
                bordered
                column={1}
                size="middle"
                className="part-details-descriptions"
                styles={{
                  label: {
                    fontWeight: "600",
                    background: "rgba(59, 130, 246, 0.05)",
                    color: "rgb(59 130 246)"
                  }, content: { background: "white", color: "inherit", fontFamily: "monospace" }
                }}

              >
                {Object.entries(part.part_number).map(([key, val]) => (
                  <Descriptions.Item key={key} label={key}>
                    {val !== "-" ? val : <span className="text-gray-400">Not Available</span>}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>

            {/* Additional details */}
            {part.description && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {part.description}
                </p>
              </div>
            )}

            {/* Technical specifications would go here */}
            {part.specifications && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Specifications</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {part.specifications.map((spec, idx) => (
                    <li key={idx} className="mb-1">{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add custom styles for Ant Design components */}
      <style jsx global>{`
        /* Make carousel arrows more visible */
        .part-details-carousel .slick-prev, 
        .part-details-carousel .slick-next {
          z-index: 10;
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          display: flex !important;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        .part-details-carousel .slick-prev {
          left: 15px;
        }
        
        .part-details-carousel .slick-next {
          right: 15px;
        }
        
        /* Dark mode adjustments for Ant Descriptions */
        .dark .part-details-descriptions .ant-descriptions-item-label {
          background: rgba(59, 130, 246, 0.1) !important;
          color: rgb(96, 165, 250) !important;
        }
        
        .dark .part-details-descriptions .ant-descriptions-item-content {
          background: rgb(31, 41, 55) !important;
          color: rgb(229, 231, 235) !important;
        }
        
        /* Dots style */
        .part-details-carousel .slick-dots li button {
          background: #d1d5db !important;
        }
        
        .part-details-carousel .slick-dots li.slick-active button {
          background: #3b82f6 !important;
        }
        
        .dark .part-details-carousel .slick-dots li button {
          background: #4b5563 !important;
        }
        
        .dark .part-details-carousel .slick-dots li.slick-active button {
          background: #60a5fa !important;
        }
      `}</style>
    </motion.div>
  );
};

export default PartDetails;