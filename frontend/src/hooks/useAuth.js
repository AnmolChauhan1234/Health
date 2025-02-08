import { useEffect,useState } from "react";
import api from "./apiInstance";

const useAuth = async () => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect( () => {

    const checkAuth = async () => {

      try {
        const response = await api.get("/accounts/isAuth/");

        const { isAuthenticated, message } = response.data;

        //display message.
        console.log(message);

        //setIsauthencticated
        setIsAuthenticated(isAuthenticated);

      } catch (error) {
        console.error("Server did not respond \n", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return {isAuthenticated};

};

export default useAuth;
