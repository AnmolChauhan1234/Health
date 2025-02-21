import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext/UserContextProvider";

function BillingList({ bills, onSelectBill }) {
  const navigate = useNavigate();

  const { role } = useUserContext();

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
            className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Bill Summary starts here*/}
            <div className="flex-1 w-full sm:w-auto">

              {/* Name section starts here */}
              <p 
                className="text-sm text-gray-900 dark:text-white"
              >
                <span className="font-semibold">
                  {role === 'hospital'? "Patient Name : " : "Hospital Name : "}
                </span>{" "}
                { role === 'hospital' ? bill.patient_name || "N/A" : bill.hospital_name || "N/A"}
              </p>
              {/* Name section ends here */}

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
            {/* Bill Summary ends here*/}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
              <button
                onClick={() => navigate(`bill-details/${bill.billing_id}`)}
                className="w-full sm:w-auto bg-blue-600 dark:bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-amber-600 transition-colors cursor-pointer"
              >
                Show Bill Details
              </button>

              {role === "hospital" && (
                <button
                  onClick={() => {
                    onSelectBill(bill);
                    // navigate(`bill-details/${bill.billing_id}`);
                  }}
                  className="w-full sm:w-auto bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors cursor-pointer"
                >
                  Add Bill Details
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default React.memo(BillingList);
