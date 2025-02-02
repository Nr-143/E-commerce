import axios from "axios";
import API from "../config";
import { encryptDataWithCryptoJS } from "./encryptionUtils"; // Import encryption method

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API.apiUrl, // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Before Sending Request)
apiClient.interceptors.request.use(
  async (config) => {
    try {
      let accessToken = localStorage.getItem("accessKey");

      // If token is expired, refresh it
      if (!accessToken) {
        accessToken = await getAccessToken();
        localStorage.setItem("accessKey", accessToken);
      }

      // Encrypt the token before sending
      const encryptedToken = encryptDataWithCryptoJS(accessToken);

      config.headers.Authorization = `Bearer ${encryptedToken.encryptedData}`;
      config.headers["x-iv"] = encryptedToken.iv; // Pass IV separately for decryption

      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handling Errors)
apiClient.interceptors.response.use(
  (response) => response.data, // Return only the data
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Access token expired, refreshing...");

      try {
        const newAccessToken = await getAccessToken();
        localStorage.setItem("accessKey", newAccessToken);

        error.config.headers.Authorization = `Bearer ${encryptDataWithCryptoJS(newAccessToken).encryptedData}`;

        return apiClient(error.config); // Retry request with new token
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
