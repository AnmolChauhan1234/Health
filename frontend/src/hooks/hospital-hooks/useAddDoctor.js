import { useState } from "react";
import api from "../apiInstance";

function useAddDoctor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDoctor = async (doctorId) => {
    setLoading(true);

    try {
      
      const response = await api.post("/hospital-management/add-doctor/" , updatedData);

      setLoading(false);
      return true; // Success
      
    } catch (err) {
      setError(err);
      setLoading(false);
      return false; // Failure
    }
  };

  return { updateDoctor, loading, error };
}

export default useAddDoctor;