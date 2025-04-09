// components/SearchBar.jsx
import React from "react";
import { motion } from "framer-motion";

const SearchBar = ({ query, setQuery }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search parts..."
        className="w-full px-5 py-3 text-md rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </motion.div>
  );
};

export default SearchBar;
