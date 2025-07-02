import React from "react";

const RazorpayButton = ({ amount, onSuccess, onFailure }) => {
  const handlePayment = () => {
    // Placeholder for Razorpay integration
    // const options = { ... };
    // const rzp = new window.Razorpay(options);
    // rzp.open();
  };

  return (
    <button
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      onClick={handlePayment}
    >
      Pay ₹{amount} via Razorpay
    </button>
  );
};

export default RazorpayButton;
