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
      const response = await api.get(endPoint);
      if (response.status === 200) {
        navigate("/details", { state: { hospitalData: response.data } });
      } else {
        setError("Failed to fetch details");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 px-3 mb-4 transition-all duration-200 hover:shadow-xl hover:scale-105">
      <div className="flex justify-center mb-4">
        <img
          src={profile_picture || "https://via.placeholder.com/150"}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
        {name}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
        <span className="font-medium">Cost:</span> {cost ? `₹${cost}` : "N/A"}
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="mt-4 flex justify-center">
        <button
          className="bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-amber-600 transition-colors duration-200 cursor-pointer"
          onClick={handleViewDetails}
          disabled={loading}
        >
          {loading ? "Loading..." : "View Details"}
        </button>
      </div>
    </div>
  );
}

export default Card;
