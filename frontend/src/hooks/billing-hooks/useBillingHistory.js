import { useState } from "react";
import api from "../apiInstance";

function useBillingHistory() {

  //States to set data.
  const [billHistory , setBillHistory] = useState([]);
  const [message, setmessage] = useState();
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  //function for api call
  const fetchBillHistory = async () => {
    setloading(true);
    seterror(null);

    try {

      const response = await api.get("/history/show-history/");

      if (response.status === 200) {
        setBillHistory(response.data.history);
        // console.log(response.data.history);
        setmessage("History fetched successfully!");
        seterror(null);
      } else {
        console.log("error")
        seterror("Error receiving data.")
      }

    } catch (error) {
      console.log("server did not respond.")
      seterror(error || "Server did not respond.")
    } finally{
      setloading(false);
    }
  }
  return {billHistory , loading , message , error , refetchHistory: fetchBillHistory};
}

export default useBillingHistory;