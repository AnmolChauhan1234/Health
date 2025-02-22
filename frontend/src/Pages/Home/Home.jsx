import React, { useState, useEffect, useRef } from "react";
import { Map, LocationSection, SearchBox, Card } from "../../components/index";
import { useMenuContext } from "../../context/MenuContext/MenuContextProvider";
import { useDarkMode } from "../../context/ThemeContext/ThemeContextProvider";
import { getLocationResult, useMlModel } from "../../hooks/search/export";
import api from "../../hooks/apiInstance";
import debounce from "../../hooks/debounce";

function Home() {
  // Context data
  const { isOpen } = useMenuContext();
  const { darkMode } = useDarkMode();

  // API functions
  const { msg, data, loading, error, fetchLocationResults } =
    getLocationResult();

  // Ref for the search results section
  const resultsSectionRef = useRef(null);

  // State for map position
  const [mapPosition, setMapPosition] = useState(null);

  // State for search results (final results displayed in cards)
  const [results, setResults] = useState([]);

  // State for real-time search results (displayed below the search box)
  const [realTimeResults, setRealTimeResults] = useState([]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for filter type
  const [filterType, setFilterType] = useState("doctor");

  // State to track if a search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  // Real-time search effect with debouncing
  useEffect(() => {
    const fetchRealTimeResults = async () => {
      try {
        const response = await api.get(
          `/hospital-management/search-${filterType}s/?q=${searchQuery}`
        );
        if (response.status === 200) {
          const resultData = response.data[`${filterType}s`];
          setRealTimeResults(resultData); // Update real-time results
        }
      } catch (error) {
        console.error("Error fetching real-time search results:", error);
      }
    };

    // Debounce the API call
    const debouncedFetch = debounce(fetchRealTimeResults, 300); // 300ms delay

    if (searchQuery && filterType !== "symptom") {
      debouncedFetch(); // Call the debounced function
    } else {
      setRealTimeResults([]);
    }

    // Cleanup function to cancel the debounce on unmount or dependency change
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchQuery, filterType]);

  // Handle location updates from LocationSection
  const handleLocationChange = (location) => {
    setMapPosition(location);
  };

  // Handle search query change
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    if (!query) {
      setRealTimeResults([]); // Clear real-time results if the query is empty
    }
  };

  // Handle filter type change
  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  // Handle search button click
  const handleSearch = () => {
    if (mapPosition) {
      setHasSearched(true); // Mark that a search has been performed
      fetchLocationResults(
        mapPosition.lat,
        mapPosition.lng,
        searchQuery,
        filterType
      );

      // Scroll to the results section
      if (resultsSectionRef.current) {
        resultsSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      alert("Please select the location.");
    }
  };

  // Update final results when data from API is received
  useEffect(() => {
    if (data) {
      setResults(data); // Store final API results
    }
  }, [data]);

  // Handle selection of a real-time search result
  const handleResultSelect = (selectedQuery) => {
    setSearchQuery(selectedQuery); // Populate the search box with the selected query
    setRealTimeResults([]); // Clear real-time results
  };

  return (
    <main className="h-max w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col pt-3 transition-cus">
      {/* Search, Location, and Button Section */}
      <div className="flex flex-col md:flex-row gap-y-1 items-center sm:justify-center w-full px-4 py-3 md:gap-x-2">
        {/* Location Section */}
        <LocationSection
          onLocationChange={handleLocationChange}
          className="border border-gray-300 rounded-lg w-full sm:w-auto"
        />

        {/* Search Box Section */}
        <SearchBox
          onSearchQueryChange={handleSearchQueryChange}
          onFilterTypeChange={handleFilterTypeChange}
          onResultSelect={handleResultSelect}
          realTimeResults={realTimeResults}
          className="border border-gray-300 rounded-lg py-2 w-full sm:w-auto"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md transition-cus cursor-pointer hover:bg-blue-500 dark:hover:bg-amber-400"
        >
          Search
        </button>
      </div>

      {/* Map Section */}
      {!isOpen && (
        <section className="h-max w-full">
          <Map isDarkMode={darkMode} position={mapPosition} />
        </section>
      )}

      {/* Search Results Section */}
      <section className="p-4" ref={resultsSectionRef}>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Search Results
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Searching for hospitals...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8 bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <svg
              className="w-12 h-12 text-red-500 dark:text-red-400"
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
            <p className="text-red-600 dark:text-red-400 text-center">
              Oops! Something went wrong. Please try again later.
            </p>
          </div>
        )}

        {/* Message State */}
        {msg && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
            <svg
              className="w-12 h-12 text-amber-500 dark:text-amber-400"
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
            <p className="text-amber-600 dark:text-amber-400 text-center">
              {msg}
            </p>
          </div>
        )}

        {/* No Hospitals Found State */}
        {!loading && !error && hasSearched && results.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No nearby hospitals found. Try adjusting your search filters.
            </p>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => (
            <Card
              key={result.id}
              data={result}
              searchQuery={searchQuery}
              filterType={filterType}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
