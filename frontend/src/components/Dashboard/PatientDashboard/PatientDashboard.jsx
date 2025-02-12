import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../hooks/apiInstance";
import { useUserContext } from "../../../context/UserContext/UserContextProvider";
import Modal from "../../Modal/Modal";

function PatientDashboard() {

  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage , setModalMessage] = useState('');
  const [statusCode, setStatusCode] = useState('')
  const [path, setPath] = useState('/');

  const closeModal = () => {
    setIsModalOpen(false)
    if(path) navigate(path);
  }

  //logout function.
  const handleLogout = async () => {

    //loading to true.
    setIsLoading(true);

    try {
      const response = await api.post("/accounts/logout/");

      if (response.status === 200) {

        // console.log(response.data.message);

        //clearing localStorage and session state and token
        localStorage.clear();
        sessionStorage.clear();
        
        //to switch to login/register.
        setUser(false);
        sessionStorage.setItem('user', false);

        //displaying the message received.
        setIsModalOpen(true);
        setModalMessage(response.data.message);
        setStatusCode("success");
        setPath('/')

      } else {
        console.log('Could not logout. Try again.');
      }
    } catch (error) {
      console.log('Server cannot be reached. Try later: ', error);
    }

    setIsLoading(false);
    
  };

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={closeModal} message={modalMessage} statusCode={statusCode}/>
    
    <section className="space-y-6">
      {/* <h2 className="text-2xl font-semibold ubuntu-regular italic">
        Patient Dashboard
      </h2> */}

      {/* Patient-Specific Features starts here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Accounts Section starts here */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            My Account
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your accounts settings.
          </p>
          <Link
            to="/dashboard/accounts"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            My Account
          </Link>
        </div>
        {/* My Accounts Section ends here */}

        {/* Medical Records Section starts here */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Medical Records
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access your medical history.
          </p>
          <Link
            to="/dashboard/history"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Records
          </Link>
        </div>
        {/* Medical Records Section ends here */}

        {/* Bills Section starts here */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Billing
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View your bills history.
          </p>
          <Link
            to="/dashboard/bills"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Bills
          </Link>
        </div>
        {/* Bills section ends here */}
      </div>
      {/* Patient - Specific Features ends here */}

      {/* Logout button starts here */}
      <button
        onClick={handleLogout}
        className={` text-white px-4 py-2 outline-none border-none rounded-md mx-auto my-3 cursor-pointer ${isLoading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-400'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Logging out..' : 'Logout'}
      </button>
      {/* Logout button ends here */}
    </section>
    </>
  );
}

export default PatientDashboard;