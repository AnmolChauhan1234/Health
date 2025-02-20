import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../hooks/apiInstance";

const BillDetailsHistory = () => {

  const { billing_id } = useParams(); // Get billing_id from the URL
  const [billDetails, setBillDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bill details when the component mounts
  useEffect(() => {
    const fetchBillDetails = async () => {

      try {
        const response = await api.get(`/history/history-show-bill-details/`,{
          params:{
            id: billing_id
          }
        });

        if (response.status === 200) {
          setBillDetails(response.data);
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

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 dark:text-red-400">Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Bill Details
      </h1>
      {billDetails ? (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Summary
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Billing ID:</span>{" "}
              {billDetails.billing_id}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Patient:</span>{" "}
              {billDetails.history[0]?.patient || "N/A"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Total Amount:</span> ₹
              {billDetails.history[0]?.total_amount.toFixed(2)}
            </p>
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

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              History
            </h2>
            {billDetails.history.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Type:</span> {item.type}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Amount:</span> ₹
                  {item.amount.toFixed(2)}
                </p>
                {item.doctor && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Doctor:</span> {item.doctor}
                  </p>
                )}
                {item.service && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Service:</span> {item.service}
                  </p>
                )}
                {item.treatment && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Treatment:</span>{" "}
                    {item.treatment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No details found.</p>
      )}
    </div>
  );
};

export default BillDetailsHistory;