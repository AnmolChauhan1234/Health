import api from "../apiInstance";
import { useState } from "react";
function useAddBillDetails () {

  //stated
  const [addBillLoading, setaddBillLoading] = useState(false);
  const [addBillError, setaddBillError] = useState(null);
  const [addBillMessage, setaddBillMessage] = useState();

  const addBillApi = async (id , facility_id , facility_type) => {
    //id: bill id
    setaddBillLoading(true);
    setaddBillError(null);

    try {
      const response = await api.post("/payments/add-bill-details/", { id, facility_id , facility_type});

      if (response.status === 201) {
        setaddBillMessage(response.data.message || `${facility_type} added!`);
        setaddBillError(false);
        return {success: true, message: `${facility_type} added!`};
      } else {
        const errorMsg = response.data.error || `Could not add ${facility_type}`
        setaddBillError(response.data.error || `Could not add ${facility_type}`);
        return {success : false , message : errorMsg};
      }

    } catch (error) {

      const errorMsg = error.message || "Server did not respond.";
      setaddBillError(error.message || "Server did not respond.");
      return {success: false , message: errorMsg};

    } finally{
      setaddBillLoading(false);
    }
  }
  return {addBillLoading , addBillError , addBillMessage , addBillApi};
}

export default useAddBillDetails;