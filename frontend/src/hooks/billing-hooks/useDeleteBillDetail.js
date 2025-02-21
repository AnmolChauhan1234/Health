import api from "../apiInstance";
import { useState } from "react";

function useDeleteBillDetail() {

  //states for data.
  const [isDeleting , setIsDeleting] = useState(false);

  const deleteBillDetail = async (id) => {

    setIsDeleting(true);

    try {
      const response = await api.delete("/payments/delete-bill-details/" , {id});

      if(response.status === 200){
        return {success: true , message: response.data.message};
      } else {
        return {success: false , message: "Bill Not found!"}
      }

    } catch (error) {
      console.log("Error deleting Bill Detail" , error);
      return {success: false , message: "server did not respond."}
    }
  }
  return {deleteBillDetail, isDeleting};

}

export default useDeleteBillDetail;