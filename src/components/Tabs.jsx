'use client';
import React, { useEffect, useState } from 'react';
import PartList from './PartList';
import { motion } from 'framer-motion';

const Tabs = ({ currentTab, setTab, tabs, searchQuery, onSelectPart }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      const savedScrollY = localStorage.getItem('productScrollY');
      if (savedScrollY) {
        window.scrollTo(0, parseInt(savedScrollY, 10));
        localStorage.removeItem('productScrollY'); // Clear saved scroll position after using it
      }
      
    }
  }, [items]);
  
  

  useEffect(() => {
    setItems([]); // Clear items on tab change
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchParts = async () => {
      setLoading(true);
      let endpoint = '';
  
      if (currentTab === 'All') {
        endpoint = '/api/all';
      } else {
        const activeTab = tabs.find((tab) => tab.name === currentTab);
        endpoint = activeTab?.endpoint || '';
      }
  
      if (!endpoint) return setItems([]);
  
      try {
        const res = await fetch(`${endpoint}?search=${encodeURIComponent(searchQuery)}`, { signal });
        const data = await res.json();
        console.log('Fetched parts:', data);
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching parts:', err);
          setItems([]);
        }
      }
      setLoading(false);
    };
  
    const debounce = setTimeout(fetchParts, 400); // ⏱ 400ms delay
  
    return () => {
      clearTimeout(debounce);
      controller.abort(); // cancel previous fetch
    };
  }, [currentTab, searchQuery, tabs]);
  

  return (
    <div className="space-y-8">
      {/* 💠 Tab Buttons */}
      <div className="hidden flex flex-wrap gap-3 mb-6">
        {tabs.map((tab) => {
          const isActive = tab.name === currentTab;
          return (
            <button
              key={tab.name}
              onClick={() => setTab(tab.name)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-color-blue-600 text-white shadow-md'
                  : 'bg-color-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-700 hover:bg-color-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 🧩 Filtered List */}
      <motion.div key={currentTab}>
        <PartList parts={items} onPartClick={onSelectPart} loading={loading} />
      </motion.div>
    </div>
  );
};

export default Tabs;
