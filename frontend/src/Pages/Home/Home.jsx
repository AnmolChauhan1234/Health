// import React, { useState, useEffect } from "react";
// import { Map, LocationSection, SearchBox, Card } from "../../components/index";
// import { useMenuContext } from "../../context/MenuContext/MenuContextProvider";
// import { useDarkMode } from "../../context/ThemeContext/ThemeContextProvider";
// import {getLocationResult} from "../../hooks/search/export";

// function Home() {
//   const { isOpen } = useMenuContext();
//   const { darkMode } = useDarkMode();

//   // Extract API functions
//   const { data, loading, error, fetchLocationResults } = getLocationResult();

//   const [showMap, setShowMap] = useState(() => {
//     const storedMapStatus = localStorage.getItem("showmap");
//     return storedMapStatus === "true";
//   });

//   const [mapPosition, setMapPosition] = useState(null); // Holds map position
//   const [results, setResults] = useState([]); // Holds search results

//   useEffect(() => {
//     localStorage.setItem("showmap", showMap);
//   }, [showMap]);

//   // Handle location updates from LocationSection
//   const handleLocationChange = (location) => {
//     setMapPosition(location);
//     fetchLocationResults(location.lat, location.lng);
//   };

//   // Update results when data from API is received
//   useEffect(() => {
//     if (data) {
//       // console.log("useEffect HOme data" ,data)
//       setResults(data); // Store API results
//     }
//   }, [data]);

//   const handleSearchResult = (location) => {
//     console.log("serach result from home.jsx" , location)
//   }

//   return (
//     <main className="h-max w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col pt-3 transition-cus">
//       {/* Search & Location Section */}
//       <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 w-full px-4">
//         <LocationSection
//           onLocationChange={handleLocationChange} // Sends location to Map and API
//           onSearch={handleSearchResult}
//           className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto"
//         />
//         <SearchBox className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto" />
//       </div>

//       {/* Map Section */}
//       {!isOpen && showMap && (
//         <section className="h-max w-full">
//           <Map isDarkMode={darkMode} position={mapPosition} />
//         </section>
//       )}

//       {/* Search Results Section */}
//       <section className="p-4">
//         <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//           Search Results
//         </h2>
//         {loading && <p>Loading hospitals...</p>}
//         {error && <p className="text-red-500">Error: {error.message}</p>}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {results.map((result, index) => (
//             <Card key={index} data={result} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { Map, LocationSection, SearchBox, Card } from "../../components/index";
import { useMenuContext } from "../../context/MenuContext/MenuContextProvider";
import { useDarkMode } from "../../context/ThemeContext/ThemeContextProvider";
import { getLocationResult } from "../../hooks/search/export";

function Home() {

  //getting data from contexts.
  const { isOpen } = useMenuContext();
  const { darkMode } = useDarkMode();

  // Extract API functions of getLocationResult. where i send lat, lng, searchQuery, filterType.
  const { data, loading, error, fetchLocationResults } = getLocationResult();

  const [showMap, setShowMap] = useState(() => {
    const storedMapStatus = localStorage.getItem("showmap");
    return storedMapStatus === "true";
  });

  // Holds map position
  const [mapPosition, setMapPosition] = useState(null); 

   // Holds search results
  const [results, setResults] = useState([]);

   // Holds search query
  const [searchQuery, setSearchQuery] = useState("");

   // Holds filter type
  const [filterType, setFilterType] = useState("doctors");

  useEffect(() => {
    localStorage.setItem("showmap", showMap);
  }, [showMap]);

  // Handle location updates from LocationSection
  const handleLocationChange = (location) => {
    setMapPosition(location);
  };

  // Handle search query change
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  // Handle filter type change
  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  // Handle search button click
  const handleSearch = () => {
    if (mapPosition) {

      // calling api.
      fetchLocationResults(
        mapPosition.lat,
        mapPosition.lng,
        searchQuery,
        filterType
      );
      // fetchLocationResults(
      //   mapPosition.lat,
      //   mapPosition.lng,
      //   // searchQuery,
      //   // filterType
      // );

      console.log("search for :" ,mapPosition.lat,mapPosition.lng,searchQuery,filterType )

      //setting the search box to null.
      // setSearchQuery('');
    }
  };

  // Update results when data from API is received
  useEffect(() => {
    if (data) {
      console.log("home.jsx",data);
      setResults(data); // Store API results
    }
  }, [data]);

  return (
    <main className="h-max w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col pt-3 transition-cus">


      {/* Search, Location and button Section starts here*/}
      <div className="flex flex-col md:flex-row gap-y-1 items-center sm:justify-center w-full px-4 py-3 md:gap-x-2">

        {/* Location Section starts here */}
        <LocationSection
          onLocationChange={handleLocationChange} // Sends location to Map and API
          className="border border-gray-300 rounded-lg w-full sm:w-auto"
        />
        {/* Location Section ends here */}

        {/* Search box section starts here */}
        <SearchBox
          onSearchQueryChange={handleSearchQueryChange}
          onFilterTypeChange={handleFilterTypeChange}
          className="border border-gray-300 rounded-lg py-2 w-full sm:w-auto"
        />
        {/* Search box section ends here */}


        <button
          onClick={handleSearch}
          className="bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md transition-cus cursor-pointer hover:bg-blue-500 dark:hover:bg-amber-400"
        >
          Search
        </button>
      </div>
      {/* Search, Location and button Section starts here*/}

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
            <Card key={index} data={result} searchQuery={searchQuery} filterType={filterType} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
