'use client';
import React, { useState, useEffect } from 'react';
import { AllParts } from '@/helper/AllParts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, Filter, Grid, List, Sun, Moon, ArrowUpDown,
  ChevronDown, ChevronUp, Layers, Download, RefreshCw,
  Copy,
  CircleCheck
} from 'lucide-react';
import Link from 'next/link';

const ProductListView = () => {
  // State management
  const [search, setSearch] = useState('');
  const [filteredParts, setFilteredParts] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'grid' or 'table'
  const [sortConfig, setSortConfig] = useState('');
  const [copyValue, setCopyValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    showFilters: false
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories
  const uniqueCategories = [...new Set(AllParts.map(part => part.main_product))];

  const copyThisValue = (value) => {
    setCopyValue(value);
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  // Handle category click
  // Apply search and filters
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      let results = [...AllParts];

      // Apply search filter
      if (search) {
        results = results.filter(
          part =>
            part.product.toLowerCase().includes(search.toLowerCase()) ||
            part.part_number.toLowerCase().includes(search.toLowerCase())
          // part.main_product.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply category filters
      if (filters.categories.length > 0) {
        results = results.filter(part => filters.categories.includes(part.main_product));
      }

      // Apply sorting
      results = sortParts(results);

      setFilteredParts(results);
      setIsLoading(false);
    }, 300);
  }, [search, filters, sortConfig]);


  // Sort function
  const sortParts = (parts) => {
    return [...parts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle sort click
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Toggle category filter
  const toggleCategoryFilter = (category) => {
    setFilters(prev => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];

      return { ...prev, categories: updatedCategories };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ categories: [], showFilters: false });
    setSearch('');
  };

  // Export to CSV
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    csvContent += "Main Product,Product,Part Number\n";

    // Add rows
    filteredParts.forEach(part => {
      csvContent += `${part.main_product},${part.product},${part.part_number}\n`;
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);

    // Trigger download
    link.click();
    document.body.removeChild(link);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-color-gray-900 transition-colors duration-300">
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-blue-900 to-blue-700 dark:from-black dark:via-blue-900 dark:to-blue-800 animate-gradient-x duration-[1s,30s]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">

          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our <span className="text-color-blue-300">Catalog</span>
          </motion.h1>
          <motion.p
            className="text-color-gray-100 text-xl max-w-3xl text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >            Browse our extensive range of high-quality products designed for your needs.
          </motion.p>
          <motion.div
            className="flex items-center text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Catalog</span>
          </motion.div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto mt-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="title text-6xl font-bold text-black dark:text-white mb-6 pb-4 uppercase">
                Our <span className='text-color-blue-600 dark:text-color-blue-400'>Catalog</span>
              </h2>

          <div className="flex items-center space-x-3">


            <button
              onClick={exportToCSV}
              className="flex items-center space-x-1 px-3 py-2 bg-white dark:bg-color-gray-800 rounded-lg shadow-sm hover:bg-color-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <Download size={16} />
              <span>Export</span>
            </button>

            <div className="bg-white dark:bg-color-gray-800 rounded-lg shadow-sm p-1 flex">
            <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table'
                  ? 'bg-color-blue-100 dark:bg-blue-900 text-color-blue-600 dark:text-color-blue-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-color-gray-100 dark:hover:bg-gray-700'}`}
                aria-label="Table view"
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid'
                  ? 'bg-color-blue-100 dark:bg-blue-900 text-color-blue-600 dark:text-color-blue-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-color-gray-100 dark:hover:bg-gray-700'}`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
             
            </div>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="bg-white dark:bg-color-gray-800 rounded-xl shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by product name or part number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-color-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-color-gray-900 text-color-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {search && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setSearch('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <button
              onClick={() => setFilters(prev => ({ ...prev, showFilters: !prev.showFilters }))}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border ${filters.categories.length > 0
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-color-blue-300'
                : 'bg-white dark:bg-color-gray-800 border-color-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                } hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <Filter size={18} />
              <span>Filter{filters.categories.length > 0 ? ` (${filters.categories.length})` : ''}</span>
              {filters.showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {filters.showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-color-gray-200 dark:border-gray-700 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Layers size={16} />
                      <span>Product Categories</span>
                    </h3>
                    {filters.categories.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-color-blue-600 dark:text-color-blue-400 hover:underline flex items-center gap-1"
                      >
                        <RefreshCw size={14} />
                        Clear filters
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {uniqueCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleCategoryFilter(category)}
                        className={`px-3 py-1 text-sm rounded-full ${filters.categories.includes(category)
                          ? 'bg-color-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800'
                          : 'bg-color-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-color-gray-200 dark:border-gray-600'
                          } border hover:shadow-sm transition-all`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results section */}
        <div className="bg-white dark:bg-color-gray-800 rounded-xl shadow-sm overflow-hidden">
          {/* Results header */}
          <div className="px-6 py-4 border-b border-color-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading
                ? 'Loading results...'
                : `Showing ${filteredParts.length} product${filteredParts.length !== 1 ? 's' : ''}`
              }
            </div>


          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={32} />
              </motion.div>
              <p className="mt-3">Loading products...</p>
            </div>
          )}

          {/* No results state */}
          {!isLoading && filteredParts.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <Search size={40} className="mb-3 opacity-40" />
              <h3 className="text-lg font-medium mb-1">No products found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
              {(search || filters.categories.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-color-blue-600 dark:text-color-blue-300 rounded-lg hover:bg-color-blue-100 dark:hover:bg-blue-800/40 transition-colors text-sm"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Grid View */}
          {!isLoading && filteredParts.length > 0 && viewMode === 'grid' && (
            <div className="p-6">
              {/* Group parts by main_product and render each group */}
              {Object.entries(
                // Group the filtered parts by main_product
                filteredParts.reduce((groups, part) => {
                  if (!groups[part.main_product]) {
                    groups[part.main_product] = [];
                  }
                  groups[part.main_product].push(part);
                  return groups;
                }, {})
              ).map(([category, parts]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  {/* Category header */}
                  <div className="bg-color-gray-100 dark:bg-color-gray-800 rounded-lg pr-6 pl-2 py-3 mb-4 shadow-sm">
                    <h2 className="text-lg font-medium text-color-gray-900 dark:text-white">{category}</h2>
                  </div>

                  {/* Products grid for this category */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {parts.map((part, index) => (
                      <motion.div
                      key={`${part.part_number}-${index}`}
                      variants={itemVariants}
                      className="bg-white dark:bg-color-gray-900 border border-color-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex justify-between"
                    >
                      <div className="p-4 flex-grow">
                        <h3 className="font-medium text-color-gray-900 dark:text-white mb-2">{part.product}</h3>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400 mr-2">Part #:</span>
                          <span className="font-mono text-color-gray-800 dark:text-color-gray-200">{part.part_number}</span>
                        </div>
                      </div>
                      <div className="flex items-center pr-4">
                        <button
                          onClick={() => copyThisValue(part.part_number)}
                          className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-color-gray-100 dark:hover:bg-color-gray-800 transition-colors"
                          aria-label="Copy part number"
                        >
                          {copied && copyValue === part.part_number ? (
                            <CircleCheck className="w-5 h-5 text-green-500 mb-1" />
                          ) : (
                            <Copy size={16} className="text-gray-500 dark:text-gray-400 mb-1" />
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {copied && copyValue === part.part_number ? 'Copied' : 'Copy Number'}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
          {/* Table View */}
          {!isLoading && filteredParts.length > 0 && viewMode === 'table' && (
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="min-w-full divide-y divide-color-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-color-gray-900">
                  <tr>
                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Main Product
                    </th> */}
                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Part Number
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-color-gray-800 divide-y divide-color-gray-200 dark:divide-gray-700">
                  {/* Group parts by main_product and render each group with headers */}
                  {Object.entries(
                    // Group the filtered parts by main_product
                    filteredParts.reduce((groups, part) => {
                      if (!groups[part.main_product]) {
                        groups[part.main_product] = [];
                      }
                      groups[part.main_product].push(part);
                      return groups;
                    }, {})
                  ).map(([category, parts], groupIndex) => (
                    <React.Fragment key={`group-${category}`}>
                      {/* Category header row */}
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-color-gray-200 dark:bg-gray-700"
                      >
                        <td
                          colSpan="2"
                          className="px-6 py-3 text-sm font-bold text-color-gray-900 dark:text-white"
                        >
                          {category}
                        </td>
                      </motion.tr>

                      {/* Product rows for this category */}
                      {parts.map((part, index) => (
                        <motion.tr
                          key={`${part.part_number}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.03 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-color-gray-900 dark:text-white pl-10">
                            {part.product}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center font-mono text-gray-700 dark:text-gray-300">
                            {part.part_number}
                            {/* Copy button */}
                            <button
                              onClick={() => copyThisValue(part.part_number)}
                              className="ml-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                              aria-label="Copy part number"
                            >
                              {copied && copyValue === part.part_number ? (
                                <CircleCheck className="w-5 h-5 text-green-500" />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListView;

export const metadata = {
  title: "Complete Product Catalog | Epimech",
  description: "Explore our full range of locomotive components including water pumps, bushings, seals and more.",
  keywords: ["EMD parts catalog", "Epimech water pumps", "railway components", "EMD 710", "EMD 645"],
  openGraph: {
    title: "Epimech Product Catalog",
    description: "Browse all locomotive products from Epimech, trusted worldwide.",
    url: "https://www.epimech.com/product-list",
    siteName: "Epimech",
    images: [{ url: "https://www.epimech.com/og-image.jpg", width: 800, height: 600 }],
    locale: "en_US",
    type: "website"
  }
};
