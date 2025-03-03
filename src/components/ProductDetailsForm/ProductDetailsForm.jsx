import React from "react";
import { useForm } from "react-hook-form";
import { categories } from "../../utils/common";
import "./ProductDetailsForm.css";

const ProductDetailsForm = ({ formData, handleChange, onNext }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: formData,
    });

    const categoryId = watch("categoryId");

    const onSubmit = (data) => {
        handleChange("productDetails", data);
        onNext();
    };

    return (
        <div className="step">
            <h2>Product Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formGroup">
                    <label>Product Name</label>
                    <input type="text" {...register("productName", { required: "Required" })} />
                    {errors.productName && <p className="error">{errors.productName.message}</p>}
                </div>

                <div className="formGroup">
                    <label>Category</label>
                    <select {...register("categoryId", { required: "Required" })}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}
                </div>

                <div className="formGroup">
                    <label>Amount ($)</label>
                    <input type="number" {...register("amount", { required: "Required", min: 1 })} />
                    {errors.amount && <p className="error">{errors.amount.message}</p>}
                </div>

                <div className="formGroup">
                    <label>Discount (%)</label>
                    <input type="number" {...register("discount", { min: 0, max: 100 })} />
                    {errors.discount && <p className="error">Discount must be between 0-100%</p>}
                </div>

                <div className="formGroup">
                    <label>Stock</label>
                    <input type="number" {...register("stock", { required: "Required", min: 1 })} />
                    {errors.stock && <p className="error">{errors.stock.message}</p>}
                </div>

                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default ProductDetailsForm;
