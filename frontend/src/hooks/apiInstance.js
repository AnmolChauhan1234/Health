import axios from 'axios';
import refreshToken from './refreshToken';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{
    "Content-Type": "application/json",
  },
  //Sending cookies along with the request.
  withCredentials: true, 
})

//interceptor for request.
api.interceptors.request.use(

  //handling config i.e the files sent.
  (config) => {
    const token = sessionStorage.getItem('token');
    if(token){
      config.headers["Authorization"] = `Bearer ${token}`;
    } 
    return config;
  }, 

  //handle errors via Promise.reject(error);
  (error) => {
    return Promise.reject(error);
  }
);

//interceptor for response.
api.interceptors.response.use(

  //return successfull response.
  (response) => {
    return response;
  },

  //Error or 401 handling.
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        const newToken = sessionStorage.getItem('token');
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error("Token Refresh failed", error);
      }
    }

    return Promise.reject(error);
  }

)

export default api;