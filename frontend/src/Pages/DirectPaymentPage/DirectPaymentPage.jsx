import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PaymentMethodSelector, RazorpayButton } from "../../components";


const DirectPaymentPage = () => {
  const { billId } = useParams(); // Get billId from the URL
  const [paymentMethod, setPaymentMethod] = useState("");

  // Fetch bill details from the backend (API call)
  // const [bill, setBill] = useState(null);
  // useEffect(() => {
  //   axios.get(`/api/bills/${billId}`).then((response) => setBill(response.data));
  // }, [billId]);

  const bill = {
    id: billId,
    totalAmount: 5000,
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Direct Payment
      </h1>
      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onSelect={setPaymentMethod}
      />
      <div className="mt-6">
        <RazorpayButton amount={bill.totalAmount} />
      </div>
    </div>
  );
};

export default DirectPaymentPage;
