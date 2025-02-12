import React, { useState, useEffect, useRef } from "react";
import { getLatLong } from "../../hooks/search/export";

function LocationSection({ onLocationChange, onSearch }) {
  const [searchText, setSearchText] = useState("Delhi"); // Default placeholder
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Detect current location
  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange({ lat: latitude, lng: longitude }); // Update map
          setSearchText("Current Location"); // Show feedback in input
          setIsDropdownOpen(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  };

  // Handle search for a place
  const handleSearch = async () => {
    // if (searchText.trim() === "" || searchText === "Delhi") return;
    setLoading(true);
    try {
      const location = await getLatLong(searchText);
      if (location) {
        onLocationChange(location);
        onSearch(location);
      } else {
        console.error("Location not found.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
    setLoading(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-48 sm:w-56" ref={dropdownRef}>
      {/* Input Box with Search Button */}
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-2 shadow-md">
        <img
          className="h-4 w-4 mr-2 cursor-pointer"
          src="/images/Marker.png"
          alt="location marker"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        <input
          type="text"
          className="w-full bg-transparent outline-none text-gray-900 dark:text-white text-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Enter location..."
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm ml-2 hover:bg-blue-700 transition-cus dark:bg-amber-500 dark:hover:bg-amber-400 cursor-pointer"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "..." : "Go"}
        </button>
      </div>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-1 shadow-lg z-10 text-sm">
          <button
            className="block w-full text-left px-3 py-2 text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={detectCurrentLocation}
          >
            📍 Use Current Location
          </button>
        </div>
      )}
    </div>
  );
}

export default LocationSection;
