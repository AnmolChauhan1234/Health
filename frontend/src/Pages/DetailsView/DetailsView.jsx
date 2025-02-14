import React from "react";
import { useLocation } from "react-router-dom";

function DetailsView() {

  const location = useLocation();
  const data = location.state?.hospitalData;

  const { hospital, facility } = data;

  console.log("Data inside DetailView",data);


  return (
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Hospital Profile */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Hospital Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {hospital.HospitalProfile.hospital_address}
          </p>
          <p>
            <span className="font-semibold">License Number:</span>{" "}
            {hospital.HospitalProfile.license_number}
          </p>
          <p>
            <span className="font-semibold">Established Year:</span>{" "}
            {hospital.HospitalProfile.established_year}
          </p>
          <p>
            <span className="font-semibold">Bed Capacity:</span>{" "}
            {hospital.HospitalProfile.bed_capacity}
          </p>
          <p>
            <span className="font-semibold">Emergency Services:</span>{" "}
            {hospital.HospitalProfile.emergency_services
              ? "Available"
              : "Not Available"}
          </p>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex items-center space-x-6">
        <img
          src={hospital.userProfile.profile_picture}
          alt={hospital.userProfile.name}
          className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2">User Profile</h2>
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {hospital.userProfile.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {hospital.userProfile.email}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {hospital.userProfile.phone_number}
          </p>
          <p>
            <span className="font-semibold">Joined At:</span>{" "}
            {hospital.userProfile.joined_at}
          </p>
        </div>
      </div>

      {/* Facility Details */}
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Facility Details</h2>
        {facility.doctor_name && (
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Doctor Name:</span>{" "}
              {facility.doctor_name}
            </p>
            <img
              src={facility.doctor_image}
              alt={facility.doctor_name}
              className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            <p>
              <span className="font-semibold">Appointment Fees:</span>{" "}
              {facility.appointment_fees_in_hospital}
            </p>
            <p>
              <span className="font-semibold">Specialization:</span>{" "}
              {facility.specialization_in_hospital}
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
        {facility.name && facility.cost && (
          <div className="mt-4 space-y-3">
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
    </div>
  );
}

export default DetailsView;
