'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Tabs from '@/components/Tabs';
import { motion } from 'framer-motion';
import { slugify } from '@/utils/slugify';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from '@/hooks/useDebounce';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [tab, setTab] = useState('All');

  useEffect(() => {
    const fromProductPage = localStorage.getItem('fromProductPage');
    if (fromProductPage) {
      const savedTab = localStorage.getItem('productTab');
      const search = localStorage.getItem('productSearch');


      if (search) setSearchQuery(search);
      if (savedTab) setTab(savedTab);

      // localStorage.removeItem('fromProductPage');
      // localStorage.removeItem('productTab');
      // localStorage.removeItem('productScrollY');
      // localStorage.removeItem('productSearch');
    }
  }, []);


  const tabs = [
    { name: 'All', label: 'All', endpoint: '/api/all' },
    { name: 'WaterPump', label: 'Water Pumps', endpoint: '/api/waterpump' },
    { name: 'OtherParts', label: 'Other Parts', endpoint: '/api/otherparts' }
  ];

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const handlePartClick = (part) => {
    localStorage.setItem('productScrollY', window.scrollY.toString());
    localStorage.setItem('productTab', tab);
    localStorage.setItem('productSearch', searchQuery);
    localStorage.setItem('fromProductPage', 'true'); // set a flag
    router.push(`/products/${slugify(part.part_name)}`);
  };

  return (
    <div className="w-full bg-white dark:bg-color-gray-900 transition-colors duration-300">
      <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-r from-gray-700 via-blue-900 to-color-blue-600 dark:from-black dark:via-blue-900 dark:to-blue-700">
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-md"
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-40 w-24 h-24 bg-color-blue-400/10 rounded-full blur-md"
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
            Our <span className="text-color-blue-300">Products</span>
          </motion.h1>
          <motion.p
            className="text-color-gray-100 text-lg md:text-xl max-w-3xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Precision engineered components for peak performance.
          </motion.p>
          <motion.div
            className="flex items-center text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Products</span>
          </motion.div>
        </div>
      </div>
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className='md:flex mb-8 justify-between items-center '>

            <motion.h2
              className="text-7xl font-bold mb-8 text-color-gray-800  title uppercase dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              Explore <span className="text-color-blue-600 dark:text-color-blue-400">Our Products</span>
            </motion.h2>

            <motion.div
              className="md:w-[50%] mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search parts by name, number, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-lg md:text-xl px-6 py-5 pl-16 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-color-gray-800 text-color-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </motion.div>

          </div>
          {/* <motion.div className="mb-12">
            <h2 className="text-4xl font-bold text-color-gray-800 dark:text-white mb-4">
              Our <span className="text-color-blue-600">Catalog</span>
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-xl border dark:border-gray-700 dark:bg-color-gray-800 dark:text-white shadow-sm mt-4"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div> */}

          <Tabs
            currentTab={tab}
            setTab={setTab}
            tabs={tabs}
            searchQuery={debouncedSearch} // 👈 using debounced value here
            onSelectPart={handlePartClick}
          />


          <motion.div
            className="bg-gradient-to-r from-color-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-8 md:p-12 overflow-hidden relative mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-30 transform translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Custom Engineering Solutions?
              </h3>
              <p className="text-color-gray-200 mb-6">
                Our team can develop specialized components to meet your unique needs.
              </p>
              <Link
                href="/contact"
                className="bg-white text-color-blue-600 dark:bg-blue-700 dark:text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-color-blue-600 transition-colors"
              >
                Request a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
