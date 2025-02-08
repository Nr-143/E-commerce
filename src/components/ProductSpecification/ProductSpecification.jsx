import React from "react";
import "./ProductSpecification.css";

const ProductSpecification = ({ specifications }) => {
  return (
    <div className="product-specification1">
      <h3>Specifications</h3>
      {specifications.map((category, categoryIndex) => (
        <div key={categoryIndex} className="spec-category">
          <h4>{category.category}</h4>
          <div className="spec-list">
            <ul>
              {category.specs.map((spec, specIndex) => (
                <li key={specIndex}>
                  {Object.keys(spec)[0]}: {Object.values(spec)[0]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecification;
