import React, { useState } from "react";

function DataTable({ data = [], loading, error, type, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  // Handle edit functionality
  const handleEditClick = (id, currentData) => {
    setEditingId(id);
    setUpdatedData(currentData); // Set the current updatable data for editing
  };

  // Cancel button functionality
  const handleCancelClick = () => {
    setEditingId(null);
    setUpdatedData({});
  };

  // Save button functionality
  const handleSaveClick = (id) => {
    // Prepare the data to be sent for editing
    // const dataToSend = {
    //   nonUpdatable: data.find((item) => item.nonUpdatable.doctor_id === id)
    //     .nonUpdatable,
    //   updatable: updatedData, // Send only the updated updatable fields
    // };

    // console.log("handle save click", dataToSend);

    // Call the onEdit function with the correct structure
    onEdit(type, id, updatedData);

    // Reset editing state
    setEditingId(null);
    setUpdatedData({});
  };

  // Handle input changes for updatable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle expand/collapse for each item
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const { nonUpdatable, updatable } = item;
        const itemId = nonUpdatable.doctor_id || nonUpdatable.id; // Unique ID for the item

        return (
          <div
            key={itemId}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    {nonUpdatable.doctor_name || nonUpdatable.name }
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {updatable.specialization_in_hospital || updatable.type}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(itemId)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {expandedId === itemId ? "Collapse" : "Expand"}
              </button>
            </div>

            {expandedId === itemId && (
              <div className="mt-4 space-y-2">
                {/* Display non-updatable fields (excluding doctor_id and doctor_image) */}
                {Object.entries(nonUpdatable).map(([key, value]) => {
                  if (key === "doctor_id" || key === "doctor_image") return null; // Skip these fields
                  return (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row justify-between"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {key
                          .split("_")
                          .map(
                            (word) => word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                        :
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 break-words">
                        {value || "N/A"}
                      </span>
                    </div>
                  );
                })}

                {/* Display and edit updatable fields */}
                {Object.entries(updatable).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row justify-between"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {key
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                      :
                    </span>
                    {editingId === itemId ? (
                      <input
                        type="text"
                        name={key}
                        value={updatedData[key] || ""}
                        onChange={handleInputChange}
                        className="w-full sm:w-1/2 p-1 border rounded dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400 break-words">
                        {value || "N/A"}
                      </span>
                    )}
                  </div>
                ))}

                <div className="flex space-x-2 mt-4">
                  {editingId === itemId ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(itemId)}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(itemId, updatable)}
                      className="px-2 py-1 bg-amber-500 text-white rounded hover:bg-amber-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => {}}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DataTable;