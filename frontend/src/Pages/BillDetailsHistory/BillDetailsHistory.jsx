import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../hooks/apiInstance";
import useDeleteBillDetail from "../../hooks/billing-hooks/useDeleteBillDetail";

import { Modal } from "../../components";
import { useUserContext } from "../../context/UserContext/UserContextProvider";

const BillDetailsHistory = () => {
  const { role } = useUserContext();

  const { billing_id } = useParams(); // Get billing_id from the URL
  const [billDetails, setBillDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Modal related states
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setmodalMessage] = useState();
  const [statusCode, setstatusCode] = useState();

  //close modal.
  const closeModal = () => {
    setShowModal(false);
  };

  //useDeleteBill detail destructure here.
  const { deleteBillDetail, isDeleting } = useDeleteBillDetail();

  //handle delete functionality
  const handleDeleteButton = async (id) => {
    console.log(id);
    const { success, message } = deleteBillDetail(id);

    setShowModal(true);
    setmodalMessage(message);
    setstatusCode(success ? "success" : "warning");

    //refetch the bill details page if success in deleting bill
    if (success) {
      const fetchBillDetails = async () => {
        try {
          const response = await api.get(
            `/history/history-show-bill-details/`,
            {
              params: {
                id: billing_id,
              },
            }
          );

          if (response.status === 200) {
            setBillDetails(response.data);
            // console.log(response.data.history[0])
          } else {
            setShowModal(true);
            setmodalMessage("Failed to fetch bill details.");
            setstatusCode("error");
            setError("Failed to fetch bill details.");
          }
        } catch (error) {
          setShowModal(true);
          setmodalMessage("An error occurred.");
          setstatusCode("error");
          setError(error.message || "An error occurred.");
        } finally {
          setLoading(false);
        }
      };

      fetchBillDetails();
    }
  };

  // Fetch bill details when the component mounts
  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await api.get(`/history/history-show-bill-details/`, {
          params: {
            id: billing_id,
          },
        });

        if (response.status === 200) {
          setBillDetails(response.data);
          // console.log(response.data.history[0])
        } else {
          setError("Failed to fetch bill details.");
        }
      } catch (error) {
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [billing_id]);

  //loading section starts here
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
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
      <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-red-50 dark:bg-red-900 rounded-lg shadow-md">
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
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Bill Details
        </h1>

        {billDetails ? (
          <div className="space-y-4">
            {/* Summary section starts here */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Summary
              </h2>

              {/* Billing id section starts here */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Billing ID:</span>{" "}
                {billDetails.billing_id}
              </p>
              {/* Billing id section ends here */}

              {/* Name section starts here */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">
                  {role === "hospital" ? "Patient Name : " : "Hospital Name : "}
                </span>{" "}
                {/* {billDetails.history[0]?.patient || "N/A"} */}
                {role === "hospital"
                  ? billDetails.history[0]?.patient || "N/A"
                  : billDetails.history[0]?.hospital || "N/A"}
              </p>
              {/* Name section ends here */}

              {/* Amount section starts here */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Total Amount:</span> ₹
                {billDetails.history[0]?.total_amount.toFixed(2)}
              </p>
              {/* Amount section ends here */}

              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`capitalize ${
                    billDetails.history[0]?.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {billDetails.history[0]?.status}
                </span>
              </p>
            </div>
            {/* Summary section ends here */}

            {/* History section ,i.e , details of each facility availed starts here */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                History
              </h2>
              {billDetails.history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4"
                >
                  {/* Items section starts here */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Type:</span> {item.type}
                  </p>
                  {/* Items type section section ends here */}

                  {/* Amount section starts here */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Amount:</span> ₹
                    {item.amount.toFixed(2)}
                  </p>
                  {/* Amount section ends here */}

                  {/* Doctor , service or treatment section starts here */}
                  {/* if doctor */}
                  {item.doctor && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Doctor:</span>{" "}
                      {item.doctor}
                    </p>
                  )}

                  {/* if service */}
                  {item.service && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Service:</span>{" "}
                      {item.service}
                    </p>
                  )}

                  {/* if treatment */}
                  {item.treatment && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Treatment:</span>{" "}
                      {item.treatment}
                    </p>
                  )}
                  {/* Doctor , service or treatment section ends here */}

                  {/* delete button section starts here */}
                  {role === "hospital" && (
                    <button
                      onClick={() => handleDeleteButton(item.id)}
                      className="cursor-pointer bg-red-500 py-1 px-2 rounded-md mt-2 hover:bg-red-600 text-white"
                    >
                      delete
                    </button>
                  )}
                  {/* delete button section ends here */}
                </div>
              ))}
            </div>

            {/* Pay button section starts here */}
            <div className="flex justify-center">
              {role !== "hospital" && (
                <button
                  onClick={() => console.log("payment page here.")}
                  className="w-[80%] cursor-pointer bg-green-500 dark:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 dark:hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-outfocus:outline-none focus:ring-green-500 dark:focus:ring-green-600 dark:focus:ring-offset-gray-900"
                >
                  Pay Now
                </button>
              )}
            </div>
            {/* Pay button section ends here */}

            {/* History section ,i.e , details of each facility availed ends here */}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No details found.</p>
        )}
      </div>
    </>
  );
};

export default BillDetailsHistory;
