import React, { useState, useEffect } from "react";
import { useBillingHistory } from "../../../hooks/billing-hooks/export.js";
import BillingList from "../BillingList/BillingList";
import Modal from "../../Modal/Modal.jsx";

function PatientBill() {

  // States
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Use the custom hook to fetch billing history
  const { billHistory, loading, message, error, refetchHistory } = useBillingHistory();

  // Fetch billing history on component mount
  useEffect(() => {
    refetchHistory();
  }, []);

  //loading section starts here
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
          Loading...
        </p>
      </div>
    );
  }
  //loading section ends here

  // error section starts here
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-red-50 dark:bg-red-900 rounded-lg shadow-md w-full h-screen">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-red-600 dark:text-red-300 text-lg font-semibold">
          Error: {error}
        </p>
        {/* <button
          onClick={() => window.location.reload()} // Reload the page or retry
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button> */}
      </div>
    );
  }
  // error section ends here

  return (
    <>

      <Modal
        message={modalMessage}
        isOpen={showModal}
        closeModal={closeModal}
        statusCode={statusCode}
      />

      <main className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Billing List (History Of Bills) */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {/* {loading && (
            <p className="text-gray-600 dark:text-gray-400">
              Loading billing history...
            </p>
          )}
          {error && (
            <p className="text-red-500 dark:text-red-400">
              Error: {error.message}
            </p>
          )} */}

          {/* Billing List Component */}
          <BillingList bills={billHistory} isPatient={true} />
        </section>
      </main>
    </>
  );
}

export default PatientBill;
