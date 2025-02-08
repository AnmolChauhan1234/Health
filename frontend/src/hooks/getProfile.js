import { useCallback, useEffect, useState } from "react"
import api from './apiInstance'

const useGetProfile = () => {

  //states to store the data.
  const [profileData , setProfileData] = useState(null);
  const [errorProfile, setError] = useState(null);
  const [loadingProfile, setLoading] = useState(false);

  //function to fetch the api.
  const fetchProfile = useCallback( async () => {

    //setting the loading on to show to user.
    setLoading(true);
    setError(null);

    try {
      //calling the api
      const response =await api.get("/profiles/view-profile/");

      //response processing
      if (response.status === 200) {
        
        // storing the profile data.
        console.log(response.data);
        setProfileData(response.data);
        
      } else {
        setError("Error gettign the data.")
      }
    } catch (error) {
      setError(error || "An error occured" )
    } finally{
      setLoading(false);
    }
  } , [] )


  //using the useEffect to call the fetchProfile
  useEffect( () => {
    fetchProfile();
  } , [fetchProfile])

  return {profileData , loadingProfile , errorProfile, refetchProfile: fetchProfile};
}


export default useGetProfile;