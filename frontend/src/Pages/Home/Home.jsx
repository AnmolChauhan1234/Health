import React, { useState, useEffect } from "react";
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
  const { msg, data, loading, error, fetchLocationResults } = getLocationResult();
  // useEffect( () => {
  //   console.log(msg);
  // } , [msg])
  // const { loading: mlloading,error: mlerror,msg: mlmsg, useMlapi } = useMlModel();

  // console.log(msg);

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
      // console.log("do not call.")
      setRealTimeResults([]);
    }

    // Cleanup function to cancel the debounce on unmount or dependency change
    return () => {
      debouncedFetch.cancel();
      // Cancel any pending API call
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
      // Call the final search API
      fetchLocationResults(
        mapPosition.lat,
        mapPosition.lng,
        searchQuery,
        filterType
      );
    } else {
      alert("Please select the location.")
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
    <main 
      className="h-max w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col pt-3 transition-cus"
    >
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
      <section className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Search Results
        </h2>
        {loading && <p>Loading hospitals...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {msg && <p className="text-amber-500">{msg}</p>}
        {/* {!loading && !error && results.length === 0 && (
          <p>No nearby hospitals found.</p>
        )} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          { 
            results.map((result, index) => (
              <Card
                key={index}
                data={result}
                searchQuery={searchQuery}
                filterType={filterType}
              />
            ))
          }
        </div>
      </section>
    </main>
  );
}

export default Home;
