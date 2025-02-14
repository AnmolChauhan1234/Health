import { useState } from "react";
import api from "../apiInstance";

function getDetailsResult() {
  
  const [searchData, setsearchData] = useState();
  const [searchLoading, setsearchLoading] = useState(false);
  const [searchError, setsearchError] = useState(null);

  const getResult = async (id , type,  searchQuery) => {
    
    setsearchLoading(true);

    const endPoint = `/search-api/view-hospital-details/?id=${id}&type=${type}&query=${encodeURIComponent(searchQuery)}`;

    console.log("End point is:" , endPoint);

    try {
      const response = await api.get(endPoint);

      if(response.status === 200){
        
        setsearchData(response.data);
        // setsearchData({ab});
        // console.log("Response data is:" , response.data);
        console.log("get SearchResult api",searchData);
        setsearchError(null);
        return true;
      } else {
        setsearchError("Data did not receive.");
        return false;
      }

    } catch (error) {
      setsearchError(error);
      return false;
    } finally{
      setsearchLoading(true);
    }
  }

  return {searchData , searchError , searchLoading , getResult};
}

export default getDetailsResult;