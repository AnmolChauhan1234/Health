import api from "../apiInstance";
import { useState } from "react";

function useDeleteBillDetail() {

  //states for data.
  const [deletingIds, setDeletingIds] = useState([]);

  const deleteBillDetail = async (id) => {
    // Add the id to the deletingIds array
    setDeletingIds((prev) => [...prev, id]); 

    // console.log("api", id);

    try {
      const response = await api.delete("/payments/delete-bill-details/" , { data: { id } });

      if(response.status === 200){
        // console.log(response.data.message)
        return {success: true , message: response.data.message};
      } else {
        return {success: false , message: "Bill Not found!"}
      }

    } catch (error) {
      console.log("Error deleting Bill Detail" , error);
      return {success: false , message: "server did not respond."}
    } finally{
      // Remove the id from the deletingIds array
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id)); 
    }
  };

  // Check if a specific id is being deleted
  const isDeleting = (id) => deletingIds.includes(id);

  return {deleteBillDetail, isDeleting};

}

export default useDeleteBillDetail;