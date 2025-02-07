import React from "react";
import "./ProductReviews.css";

const ProductReviews = () => {
  return (
    <div className="product-reviews">
      <h3>Reviews</h3>
      <div className="review">
        <p className="review-text">
          "Great product! Highly recommend it for everyday use."
        </p>
        <p className="review-author">- John Doe</p>
      </div>
      <div className="review">
        <p className="review-text">
          "Not bad, but could use some improvements in build quality."
        </p>
        <p className="review-author">- Jane Smith</p>
      </div>
    </div>
  );
};

export default ProductReviews;
