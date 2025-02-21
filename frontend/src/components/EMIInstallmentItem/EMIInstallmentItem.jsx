import React from "react";

const EMIInstallmentItem = ({ installment }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <p className="dark:text-white">Due Date: {installment.dueDate}</p>
      <p className="dark:text-white">
        Amount: ₹{installment.installmentAmount}
      </p>
      <p className="dark:text-white">Status: {installment.status}</p>
      {installment.status === "pending" && (
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Pay Now
        </button>
      )}
    </div>
  );
};

export default EMIInstallmentItem;
