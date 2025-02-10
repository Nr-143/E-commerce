import React from "react";
import defaultImage from "../../assets/icons/06.jpg"; // Default Image if product image is unavailable
import "../ProductCard/ProductCards.css"
const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star star-icon" />);
    }

    // Render half star if applicable
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt star-icon" />);
    }

    // Render empty stars (up to 5)
    while (stars.length < 5) {
      stars.push(<i key={`empty-${stars.length}`} className="far fa-star star-icon" />);
    }

    return stars;
  };

  return (
    <div className="product-card">
      {/* Discount Badge */}
      {product.discount > 0 && <span className="discount-badge">{product.discount}% OFF</span>}

      {/* Product Image */}
      <img
        src={ defaultImage}
        className="product-card-img"
        alt={product.name}
      />

      <div className="card-body">
        {/* Product Name */}
        <h5 className="card-title">{product.name}</h5>

        {/* Brand */}
        <p className="brand"><strong>Brand:</strong> {product.brand}</p>

        {/* Price Section */}
        <div className="price-info">
          <p className="original-price">₹{product.oldPrice}</p>
          <p className="selling-price">₹{product.price}</p>
        </div>

        {/* Rating & Sold Count */}
        <div className="rating-sold">
          <div className="rating">{renderStars(product.ratings)}</div>
          <div className="sold-info">
            <i className="fas fa-user" /> <span>{product.sold} sold</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
  <button className="btn btn-cart" style={{background:"#FF6B35",color:"white"}}>Add to Cart</button>
  <button className="btn btn-buy" style={{background:"#1B1F3B",color:"white"}}>Buy Now</button>
</div>

      </div>
    </div>
  );
};

export default ProductCard;
