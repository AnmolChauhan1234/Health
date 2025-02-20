import React from "react";
import { useNavigate } from "react-router-dom";

function BillingList({ bills }) {
  const navigate = useNavigate();

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Billing List
      </h2>
      {bills.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No bills found.</p>
      ) : (
        bills.map((bill) => (
          <div
            key={bill.bill_history_id}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Bill Summary */}
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-semibold">Patient:</span>{" "}
                {bill.patient || "N/A"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Total Amount:</span> ₹
                {bill.total_amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`capitalize ${
                    bill.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {bill.status}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Last Updated:</span>{" "}
                {formatDate(bill.updated_at)}
              </p>
            </div>

            {/* Show History Button */}
            <button
              onClick={() => navigate(`bill-details/${bill.billing_id}`)}
              className="bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-amber-600 transition-cus cursor-pointer"
            >
              Show History
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default React.memo(BillingList);
