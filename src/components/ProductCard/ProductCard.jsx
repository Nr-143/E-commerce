import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";

import defaultImage from "../../assets/icons/06.jpg";
import "./ProductCards.css";

const ProductCard = ({ product, addToCart, addToWishlist, wishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const productImageRef = useRef(null);
  console.log("product", product)

  useEffect(() => {
    setIsWishlisted(wishlist?.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    addToWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

  useEffect(() => {
    if (product.offerEndTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const endTime = new Date(product.offerEndTime).getTime();
        const remainingTime = endTime - now;

        setTimeLeft(
          remainingTime <= 0
            ? "Offer Ended"
            : `${Math.floor((remainingTime / (1000 * 60 * 60)) % 24)}h 
               ${Math.floor((remainingTime / (1000 * 60)) % 60)}m 
               ${Math.floor((remainingTime / 1000) % 60)}s`
        );

        if (remainingTime <= 0) clearInterval(interval);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [product.offerEndTime]);

  return (
    <div className="product-card">
      {/* Wishlist Button */}
      <div className="wishlist-icon" onClick={handleWishlist}>
        <FaHeart
          size={20}
          className={`wishlist-heart ${isWishlisted ? "active" : ""}`}
        />
      </div>

      <Link to={`/product/${product.id}`} className="product-link">
        {/* Discount Badge & Timer */}
        {product.discount > 0 && <span className="discount-badge">{product.discount}% OFF</span>}
        {timeLeft && <span className="timer-badge">{timeLeft}</span>}

        {/* Lazy Loaded Image */}
        <img
          ref={productImageRef}
          src={defaultImage}
          className={`product-card-img ${imageLoaded ? "fade-in" : ""}`}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Product Info */}
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="brand">Brand: {product.brand}</p>
          <div className="price-info">
            {product.oldPrice && <p className="original-price">₹{product.oldPrice}</p>}
            <p className="selling-price">₹{product.price}</p>
          </div>
        </div>
      </Link>

      {/* Hover Overlay */}
      <div className="hover-overlay">
        <p className="description">{product.description || "No description available"}</p>
        <div className="rating-sold">
          <div className="rating-points">{product.ratings || 0} / 5</div>
          <div className="rating-stars" style={{ color: "#FFD700" }}>
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                className={`fa${i < Math.floor(product.ratings) ? "s" : "r"} fa-star star-icon`}
              />
            ))}
          </div>
          <div className="sold-info">{product.sold ? `${product.sold} sold` : "Not sold yet"}</div>
        </div>
      </div>


      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="btn btn-cart"
          style={{ backgroundColor: "#6A0DAD", color: "white" }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <FaShoppingCart className="btn-icon" /> Add to Cart
        </button>
        <button className="btn btn-buy"
          style={{ backgroundColor: "#FF6B35", color: "white" }}

        >
          <FaBolt className="btn-icon" /> Buy Now
        </button>
      </div>

    </div>
  );
};

export default ProductCard;