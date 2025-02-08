import { useState } from "react"
import api from "./apiInstance";

const useUpdateProfile = () => {

  //settting the states for isupdateing and the error filed.
  const[isUpdating , setIsUpdating] = useState(false);
  const [updateError , setUpdateError]  = useState(null);

  //function for api call
  const updateProfile = async (file) => {
    setIsUpdating(true);
    
    try {
      
      //calling the api.
      const response =await api.patch("/profiles/update/" , file);

      //checking response.
      if(response.data === true){
        return true;
      }

    } catch (error) {

      setUpdateError(error || "An error occured" )
      return false;

    } finally{
      setIsUpdating(false);
    }
  };

  return {isUpdating , updateError ,updateProfile };
}

export default useUpdateProfile;