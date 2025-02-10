import { useState, useEffect } from "react";
import api from "../apiInstance";

function useFetchServices() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/hospital-management/show-services-in-hospital/");
        setData(response.data.serviceDetails);
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

export default useFetchServices;