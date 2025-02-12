import React from "react";
import { Link } from "react-router-dom";

function Card({ data }) {
  const { name, latitude, longitude, distance } = data;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl hover:scale-105">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {name}
      </h3>
      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-medium">Latitude:</span> {latitude}
        </p>
        <p>
          <span className="font-medium">Longitude:</span> {longitude}
        </p>
        <p>
          <span className="font-medium">Distance:</span> {distance} km
        </p>
      </div>

      {/* View link starts here */}
      <div className="mt-4">
        <Link
          to="/details"
          className="inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-amber-600 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default Card;
