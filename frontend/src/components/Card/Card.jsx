import React from "react";

function Card({ data }) {
  const { name, latitude, longitude, distance } = data;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 mb-4 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">Latitude:</span> {latitude}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">Longitude:</span> {longitude}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">Distance:</span> {distance} km
      </p>
    </div>
  );
}

export default Card;