import api from "../apiInstance";
import { useState } from "react";

function getLocationResult() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const[msg , setmsg] = useState(null);

  // /search-api/get-nearby-hospitals/?lat=YOUR_LATITUDE&lng=YOUR_LONGITUDE

  const fetchLocationResults = async (lat, lng, searchQuery, filterType) => {
    setloading(true);
    setError(null);
    setmsg(null);

    try {
      // const endp = `/search-api/get-nearby-hospitals/?lat=28.5672&lng=77.21&search=${searchQuery}&search_type=${filterType}`;
      const endp = `/search-api/get-nearby-hospitals/?lat=${lat}&lng=${lng}&search=${searchQuery}&search_type=${filterType}`;
      // console.log("api call to ", endp);

      // const response =await api.get(`/search-api/get-nearby-hospitals/?lat=28.7041&lng=77.1025`);

      // const response = await api.get(`/search-api/get-nearby-hospitals`, {
      //   params: {
      //     lat,
      //     lng,
      //     search: searchQuery,
      //     search_type: filterType,
      //   },
      // });
      const response =await api.get(endp);

      if (response.status === 200) {
        // Set the data if hospitals are found
        setData(response.data); 
        setmsg(response.data.msg);
        // console.log("Response received:", response.data);
      } else if (response.status === 404) {

        // Handle the case where no hospitals are found
        // console.log(response.data.message)
        setData([]); // Clear the data
        setmsg(response.data.message);

      } else {
        // Handle other unexpected status codes
        setError(response.data.error || "Unexpected response from the server");
        setmsg(response.data.msg);
      }
    } catch (error) {
      console.log("error")
      setError("server error", error);
    } finally {
      setloading(false);
    }
  };
  return {msg, data, loading, error, fetchLocationResults };
}

export default getLocationResult;


