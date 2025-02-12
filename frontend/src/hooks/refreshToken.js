import api from "./apiInstance";

const refreshToken = async () => {

  // api call to custom-refresh.
  try {
    const response = await api.post("/accounts/custom-refresh/" , {} , {
      withCredentials:true, //Ensuring cookies are sent with the request.
    });

    if(response.status === 200){
      const accessToken = response.data.access;
      sessionStorage.setItem('token', accessToken);
      console.log(response.data.message);
    } else{
      console.log("Access token refresh failed", response.data.details);
    }

  } catch (error) {
    console.error('Failed to generate the token.Login again.')
  }

};

export default refreshToken;