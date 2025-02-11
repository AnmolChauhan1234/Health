import React, { useState } from "react";
import {useFetchDoctors , useFetchServices ,  useFetchTreatements , useUpdateDoctor , useUpdateService , useUpdateTreatment, useEditFacility, useAddFacility} from '../../hooks/hospital-hooks/export'

import useAuthRedirect from '../../hooks/authRedirect'
import { DataTable,Modal,AddSearchBox } from "../../components";

function Manage() {

  // to authencticate the page.
  useAuthRedirect();

  // State for active tab
  const [activeTab, setActiveTab] = useState( ()=> {
    return localStorage.getItem('activeTab') || 'doctor';
  });

  // State for search bar visibility
  const [showSearchBar, setShowSearchBar] = useState(false);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");

  // Fetch data hooks
  const {doctorsData , doctorsLoading , doctorsError , refetchDoctors } = useFetchDoctors();
  const { serviceData , serviceLoading , serviceError , refetchServices} = useFetchServices();
  const {treatmentData, treatmentLoading, treatmentError, refetchTreatments} = useFetchTreatements();

  // console.log("Manage.jsx top" , doctorsData);

  // Update data hooks
  // const { updateDoctor } = useUpdateDoctor();
  // const { updateService } = useUpdateService();
  // const { updateTreatment } = useUpdateTreatment();

  //Update Doctor , services and treatment;
  const {addFacility} = useAddFacility();

  //Edit Doctor or services and treatment.
  const {editFacility} = useEditFacility();

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  // Handle search bar toggle
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Handle edit functionality for the facilities
  const handleEdit = async (type, id, updatedData) => {

    // let isSuccess = false;
    const isSuccess = await editFacility(type , id , updatedData);

    // console.log("inside handle edit of manage.jsx",type);

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
      case "doctor":
        return (
          <DataTable
            data={doctorsData}
            loading={doctorsLoading}
            error={doctorsError}
            type="doctor"
            onEdit={handleEdit}
          />
        );
      case "service":
        return (
          <DataTable
            data={serviceData}
            loading={serviceLoading}
            error={serviceError}
            type="service"
            onEdit={handleEdit}
          />
        );
      case "treatment":
        return (
          <DataTable
            data={treatmentData}
            loading={treatmentLoading}
            error={treatmentError}
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
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {['doctor', 'service', 'treatment'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded w-full sm:w-auto text-center ${
                activeTab === tab ? "bg-amber-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}s
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={toggleSearchBar}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      {/* Search Bar section starts her*/}
      {showSearchBar && (
        <div className="mb-6">
          <AddSearchBox type={activeTab} />
          {/* <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="w-full p-2 rounded border border-gray-300"
          /> */}
        </div>
      )}
      {/* Search Bar section ends here */}
      
      {/* Data Display */}
      <div className="bg-white p-6 rounded shadow">
        {renderData()}
      </div>

      {/* Modal for Messages */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} statusCode={statusCode} message={modalMessage} />
    </div>
  );
}

export default Manage;