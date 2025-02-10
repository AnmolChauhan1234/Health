import React, { useState } from "react";
import {useFetchDoctors , useFetchServices ,  useFetchTreatements , useUpdateDoctor , useUpdateService , useUpdateTreatment, useEditFacility, useAddFacility} from '../../hooks/hospital-hooks/export'

// import Modal from '../../components/Modal/Modal'
import useAuthRedirect from '../../hooks/authRedirect'
import { DataTable,Modal } from "../../components";

function ManageHospital() {

  // to authencticate the page.
  useAuthRedirect();

  // State for active tab
  const [activeTab, setActiveTab] = useState("doctors");

  // State for search bar visibility
  const [showSearchBar, setShowSearchBar] = useState(false);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");

  // Fetch data hooks
  const { data: doctors, loading: doctorsLoading, error: doctorsError, refetch: refetchDoctors } = useFetchDoctors();
  const { data: services, loading: servicesLoading, error: servicesError, refetch: refetchServices } = useFetchServices();
  const { data: treatments, loading: treatmentsLoading, error: treatmentsError, refetch: refetchTreatments } = useFetchTreatements();

  // Update data hooks
  const { updateDoctor } = useUpdateDoctor();
  const { updateService } = useUpdateService();
  const { updateTreatment } = useUpdateTreatment();

  //Update Doctor , services and treatment;
  const {addFacility} = useAddFacility();

  //Edit Doctor or services and treatment.
  const {editFacility} = useEditFacility();

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle search bar toggle
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Handle edit functionality for the facilities
  const handleEdit = async (type, id, updatedData) => {

    let isSuccess = false;

    // try {
      isSuccess = await editFacility(type , id , updatedData);

      if (isSuccess)
      {
        switch(type){
          case 'doctor':
            refetchDoctors();
            break;
          case "service":
            refetchServices();
            break;
          case "treatment":
            refetchTreatments();
            break;
          default:
            break;
        }
      }

      if (isSuccess) {
        setIsModalOpen(true);
        setModalMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
        setStatusCode("success");
      } else {
        setIsModalOpen(true);
        setModalMessage(`Failed to update ${type}.`);
        setStatusCode("error");
      }
      
      // } refetchDoctors();
    //   if(isSuccess){
    //     setIsModalOpen(true);
    //     setModalMessage("Doctor updated successfully");
    //     setStatusCode("success");
    //   } else {
    //     setIsModalOpen(true)
    //     setModalMessage(`Could not add ${type}`);
    //     setStatusCode("warning");
    //   }
    // } catch (error) {
    //   setIsModalOpen(true);
    //   setModalMessage("Server Error");
    //   setStatusCode("error");
    // }

    // switch (type) {
    //   case "doctor":
    //     isSuccess = await updateDoctor(id, updatedData);
    //     if (isSuccess) refetchDoctors();
    //     break;
    //   case "service":
    //     isSuccess = await updateService(id, updatedData);
    //     if (isSuccess) refetchServices();
    //     break;
    //   case "treatment":
    //     isSuccess = await updateTreatment(id, updatedData);
    //     if (isSuccess) refetchTreatments();
    //     break;
    //   default:
    //     break;
    // }

    
  };

  //Handle add facility functionality.
  // const handleAddFacility = async ( id) => {
    
  //   //To check the success status.
  //   let isSuccess;


  // }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Render data based on active tab to display it on screen.
  const renderData = () => {
    switch (activeTab) {
      case "doctors":
        return (
          <DataTable
            data={doctors}
            loading={doctorsLoading}
            error={doctorsError}
            type="doctor"
            onEdit={handleEdit}
          />
        );
      case "services":
        return (
          <DataTable
            data={services}
            loading={servicesLoading}
            error={servicesError}
            type="service"
            onEdit={handleEdit}
          />
        );
      case "treatments":
        return (
          <DataTable
            data={treatments}
            loading={treatmentsLoading}
            error={treatmentsError}
            type="treatment"
            onEdit={handleEdit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => handleTabChange("doctors")}
            className={`px-4 py-2 rounded ${activeTab === "doctors" ? "bg-amber-500 text-white" : "bg-white text-gray-700"}`}
          >
            Doctors
          </button>
          <button
            onClick={() => handleTabChange("services")}
            className={`px-4 py-2 rounded ${activeTab === "services" ? "bg-amber-500 text-white" : "bg-white text-gray-700"}`}
          >
            Services
          </button>
          <button
            onClick={() => handleTabChange("treatments")}
            className={`px-4 py-2 rounded ${activeTab === "treatments" ? "bg-amber-500 text-white" : "bg-white text-gray-700"}`}
          >
            Treatments
          </button>
        </div>

        <button
          onClick={toggleSearchBar}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Add
        </button>
      </div>

      {/* Search Bar */}
      {showSearchBar && (
        <div className="mb-6">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>
      )}

      {/* Data Display */}
      <div className="bg-white p-6 rounded shadow">
        {renderData()}
      </div>

      {/* Modal for Messages */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} statusCode={statusCode} message={modalMessage} />
    </div>
  );
}

export default ManageHospital;