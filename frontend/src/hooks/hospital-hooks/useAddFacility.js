import { useState } from "react";

function useAddFacility() {
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);

  const addFacility = async (facilityType , id) => {
    setLoading(true);

    const requestUrl = `/hospital-management/add-${facilityType}/`;
    
    try {
      const response = await api.post(requestUrl , id);
      
      if(response.status === 200){
        setLoading(false);
        setError(null);
        return true;
      } else{
        setError("Error in request body");
        setLoading(false);
        return false;
      }

    } catch (error) {
      setError(error);
      setLoading(false);
      return false;
    }
  }

  return {addFacility , loading , error};
}

export default useAddFacility;