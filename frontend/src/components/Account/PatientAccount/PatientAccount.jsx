import React, { useEffect, useState } from "react";
import useCloudinaryUpload from "../../../hooks/cloudinary";
import useGetProfile from "../../../hooks/getProfile";
import useUpdateProfile from "../../../hooks/updateProfile";
import Modal from '../../Modal/Modal'

function PatientAccount() {

  //modal variables
  const [isOpen , setIsOpen] = useState(false);
  const [modalMessage , setModalMessag] = useState('');
  const [statusCode , setStatusCode] = useState();

  const closeModal = () => {
    setIsOpen(false);
  }

  //getting the fetchProfile Data.
  const { profileData, loadingProfile, errorProfile, refetchProfile } =
    useGetProfile();

  //setting the updateProfile data.
  const { isUpdating, updateError, updateProfile } = useUpdateProfile();

  //Cloudinary upload settings
  const {
    uploadToCloudinary,
    uploading,
    error: uploadError,
  } = useCloudinaryUpload();

  //switching between editing and display
  const [isEditing, setIsEditing] = useState(
    () => localStorage.getItem("edit") === "true"
  );
  const [isChangePasswordOn, setIsChangePasswordOn] = useState(
    () => localStorage.getItem("changePassword") === "true"
  );

  //DP initilaisation Default DP
  const [dp, setDp] = useState("/images/user-dp.jpg");

  //form data to update the required.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    age: "",
    bloodGroup: "",
    emergencyContact: "",
    gender: "",
    medicalHistory: "",
  });

  // Sync editing state with localStorage
  useEffect(() => {
    localStorage.setItem("edit", isEditing);
    localStorage.setItem("changePassword", isChangePasswordOn);
  }, [isEditing, isChangePasswordOn]);

 

  // Handle file upload for DP to cloudinary
  const handleFileChange = async (e) => {

    //getting the file.
    const file = e.target.files[0];
    if (!file) return;

    const cloudinaryImageUrl = await uploadToCloudinary(file, "patient");

    if (cloudinaryImageUrl) {
      const isSuccess = await updateProfile({
        profilePicture: cloudinaryImageUrl,
      });

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


   // Set form data and DP when profileData is loaded
  useEffect(() => {

    if (profileData) {
      setFormData({
        name: profileData.userProfile?.name || "",
        email: profileData.userProfile?.email || "",
        phone_number: profileData.userProfile?.phoneNumber || "",

        address: profileData.roleSpecificProfile?.address || "",
        age: profileData.roleSpecificProfile?.age || "",
        blood_group: profileData.roleSpecificProfile?.bloodGroup || "",

        emergency_contact:
          profileData.roleSpecificProfile?.emergencyContact || "",
        gender: profileData.roleSpecificProfile?.gender || "",

        medical_history: profileData.roleSpecificProfile?.medicalHistory || "",
      });

      //setting dp to the profile data received
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
        (profileData.userProfile?.[key] ||
          profileData.roleSpecificProfile?.[key])
      ) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      //display message
      setIsOpen(true);
      setModalMessag("No changes detected!!");
      setStatusCode("info");
      // alert("No changes detected!");
      return;
    }

    // console.log(updatedFields);

    const isSuccess = await updateProfile(updatedFields);
    if (isSuccess) {

      //refetch Profile.
      refetchProfile();

      //display message
      setIsOpen(true);
      setModalMessag("Profile updated successfully!");
      setStatusCode("info");

      //updating the states of editing.
      setIsEditing(false);
      // alert("Profile updated successfully!");
    } else {
      //display message
      setIsOpen(true);
      setModalMessag("Failed to update profile.");
      setStatusCode("error");
      // alert("Failed to update profile.");
    }
  };


  //loading section starts here
  if (loadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full min-h-full">
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
      <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-red-50 dark:bg-red-900 rounded-lg shadow-md w-full min-h-full">
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

  return (
    <>

      <Modal isOpen={isOpen} closeModal={closeModal} statusCode={statusCode} message={modalMessage} />

      <main className="w-full max-w-2xl mx-auto rounded-md shadow-lg shadow-gray-400 dark:shadow-gray-600 dark:bg-gray-800 dark:text-white px-4 py-2 ">

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
        <h2 
          className="text-2xl font-semibold mb-4"
        >
          Profile
        </h2>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-4 ubuntu-regular-italic"
        >

          {Object.keys(formData).map((key) => (
            <div key={key} className="space-y-1">

              <label className="block text-base font-medium text-gray-700 dark:text-gray-200">
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

          {/* Update button section starts here */}
          <button
            type="submit"
            disabled={isUpdating || !isEditing}
            className="w-full bg-amber-500 text-white py-2 rounded mt-4 hover:bg-amber-600 disabled:bg-gray-400 cursor-pointer"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
          {/* Update button section ends here */}
          
        </form>

        {/* Error Messages */}
        {updateError && (
          <div className="text-red-500 mt-4">
            Update Error:{" "}
            {updateError.response?.data?.message || updateError.message}
          </div>
        )}
        {uploadError && (
          <div className="text-red-500 mt-4">
            Upload Error:{" "}
            {uploadError.response?.data?.message || uploadError.message}
          </div>
        )}
      </main>
    </>
  );
}

export default PatientAccount;
