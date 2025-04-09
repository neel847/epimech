'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Search } from 'lucide-react';
import { WaterPumpParts } from '@/helper/WaterPumpUtil';
import Tabs from '@/components/Tabs';
import PartDetails from '@/components/PartDetails';


export default function ProductsPage() {

  // reset framer-motion animation on page load
  const [selectedPart, setSelectedPart] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* 🔹 Hero Section */}
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
            Our <span className="text-blue-300">Products</span>
          </motion.h1>
          <motion.p
            className="text-gray-100 text-lg md:text-xl max-w-3xl mb-8"
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

      {/* 🔧 Main Section */}
      <section className="py-20 -mt-20 relative z-10 mt-0">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
          >
            {/* 🔍 Search */}


            {/* 🔁 Tabs OR Details */}
            {selectedPart ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  onClick={() => setSelectedPart(null)}
                  className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline mb-8"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back to Parts
                </button>
                <PartDetails part={selectedPart} onBack={() => setSelectedPart(null)} />
              </motion.div>
            ) : (
              <>
                <div className='md:flex mb-8 justify-between items-center '>

                  <motion.h2
                    className="text-7xl font-bold mb-8 text-gray-800  title uppercase dark:text-white"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    Explore <span className="text-blue-600 dark:text-blue-400">Our Catalog</span>
                  </motion.h2>

                  {!selectedPart && (
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
                          className="w-full text-lg md:text-xl px-6 py-5 pl-16 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                        />
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                      </div>
                    </motion.div>

                  )}
                </div>

                {/* ✅ Tabs Component */}
                <Tabs
                  currentTab={tab}
                  setTab={setTab}
                  tabs={[
                    { name: 'Water Pumps', items: WaterPumpParts },
                    // { name: 'Bearings', items: BearingParts }, <- in future
                  ]}
                  searchQuery={searchQuery}
                  onSelectPart={setSelectedPart}
                />

              </>
            )}
          </motion.div>

          {/* 📢 CTA */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-8 md:p-12 overflow-hidden relative mt-12"
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
              <p className="text-gray-200 mb-6">
                Our team can develop specialized components to meet your unique needs.
              </p>
              <Link
                href="/contact"
                className="bg-white text-blue-600 dark:bg-blue-700 dark:text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-blue-600 transition-colors"
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
