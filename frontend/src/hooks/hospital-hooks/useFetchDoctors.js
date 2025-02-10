import { useState, useEffect } from "react";
import api from "../apiInstance";

function useFetchDoctors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/hospital-management/show-doctors-in-hospital/");

        //setting the response to data.
        setData(response.data.doctorDetails);

        //tests.
        // console.log(response.data.doctorDetails);
        // const safeData = Array.isArray(data) ? data : [];
        // setData(safeData);
        // console.log(safeData)
        
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

export default useFetchDoctors;