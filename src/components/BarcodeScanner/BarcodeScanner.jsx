import React, { useState, useEffect } from "react";
import "./BarcodeScanner.css";

const BarcodeInput = () => {
    const [barcode, setBarcode] = useState("");
    const [productDetails, setProductDetails] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedDescription, setGeneratedDescription] = useState("");  // ✅ State for AI-generated description

    const handleFetchProduct = async () => {
        if (!barcode.trim()) return;
        setLoading(true);
        setProductDetails(null);
        setError("");
        setGeneratedDescription(""); // Reset description on new search

        try {
            const response = await fetch(
            );
            const data = await response.json();
            console.log("Fetched Data:", data);

            if (data.status === 1) {
                setProductDetails(data.product);
            } else {
                setError("Product not found.");
            }
        } catch (err) {
            console.error("Error fetching product details:", err);
            setError("Failed to fetch product details.");
        }

        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFetchProduct();
    };

    const generateDescription = async (product) => {
        if (!product) return;
        const requestBody = {
            prompt: `Provide a concise and engaging description for the product "${product.product_name}". Include key ingredients: ${product.ingredients_text}. Keep it simple and informative.`,
            max_tokens: 100, // Optimized for brevity
            temperature: 0.6  // Slightly lower for more factual results

        };


        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer `,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log("AI Response:", data);

            // If AI gives a response, print it
            if (data.choices && data.choices.length > 0) {
                console.log("AI Generated Description:", data.choices[0].text.trim());
            } else {
                console.error("No valid response from AI.");
            }

            setGeneratedDescription(data.choices?.[0]?.text || "No description available.");
        } catch (error) {
            console.error("Error fetching description from GooseAI API:", error);
            setGeneratedDescription("Failed to generate description.");
        }
    };

    // ✅ Generate description when `productDetails` is updated
    useEffect(() => {
        if (productDetails) {
            generateDescription(productDetails);
        }
    }, [productDetails]);

    return (
        <div className="barcode-scanner-container">
            <h2>Enter Barcode Code</h2>
            <form onSubmit={handleSubmit} className="barcode-input-form">
                <input
                    type="text"
                    placeholder="Enter barcode here..."
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="barcode-input"
                />
                <button type="submit" className="submit-btn">
                    Fetch Product
                </button>
            </form>

            {loading && <p className="loading-message">Loading product details...</p>}
            {error && <p className="error-message">{error}</p>}

            {productDetails && (
                <div className="product-details">
                    <h3>{productDetails.product_name || "Product Name Not Available"}</h3>
                    <p><strong>Description:</strong> {generatedDescription}</p>
                    <p><strong>Brand:</strong> {productDetails.brands || "Not available"}</p>
                    <p><strong>Expiration Date:</strong> {productDetails.expiration_date || "Not provided"}</p>
                    <p><strong>Quantity:</strong> {productDetails.quantity || "Not provided"}</p>
                    <p><strong>Packaging:</strong> {productDetails.packaging || "Not provided"}</p>
                    <p><strong>Categories:</strong> {productDetails.categories || "Not provided"}</p>
                    <p><strong>Ingredients:</strong> {productDetails.ingredients_text || "Not provided"}</p>
                    <p><strong>Nutrition Grade:</strong> {productDetails.nutrition_grades ? productDetails.nutrition_grades.toUpperCase() : "Not provided"}</p>
                    <p><strong>Seller:</strong> {productDetails.seller || "Not available"}</p>

                    <div className="images-container">
                        {productDetails.image_url && (
                            <img src={productDetails.image_url} alt="Main Product" className="product-image" />
                        )}
                        {productDetails.image_front_url && (
                            <img src={productDetails.image_front_url} alt="Front" className="product-image" />
                        )}
                        {productDetails.image_ingredients_url && (
                            <img src={productDetails.image_ingredients_url} alt="Ingredients" className="product-image" />
                        )}
                        {productDetails.image_nutrition_url && (
                            <img src={productDetails.image_nutrition_url} alt="Nutrition" className="product-image" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BarcodeInput;
