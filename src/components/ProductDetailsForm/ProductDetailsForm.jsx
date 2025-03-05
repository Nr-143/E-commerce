import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./ProductDetailsForm.css";

const ProductDetailsForm = ({ formData, handleChange, onNext }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: formData,
    });

    const [sellingPrice, setSellingPrice] = useState(0);
    const [useAI, setUseAI] = useState(false); // State for AI image upload
    const [aiImages, setAiImages] = useState([]); // State for fetched AI images
    const [selectedImages, setSelectedImages] = useState([]); // State for selected images
    const [description, setDescription] = useState(""); // State for AI-generated description

    const originalPrice = watch("originalPrice");
    const discount = watch("discount");
    const productCode = watch("productCode");

    // Calculate selling price whenever originalPrice or discount changes
    useEffect(() => {
        if (originalPrice && discount) {
            const discountedPrice = originalPrice - (originalPrice * (discount / 100));
            setSellingPrice(discountedPrice.toFixed(2));
        } else {
            setSellingPrice(originalPrice || 0);
        }
    }, [originalPrice, discount]);

    // Fetch images and generate description when AI is enabled and product code is entered
    useEffect(() => {
        if (useAI && productCode) {
            fetchImages(productCode);
            generateDescription(productCode);
        }
    }, [useAI, productCode]);

    // Fetch images from Open Food Facts API
    const fetchImages = async (barcode) => {
        try {
            const response = await axios.get(
            );
            const images = response.data.product?.images || [];
            const imageUrls = Object.values(images)
                .filter((img) => img.sizes?.medium)
                .map((img) => ``)
                .slice(0, 8); // Limit to 8 images
            setAiImages(imageUrls);
        } catch (error) {
            console.error("Failed to fetch images:", error);
            setAiImages([]);
        }
    };

    // Generate description using Goose AI API
    const generateDescription = async (barcode) => {
        try {
            const prompt = `Generate a detailed product description for a product with barcode ${barcode}.`;
           
            setDescription(response.data.choices[0].text.trim());
        } catch (error) {
            console.error("Failed to generate description:", error);
            setDescription("");
        }
    };

    // Handle image selection
    const handleImageSelect = (imageUrl) => {
        if (selectedImages.includes(imageUrl)) {
            setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
        } else {
            setSelectedImages([...selectedImages, imageUrl]);
        }
    };

    const onSubmit = (data) => {
        data.sellingPrice = sellingPrice; // Add selling price to form data
        data.images = selectedImages; // Add selected images to form data
        data.description = description; // Add AI-generated description to form data
        handleChange("productDetails", data);
        onNext();
    };

    return (
        <div className="step">
            <h2>Product Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* First Phase */}
                <div className="phase">
                    <h3>Product Information</h3>
                    <div className="formGroup">
                        <label>Product Name</label>
                        <input type="text" {...register("productName", { required: "Required" })} />
                        {errors.productName && <p className="error">{errors.productName.message}</p>}
                    </div>
                    <div className="formGroup">
                        <label>Product Code</label>
                        <input type="text" {...register("productCode", { required: "Required" })} />
                        {errors.productCode && <p className="error">{errors.productCode.message}</p>}
                    </div>
                    <div className="formGroup">
                        <label>Original Price ($)</label>
                        <input
                            type="number"
                            {...register("originalPrice", { required: "Required", min: 1 })}
                        />
                        {errors.originalPrice && <p className="error">{errors.originalPrice.message}</p>}
                    </div>
                    <div className="formGroup">
                        <label>Discount (%)</label>
                        <input
                            type="number"
                            {...register("discount", { min: 0, max: 100 })}
                        />
                        {errors.discount && <p className="error">Discount must be between 0-100%</p>}
                    </div>
                    <div className="formGroup">
                        <label>Selling Price ($)</label>
                        <input
                            type="number"
                            value={sellingPrice}
                            readOnly
                        />
                    </div>
                    <div className="formGroup">
                        <label>Stock</label>
                        <input
                            type="number"
                            {...register("stock", { required: "Required", min: 1 })}
                        />
                        {errors.stock && <p className="error">{errors.stock.message}</p>}
                    </div>
                </div>

                {/* Second Phase */}
                <div className="phase">
                    <h3>Warranty & File Upload</h3>
                    <div className="formGroup">
                        <label>Warranty (Months)</label>
                        <input
                            type="number"
                            {...register("warranty", { min: 0 })}
                        />
                        {errors.warranty && <p className="error">Warranty must be a positive number</p>}
                    </div>
                    <div className="formGroup">
                        <label>Upload Warranty File</label>
                        <div className="uploadBox">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                {...register("warrantyFile")}
                            />
                            <p>Click to upload or drag and drop warranty file</p>
                        </div>
                    </div>
                </div>

                {/* Third Phase */}
                <div className="phase">
                    <h3>Product Images</h3>
                    <div className="formGroup">
                        <label>Upload Images</label>
                        <div className="uploadBox">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                {...register("images")}
                            />
                            <p>Click to upload or drag and drop images</p>
                        </div>
                    </div>
                    <div className="formGroup">
                        <label>Use AI for Image Upload</label>
                        <div className="aiToggle">
                            <button
                                type="button"
                                className={`aiButton ${useAI ? "active" : ""}`}
                                onClick={() => setUseAI(!useAI)}
                            >
                                {useAI ? "AI Enabled" : "Enable AI"}
                            </button>
                        </div>
                    </div>
                    {useAI && (
                        <div className="aiImages">
                            <h4>AI-Fetched Images</h4>
                            <div className="imageGrid">
                                {aiImages.map((imageUrl, index) => (
                                    <div
                                        key={index}
                                        className={`imageItem ${selectedImages.includes(imageUrl) ? "selected" : ""}`}
                                        onClick={() => handleImageSelect(imageUrl)}
                                    >
                                        <img src={imageUrl} alt={`AI Fetched Image ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Description Box */}
                <div className="formGroup descriptionBox">
                    <label>Product Description</label>
                    <textarea
                        {...register("description", { required: "Required" })}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a detailed description of the product"
                        rows="4"
                    />
                    {errors.description && <p className="error">{errors.description.message}</p>}
                </div>

                {/* Buttons */}
                <div className="formActions">
                    <button type="submit">Next</button>
                </div>
            </form>
        </div>
    );
};

export default ProductDetailsForm;