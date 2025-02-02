import { CommonPathWay } from "./commonPathway"; // Ensure correct import

// Fetch Products API (GET Request)
export const fetchProducts = async () => {
  try {
    const response = await CommonPathWay("/products", "GET", null, null);
    return response?.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Add Product API (POST Request for Super Admin)
export const addProduct = async (productData) => {
  try {
    const response = await CommonPathWay("/products", "POST", null, productData, {
      "Content-Type": "application/json",
    });
    return response?.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
