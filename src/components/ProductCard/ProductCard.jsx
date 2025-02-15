import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/icons/06.jpg";
import "../ProductCard/ProductCards.css";

const ProductCard = ({ product, addToCart }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const productImageRef = useRef(null);

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
            <p>{product.deliveryFee > 0 ? `Delivery: ₹${product.deliveryFee}` : "Free Delivery"}</p>
          </div>
          <div className="rating-sold">
            <div className="rating-points">{product.ratings || 0} / 5</div>
            <div className="rating-stars desktop-only">{renderStars(product.ratings)}</div>
            <div className="sold-info">{product.sold || 0} sold</div>
          </div>
        </div>
      </Link>
      <div className="action-buttons action-buttons-row">
        <button className="btn btn-cart" onClick={e => {e.stopPropagation(); addToCart(product);}}>Add to Cart</button>
        <button className="btn btn-buy">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;

