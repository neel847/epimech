// components/Tabs.jsx
import React from 'react';
import PartList from './PartList';
import { motion } from 'framer-motion';

const Tabs = ({ currentTab, setTab, tabs, searchQuery, onSelectPart }) => {
  // 🧠 Build a combined list of all items for "All" tab
  const allItems = tabs.reduce((acc, tab) => acc.concat(tab.items), []);

  // 🔁 Pick items to show based on tab
  const selectedItems =
    currentTab === 'All'
      ? allItems
      : tabs.find((tab) => tab.name === currentTab)?.items || [];

  // 🔎 Apply search filter
  const filteredItems = selectedItems.filter((part) => {
    const query = searchQuery.toLowerCase();
  
    const nameMatch = part.part_name.toLowerCase().includes(query);
  
    const numberMatch = Object.values(part.part_number || {}).some((val) =>
      val.toLowerCase().includes(query)
    );
  
    return nameMatch || numberMatch;
  });
  
  return (
    <div className="space-y-8">
      {/* 💠 Tab Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Static "All" Tab */}
        <button
          onClick={() => setTab('All')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            currentTab === 'All'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>

        {/* Dynamic Tabs */}
        {tabs.map((tab) => {
          const isActive = tab.name === currentTab;
          return (
            <button
              key={tab.name}
              onClick={() => setTab(tab.name)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* 🧩 Filtered List */}
      <motion.div
        key={currentTab}
        // initial={{ opacity: 0, y: 10 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.4 }}
      >
        <PartList parts={filteredItems} onPartClick={onSelectPart} />
      </motion.div>
    </div>
  );
};

export default Tabs;
