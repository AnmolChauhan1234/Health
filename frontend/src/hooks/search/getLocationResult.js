import api from "../apiInstance";
import { useState } from "react";

function getLocationResult() {
  const [data, setData] = useState([])
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  // /search-api/get-nearby-hospitals/?lat=YOUR_LATITUDE&lng=YOUR_LONGITUDE

  const fetchLocationResults = async (lat, lng) => {

    setloading(true);

    try {

      const response =await api.get(`/search-api/get-nearby-hospitals/?lat=${lat}&lng=${lng}`);
      // const response =await api.get(`/search-api/get-nearby-hospitals/?lat=28.7041&lng=77.1025`);

      if(response.status === 200){
        console.log(response.data)
        setData(response.data);
        // setData(response.data[0]);
        // console.log(response.data[0])
        // setError(null);
        console.log("response received")
      }
      

    } catch (error) {
      setError(error);
    } finally{
      setloading(false);
    }
  }
  return {data, loading , error , fetchLocationResults};
}

export default getLocationResult;