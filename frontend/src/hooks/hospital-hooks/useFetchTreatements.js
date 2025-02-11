import { useState, useEffect , useCallback} from "react";
import api from "../apiInstance";

function useFetchTreatments() {

  //states for saving data.
  const [treatmentData, setTreatmentData] = useState([]);
  const [treatmentLoading, setTreatmentLoading] = useState(true);
  const [treatmentError, setTreatmentError] = useState(null);

  //function for fetchData
  const fetchtreatment = useCallback(async () => {
    setTreatmentLoading(true);
    setTreatmentError(null);

    //api calling
    try {
      const response = await api.get(
        "/hospital-management/show-treatments-in-hospital/"
      );

      if (response.status >= 200) {
        //setting the data.
        setTreatmentData(response.data.treatmentDetails);
        setTreatmentError(null);
        // console.log(response.data.treatmentDetails);
      } else {
        setTreatmentError("response did not receive.");
      }
    } catch (error) {
      setTreatmentError(error || "Server Error.");
    } finally {
      setTreatmentLoading(false);
    }
  }, []);

  //useEffect to propagate the changes if refetch is required.
  useEffect(() => {
    fetchtreatment();
  }, [fetchtreatment]);

  return {
    treatmentData,
    treatmentLoading,
    treatmentError,
    refetchTreatments: fetchtreatment,
  };
}


export default useFetchTreatments;
