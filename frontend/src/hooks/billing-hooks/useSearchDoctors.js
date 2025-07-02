import { useState } from "react";
import debounce from "../debounce";
import api from "../apiInstance";


const useSearchDoctors = () => {
  const [doctorSearchResults, setDoctorSearchResults] = useState([]);
  const [isDoctorSearching, setIsDoctorSearching] = useState(false);

  const searchDoctors = debounce(async (query) => {

    if (!query || query.length < 2) {
      setDoctorSearchResults([]);
      return;
    }

    setIsDoctorSearching(true);
    try {
      const response = await api.get("/payments/search-doctors/", {
        params: { q: query },
      });

      if (response.data.doctors) {
        setDoctorSearchResults(response.data.doctors);
        // console.log(response.data.doctors)
      } else {
        setDoctorSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching doctors:", error);
      setDoctorSearchResults([]);
    } finally {
      setIsDoctorSearching(false);
    }
  }, 300);

  return {
    doctorSearchResults,
    isDoctorSearching,
    searchDoctors,
  };
};

export default useSearchDoctors;