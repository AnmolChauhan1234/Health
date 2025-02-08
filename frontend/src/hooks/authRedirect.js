import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  //checking for authentication
  useEffect(
    () => 
      {
        if (!isAuthenticated) {
          navigate("/auth/register");
        }
      }, [isAuthenticated, navigate]
  );

  // Return this if the component needs to wait for it
  return {isAuthenticated};
  
};


export default useAuthRedirect;