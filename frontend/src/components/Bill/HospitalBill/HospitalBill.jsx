import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import debounce from "../../../hooks/debounce";
import api from "../../../hooks/apiInstance";

import {
  useCreateBill,
  useBillingHistory,
} from "../../../hooks/billing-hooks/export.js";

import BillingList from "../BillingList/BillingList";
import Modal from "../../Modal/Modal.jsx";

function HospitalBill() {
  const navigate = useNavigate();

  // States
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatientId, setselectedPatientId] = useState();

  //Modal realted states.
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setmodalMessage] = useState();
  const [statusCode, setstatusCode] = useState();

  //close modal.
  const closeModal = () => {
    setShowModal(false);
  };

  // Use the custom hook to fetch billing history
  const { billHistory, loading, message, error, refetchHistory } =
    useBillingHistory();

  //hook to fetch the create bill api.
  const {
    loading: createBillLoading,
    message: createBillMessage,
    error: createBillError,
    createBillapi,
  } = useCreateBill();

  // Fetch billing history on component mount
  useEffect(() => {
    refetchHistory();
  }, []);

  // Handle bill selection on Clicking the Add Bill Details button.
  const handleBillSelect = (bill) => {
    console.log("Billing id" , bill.billing_id);
    // console.log(bill);
    navigate("add-bill-details", { state: { patientName: bill.patient_name, billId: bill.billing_id } });
  };

  // Handle Add Patient button click
  const handleAddButtonClick = async () => {
    if (!selectedPatientId) {
      // If no patient is selected, just toggle the search bar
      setShowSearchBar((prev) => !prev);
      return;
    }

    // Call create bill API to create a bill
    const {success , message} = await createBillapi(selectedPatientId);

    setShowModal(true);
    setmodalMessage(message);
    setstatusCode(success ? "success" : "warning");

    // Refetch the history if the create bill is successful
    if (success) {
      refetchHistory();
      setSearchQuery("");
      setShowSearchBar(false);
      setselectedPatientId(null);
    }
  };

  // Debounced search function
  const searchUsers = debounce(async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.get("/payments/search-users/", {
        params: { q: query },
      });

      if (response.data.users) {
        setSearchResults(response.data.users);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 300); // 300ms debounce delay

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchUsers(query); // Call the debounced search function
  };

  // Handle user selection from search results
  const handleUserSelect = (user) => {
    console.log("Selected user ID:", user.id);
    setselectedPatientId(user.id); // Set the selected patient ID
    setSearchQuery(user.name); // Display the selected user's name in the search box
    setSearchResults([]); // Clear the search results
  };

  return (
    <>
      <Modal
        message={modalMessage}
        isOpen={showModal}
        closeModal={closeModal}
        statusCode={statusCode}
      />
      <main className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Add Patient button and Search bar section */}
        <div className="flex items-center justify-between mb-6">
          {/* Add patient button starts here */}
          <button
            onClick={handleAddButtonClick}
            className="bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-amber-600 transition-cus cursor-pointer"
          >
            Add Patient
          </button>
          {/* Add patient button section ends here */}

          {/* Search bar  section starts here*/}
          {showSearchBar && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search users..."
                className="ml-4 p-2 border border-gray-400 dark:border-gray-600 rounded-sm outline-none focus:border-amber-500 dark:bg-gray-800 dark:text-white"
              />
              {/* Display search results */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mt-1 shadow-lg z-10">
                  {isSearching ? (
                    <p className="p-2 text-gray-600 dark:text-gray-400">
                      Searching...
                    </p>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {user.name}
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-gray-600 dark:text-gray-400">
                      No users found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Billing List (History Of Bills) */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {loading && (
            <p className="text-gray-600 dark:text-gray-400">
              Loading billing history...
            </p>
          )}
          {error && (
            <p className="text-red-500 dark:text-red-400">Error: {error.message}</p>
          )}

          {/* Billing List Component */}
          <BillingList bills={billHistory} onSelectBill={handleBillSelect} />
        </section>
      </main>
    </>
  );
}

export default HospitalBill;
