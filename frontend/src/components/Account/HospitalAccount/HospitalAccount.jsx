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

  // Set form data and DP when profileData is loaded
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.userProfile?.name || "",
        email: profileData.userProfile?.email || "",
        phoneNumber: profileData.userProfile?.phoneNumber || "",
        hospitalAddress: profileData.roleSpecificProfile?.hospitalAddress || "",
        licenseNumber: profileData.roleSpecificProfile?.licenseNumber || "",
        establishedYear: profileData.roleSpecificProfile?.establishedYear || "",
        bedCapacity: profileData.roleSpecificProfile?.bedCapacity || 0,
        emergencyServices: profileData.roleSpecificProfile?.emergencyServices || false,
      });

      // Set DP to the profile data received
      setDp(profileData.userProfile?.profilePicture || "/images/user-dp.jpg");
    }
  }, [profileData]);

  // Handle file upload for DP to Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudinaryImageUrl = await uploadToCloudinary(file, "hospital");
    if (cloudinaryImageUrl) {
      const isSuccess = await updateProfile({ profilePicture: cloudinaryImageUrl });
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

    if (Object.keys(updatedFields).length === 0) {
      setIsOpen(true);
      setModalMessage("No changes detected!!");
      setStatusCode("info");
      return;
    }

    const isSuccess = await updateProfile(updatedFields);
    if (isSuccess) {
      refetchProfile();
      setIsOpen(true);
      setModalMessage("Profile updated successfully!");
      setStatusCode("info");
    } else {
      setIsOpen(true);
      setModalMessage("Failed to update profile.");
      setStatusCode("error");
    }
  };

  // Loading and error states
  if (loadingProfile) return <div>Loading...</div>;
  if (errorProfile) {
    console.error("Error fetching profile:", errorProfile);
    return (
      <div>Error: {errorProfile.message || "Failed to load profile data."}</div>
    );
  }
  if (!profileData) return <div>No profile data found.</div>;

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
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Update Form */}
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4 ubuntu-regular-italic">
          {/* General Information */}
          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
            />
          </div>

          {/* Hospital-Specific Information */}
          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">Hospital Address:</label>
            <input
              type="text"
              name="hospitalAddress"
              value={formData.hospitalAddress}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">License Number:</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">Established Year:</label>
            <input
              type="text"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">Bed Capacity:</label>
            <input
              type="number"
              name="bedCapacity"
              value={formData.bedCapacity}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 rounded outline outline-amber-600 dark:bg-gray-500 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-base font-medium text-gray-700">Emergency Services:</label>
            <input
              type="checkbox"
              name="emergencyServices"
              checked={formData.emergencyServices}
              onChange={handleCheckboxChange}
              disabled={!isEditing}
              className="ml-2"
            />
          </div>

          {/* Update button */}
          <button
            type="submit"
            disabled={isUpdating || !isEditing}
            className="w-full bg-amber-500 text-white py-2 rounded mt-4 hover:bg-amber-600 disabled:bg-gray-400"
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