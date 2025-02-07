import React from "react";
import "../GroceryCart/GroceryCard.css";  // Ensure correct file reference
import defaultImage from "../../../assets/icons/06.jpg";  // Default Image

const GroceryCard = ({ product }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star" style={{ color: "#FFD700" }} />);
    }

    // Render half star if applicable
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt" style={{ color: "#FFD700" }} />);
    }

    // Render empty stars (up to 5)
    while (stars.length < 5) {
      stars.push(<i key={`empty-${stars.length}`} className="far fa-star" style={{ color: "#FFD700" }} />);
    }

    return stars;
  };

  return (
    <div className="grocery-card">
      <div className="card">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="discount-badge">{product.discount}% OFF</span>
        )}

        <img src={defaultImage} className="grocery-card-img" alt={product.name} />
        
        <div className="card-body">
          {/* Product Name */}
          <h5 className="card-title">{product.name}</h5>

          {/* Brand and Category in same row */}
          <div className="product-info">
            <p className="brand"><strong>Brand:</strong> {product.brand}</p>
          </div>

          {/* Original Price, Discount, and Selling Price */}
          <div className="price-info">
            <p className="original-price text-muted"><strong>₹{product.oldPrice}</strong></p>
            <p className="selling-price text-success"><strong>₹{product.price}</strong></p>
          </div>

          {/* Rating and Sold Info */}
          <div className="rating-sold">
            <div className="rating">
              <strong>Rating: </strong> {renderStars(product.ratings)}
            </div>

            {/* Human Icon and Sold Items */}
            <div className="sold-info">
              <i className="fas fa-user" style={{ marginRight: "5px" }}></i>
              <strong>{product.sold} sold</strong>
            </div>
          </div>

          {/* Add to Cart and Buy Now buttons */}
          <div className="action-buttons">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryCard;
