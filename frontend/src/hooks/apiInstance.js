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
  // Successful response
  (response) => response,

  // Error handling
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token refresh logic)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      console.log("Attempting to refresh token.");

      try {
        // Call the refresh token function
        const success = await refreshToken();
        if (success) {
          // Retrieve the new token from sessionStorage
          const newToken = sessionStorage.getItem("token");

          // Update the Authorization header with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          // Retry the original request with the new token
          return api(originalRequest);
        } else {
          // Token refresh failed, clear storage and redirect to login
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "/auth/register";
          return Promise.reject(new Error("Token refresh failed"));
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear storage and redirect to login
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/auth/register";
        return Promise.reject(refreshError);
      }
    }

    // Handle 404 errors (optional)
    if (error.response?.status === 404) {
      return Promise.resolve(error.response); // Resolve the response instead of rejecting it
    }

    // Reject all other errors
    return Promise.reject(error);
  }
);

export default api;
