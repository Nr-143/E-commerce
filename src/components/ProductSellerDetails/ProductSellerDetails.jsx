import React from "react";
import { FaStore, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import "./ProductSellerDetails.css";

const ProductSellerDetails = ({ seller }) => {
  if (!seller || seller.length === 0) {
    return <p className="no-seller">Seller information not available.</p>;
  }

  const { company, location, rating } = seller[0]; // Extract first seller object

  return (
    <div className="seller-card">
      <div className="seller-info">
        <p>
          <FaStore className="icon" aria-label="Store Icon" />{" "}
          <strong>Name : </strong> {company}
        </p>
        <p>
          <FaMapMarkerAlt className="icon" aria-label="Location Icon" />{" "}
          <strong>Location : </strong> {location}
        </p>
        <p>
          <FaStar className="icon star" aria-label="Star Icon" />{" "}
          <strong>Rating : </strong> {rating} / 5
        </p>
      </div>
    </div>
  );
};

export default ProductSellerDetails;
