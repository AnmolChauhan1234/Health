import { useState, useEffect } from "react";
import api from "../apiInstance";

function useFetchTreatments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/hospital-management/show-treatments-in-hospital/");
        setData(response.data.treatmentDetails);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error, refetch: () => setLoading(true) };
}

export default useFetchTreatments;