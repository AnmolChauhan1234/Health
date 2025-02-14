import axios from "axios";
import refreshToken from "./refreshToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

// Interceptor for response
api.interceptors.response.use(
  // Return successful response
  (response) => {
    return response;
  },

  // Handle errors
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token refresh logic)
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log("Attempting to refresh token.");

      try {
        console.log("Generating refresh token");
        const success = await refreshToken();
        if (success) {
          const newToken = sessionStorage.getItem("token");
          console.log("New token saved");
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

    // Allow 404 responses to pass through without being treated as errors
    if (error.response.status === 404) {
      return Promise.resolve(error.response); // Resolve the response instead of rejecting it
    }

    // Reject all other errors
    return Promise.reject(new Error(error));
  }
);

export default api;
