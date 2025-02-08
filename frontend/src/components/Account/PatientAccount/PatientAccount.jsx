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

  // Set form data and DP when profileData is loaded
  useEffect(() => {

    if (profileData) {
      setFormData({
        name: profileData.userProfile?.name || "",
        email: profileData.userProfile?.email || "",
        phoneNumber: profileData.userProfile?.phoneNumber || "",

        address: profileData.roleSpecificProfile?.address || "",
        age: profileData.roleSpecificProfile?.age || "",
        bloodGroup: profileData.roleSpecificProfile?.bloodGroup || "",

        emergencyContact:
          profileData.roleSpecificProfile?.emergencyContact || "",
        gender: profileData.roleSpecificProfile?.gender || "",

        medicalHistory: profileData.roleSpecificProfile?.medicalHistory || "",
      });

      //setting dp to the profile data received
      setDp(profileData.userProfile?.profilePicture || "/images/user-dp.jpg");
    }
  }, [profileData]);

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

    const isSuccess = await updateProfile(updatedFields);
    if (isSuccess) {
      refetchProfile();
      setIsOpen(true);
      setModalMessag("Profile updated successfully!");
      setStatusCode("info");
      // alert("Profile updated successfully!");
    } else {

      setIsOpen(true);
      setModalMessag("Failed to update profile.");
      setStatusCode("error");
      // alert("Failed to update profile.");
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

          {/* Update button section starts here */}
          <button
            type="submit"
            disabled={isUpdating || !isEditing}
            className="w-full bg-amber-500 text-white py-2 rounded mt-4 hover:bg-amber-600 disabled:bg-gray-400"
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
