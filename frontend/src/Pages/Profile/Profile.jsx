import React from "react";
import { HospitalDashboard,PatientDashboard } from "../../components";

function Profile({role}) {

  // Get user role from local storage
  // const {role} = useRole();
  // const role = 'hospital';


  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-6">
      {/* Profile Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold ubuntu-regular italic mb-4">
          Profile Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your personalized dashboard.
        </p>
      </div>

      {/* Role-Based Dashboard */}
      <div className="max-w-6xl mx-auto mt-8">
        {role === "patient" ? <PatientDashboard /> : <HospitalDashboard />}
      </div>
    </div>
  );
}

export default Profile;