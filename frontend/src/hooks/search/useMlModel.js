import api from "../apiInstance";
import { useState } from "react";

function useMlModel() {

  const [mlloading, mlsetLoading] = useState(false); // State to track loading status
  const [mlerror, mlsetError] = useState(null); // State to store errors
  const [mlmsg, setmlMsg] = useState(null); // State to store messages (e.g., 404 messages)

  const useMlapi = async (lat, lng, searchQuery, filterType) => {
    mlsetLoading(true);
    mlsetError(null); // Clear any previous errors
    setmlMsg(null); // Clear any previous messages

    try {
      const reqBody = {
        lat,
        lng,
        search: searchQuery,
        search_type: filterType,
      };

      // Make a POST request to the ML API
      const response = await api.post(`/ml_api/predict/`, reqBody);

      if (response.status === 200) {
        // setData(response.data); // Set the data if the request is successful
        setmlMsg("Success");
      }else {
        // Handle other unexpected status codes
        mlsetError("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error:", error);
      mlsetError("Server error: " + error.message); // Handle network or server errors
    } finally {
      mlsetLoading(false);
    }
  };

  return { mlloading, mlerror, mlmsg, useMlapi }; // Return the necessary states and function
}

export default useMlModel;
