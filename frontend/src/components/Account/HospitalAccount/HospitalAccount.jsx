import React, { useEffect, useState } from "react";
import useCloudinaryUpload from "../../../hooks/cloudinary";
import useGetProfile from "../../../hooks/getProfile";
import useUpdateProfile from "../../../hooks/updateProfile";
import Modal from '../../Modal/Modal';

function HospitalAccount() {
  
  // Modal variables
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [statusCode, setStatusCode] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };

  // Fetch profile data
  const { profileData, loadingProfile, errorProfile, refetchProfile } = useGetProfile();

  // Update profile data
  const { isUpdating, updateError, updateProfile } = useUpdateProfile();

  // Cloudinary upload settings
  const { uploadToCloudinary, uploading, error: uploadError } = useCloudinaryUpload();

  // Editing mode state
  const [isEditing, setIsEditing] = useState(() => localStorage.getItem("edit") === "true");

  // DP initialization (default DP)
  const [dp, setDp] = useState("/images/user-dp.jpg");

  // Form data to update the required fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    hospitalAddress: "",
    licenseNumber: "",
    establishedYear: "",
    bedCapacity: 0,
    emergencyServices: false,
  });

  // Sync editing state with localStorage
  useEffect(() => {
    localStorage.setItem("edit", isEditing);
  }, [isEditing]);

  

  // Handle file upload for DP to Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudinaryImageUrl = await uploadToCloudinary(file, "hospital");
    if (cloudinaryImageUrl) {
      const isSuccess = await updateProfile({ profile_picture: cloudinaryImageUrl });
      if (isSuccess) {
        setDp(cloudinaryImageUrl);
        refetchProfile();
        setIsEditing(false);
      }
    }
  };

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes for boolean fields
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };


  // Set form data and DP when profileData is loaded
  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.userProfile?.name || "",
        email: profileData.userProfile?.email || "",
        phone_number: profileData.userProfile?.phoneNumber || "",

        hospital_address: profileData.roleSpecificProfile?.hospitalAddress || "",
        license_number: profileData.roleSpecificProfile?.licenseNumber || "",
        established_year: profileData.roleSpecificProfile?.establishedYear || "",

        bed_capacity: profileData.roleSpecificProfile?.bedCapacity || 0,
        emergency_services: profileData.roleSpecificProfile?.emergencyServices || false,
      });

      // Set DP to the profile data received
      setDp(profileData.userProfile?.profilePicture || "/images/user-dp.jpg");
    }
  }, [profileData]);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !==
        (profileData.userProfile?.[key] || profileData.roleSpecificProfile?.[key])
      ) {
        updatedFields[key] = formData[key];
      }
    });

    // console.log(updatedFields);

    if (Object.keys(updatedFields).length === 0) {
      setIsOpen(true);
      setModalMessage("No changes detected!!");
      setStatusCode("info");
      return;
    }

    const isSuccess = await updateProfile(updatedFields);
    if (isSuccess) {
      // Refetch Profile.
      refetchProfile();

      //display message.
      setIsOpen(true);
      setModalMessage("Profile updated successfully!");
      setStatusCode("info");

      //Edit to false;
      setIsEditing(false);
    } else {

      //display message.
      setIsOpen(true);
      setModalMessage("Failed to update profile.");
      setStatusCode("error");
    }
  };

  //loading section starts here
  if (loadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
          Loading...
        </p>
      </div>
    );
  }
  //loading section ends here

  // error section starts here
  if (errorProfile) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-red-50 dark:bg-red-900 rounded-lg shadow-md w-full h-screen">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-red-600 dark:text-red-300 text-lg font-semibold">
          Error: {errorProfile.message || "Failed to load profile data."}
        </p>
        {/* <button
          onClick={() => window.location.reload()} // Reload the page or retry
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button> */}
      </div>
    );
  }

  if (!profileData) return <div>No profile data found.</div>;


  // UI Code 

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} statusCode={statusCode} message={modalMessage} />

      <main className="w-full max-w-2xl mx-auto my-8 p-6 rounded-lg border shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white">
        {/* Profile Picture Section */}
        <section className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={dp}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover shadow-md shadow-gray-200 outline-2 outline-amber-500"
            />
            {isEditing && (
              <button
                className="absolute bottom-0 right-0 py-1 px-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                ✎
              </button>
            )}
          </div>
          {isEditing && (
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          )}
        </section>

        <hr className="my-6 border-gray-400 dark:border-gray-600" />

        {/* Edit Mode Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer"
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Update Form */}
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4 ubuntu-regular-italic">

          {/* General Information */}
          {Object.keys(formData).map((key) => (
            <div key={key} className="space-y-1">
              <label className="block text-base font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
              />
            </div>
          ))}

          {/* Update button */}
          <button
            type="submit"
            disabled={isUpdating || !isEditing}
            className="w-full bg-amber-500 text-white py-2 rounded mt-4 hover:bg-amber-600 disabled:bg-gray-400 cursor-pointer"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Error Messages */}
        {updateError && (
          <div className="text-red-500 mt-4">
            Update Error: {updateError.response?.data?.message || updateError.message}
          </div>
        )}
        {uploadError && (
          <div className="text-red-500 mt-4">
            Upload Error: {uploadError.response?.data?.message || uploadError.message}
          </div>
        )}
      </main>
    </>
  );
}

export default HospitalAccount;