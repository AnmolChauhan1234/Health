import { useState, useEffect,useCallback } from "react";
import api from "../apiInstance";

function useFetchServices() {

  //states for saving data.
  const [serviceData, setServiceData] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);
  const [serviceError, setServiceError] = useState(null);
  

  //function for fetchData
  const fetchservice = useCallback( 

    async () => {
      setServiceLoading(true);
      setServiceError(null);

      //api calling
      try {
        const response = await api.get("/hospital-management/show-services-in-hospital/");

        if(response.status >= 200){
          
          //setting the data.
          setServiceData(response.data.serviceDetails);
          setServiceError(null);
          // console.log(response.data.serviceDetails)
        } else {
          setServiceError("response did not receive.");
        }
      } catch (error) {
        setServiceError(error || 'Server Error.');
      } finally{
        setServiceLoading(false);
      }
    } ,[]
  )

  //useEffect to propagate the changes if refetch is required.
  useEffect(() => {
    fetchservice();
  } , [fetchservice])


  return {serviceData , serviceLoading , serviceError , refetchServices: fetchservice};
}


export default useFetchServices;