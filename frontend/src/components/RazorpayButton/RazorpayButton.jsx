import  { useState } from "react";
import api from "../../hooks/apiInstance";

const RazorpayButton = ({ amount, billingId, onSuccess, onFailure }) => {
  const [paymentType, setPaymentType] = useState("full"); // 'full' or 'emi'
  const [installments, setInstallments] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Razorpay payment
  const initializePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      
      if (paymentType === "full") {
        // Create full payment order
        response = await api.post("/payments/create-order/", {
          billing_id: billingId
        });
      } else {
        // Create EMI order
        response = await api.post("/payments/create-emi/", {
          billing_id: billingId,
          installments: installments
        });
      }

      const { order_id, key_id } = response.data;

      // Razorpay checkout options
      const options = {
        key: key_id,
        amount: response.data.amount,
        currency: "INR",
        name: "Health App Payment",
        description: paymentType === "full" ? "Bill Payment" : `EMI Payment - ${installments} installments`,
        order_id: order_id,
        handler: async (razorpayResponse) => {
          try {
            // Verify payment
            const verifyData = {
              billing_id: billingId,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_signature: razorpayResponse.razorpay_signature
            };

            if (paymentType === "full") {
              await api.post("/payments/verify-payment/", verifyData);
            } else {
              await api.post("/payments/verify-emi/", {
                ...verifyData,
                installment_number: 1
              });
            }

            if (onSuccess) {
              onSuccess(razorpayResponse);
            }
          } catch (verifyError) {
            if (onFailure) {
              onFailure(verifyError);
            }
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#10B981"
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      setError(err.response?.data?.error || "Failed to initialize payment");
      if (onFailure) {
        onFailure(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Payment Type Selection */}
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="paymentType"
            value="full"
            checked={paymentType === "full"}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-4 h-4 text-green-600"
          />
          <span className="text-gray-700 dark:text-gray-200">Full Payment</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="paymentType"
            value="emi"
            checked={paymentType === "emi"}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-4 h-4 text-green-600"
          />
          <span className="text-gray-700 dark:text-gray-200">EMI</span>
        </label>
      </div>

      {/* EMI Installments Selection */}
      {paymentType === "emi" && (
        <div className="flex items-center space-x-2">
          <label className="text-gray-700 dark:text-gray-200">Installments:</label>
          <select
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={2}>2 months</option>
            <option value={3}>3 months</option>
            <option value={4}>4 months</option>
            <option value={5}>5 months</option>
            <option value={6}>6 months</option>
          </select>
        </div>
      )}

      {/* Payment Amount Display */}
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        {paymentType === "full" ? (
          <span>Total: ₹{amount.toFixed(2)}</span>
        ) : (
          <span>
            Per Installment: ₹{(amount / installments).toFixed(2)} × {installments} months
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Pay Button */}
      <button
        className={`w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={initializePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay ₹${amount} via Razorpay`}
      </button>
    </div>
  );
};

export default RazorpayButton;
