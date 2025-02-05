import React from "react";
import { Link } from "react-router-dom";

function HospitalDashboard() {
  return (
    <main className="space-y-6">
      <h2 className="text-2xl font-semibold ubuntu-regular italic">
        Hospital Dashboard
      </h2>

      {/* Hospital-Specific Features */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      
      >
        {/* Manage Appointments Card starts here*/}
        <div 
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Manage Appointments
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage patient appointments.
          </p>
          <Link
            to="/manage-appointments"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-colors duration-200 ease-in-out"
          >
            Manage
          </Link>
        </div>
        {/* Manage Appointments Card ends here*/}

        {/* Patient Records Card starts here*/}
        <div 
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h3 
            className="text-xl font-semibold ubuntu-regular italic"
          >
            Patient Records
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access and update patient medical records.
          </p>
          <Link
            to="/patient-records"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Records
          </Link>
        </div>
        {/* Patient Records Card ends here*/}

        {/* Staff Management Card starts here*/}
        <div 
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Staff Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage hospital staff and roles.
          </p>
          <Link
            to="/staff-management"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-colors"
          >
            Manage Staff
          </Link>
        </div>
        {/* Staff Management Card ends here*/}

      </div>

    </main>
  );
}

export default HospitalDashboard;