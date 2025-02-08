import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext/UserContextProvider";
import api from "../../../hooks/apiInstance";

function HospitalDashboard() {

  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {

    //loading to true.
    setIsLoading(true);

    try {
      const response = await api.post("/accounts/logout/");

      if (response.status === 200) {
        console.log(response.data.message);

        //clearing user state and token
        setUser(false);
        sessionStorage.setItem('user', false);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');

        navigate('/');
      } else {
        console.log('Could not logout. Try again.');
      }
    } catch (error) {
      console.log('Server cannot be reached. Try later: ', error);
    }

    setIsLoading(false);
    
  };


  return (
    <main className="space-y-6">
      <h2 className="text-2xl font-semibold ubuntu-regular italic">
        Hospital Dashboard
      </h2>

      {/* Hospital-Specific Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Account Card starts here*/}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            My Account
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage account data.
          </p>
          <Link
            to="/dashboard/accounts"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-colors duration-200 ease-in-out"
          >
            Manage
          </Link>
        </div>
        {/* Manage Appointments Card ends here*/}

        {/* Patient Records Card starts here*/}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Patient Records
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access and update patient medical records.
          </p>
          <Link
            to="/dashboard/history"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Records
          </Link>
        </div>
        {/* Patient Records Card ends here*/}

        {/* Staff Management Card starts here*/}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage hospital staff, roles, services and treatments.
          </p>
          <Link
            to="/dashboard/manage"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-colors"
          >
            Manage Staff
          </Link>
        </div>
        {/* Staff Management Card ends here*/}

        {/* Bills Section starts here */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Header section starts here */}
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Billing
          </h3>
          {/* Header section ends here */}

          {/* Description section starts here */}
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View your bills history.
          </p>
          {/* Description section ends here */}

          {/* Button section starts here */}
          <Link
            to="/dashboard/bills"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Bills
          </Link>
          {/* Button section ends here */}
        </div>
        {/* Bills section ends here */}
      </div>

      {/* Logout button starts here */}
      <button
        onClick={handleLogout}
        className={` text-white px-4 py-2 outline-none border-none rounded-md mx-auto my-3 cursor-pointer ${isLoading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-400'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Logging out..' : 'Logout'}
      </button>
      {/* Logout button ends here */}
    </main>
  );
}

export default HospitalDashboard;
