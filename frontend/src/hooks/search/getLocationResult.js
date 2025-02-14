import api from "../apiInstance";
import { useState } from "react";

function getLocationResult() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const[msg , setmsg] = useState();

  // /search-api/get-nearby-hospitals/?lat=YOUR_LATITUDE&lng=YOUR_LONGITUDE

  const fetchLocationResults = async (lat, lng, searchQuery, filterType) => {
    setloading(true);

    try {
      // const endp = `/search-api/get-nearby-hospitals/?lat=28.7041&lng=77.1025&search=${searchQuery}&search_type=${filterType}`;
      const endp = `/search-api/get-nearby-hospitals/?lat=${lat}&lng=${lng}&search=${searchQuery}&search_type=${filterType}`;
      console.log("api call to ", endp);

      // const response =await api.get(`/search-api/get-nearby-hospitals/?lat=28.7041&lng=77.1025`);

      const response = await api.get(`/search-api/get-nearby-hospitals`, {
        params: {
          lat,
          lng,
          search: searchQuery,
          search_type: filterType,
        },
      });
      // const response =await api.get(endp);

      if (response.status === 200) {
        setData(response.data); // Set the data if hospitals are found
        console.log("Response received:", response.data);
      } else if (response.status === 404) {
        // Handle the case where no hospitals are found
        console.log(response.data.message)
        setData([]); // Clear the data
        setmsg(response.data.message);
        // setError(response.data.message || "No nearby hospitals found"); // Set the error message
      } else {
        // Handle other unexpected status codes
        console.log("inside else")
        setError("Unexpected response from the server");
      }
    } catch (error) {
      console.log("error")
      setError("server error", error);
    } finally {
      setloading(false);
    }
  };
  return { data, loading, error, fetchLocationResults };
}

export default getLocationResult;
