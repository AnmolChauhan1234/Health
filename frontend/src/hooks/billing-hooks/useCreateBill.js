import api from "../apiInstance";
import { useState } from "react";
function useCreateBill () {

  //stated
  const [createBillLoading, setcreateBillLoading] = useState(false);
  const [createBillError, setcreateBillError] = useState(null);
  const [createBillMessage, setcreateBillMessage] = useState();

  const createBillapi = async (id) => {

    setcreateBillLoading(true);
    setcreateBillError(null);
    setcreateBillMessage(null);

    try {
      const response = await api.post("/payments/create-bill/", {
        id: id
      });

      if (response.status === 201) {
        setcreateBillMessage("Patient added successfully.");
        setcreateBillError(false);
        return {success: true , message: "Patient added successfully."};
      } else {
        setcreateBillError(response.data.detail||"Could not add patient");
        const errorMsg = response.data.detail || "Could not add patient";
        // console.log(response.data.detail);
        return {status: false , message: errorMsg};
      }
    } catch (error) {

      setcreateBillError(error.message || "Server did not respond.");
      const errorMsg = error.message || "Server did not respond.";
      return { success: false, message: errorMsg };
      
    } finally{
      setcreateBillLoading(false);
    }
  }
  return {createBillLoading , createBillMessage , createBillError , createBillapi};
}

export default useCreateBill;