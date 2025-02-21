import { useState } from "react";
import debounce from "../debounce";
import api from "../apiInstance";

const useSearchServices = () => {
  const [serviceSearchResults, setServiceSearchResults] = useState([]);
  const [isServiceSearching, setIsServiceSearching] = useState(false);

  const searchServices = debounce(async (query) => {
    if (!query || query.length < 2) {
      setServiceSearchResults([]);
      return;
    }

    setIsServiceSearching(true);
    try {
      const response = await api.get("/payments/search-services/", {
        params: { q: query },
      });

      if (response.data.services) {
        setServiceSearchResults(response.data.services);
      } else {
        setServiceSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching services:", error);
      setServiceSearchResults([]);
    } finally {
      setIsServiceSearching(false);
    }
  }, 300);

  return {
    serviceSearchResults,
    isServiceSearching,
    searchServices,
  };
};

export default useSearchServices;