import React, { useState, useEffect } from "react";
import useAddFacility from "../../hooks/hospital-hooks/useAddFacility";
import api from "../../hooks/apiInstance";
import { Modal } from "../index";

function AddSearchBox({ type }) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const { addFacility, loading, error } = useAddFacility(); // Use the hook

  // Modal specific states
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [statusCode, setstatusCode] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  // Fetch search results in real-time
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); // Clear results if search query is empty
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await api.get(
          `/hospital-management/search-${type}s/?q=${searchQuery}`
        );
        if (response.status === 200) {
          const resultData = response.data[`${type}s`];
          setSearchResults(resultData);
          setIsDropdownOpen(true); // Open dropdown when results are fetched
        }
      } catch (error) {
        setIsOpen(true);
        setMessage("Error fetching results.");
        setstatusCode("error");
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery, type]);

  // Handle selection of an item
  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set the selected item
    setSearchQuery(item.name || item.doctor_name); // Update input with selected item's name
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Handle adding the selected item
  const handleAddItem = async () => {
    if (selectedItem) {
      const success = await addFacility(type, selectedItem.id); // Call the hook
      if (success) {
        // Displaying message
        setMessage(`${type} added successfully!`);
        setstatusCode("success");
        setIsOpen(true);

        // Clearing selection and input
        setSelectedItem(null);
        setSearchQuery("");
      } else {
        // Displaying message
        setMessage(`Failed to add ${type}.`);
        setstatusCode("warning");
        setIsOpen(true);
      }
    }
  };

  return (
    <main>
      {/* Modal section starts here */}
      <Modal
        isOpen={isOpen}
        message={message}
        closeModal={closeModal}
        statusCode={statusCode}
      />

      {/* Search input section */}
      <input
        type="text"
        placeholder={`Search ${type}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Close dropdown on blur (with delay)
        className="w-full p-2 rounded border border-gray-300"
      />

      {/* Search results dropdown */}
      {isDropdownOpen && searchResults.length > 0 && (
        <div className="mt-2 max-h-48 overflow-y-auto border border-gray-300 rounded shadow-lg">
          {searchResults.map((item) => (
            <div
              key={item.id}
              onMouseDown={() => handleSelectItem(item)} // Use onMouseDown to ensure it fires before onBlur
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name || item.doctor_name}
            </div>
          ))}
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
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </main>
  );
}

export default AddSearchBox;
