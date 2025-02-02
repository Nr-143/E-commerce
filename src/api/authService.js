import axios from "axios";
import API from "../config";
import { encryptDataWithCryptoJS } from "./encryptionUtils";

export const getAccessToken = async () => {
  try {
    const response = await axios.post(`${API.apiUrl}/v1/getAccessKey`, {}, {
      headers: {
        Authorization: "TytMb6ekKz8LMrEFvva07RR7SDjA9",
      },
    });

    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    throw new Error("Token request failed.");
  }
};
