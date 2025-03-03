import React from "react";
import { useForm } from "react-hook-form";
import "./SellerInfoForm.css";

const SellerInfoForm = ({ handleChange }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Seller Info:", data);
        handleChange("sellerInfo", data);
    };

    return (
        <div className="step">
            <h2>Seller Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formGroup">
                    <label>Store Name</label>
                    <input
                        type="text"
                        {...register("storeName", { required: "Store Name is required" })}
                    />
                    {errors.storeName && <p className="error">{errors.storeName.message}</p>}
                </div>
                <div className="formGroup">
                    <label>GST Number</label>
                    <input
                        type="text"
                        {...register("gstNumber", { required: "GST Number is required" })}
                    />
                    {errors.gstNumber && <p className="error">{errors.gstNumber.message}</p>}
                </div>
                <div className="formGroup">
                    <label>Business Type</label>
                    <select {...register("businessType", { required: "Business Type is required" })}>
                        <option value="">Select</option>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                    </select>
                    {errors.businessType && <p className="error">{errors.businessType.message}</p>}
                </div>
            </form>
        </div>
    );
};

export default SellerInfoForm;