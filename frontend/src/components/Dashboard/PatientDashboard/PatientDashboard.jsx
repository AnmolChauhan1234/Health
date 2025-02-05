import React from "react";
import { Link } from "react-router-dom";

function PatientDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold ubuntu-regular italic">
        Patient Dashboard
      </h2>

      {/* Patient-Specific Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Appointments Card */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Appointments
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your upcoming appointments.
          </p>
          <Link
            to="/appointments"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Appointments
          </Link>
        </div>

        {/* Medical Records Card */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Medical Records
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access your medical history and reports.
          </p>
          <Link
            to="/medical-records"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Records
          </Link>
        </div>

        {/* Prescriptions Card */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Prescriptions
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and download your prescriptions.
          </p>
          <Link
            to="/prescriptions"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Prescriptions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;