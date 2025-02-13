// import {useState} from 'react'

// function SearchBox({ onSearch }) {

//   const [searchQuery, setSearchQuery] = useState(""); // User input
//   const [filterType, setFilterType] = useState("doctors"); // Default filter

//   // Handle search button click
//   const handleSearch = () => {
//     onSearch({ searchQuery, filterType });
//   };

//   return (
//     <div className="flex flex-col sm:flex-row items-center gap-4 my-4">
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search..."
//         className="border border-gray-400 dark:border-gray-600 p-2 rounded-md w-full sm:w-2/3 text-gray-500 dark:text-gray-200 shadow-md  focus:outline focus:outline-amber-500 focus:border-none"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       <select
//         className="border border-gray-400 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//         value={filterType}
//         onChange={(e) => setFilterType(e.target.value)}
//       >
//         <option className="dark:bg-gray-700 dark:text-white" value="doctor">
//           Doctors
//         </option>
//         <option className="dark:bg-gray-700 dark:text-white" value="service">
//           Services
//         </option>
//         <option className="dark:bg-gray-700 dark:text-white" value="treatment">
//           Treatment
//         </option>
//       </select>

//       {/* Search Button */}
//       <button
//         onClick={handleSearch}
//         className="bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md transition-cus"
//       >
//         Search
//       </button>
//     </div>
//   );
// }

// export default SearchBox;

import { useState } from "react";

function SearchBox({ onSearchQueryChange, onFilterTypeChange }) {
  const [searchQuery, setSearchQuery] = useState(""); // User input
  const [filterType, setFilterType] = useState("doctors"); // Default filter

  // Handle search input change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    onSearchQueryChange(e.target.value);
  };

  // Handle filter type change
  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    onFilterTypeChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-y-0 sm:gap-x-1 items-center">

      {/* Search Input section starts here */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-400 dark:border-gray-600 p-2 rounded w-full sm:w-2/3 text-gray-500 dark:text-gray-200 shadow-md focus:outline focus:outline-amber-500 focus:border-none"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />

      <select
        className="border border-gray-400 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={filterType}
        onChange={handleFilterTypeChange}
        defaultValue={'general'}
      >
        <option className="dark:bg-gray-700 dark:text-white" value="doctor">
          Doctors
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="service">
          Services
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="treatment">
          Treatment
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="general">
          General
        </option>
      </select>
    </div>
  );
}

export default SearchBox;
