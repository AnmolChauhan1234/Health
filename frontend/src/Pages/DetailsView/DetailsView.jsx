import React from "react";
import { useLocation } from "react-router-dom";

function DetailsView() {
  const location = useLocation();
  const data = location.state?.hospitalData;

  const { hospital, facility } = data;

  console.log("Data inside DetailView", data);

  return (
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">

      {/* Hospital Profile section starts here*/}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">

        {/* Heading starts here */}
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-amber-500">
          Hospital Profile
        </h2>
        {/* heading ends here */}

        {/* profile data section starts here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Address section starts here */}
          <p className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              <span className="font-semibold">Address:</span>{" "}
              {hospital.HospitalProfile.hospital_address}
            </span>
          </p>
          {/* address section ends here */}

          {/* Bed capacity section starts here */}
          <p className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>
              <span className="font-semibold">Bed Capacity:</span>{" "}
              {hospital.HospitalProfile.bed_capacity}
            </span>
          </p>
          {/* Bed capacity section ends here */}

          {/* Availability section starts here */}
          <p className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              <span className="font-semibold">Emergency Services:</span>{" "}
              {hospital.HospitalProfile.emergency_services
                ? "Available"
                : "Not Available"}
            </span>
          </p>
          {/* Availability section starts here */}

        </div>
        {/* Profile data section ends here */}

      </div>
      {/* Hospital Profile section ends here*/}

      {/* Contact Section starts here*/}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">

        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-amber-500">
          Contact
        </h2>

        
        <div className="space-y-4">

          {/* email section starts here */}
          <p className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>
              <span className="font-semibold">Email:</span>{" "}
              {hospital.userProfile.email}
            </span>
          </p>
          {/* email section ends here */}

          {/* phone number section starts here */}
          <p className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>
              <span className="font-semibold">Phone:</span>{" "}
              {hospital.userProfile.phone_number}
            </span>
          </p>
          {/* phone number section ends here */}

        </div>
      </div>
      {/* Contact Section ends here*/}

      {/* Facility Details starts here */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">

        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-amber-500">
          Facility Details
        </h2>

        {/* doctor name sectio starts here */}
        {facility.doctor_name && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={facility.doctor_image}
                alt={facility.doctor_name}
                className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600"
              />
              <div>
                <p className="font-semibold">{facility.doctor_name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {facility.specialization_in_hospital}
                </p>
              </div>
            </div>
            <p>
              <span className="font-semibold">Appointment Fees:</span>{" "}
              {facility.appointment_fees_in_hospital}
            </p>
            <p>
              <span className="font-semibold">Consultation Days:</span>{" "}
              {facility.consultation_days}
            </p>
            <p>
              <span className="font-semibold">Availability:</span>{" "}
              {facility.availability_in_hospital}
            </p>
          </div>
        )}
        {/* doctor name seciton ends here */}


        {facility.name && facility.cost && (
          <div className="mt-6 space-y-4">
            <p>
              <span className="font-semibold">Service/Treatment Name:</span>{" "}
              {facility.name}
            </p>
            <p>
              <span className="font-semibold">Cost:</span> {facility.cost}
            </p>
            {facility.available_slots && (
              <p>
                <span className="font-semibold">Available Slots:</span>{" "}
                {facility.available_slots}
              </p>
            )}
            {facility.doctor_required && (
              <p>
                <span className="font-semibold">Doctor Required:</span>{" "}
                {facility.doctor_required ? "Yes" : "No"}
              </p>
            )}
          </div>
        )}

      </div>
      {/* Facility Details ends here */}
      
    </div>
  );
}

export default DetailsView;
