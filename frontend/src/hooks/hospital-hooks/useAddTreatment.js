import { useState } from "react";
import api from "../apiInstance";

function useUpdateTreatment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTreatment = async (updatedData) => {
    setLoading(true);
    try {
      const response = await api.put("/api/treatments", updatedData);
      setLoading(false);
      return true; // Success
    } catch (err) {
      setError(err);
      setLoading(false);
      return false; // Failure
    }
  };

  return { updateTreatment, loading, error };
}

export default useUpdateTreatment;