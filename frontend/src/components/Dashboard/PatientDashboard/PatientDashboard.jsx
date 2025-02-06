import React from "react";
import { Link} from "react-router-dom";

function PatientDashboard() {
  return (
    
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold ubuntu-regular italic">
        Patient Dashboard
      </h2>

      {/* Patient-Specific Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* My Accounts Section starts here */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">

          {/* Header section starts here */}
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            My Account
          </h3>
          {/* Header section ends here */}

          {/* Description section starts here */}
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your accounts settings.
          </p>
          {/* Description section ends here */}

          {/* Button section starts here */}
          <Link
            to="/dashboard/accounts"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            My Account
          </Link>
          {/* Button section ends here */}

        </div>
        {/* My Accounts Section ends here */}

        {/* Medical Records Section starts here */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">

          {/* Header section starts here */}
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Medical Records
          </h3>
          {/* Header section ends here */}

          {/* Description section starts here */}
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access your medical history.
          </p>
          {/* Description section ends here */}

          {/* Button section starts here */}
          <Link
            to="/dashboard/history"
            className="mt-4 inline-block bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus"
          >
            View Records
          </Link>
          {/* Button section ends here */}

        </div>
        {/* Medical Records Section ends here */}

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
    </section>

  );
}

export default PatientDashboard;