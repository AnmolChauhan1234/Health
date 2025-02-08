import React, { useEffect, useState } from 'react';
import useCloudinaryUpload from '../../../hooks/cloudinary';
import useAuth from '../../../hooks/useAuth';
import {useNavigate} from 'react-router-dom';

function PatientAccount() {

  const navigate = useNavigate();

  // const {isAuthenticated} = useAuth();

  // if(!isAuthenticated){
  //   navigate('/auth/register')
  // }

  const [isEditing, setIsEditing] = useState(() => localStorage.getItem('edit') === 'true');

  const [isChangePasswordOn, setIsChangePasswordOn] = useState(() => localStorage.getItem('changePassword') === 'true');

  //cloudinary upload states.
  const {uploadToCloudinary, uploading, error } = useCloudinaryUpload();

  // Default profile picture
  const [dp, setDp] = useState(() => {
    return localStorage.getItem("profilePicture") || "/images/user-dp.jpg";
  });

  useEffect(() => {
    localStorage.setItem('edit', isEditing);
    localStorage.setItem('changePassword' , setIsChangePasswordOn)
  }, [isEditing , isChangePasswordOn]);

  
  //Get Profile data from backend.


  //Handle file upload to cloudinary.
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {

      const cloudinaryImageUrl = await uploadToCloudinary(file , 'patient');
      
      if(cloudinaryImageUrl){

        //setting dp
        setDp(cloudinaryImageUrl);
        localStorage.setItem('profilePicture',cloudinaryImageUrl);
        setIsEditing(false);

        //send image url to backend
        // sendImageUrlToBackend(cloudinaryImageUrl);
      }
    }
  }

  // sending file to backend
  // const sendImageUrlToBackend = (url) => {

  //   //api call to backend
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }

  return (
    <main 
      className="w-full max-w-lg mx-auto my-6 p-6 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-lg transition-all"
    >

      {/* Profile Picture Section starts here*/}
      <section 
        className="flex flex-col items-center space-y-4"
      >

        {/* image and edit button starts here */}
        <div className="relative">

          <img 
            src={dp} 
            alt="Profile" 
            className="h-24 w-24 rounded-full object-contain object-center outline-2 outline-amber-500 shadow-md shadow-gray-300" 
          />

          <button 
            className="absolute bottom-0 right-0 py-1 px-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 cursor-pointer align-middle"
            onClick={() => setIsEditing(!isEditing)}
          >
            ✎
          </button>
        </div>
        {/* image and edit button ends here */}

        {/* File Upload section starts here */}
        {isEditing && (
          <input 
            type="file" 
            accept="image/*" 
            className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-amber-500 file:text-white hover:file:bg-amber-600 transition-cus"
            onChange={handleFileChange}
          />
        )}
        {/* File Upload section ends here */}
      </section>
      {/* Profile Picture Section ends here*/}

      {/* Divider */}
      <hr className="my-4 border-gray-400 dark:border-gray-600" />

      {/* User Information Section */}
      <section className="space-y-3 ubuntu-regular-italic">
        <h2 className="text-xl ubuntu-medium-italic">Personal Information</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Phone Number:</strong> +123 456 7890</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
      </section>

      {/* Divider */}
      <hr 
        className="my-4 border-gray-400 dark:border-gray-600" 
      />

      {
        
      }
      {/* Change Password Section starts here*/}
      { 
        isChangePasswordOn && 
          <section>
            <h2 
              className="text-xl font-semibold text-amber-500"
            >
              Change Password
            </h2>

            <div className="mt-3 space-y-2">

              <input 
                type="password" 
                placeholder="Current Password" 
                className="w-full p-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />

              <input 
                type="password" 
                placeholder="New Password" 
                className="w-full p-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />

              <input 
                type="password" 
                placeholder="Confirm New Password" 
                className="w-full p-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" 
              />

              <button 
                className="w-full bg-amber-500 text-white py-2 rounded-lg mt-2 hover:bg-amber-600 transition cursor-pointer"
              >
                Update Password
              </button>

              <button 
                className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition cursor-pointer"
                onClick={() => setIsChangePasswordOn(false)}
              >
                Close
              </button>

            </div>
          </section> 
        }

        {
          !isChangePasswordOn && 
            <button 
              className="w-full bg-amber-500 text-white py-2 rounded-lg mt-2 hover:bg-amber-600 transition-cus cursor-pointer"
              onClick={ () => setIsChangePasswordOn(true)}
            >
              Reset Password
            </button>
        }
      {/* Change Password section ends here */}
    </main>
  );
}

export default PatientAccount;
