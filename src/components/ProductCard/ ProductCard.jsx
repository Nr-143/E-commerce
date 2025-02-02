import React from "react";
import defaultImage from "../assets/default-product.jpg"; // Import default image

const ProductCard = ({ product }) => {
  return (
    <div className="col-6 col-md-3">
      <div className="product-card">
        {/* Product Image */}
        <img src={product.image || defaultImage} alt={product.name} className="product-image" />

        {/* Product Details */}
        <h4 className="product-name">{product.name}</h4>
        <p className="product-category"><i className="fas fa-list"></i> {product.category || "General"}</p>
        <p className="product-brand"><i className="fas fa-tag"></i> {product.brand || "No Brand"}</p>
        <p className="product-weight"><i className="fas fa-balance-scale"></i> {product.weight || "1kg"}</p>
        
        {/* Pricing */}
        <p className="product-price">
          {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>} ₹{product.price}
        </p>
        {product.discount > 0 && <p className="discount"><i className="fas fa-percentage"></i> {product.discount}% OFF</p>}

        {/* Ratings & Stock */}
        <p className="ratings"><i className="fas fa-star"></i> {product.ratings || "No Ratings"} ⭐ ({product.reviews || "0"} reviews)</p>
        <p className={`stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
          {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
        </p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
