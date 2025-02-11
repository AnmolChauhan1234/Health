import { useState } from "react";
import api from "../apiInstance";

function useUpdateService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateService = async (updatedData) => {
    setLoading(true);
    try {
      const response = await api.put("/hospital-management/add-service/", updatedData);
      setLoading(false);
      return true; // Success
    } catch (err) {
      setError(err);
      setLoading(false);
      return false; // Failure
    }
  };

  return { updateService, loading, error };
}

export default useUpdateService;