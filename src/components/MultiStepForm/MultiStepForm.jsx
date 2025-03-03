import React from "react";
import "./MultiStepForm.css";

const MultiStepForm = ({ step, handleNext, handlePrev, children }) => {
    return (
        <div className="multiStepForm">
            <div className="progressBar">
                <div className={`progress ${step >= 1 ? "active" : ""}`} />
                <div className={`progress ${step >= 2 ? "active" : ""}`} />
                <div className={`progress ${step >= 3 ? "active" : ""}`} />
            </div>

            {children}

            <div className="navigationButtons">
                {step > 1 && <button onClick={handlePrev}>Previous</button>}
                {step < 3 ? <button onClick={handleNext}>Next</button> : <button>Submit</button>}
            </div>
        </div>
    );
};

export default MultiStepForm;
