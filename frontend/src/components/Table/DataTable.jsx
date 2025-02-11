import React, { useState } from "react";
import useCloudinaryUpload from "../../hooks/cloudinary";


function DataTable({ data = [], loading, error, type, onEdit }) {

  const [editingId, setEditingId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // console.log(data);

  //using cloudinary to upload the image.
  const {uploadToCloudinary, uploading, error: uploadError,} = useCloudinaryUpload();

  //handle edit functionality
  const handleEditClick = (id, currentData) => {
    setEditingId(id);
    setUpdatedData(currentData);
  };

  //Cancle button functionality
  const handleCancelClick = () => {
    setEditingId(null);
    setUpdatedData({});
    setFile(null);
    setFileName("");
  };

  const handleSaveClick = (id) => {
    console.log(type);
    onEdit(type, id, updatedData);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  //image file selection.
  const handleFileChange = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    setFile(file);
    setFileName(file.name);

    //handling upload to cloudinary.
    const cloudinaryImageUrl = await uploadToCloudinary(file, type);
    if (cloudinaryImageUrl) {
      
      const newData = { ...updatedData, doctorImage: cloudinaryImageUrl };
      setUpdatedData(newData); // Update the state with the new image URL

      const isSuccess = await onEdit(type, id, newData);

      if (isSuccess) {
        setFile(null);
        setFileName("");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {data.map((item) => {

        let itemId; let itemImage; let itemName;let itemType;

        switch(type){
          case 'doctor':
            itemId = item.doctorId;
            itemImage = item.doctorImage;
            itemType = item.specializationInHospital;
            itemName =item.doctorName;
            break;
          case 'treatment':
            itemId = item.treatmentId;
            itemImage = item.treatmentImage;
            itemType = item.treatmentType;
            itemName =item.treatmentName
            break;
          case 'service':
            itemId = item.serviceId;
            itemImage = item.serviceImage;
            itemType = item.serviceType;
            itemName =item.serviceName;
            break;
        }
        // const itemId = item.doctorId || item.treatmentId || item.serviceId;
        // const itemImage =
        //   item.doctorImage || item.treatmentImage || item.serviceImage;
        // const itemName =
        //   item.doctorName || item.treatmentName || item.serviceName;
        // const itemType =
        //   item.specializationInHospital ||
        //   item.treatmentType ||
        //   item.serviceType;

        return (
          <div
            key={itemId}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {itemImage && (
                  <div className="relative">
                    <img
                      src={itemImage}
                      alt={itemName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {editingId === itemId && (
                      <button
                        onClick={() =>
                          document.getElementById(`fileInput-${itemId}`).click()
                        }
                        className="absolute bottom-0 right-0 p-1 bg-amber-500 text-white rounded-full hover:bg-amber-600"
                      >
                        ✎
                      </button>
                    )}
                    <input
                      id={`fileInput-${itemId}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, itemId)}
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    {itemName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {itemType}
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
                {Object.entries(item).map(([key, value]) => {
                  if (key.endsWith("Id") || key.endsWith("Image")) return null;
                  return (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row justify-between"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      {editingId === itemId ? (
                        <input
                          type="text"
                          name={key}
                          value={updatedData[key]}
                          onChange={handleInputChange}
                          className="w-full sm:w-1/2 p-1 border rounded dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400 break-words">
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}

                {editingId === itemId && file && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Selected file: {fileName}
                  </div>
                )}

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
                      onClick={() => handleEditClick(itemId, item)}
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
