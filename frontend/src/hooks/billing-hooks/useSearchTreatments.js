import { useState } from "react";
import debounce from "../debounce";
import api from "../apiInstance";

const useSearchTreatments = () => {
  const [treatmentSearchResults, setTreatmentSearchResults] = useState([]);
  const [isTreatmentSearching, setIsTreatmentSearching] = useState(false);

  const searchTreatments = debounce(async (query) => {
    if (!query || query.length < 2) {
      setTreatmentSearchResults([]);
      return;
    }

    setIsTreatmentSearching(true);
    try {
      const response = await api.get("/payments/search-treatments/", {
        params: { q: query },
      });

      if (response.data.treatments) {
        setTreatmentSearchResults(response.data.treatments);
      } else {
        setTreatmentSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching treatments:", error);
      setTreatmentSearchResults([]);
    } finally {
      setIsTreatmentSearching(false);
    }
  }, 300);

  return {
    treatmentSearchResults,
    isTreatmentSearching,
    searchTreatments,
  };
};

export default useSearchTreatments;