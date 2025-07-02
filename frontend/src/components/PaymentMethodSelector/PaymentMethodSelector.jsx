import React from "react";

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
  const methods = [
    { id: "credit_card", label: "Credit Card" },
    { id: "upi", label: "UPI" },
    { id: "net_banking", label: "Net Banking" },
    { id: "cash", label: "Cash" },
  ];

  return (
    <div className="space-y-2">
      {methods.map((method) => (
        <label
          key={method.id}
          className="flex items-center space-x-2 dark:text-white"
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={selectedMethod === method.id}
            onChange={() => onSelect(method.id)}
            className="form-radio"
          />
          <span>{method.label}</span>
        </label>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
