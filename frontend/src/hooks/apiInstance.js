import axios from "axios";
import refreshToken from "./refreshToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  //Sending cookies along with the request.
  
});

//interceptor for request.
api.interceptors.request.use(
  //handling config i.e the files sent.
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },

  //handle errors via Promise.reject(error);
  (error) => {
    return Promise.reject(new Error(error));
  }
);

//interceptor for response.
api.interceptors.response.use(
  //return successfull response.
  (response) => {
    console.log("response received", response)
    return response;
  },

  //Error or 401 handling.
  async (error) => {
    console.log("error occured," , error);
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log("attempting to refersh token.")

      try {
        console.log("Generating refresh token");
        const success = await refreshToken();
        if (success) {
          const newToken = sessionStorage.getItem("token");
          console.log("new token saved");
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (error) {
        console.error("Token Refresh failed", error);

        // Clear storage and redirect
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/auth/register";
      }
    }

    return Promise.reject(new Error(error));
  }
);

export default api;
