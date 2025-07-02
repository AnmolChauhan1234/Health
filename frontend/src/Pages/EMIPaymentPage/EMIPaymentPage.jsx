import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { EMIInstallmentItem } from "../../components";

const EMIPaymentPage = () => {
  const { billId } = useParams(); // Get billId from the URL

  // Fetch bill details from the backend (API call)
  // const [bill, setBill] = useState(null);
  // useEffect(() => {
  //   axios.get(`/api/bills/${billId}`).then((response) => setBill(response.data));
  // }, [billId]);

  const [installments, setInstallments] = useState([
    {
      id: 1,
      dueDate: "2023-11-01",
      installmentAmount: 1000,
      status: "pending",
    },
    {
      id: 2,
      dueDate: "2023-12-01",
      installmentAmount: 1000,
      status: "pending",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">EMI Payment</h1>
      <div className="space-y-4">
        {installments.map((installment) => (
          <EMIInstallmentItem key={installment.id} installment={installment} />
        ))}
      </div>
    </div>
  );
};

export default EMIPaymentPage;
