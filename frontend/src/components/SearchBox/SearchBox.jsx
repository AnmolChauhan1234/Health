import React, { useState } from "react";

function SearchBox({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState(""); // User input
  const [filterType, setFilterType] = useState("doctors"); // Default filter

  // Handle search button click
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    onSearch({ searchQuery, filterType }); // Send query & filter to Home
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 my-4">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-400 dark:border-gray-600 p-2 rounded-md w-full sm:w-2/3 text-gray-500 dark:text-gray-200"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        className="border border-gray-400 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option className="dark:bg-gray-700 dark:text-white" value="doctors">
          Doctors
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="services">
          Services
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="treatment">
          Treatment
        </option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md transition-cus"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBox;
