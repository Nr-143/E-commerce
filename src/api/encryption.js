import CryptoJS from "crypto-js";
import API from "../config";

export const encryptDataWithCryptoJS = (text) => {
  try {
    const key = CryptoJS.enc.Utf8.parse(API.secretKey);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return {
      encryptedData: encrypted.toString(),
      iv: iv.toString(CryptoJS.enc.Base64),
    };
  } catch (error) {
    console.error("Encryption failed:", error.message);
    throw new Error("Failed to encrypt data.");
  }
};
