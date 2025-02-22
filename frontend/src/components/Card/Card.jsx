import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../hooks/apiInstance";

function Card({ data, searchQuery, filterType }) {
  const navigate = useNavigate();
  const { id, name, profile_picture, cost } = data;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to send details to API
  const handleViewDetails = async () => {
    console.log("Viewing details for:", id);

    // Construct API endpoint
    const endPoint = `/search-api/view-hospital-details/?id=${id}&type=${filterType}&search=${searchQuery}`;
    console.log("API Endpoint:", endPoint);

    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await api.get(endPoint);
      if (response.status === 200) {
        navigate("/details", { state: { hospitalData: response.data } });
      } else {
        setError("Failed to fetch details. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-6 px-4 mb-4 transition-all duration-200 hover:shadow-xl hover:scale-105 transform-gpu"
    >
      {/* Profile Picture section starts here*/}
      <div className="flex justify-center mb-4">
        <img
          src={
            profile_picture ||
            "https://i.pinimg.com/736x/53/89/bb/5389bb8f55dbf81efdea7e76f51c29ea.jpg"
          }
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-amber-100"
        />
      </div>
      {/* Profile picture section ends here */}

      {/* Name section starts here*/}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
        {name}
      </h3>
      {/* Name section ends here */}

      {/* Cost section starts here*/}
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
        <span className="font-medium">Cost:</span> {cost ? `₹${cost}` : "N/A"}
      </p>
      {/* Cost section ends here */}

      {/* Error Message section starts here */}
      {error && (
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-5 h-5 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-500 text-sm">Could not load details</p>
        </div>
      )}
      {/* Error Message section ends here */}

      {/* View Details Button starts here*/}
      <div className="mt-4 flex justify-center">

        {/* button section starts here */}
        <button
          className={`${
            loading
              ? "bg-blue-400 dark:bg-amber-400 cursor-not-allowed"
              : "bg-blue-500 dark:bg-amber-500 hover:bg-blue-600 dark:hover:bg-amber-600"
          } text-white px-6 py-2 rounded-md transition-cus  flex items-center justify-center cursor-pointer`}
          onClick={handleViewDetails}
          disabled={loading}
        >
          {/* loading starts here */}
          {loading ? (
            <>
              <svg
                className="w-5 h-5 mr-2 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Loading...
            </>
          ) : (
            "View Details"
          )}
        </button>
        {/* button section ends here */}

      </div>
      {/* View details button ends here */}
      
    </div>
  );
}

export default Card;
