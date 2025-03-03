import React, { useState } from "react";
import ProductDetailsForm from "../../components/ProductDetailsForm/ProductDetailsForm.jsx";
import SpecificationForm from "../../components/SpecificationForm/SpecificationForm.jsx";
import SellerInfoForm from "../../components/SellerInfoForm/SellerInfoForm.jsx";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm.jsx";
import "./AddProductPage.css";

const AddProductPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        productDetails: {},
        specifications: {},
        sellerInfo: {},
    });

    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <div className="addProductPage">
            <h1>Add New Product</h1>
            <MultiStepForm step={step} handleNext={handleNext} handlePrev={handlePrev}>
                {step === 1 && (
                    <ProductDetailsForm
                        formData={formData.productDetails}
                        handleChange={handleChange}
                        onNext={handleNext}
                    />
                )}
                {step === 2 && (
                    <SpecificationForm
                        categoryId={formData.productDetails.categoryId}
                        formData={formData.specifications}
                        handleChange={handleChange}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
                {step === 3 && (
                    <SellerInfoForm
                        formData={formData.sellerInfo}
                        handleChange={handleChange}
                        onPrev={handlePrev}
                    />
                )}
            </MultiStepForm>
        </div>
    );
};

export default AddProductPage;
