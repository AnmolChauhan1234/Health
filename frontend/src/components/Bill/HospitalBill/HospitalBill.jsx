import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useBillingHistory from "../../../hooks/billing-hooks/useBillingHistory";

import BillingList from "../BillingList/BillingList";

function HospitalBill() {

  //using navigation.
  const navigate = useNavigate();

  // States
  const [setshowSearchBar, setSetshowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Use the custom hook to fetch billing history
  const { billHistory, loading, message, error, refetchHistory } = useBillingHistory();

  // Fetch billing history on component mount
  useEffect(() => {
    refetchHistory();
  }, []); 
  

  // Handle bill selection
  const handleBillSelect = (bill) => {
    navigate('/add-bill-details', { state: { bill } }); // Pass the selected bill data to the next page
  };

  // Handle Add Patient button click
  const handleAddButtonClick = async () => {
    setSetshowSearchBar((prev) => !prev);

    // Simulate adding a patient (replace with your actual logic)
    // try {
    //   // Call your API to add a patient here
    //   // await addPatientApiCall();

    //   // After adding a patient, refetch the billing history
    //   await refetchHistory();
    // } catch (error) {
    //   console.error("Error adding patient:", error);
    // }
  };

  return (
    <main className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Add Patient button and Search bar section */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleAddButtonClick}
          className="bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-amber-600 transition-cus cursor-pointer"
        >
          Add Patient
        </button>

        {/* Search bar */}
        {setshowSearchBar && (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bills..."
            className="ml-4 p-2 border border-gray-400 dark:border-gray-600 rounded-sm outline-none focus:border-amber-500 dark:bg-gray-800 dark:text-white"
          />
        )}
      </div>

      {/* Billing List (History Of Bills) */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {loading && (
          <p className="text-gray-600 dark:text-gray-400">Loading billing history...</p>
        )}
        {error && (
          <p className="text-red-500 dark:text-red-400">Error: {error}</p>
        )}
        {/* {message && (
          <p className="text-green-600 dark:text-green-400">{message}</p>
        )} */}

        {/* Billing List Component */}
        <BillingList bills={billHistory} onSelectBill={handleBillSelect} />
      </section>
    </main>
  );
}

export default HospitalBill;