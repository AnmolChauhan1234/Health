import {useState} from "react";
import api from "../apiInstance";

function useEditFacility () {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //calling the api for edit facility.
    const editFacility = async (type , id , data) => {

      setLoading(true);

      //setting data to send.
      const requestBody = {
        type: type,
        type_id: id,
        update_data : data
      }

      try {

        const response = await api.post("/hospital-management/update-facilities-in-hospital/", requestBody)

        //return success.
        if(response.status === 200){
          setLoading(false);
          return true;
        }


      } catch (error) {
        setError(error);
        setLoading(false);

        //return faliure
        return false;
      }
    }

    return {editFacility , loading , error};
}

export default useEditFacility;