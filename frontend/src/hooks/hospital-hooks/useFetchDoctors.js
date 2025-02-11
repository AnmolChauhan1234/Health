import { useState, useEffect, useCallback } from "react";
import api from "../apiInstance";

function useFetchDoctors() {

  //states for saving data.
  const [doctorsData, setDoctorsData] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [doctorsError, setDoctorsError] = useState(null);
  

  //function for fetchData
  const fetchDoctors = useCallback( 
    async () => {
      setDoctorsLoading(true);
      setDoctorsError(null);

      //api calling
      try {
        const response = await api.get("/hospital-management/show-doctors-in-hospital/");

        if(response.status >= 200){
          
          //setting the data.
          setDoctorsData(response.data.doctorDetails);
          setDoctorsError(null);
          // console.log(response.data.doctorDetails)
        } else {
          setDoctorsError("response did not receive.");
        }
      } catch (error) {
        setDoctorsError(error || 'Server Error.');
      } finally{
        setDoctorsLoading(false);
      }
    } ,[]
  )

  //useEffect to propagate the changes if refetch is required.
  useEffect(() => {
    fetchDoctors();
  } , [fetchDoctors])


  return {doctorsData , doctorsLoading , doctorsError , refetchDoctors: fetchDoctors};

}

export default useFetchDoctors;
