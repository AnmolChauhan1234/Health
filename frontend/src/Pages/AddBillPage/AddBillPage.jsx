import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAddBillDetails from "../../hooks/billing-hooks/useAddBillDetails.js";
import {
  useSearchDoctors,
  useSearchServices,
  useSearchTreatments,
} from "../../hooks/billing-hooks/export.js";
import { Modal } from "../../components/index.js";

function AddBillPage({ onAddBill }) {

  const navigate = useNavigate();
  // States
  const [patient, setPatient] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [status, setStatus] = useState("pending");

  // Modal related states and close function.
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const closeModal = () => {
    setShowModal(false);
  };

  const location = useLocation();
  const patientName = location.state?.patientName || ""; // Default to empty string if undefined
  const billId = location.state?.billId || "";

  // Search hooks
  const { doctorSearchResults, isDoctorSearching, searchDoctors } =
    useSearchDoctors();
  const { serviceSearchResults, isServiceSearching, searchServices } =
    useSearchServices();
  const { treatmentSearchResults, isTreatmentSearching, searchTreatments } =
    useSearchTreatments();

  // Search query states
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [treatmentSearchQuery, setTreatmentSearchQuery] = useState("");

  // Dropdown visibility states
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showTreatmentDropdown, setShowTreatmentDropdown] = useState(false);

  // API hook for adding bill details
  const { addBillLoading, addBillError, addBillMessage, addBillApi } =
    useAddBillDetails();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const savedServices = JSON.parse(localStorage.getItem("services")) || [];
    const savedTreatments = JSON.parse(localStorage.getItem("treatments")) || [];
    setDoctors(savedDoctors);
    setServices(savedServices);
    setTreatments(savedTreatments);
  }, []);

  // Save data to localStorage whenever doctors, services, or treatments change
  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
    localStorage.setItem("services", JSON.stringify(services));
    localStorage.setItem("treatments", JSON.stringify(treatments));
  }, [doctors, services, treatments]);

  // Handle search input changes
  const handleDoctorSearchChange = (e) => {
    const query = e.target.value;
    setDoctorSearchQuery(query);
    setShowDoctorDropdown(true);
    searchDoctors(query);
  };

  const handleServiceSearchChange = (e) => {
    const query = e.target.value;
    setServiceSearchQuery(query);
    setShowServiceDropdown(true);
    searchServices(query);
  };

  const handleTreatmentSearchChange = (e) => {
    const query = e.target.value;
    setTreatmentSearchQuery(query);
    setShowTreatmentDropdown(true);
    searchTreatments(query);
  };

  // Handle selection of doctor, service, or treatment
  const handleSelectDoctor = async (doctor) => {
    setDoctors((prev) => [...prev, doctor]);
    setDoctorSearchQuery("");
    setShowDoctorDropdown(false);

    const { success, message } = await addBillApi(billId, doctor.id, "doctor");
    setShowModal(true);
    setModalMessage(message);
    setStatusCode(success ? "info" : "warning");
  };

  const handleSelectService = async (service) => {
    setServices((prev) => [...prev, service]);
    setServiceSearchQuery("");
    setShowServiceDropdown(false);

    const { success, message } = await addBillApi(billId, service.id, "service");
    setShowModal(true);
    setModalMessage(message);
    setStatusCode(success ? "info" : "warning");
  };

  const handleSelectTreatment = async (treatment) => {
    setTreatments((prev) => [...prev, treatment]);
    setTreatmentSearchQuery("");
    setShowTreatmentDropdown(false);

    const { success, message } = await addBillApi(billId, treatment.id, "treatment");
    setShowModal(true);
    setModalMessage(message);
    setStatusCode(success ? "info" : "warning");
  };

  // Handle form submission
  const handleSubmit = () => {
    if (doctors.length > 0 || services.length > 0 || treatments.length > 0) {
      setShowModal(true);
      setModalMessage("Bills added successfully!");
      setStatusCode("success");
    } else {
      setShowModal(true);
      setModalMessage("No items added.");
      setStatusCode("error");
    }

    //naviate to bills page after 2 seconds
    setTimeout(() => {
      navigate('/dashboard/bills/')
    }, 2000);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".doctor-dropdown") &&
        !e.target.closest(".service-dropdown") &&
        !e.target.closest(".treatment-dropdown")
      ) {
        setShowDoctorDropdown(false);
        setShowServiceDropdown(false);
        setShowTreatmentDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdowns on Esc key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setShowDoctorDropdown(false);
        setShowServiceDropdown(false);
        setShowTreatmentDropdown(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <>
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        message={modalMessage}
        statusCode={statusCode}
      />

      <div className="mb-6 p-5 bg-gray-white dark:bg-gray-800 rounded-md shadow-md">

        {/* Heading section starts here */}
        <h2 className="text-2xl ubuntu-medium mb-4 dark:text-amber-500 text-blue-500 text-center">
          Add New Bill
        </h2>
        {/* Heading section ends here */}

        {/* Underline div section starts here */}
        <div className="mx-auto border-[1px] border-gray-500 dark:border-gray-300 w-[80%] mb-4"></div>
        {/* Underline div section ends here */}

        <form className="space-y-4 py-2 pt-5 px-3 bg-gray-50 dark:bg-gray-800 shadow-md dark:shadow-gray-500 rounded-lg ubuntu-regular-italic">

          {/* Patient Name section starts here*/}
          <div>

            <label 
              className="block text-sm sm:text-lg ubuntu-medium mb-1 dark:text-white"
              htmlFor="patientName"
            >
              Patient Name
            </label>

            <input
              type="text"
              name="patientName"
              value={patientName}
              className="w-full px-3 py-2 border border-green-300 rounded dark:bg-gray-700  dark:text-gray-200 outline-none"
              readOnly
            />
          </div>
          {/* Patient Name section ends here */}

          {/* Doctor Search and additon section starts here*/}
          <div>
            <label 
              className="block text-sm sm:text-lg ubuntu-medium mb-1 dark:text-white"
              htmlFor="doctorName"
            >
              Doctor
            </label>
            {doctors.map((doctor, index) => (
              <input
                key={doctor.id}
                type="text"
                name="doctorName"
                value={doctor.name}
                className="w-full px-3 py-2 border border-green-400 rounded dark:bg-gray-700 mb-2 dark:text-gray-200 outline-none cursor-pointer"
                readOnly
              />
            ))}
            <input
              type="text"
              value={doctorSearchQuery}
              onChange={handleDoctorSearchChange}
              placeholder="Search doctors..."
              className="w-full px-3 py-2 border-[1px] outline-none rounded dark:bg-gray-700 border-amber-200 focus:border-amber-400 dark:text-gray-200"
            />
            {/* iterate over the already stored doctors. */}
            {showDoctorDropdown && doctorSearchQuery && (
              <div className="mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-blue-400 rounded-md shadow-lg dark:shadow-gray-600 z-10 doctor-dropdown dark:text-gray-200">
                {isDoctorSearching ? (
                  <p className="p-2 text-gray-600 dark:text-gray-400">
                    Searching...
                  </p>
                ) : doctorSearchResults.length > 0 ? (
                  doctorSearchResults.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => handleSelectDoctor(doctor)}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-cus "
                    >
                      {doctor.name}
                    </div>
                  ))
                ) : (
                  <p className="p-2 text-gray-600 dark:text-gray-400">
                    No doctors found.
                  </p>
                )}
              </div>
            )}
            {/* <button
              type="button"
              onClick={() => setDoctorSearchQuery("")}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              +
            </button> */}
          </div>
          {/* Doctors addition section ends here */}

          {/* Service Search and addition section starts here*/}
          <div>

            <label 
              className="block text-sm sm:text-lg ubuntu-medium mb-1 dark:text-white"
              htmlFor="service"
            >
              Services
            </label>

            {services.map((service, index) => (
              <input
                key={service.id}
                type="text"
                name="service"
                value={service.name}
                className="w-full px-3 py-2 border border-green-400 rounded dark:bg-gray-700 mb-2 dark:text-gray-200"
                readOnly
              />
            ))}
            <input
              type="text"
              value={serviceSearchQuery}
              onChange={handleServiceSearchChange}
              placeholder="Search services..."
              className="w-full px-3 py-2 border-[1px] outline-none rounded dark:bg-gray-700 border-amber-200 focus:border-amber-400 dark:text-gray-200"
            />
            {showServiceDropdown && serviceSearchQuery && (
              <div className="mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg dark:shadow-gray-600 z-10 service-dropdown dark:text-gray-300">
                {isServiceSearching ? (
                  <p className="p-2 text-gray-600 dark:text-gray-400">
                    Searching...
                  </p>
                ) : serviceSearchResults.length > 0 ? (
                  serviceSearchResults.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleSelectService(service)}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      {service.name} - ₹{service.cost}
                    </div>
                  ))
                ) : (
                  <p className="p-2 text-gray-600 dark:text-gray-400">
                    No services found.
                  </p>
                )}
              </div>
            )}
            {/* <button
              type="button"
              onClick={() => setServiceSearchQuery("")}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              +
            </button> */}
          </div>
          {/* Service Search and addition section ends here*/}

          {/* Treatment Search and addition section starts here*/}
          <div>
            <label 
              className="block text-sm font-medium mb-1 dark:text-white"
              htmlFor="treatment"
            >
              Treatments
            </label>
            {treatments.map((treatment, index) => (
              <input
                key={treatment.id}
                type="text"
                name="treatment"
                value={treatment.name}
                className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mb-2 dark:text-gray-200"
                readOnly
              />
            ))}
            <input
              type="text"
              value={treatmentSearchQuery}
              onChange={handleTreatmentSearchChange}
              placeholder="Search treatments ..."
              className="w-full px-3 py-2 border outline-none rounded border-amber-200 focus:border-amber-400 dark:text-gray-200 dark:placeholder:text-gray-400"
            />
            {showTreatmentDropdown && treatmentSearchQuery && (
              <div className="mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg dark:shadow-gray-600 z-10 treatment-dropdown">
                {isTreatmentSearching ? (
                  <p className="p-2 text-gray-600 dark:text-gray-400">
                    Searching...
                  </p>
                ) : treatmentSearchResults.length > 0 ? (
                  treatmentSearchResults.map((treatment) => (
                    <div
                      key={treatment.id}
                      onClick={() => handleSelectTreatment(treatment)}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-cus"
                    >
                      {treatment.name} - ₹{treatment.cost}
                    </div>
                  ))
                ) : (
                  <p className="p-2 text-gray-600 dark:text-gray-400">
                    No treatments found.
                  </p>
                )}
              </div>
            )}
            {/* <button
              type="button"
              onClick={() => setTreatmentSearchQuery("")}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              +
            </button> */}
          </div>
          {/* Treatment Search and addition section ends here*/}

          {/* Submit Button section starts here*/}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 dark:bg-amber-500 text-white ubuntu-bold-italic rounded hover:bg-blue-600 dark:hover:bg-amber-600 transition-cus cursor-pointer"
            >
              Submit Bill
            </button>
          </div>
          {/* Submit Button section ends here */}
        </form>
      </div>
    </>
  );
}

export default AddBillPage;