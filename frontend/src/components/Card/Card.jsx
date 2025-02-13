import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getDetailsResult from "../../hooks/search/getDetailsResult";

function Card({ data ,  searchQuery, filterType}) {


  //naivgation here.
  const navigate = useNavigate();
  //dummy data section starts here.

  const dummyData = {
    hospital: {
      userProfile: {
        role: "Admin",
        name: "John Doe",
        email: "johndoe@example.com",
        phone_number: "+1234567890",
        joined_at: "2021-01-15",
        profile_picture: "https://via.placeholder.com/150",
      },
      HospitalProfile: {
        hospital_address: "123 Main St, Springfield, USA",
        license_number: "HL123456",
        established_year: "1995",
        bed_capacity: "200",
        emergency_services: true,
      },
    },
    facility: {
      name: "X-Ray",
      cost: "$50",
      available_slots: "10",
      // doctor_name: "Dr. Smith",
      // doctor_image: "https://via.placeholder.com/150",
      // appointment_fees_in_hospital: "$100",
      // specialization_in_hospital: "Cardiology",
      // consultation_days: "Mon, Wed, Fri",
      // availability_in_hospital: "9:00 AM - 5:00 PM"
    },
  };
  
  const {id = 4, name, latitude, longitude, distance } = data;
  // const [data1 , setData1] =  useState();
  // setData1(dummyData)

  const {getResult , searchData} = getDetailsResult();

  console.log("Card's" , searchQuery , filterType)

  const handleViewDetails = async () => {

    console.log("fetching inside the card.")

    const success = await getResult(id, filterType, searchQuery);
    navigate("/details", { state: { hospitalData: dummyData } });
    

    // if (success) {

    //   console.log("Details fetched successfully for:", id);
    //   navigate("/details", { state: { hospitalData: searchData } });

    // } else {
    //   console.error("Failed to fetch hospital details.");
    // }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl hover:scale-105">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {name}
      </h3>
      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-medium">Latitude:</span> {latitude}
        </p>
        <p>
          <span className="font-medium">Longitude:</span> {longitude}
        </p>
        <p>
          <span className="font-medium">Distance:</span> {distance} km
        </p>
      </div>

      {/* View link starts here */}
      <div className="mt-4">
        <button
          className="bg-blue-500 dark:bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-amber-600 transition-colors duration-200"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
      {/* Link section ends here */}

    </div>
  );
}

export default Card;
