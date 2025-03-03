import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categorySpecifications } from "../../utils/common";

const SpecificationForm = ({ categoryId, formData, handleChange, onNext, onPrev }) => {
    const [specs, setSpecs] = useState([]);

    useEffect(() => {
        if (categoryId) {
            setSpecs(categorySpecifications[categoryId] || []);
        }
    }, [categoryId]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formData,
    });

    const onSubmit = (data) => {
        handleChange("specifications", data);
        onNext();
    };

    if (!categoryId) {
        return <p>Please select a category first.</p>;
    }

    return (
        <div className="step">
            <h2>Product Specifications</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {specs.length > 0 ? (
                    specs.map((spec) => (
                        <div key={spec.key} className="formGroup">
                            <label>{spec.label}</label>
                            {spec.type === "text" && <input type="text" {...register(spec.key, { required: "Required" })} />}
                            {spec.type === "select" && (
                                <select {...register(spec.key, { required: "Required" })}>
                                    <option value="">Select {spec.label}</option>
                                    {spec.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {errors[spec.key] && <p className="error">{errors[spec.key].message}</p>}
                        </div>
                    ))
                ) : (
                    <p>No specifications for this category.</p>
                )}
                <div className="formActions">
                    <button type="button" onClick={onPrev}>Back</button>
                    <button type="submit">Next</button>
                </div>
            </form>
        </div>
    );
};

export default SpecificationForm;
