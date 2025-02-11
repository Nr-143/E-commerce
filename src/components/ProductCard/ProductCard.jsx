import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/icons/06.jpg"; // Default Image if product image is unavailable
import "../ProductCard/ProductCards.css";

const ProductCard = ({ product, addToCart }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const productImageRef = useRef(null);
  const cartIconRef = useRef(null);

  useEffect(() => {
    if (product.offerEndTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const endTime = new Date(product.offerEndTime).getTime();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
          setTimeLeft("Offer Ended");
          clearInterval(interval);
        } else {
          const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [product.offerEndTime]);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the Link from triggering
    setIsAnimating(true);
    const productImage = productImageRef.current;
    const cartIcon = cartIconRef.current;

    // Ensure both product image and cart icon are available
    if (!productImage || !cartIcon) {
      setIsAnimating(false); // Reset the animation state
      return;
    }

    // Get the position of the cart icon
    const cartPosition = cartIcon.getBoundingClientRect();
    const productRect = productImage.getBoundingClientRect();
    const deltaX = cartPosition.left - productRect.left;
    const deltaY = cartPosition.top - productRect.top;

    // Move the product image to the cart
    productImage.style.transition = "transform 1s ease-in-out";
    productImage.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // After animation ends, reset the image position
    setTimeout(() => {
      setIsAnimating(false);
      productImage.style.transform = ""; // Reset position
      addToCart(product); // Call function to add product to cart
    }, 1000); // Match this with your animation duration
  };

  const handleBuyNow = (e) => {
    e.stopPropagation(); // Prevent the Link from triggering
    // Handle Buy Now logic here
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star star-icon" />);
    }

    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt star-icon" />);
    }

    while (stars.length < 5) {
      stars.push(<i key={`empty-${stars.length}`} className="far fa-star star-icon" />);
    }

    return stars;
  };

  return (
    <div className="product-card">
      {/* Link wrapping only the product image and name */}
<Link to={`/product/${product.id}`}>
  {/* Discount Badge */}
  {product.discount > 0 && (
    <div className="discount-section">
      <span className="discount-badge">{product.discount}% OFF</span>
    </div>
  )}

  {timeLeft && (
    <div className="discount-section">
      <span className="timer-badge ">{timeLeft}</span>
    </div>
  )}

  {/* Product Image */}
  <img
    ref={productImageRef}
    src={defaultImage}
    className={`product-card-img ${isAnimating ? "move" : ""}`}
    alt={product.name}
  />

  <div className="card-body">
    {/* Product Name */}
    <h5 className="card-title">{product.name}</h5>

    {/* Brand */}
    <p className="brand"><strong>Brand:</strong> {product.brand}</p>

    {/* Price Section */}
    <div className="price-info">
      {product.oldPrice && <p className="original-price">₹{product.oldPrice}</p>}
      <p className="selling-price">₹{product.price}</p>
    </div>

    {/* Delivery Info */}
    <div className="delivery-info">
      {product.deliveryFee && product.deliveryFee > 0 ? (
        <p className="delivery-fee">
          <i className="fas fa-truck-moving"></i> Delivery: ₹{product.deliveryFee}
        </p>
      ) : (
        <p className="free-delivery">
          <i className="fas fa-truck"></i> Free Delivery
        </p>
      )}
    </div>

    {/* Rating & Sold Count */}
    <div className="rating-sold">
      {/* Mobile View - Rating as Points */}
      <div className="rating">
        <span className="rating-points">{product.ratings || 0} / 5</span>
      </div>

      {/* Desktop View - Show Star Ratings */}
      <div className="rating-stars">
        <span className="desktop-rating">
          {renderStars(product.ratings)}
        </span>
      </div>

      <div className="sold-info">
        <i className="fas fa-user" /> <span>{product.sold || 0} sold</span>
      </div>
    </div>
  </div>
</Link>  {/* Make sure this is the closing of the <Link> component */}

{/* Action Buttons */}
<div className="action-buttons">
  <button
    className="btn btn-cart"
    style={{ background: "#FF6B35", color: "white" }}
    onClick={handleAddToCart}
  >
    Add to Cart
  </button>
  <button
    className="btn btn-buy"
    style={{ background: "#1B1F3B", color: "white" }}
    onClick={handleBuyNow}
  >
    Buy Now
  </button>
</div>

  </div>
  );
};

export default ProductCard;
