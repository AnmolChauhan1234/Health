import { useState } from "react";
import api from "../apiInstance";

function useDeleteFacility () {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [successMsg, setsuccessMsg] = useState();

  const deleteFacility = async (facilityType , id) => {
    setIsDeleting(true);

    const apiEndPoint = `/hospital-management/delete-${facilityType}/`;

    //calling the api to delete.
    try {
      const response = await api.post(apiEndPoint , {id});
      if(response.status === 200) {
        console.log(response.data.message);
        setsuccessMsg(response.data.message);
        setDeleteError(null);
        return true;
      } else {
        setDeleteError(response.data.message || "Could not delete.");
        return false;
      }
    } catch (error) {
      setDeleteError(error || `Error Deleting ${facilityType}`);
      return false;
    } finally{
      setIsDeleting(false);
    }
  }

  return {deleteFacility ,isDeleting, deleteError , successMsg};
}

export default useDeleteFacility;