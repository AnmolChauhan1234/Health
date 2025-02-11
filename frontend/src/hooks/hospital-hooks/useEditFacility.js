import {useState} from "react";
import api from "../apiInstance";

function useEditFacility () {

  //states for data processing.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //calling the api for edit facility.
    const editFacility = async (type , id , data) => {

      //loading status to true.
      setLoading(true);

      //setting data to send.
      const requestBody = {
        type: type,
        type_id: id,
        update_data : data
      }

      //api call.
      try {
        const response = await api.post("/hospital-management/update-facilities-in-hospital/", requestBody)

        if(response.status === 200){
          return true;
        } else{
          setError("No response received.")
          return false;
        }

      } catch (error) {
        setError(error);
        return false;
      } finally {
        setLoading(false);
      }
    }

    return {editFacility , loading , error};
}

export default useEditFacility;