import { useState } from "react";

function SearchBox({
  onSearchQueryChange,
  onFilterTypeChange,
  onResultSelect,
  realTimeResults,
  loading,
  error,
}) {
  const [searchQuery, setSearchQuery] = useState(""); // User input
  const [filterType, setFilterType] = useState("doctor"); // Default filter

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

  // Handle selection of a real-time search result
  const handleSuggestionClick = (result) => {
    setSearchQuery(result); // Populate the search box with the selected result
    onResultSelect(result); // Notify the parent component
  };

  return (
    <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-y-0 sm:gap-x-1 items-center relative">
      {/* Search Input section */}
      <div className="relative w-full sm:w-2/3">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-400 dark:border-gray-600 p-2 rounded w-full text-gray-500 dark:text-gray-200 shadow-md focus:outline focus:outline-amber-500 focus:border-none"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 dark:border-amber-500"></div>
          </div>
        )}
      </div>

      {/* Filter Dropdown */}
      <select
        className="border border-gray-400 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={filterType}
        onChange={handleFilterTypeChange}
      >
        <option className="dark:bg-gray-700 dark:text-white" value="doctor">
          Doctors
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="service">
          Services
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="treatment">
          Treatments
        </option>
        <option className="dark:bg-gray-700 dark:text-white" value="symptom">
          Symptoms
        </option>
      </select>

      {/* Error Message */}
      {error && (
        <div className="absolute top-full left-0 w-full sm:w-2/3 mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-red-500 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Real-time Search Results Dropdown */}
      {realTimeResults.length > 0 && !loading && !error && (
        <div className="absolute top-full left-0 w-full sm:w-2/3 max-h-[50vh] overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-10">
          {realTimeResults.map((item) => (
            <div
              key={item.id}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => handleSuggestionClick(item.name)}
            >
              <p className="text-gray-900 dark:text-white">{item.name}</p>
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results Found */}
      {!loading && !error && searchQuery && realTimeResults.length === 0 && (
        <div className="absolute top-full left-0 w-full sm:w-2/3 mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No results found.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
