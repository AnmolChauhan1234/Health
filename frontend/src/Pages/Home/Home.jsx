import React, { useState, useEffect } from "react";
import { Map, LocationSection, SearchBox, Card } from "../../components/index";
import { useMenuContext } from "../../context/MenuContext/MenuContextProvider";
import { useDarkMode } from "../../context/ThemeContext/ThemeContextProvider";
import {getLocationResult} from "../../hooks/search/export";

function Home() {
  const { isOpen } = useMenuContext();
  const { darkMode } = useDarkMode();

  // Extract API functions
  const { data, loading, error, fetchLocationResults } = getLocationResult();

  const [showMap, setShowMap] = useState(() => {
    const storedMapStatus = localStorage.getItem("showmap");
    return storedMapStatus === "true";
  });

  const [mapPosition, setMapPosition] = useState(null); // Holds map position
  const [results, setResults] = useState([]); // Holds search results

  useEffect(() => {
    localStorage.setItem("showmap", showMap);
  }, [showMap]);

  // Handle location updates from LocationSection
  const handleLocationChange = (location) => {
    setMapPosition(location); // Update the map location
    // console.log(location.lat , location.lng);
    fetchLocationResults(location.lat, location.lng); // Fetch nearby hospitals
    // fetchLocationResults(); // Fetch nearby hospitals
  };

  // Update results when data from API is received
  useEffect(() => {
    if (data) {
      // console.log("useEffect HOme data" ,data)
      setResults(data); // Store API results
    }
  }, [data]);

  const handleSearchResult = (location) => {
    console.log("serach result from home.jsx" , location)
  }

  return (
    <main className="h-max w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col pt-3 transition-cus">
      {/* Search & Location Section */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 w-full px-4">
        <LocationSection
          onLocationChange={handleLocationChange} // Sends location to Map and API
          onSearch={handleSearchResult}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto"
        />
        <SearchBox className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto" />
      </div>

      {/* Map Section */}
      {!isOpen && showMap && (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <Card key={index} data={result} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
