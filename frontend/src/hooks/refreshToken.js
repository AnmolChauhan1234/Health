import api from "./apiInstance";

const refreshToken = async () => {
  try {
    // Call the custom refresh endpoint
    const response = await api.post(
      "/accounts/custom-refresh/",
      {},
      {
        withCredentials: true, // Ensure cookies are sent
      }
    );

    if (response.status === 200) {
      // Save the new access token to sessionStorage
      const accessToken = response.data.access;
      sessionStorage.setItem("token", accessToken);

      console.log("New access token issued:", response.data.message);
      return true; // Token refresh successful
    } else {
      console.log("Access token refresh failed:", response.data.details);
      return false; // Token refresh failed
    }
  } catch (error) {
    console.error("Failed to refresh token. Login again:", error);
    return false; // Token refresh failed
  }
};

export default refreshToken;
