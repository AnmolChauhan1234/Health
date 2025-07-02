import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { BillingDetails } from "../../components";

const BillPaymentPage = () => {
  const navigate = useNavigate();
  const { billId } = useParams(); // Get billId from the URL

  // Fetch bill details from the backend (API call)
  // const [bill, setBill] = useState(null);
  // useEffect(() => {
  //   axios.get(`/api/bills/${billId}`).then((response) => setBill(response.data));
  // }, [billId]);

  // const bill = {
  //   id: billId,
  //   hospital: { name: "City Hospital" },
  //   totalAmount: 5000,
  //   dueDate: "2023-12-01",
  //   status: "pending",
  //   details: [
  //     { id: 1, type: "service", description: "Consultation", amount: 1000 },
  //     { id: 2, type: "treatment", description: "X-Ray", amount: 2000 },
  //   ],
  // };

  const handlePayDirect = () => {
    navigate(`/bills/${billId}/pay-direct`); // Navigate to direct payment page
  };

  const handlePayEMI = () => {
    navigate(`/bills/${billId}/pay-emi`); // Navigate to EMI payment page
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold dark:text-white">Bill Details</h2>
      <BillingDetails items={bill.details} />
      <div className="mt-6 space-x-4">
        <button
          onClick={handlePayDirect}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Pay Directly
        </button>
        <button
          onClick={handlePayEMI}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Pay via EMI
        </button>
      </div>
    </div>
  );
};

export default BillPaymentPage;
