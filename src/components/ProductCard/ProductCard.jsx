import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import defaultImage from "../../assets/icons/06.jpg";
import "../ProductCard/ProductCards.css";

const ProductCard = ({ product, addToCart, addToWishlist, wishlist }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const productImageRef = useRef(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const isInWishlist = wishlist ? wishlist.some(item => item.id === product.id) : false;
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
        setTimeLeft(remainingTime <= 0 ? "Offer Ended" :
          `${Math.floor((remainingTime / (1000 * 60 * 60)) % 24)}h ${Math.floor((remainingTime / (1000 * 60)) % 60)}m ${Math.floor((remainingTime / 1000) % 60)}s left`
        );
        if (remainingTime <= 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [product.offerEndTime]);

  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fa${i < Math.floor(rating) ? 's' : 'r'} fa-star star-icon`} />
  ));

  return (
    <div className="product-card">
      <div className="wishlist-icon" onClick={handleWishlist}>
        <FaHeart
          size={22}
          style={{
            color: isWishlisted ? "#FF6B35" : "#ccc",
            transition: "color 0.3s",
          }}
        />
      </div>
      <Link to={`/product/${product.id}`} className="product-link">
        {product.discount > 0 && <span className="discount-badge">{product.discount}% OFF</span>}
        {timeLeft && <span className="timer-badge">{timeLeft}</span>}
        <img ref={productImageRef} src={defaultImage} className="product-card-img" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="brand"><strong>Brand:</strong> {product.brand}</p>
          <div className="price-info">
            {product.oldPrice && <p className="original-price">₹{product.oldPrice}</p>}
            <p className="selling-price">₹{product.price}</p>
          </div>
          <div className="delivery-info">
            <p className="deliveryFee"><strong>Delivery:</strong> <span  style={{color:"green", fontWeight:"lighter"}}>{product.deliveryFee > 0 ? `₹${product.deliveryFee}` : "Free"} | {product.deliveryDays ? `${product.deliveryDays} days` : "Varies"} </span></p>
            <p className="seller-name"><strong>Seller:</strong><span style={{ color: "green", fontWeight: "lighter" }}>{product.sellerName || "Authorized Seller"} </span> </p>
          </div>
          <div className="rating-sold">
            <div className="rating-points">{product.ratings || 0} / 5</div>
            <div className="rating-stars desktop-only" style={{ color: "#FFD700" }}>{renderStars(product.ratings)}</div>
            <div className="sold-info">{product.sold || 0} sold</div>
          </div>
        </div>
      </Link>
      <div className="action-buttons action-buttons-row">
        <button className="btn btn-cart" style={{ background: "#1B1F3B", color: "white" }} onClick={e => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
        <button className="btn btn-buy" style={{ background: "#FF6B35", color: "white" }}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
