import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000, 
});

export const CommonPathWay = async (url, method, params = null, data = null, headers = {}) => {
  try {
    const response = await apiClient({
      url,
      method,
      headers,
      params,
      data,
    });
    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export default apiClient;
