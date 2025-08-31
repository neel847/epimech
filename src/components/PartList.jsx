import React, { useEffect, useState } from "react";
import PartCard from "./PartCard";
import { motion } from "framer-motion";
import { Pagination, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const PartList = ({ parts, onPartClick,loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  console.log("Parts:", parts);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedParts = parts?.slice(startIndex, endIndex);

  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 400); // Scroll to top on page change
    localStorage.setItem('currentPage', page);
  };
  
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(Number(savedPage));
      localStorage.removeItem('currentPage'); // Clear saved page after using it
    }
  }, []);

  return (
    <div className="w-full">
      {
        loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loader">
              <Spin size={40} color="#4f46e5" />
            </div>
          </div>
        ) : null
      }
      {parts.length > 0 ? (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {paginatedParts.map((part, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <PartCard part={part} onClick={() => onPartClick(part)} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Controls */}
          <div className="mt-10 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={parts.length}
              onChange={(page)=>handlePageChange(page)}
              showSizeChanger={false}
              className="custom-pagination"
              itemRender={(page, type, originalElement) => {
                if (type === 'page') {
                  return (
                    <a className="h-10 w-10 rounded-full dark:hover:text-white flex items-center justify-center font-medium transition-all duration-200">
                      {page}
                    </a>
                  );
                }
                if (type === 'prev' || type === 'next') {
                  return (
                    <a className="flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200">
                      {originalElement}
                    </a>
                  );
                }
                return originalElement;
              }}
            />
          </div>
        </>
      ) : !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 px-4"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <SearchOutlined className="text-blue-500 dark:text-color-blue-400 text-2xl" />
          </div>
          <h3 className="text-xl font-medium text-color-gray-800 dark:text-white mb-2">No parts found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-color-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      {parts.length > 0 && (
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-right">
          Showing {paginatedParts.length} of {parts.length} part{parts.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default PartList;
