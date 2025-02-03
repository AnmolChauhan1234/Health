import React, { useState } from 'react';

function Signup() {

  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle change function for binding.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Password Validity
  const validPassword =(password , confirmPassword) => {
    if(password !== confirmPassword){
      alert('password field do not match');
      return false;
    }

    if(password.length < 8){
      alert('password must be at least 8 characters long');
      return false;
    }

    return true;
  }

  //Check for the presence of only numbers.
  const containsOnlyNumber = (phoneNumber) => {
    if(phoneNumber.length === 0) return false;
    for( let char of phoneNumber){
      if(char <'0' || char > '9'){
        return false;
      }
    }
    return true;
  }

  //checks for only phone number validity.
  const validPhoneNumber = (phoneNumber) => {
    if(phoneNumber.length !== 10){
      alert('Phone Number cannot be less than 10 digits.');
      return false;
    }

    if(!containsOnlyNumber(phoneNumber)){
      alert('Phone Number need to have only numeric digits.');
      return false;
    }
    return true;
  }

  //handle cleanup
  const cleanForm = () => {
    setFormData({
      role: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  //Handle Submit function.
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validation checks
    if(!validPassword(formData.password , formData.confirmPassword) || !validPhoneNumber(formData.phoneNumber)){
      cleanForm();
      return;
    }

    // Creating data to send to the backend.
    const data = new FormData();
    data.append('role', formData.role);
    data.append('full_name', formData.fullName);
    data.append('phone_number', formData.phoneNumber);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);

    // printing data
    for (let items of data.entries()) {
      console.log(items);
    }

    //field clean-up
    cleanForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-[1px] border-gray-300 dark:border-gray-400 h-max w-[80vw] sm:w-96 flex flex-col gap-y-2 px-3 py-5 mx-auto shadow-md shadow-gray-200 dark:shadow-gray-500 text-black dark:text-white ubuntu-medium-italic rounded-md text-sm sm:text-base transition-cus"
    >

      {/* Role Section starts here */}
      <label 
        htmlFor="role" className="font-medium text-gray-500 dark:text-white"
      >
        Role
      </label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full h-9 border-[1px] border-gray-400 rounded-sm mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-1 text-gray-700 dark:text-white ubuntu-light dark:bg-gray-800 bg-white"
        required
      >
        <option value="">Select Role</option>
        <option value="patient">Patient</option>
        <option value="hospital">Hospital</option>
      </select>
      {/* Role section ends here */}

      {/* Full Name section starts here */}
      <label 
        htmlFor="fullName" 
        className="font-medium text-gray-500 dark:text-white"
      >
        Full Name
      </label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="full name here ..."
        className="w-full h-9 border-[1px] border-gray-400 rounded-sm mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-2 text-gray-700 dark:text-white dark:placeholder:text-gray-400 ubuntu-light"
        required
      />
      {/* Full name section ends here */}

      {/* Phone number section starts here */}
      <label 
        htmlFor="phoneNumber" 
        className="font-medium text-gray-500 dark:text-white"
      >
        Phone Number
      </label>
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="phone number here ..."
        className="w-full h-9 border-[1px] border-gray-400 rounded-sm mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-2 text-gray-700 dark:text-white dark:placeholder:text-gray-400 ubuntu-light"
        required
      />
      {/* Phone number section ends here */}

      {/* Email section starts here */}
      <label 
        htmlFor="email" 
        className="font-medium text-gray-500 dark:text-white"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email here ..."
        className="w-full h-9 border-[1px] border-gray-400 rounded-sm mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-2 text-gray-700 dark:text-white dark:placeholder:text-gray-400 ubuntu-light"
        required
      />
      {/* Email section ends here */}

      {/* Password section starts here */}
      <label 
        htmlFor="password" 
        className="font-medium text-gray-500 dark:text-white"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="password here ..."
        className="w-full h-9 border-[1px] border-gray-400 rounded-sm mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-2 text-gray-700 dark:text-white dark:placeholder:text-gray-400 ubuntu-light"
        required
      />
      {/* Password section ends here */}

      {/* Confirm Password section starts here */}
      <label 
        htmlFor="confirmPassword" 
        className="font-medium text-gray-500 dark:text-white"
      >
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="confirm password here ..."
        className="w-full h-9 border-[1px] border-gray-400 rounded-sm mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-2 text-gray-700 dark:text-white dark:placeholder:text-gray-400 ubuntu-light"
        required
      />
      {/* Confirm Password section ends here */}

      <button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-400 text-white font-medium mx-auto mt-1 py-1 rounded-sm cursor-pointer"
      >
        Sign Up
      </button>

    </form>
  );
}

export default Signup;