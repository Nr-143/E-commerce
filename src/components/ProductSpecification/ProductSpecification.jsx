import React from "react";
import "./ProductSpecification.css";

const ProductSpecification = ({ specifications }) => {
  if (!specifications || specifications.length === 0) {
    return <p>No specifications available.</p>;
  }

  const splitIndex = Math.ceil(specifications.length / 2); // Split into two columns

  return (
    <div className="product-specification">
      <h3>Specifications</h3>
      <div className="specification-columns">
        <ul>
          {specifications.slice(0, splitIndex).map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
        <ul>
          {specifications.slice(splitIndex).map((spec, index) => (
            <li key={index + splitIndex}>{spec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSpecification;
