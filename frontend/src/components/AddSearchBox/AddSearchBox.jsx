import React, { useState, useEffect } from "react";
import useAddFacility from "../../hooks/hospital-hooks/useAddFacility";
import api from "../../hooks/apiInstance";

function AddSearchBox({ type }) {

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const { addFacility, loading, error } = useAddFacility(); // Use the hook

  // Fetch search results in real-time
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); // Clear results if search query is empty
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await api.get(`/hospital-management/search-${type}s/?q=${searchQuery}`);
        if (response.status === 200) {
          const resultData = response.data[`${type}s`];
          setSearchResults(resultData);
          // console.log(response.data) // Update search results
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery, type]);

  // Handle selection of an item
  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set the selected item
  };

  // Handle adding the selected item
  const handleAddItem = async () => {
    if (selectedItem) {
      const success = await addFacility(type, selectedItem.id); // Call the hook
      if (success) {
        alert(`${type} added successfully!`);
        setSelectedItem(null); // Clear selection
        setSearchQuery(""); // Clear search input
      } else {
        alert(`Failed to add ${type}.`);
      }
    }
  };

  return (
    <main>
      {/* Search input section */}
      <input
        type="text"
        placeholder={`Search ${type}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 rounded border border-gray-300"
      />

      {/* Search results section */}
      {searchResults.length > 0 && (
        <div className="mt-2">
          <select
            onChange={(e) => {
              const selected = searchResults.find(
                (item) => item.id === parseInt(e.target.value)
              );
              handleSelectItem(selected);
            }}
            className="w-full p-2 rounded border border-gray-300"
          >
            <option value="">Select a {type}</option>
            {searchResults.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name || item.doctor_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add button section */}
      {selectedItem && (
        <div className="mt-2">
          <button
            onClick={handleAddItem}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Adding..." : `Add ${type}`}
          </button>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </main>
  );
}

export default AddSearchBox;