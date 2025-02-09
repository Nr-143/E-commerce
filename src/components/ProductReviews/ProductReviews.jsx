import React, { useState } from "react";
import "./ProductReviews.css";

const ProductReviews = ({ reviews }) => {
  const [view, setView] = useState("summary"); 

  const calculateReviewStats = () => {
    const stats = Array(5).fill(0); 
    let totalRating = 0;
    reviews.forEach((review) => {
      stats[review.rating - 1] += 1;
      totalRating += review.rating;
    });
    const averageRating = totalRating / reviews.length;
    return { stats, averageRating };
  };

  const { stats, averageRating } = calculateReviewStats();

  // Function to assign colors to star ratings
  const getStarColor = (rating) => {
    switch (rating) {
      case 5:
        return "green"; // 5 stars = Green
      case 4:
        return "violet"; // 4 stars = Violet
      case 3:
        return "orange"; // 3 stars = Orange
      case 2:
        return "blue"; // 2 stars = Blue
      case 1:
        return "red"; // 1 star = Red
      default:
        return "gray"; // Default color
    }
  };

  return (
    <div className="product-reviews">
      <div className="reviews-nav">
        <button
          className={`nav-button ${view === "summary" ? "active" : ""}`}
          onClick={() => setView("summary")}
        >
          Overall Summary
        </button>
        <button
          className={`nav-button ${view === "details" ? "active" : ""}`}
          onClick={() => setView("details")}
        >
          Review Details
        </button>
      </div>

      {/* Only show average rating in summary view */}
      {view === "summary" && (
        <div className="review-summary" style={{ background: "white", borderRadius: "10px", marginTop: "10px" }}>
      <div className="average-rating" style={{gap:"10px"}}>
            <span style={{ color: "black" }}>Average Rating :</span>
            <div className="average-rating-display" >
              {/* Display average rating as 4/5 instead of stars */}
              <span style={{ color: "black", fontSize: "20px" }}>
                {Math.round(averageRating)}/{5}
              </span>
            </div>
            <span style={{ color: "green", fontSize: "14px" }}>({reviews.length} reviews)</span>
          </div>  
          <ul className="review-stats">
  {stats
    .reverse() // Reverse to display from 5-star to 1-star
    .map((count, index) => (
      <li key={index} className="review-stat" >
<span className="stat-star">
  {/* Display number inside a circle */}
  <div className="circle-rating" style={{ background: getStarColor(5 - index), border: getStarColor(5 - index)}}>
    {5 - index}
  </div>
  {/* Star icon with dynamic color based on the rating */}
  <span
    style={{
      fontSize: "16px"  // Adjust the size of the star
    }}
  >
    {" ⭐   reviews:"}
  </span>
</span>
        <span className="stat-count"  style={{color:"black"}}>
          {count} {count === 1 || count === 0 ? "member" : "members"}
        </span>
      </li>
    ))}
</ul>

        </div>
      )}

      {view === "details" && (
        <div className="review-details">
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div className="review" key={index}>
                <div className="review-header">
                  <p className="review-author">
                    {review.author}
                    <span style={{ fontWeight: 300 }}> ({review.date})</span>
                  </p>
                </div>
                <p className="review-text">"{review.comment}"</p>
                <p className="review-rating">
                  {Array(review.rating)
                    .fill("⭐")
                    .map((star, index) => (
                      <span key={index} style={{ color: getStarColor(review.rating) }}>
                        {star}
                      </span>
                    ))}
                  {" "}({review.rating}/5)
                </p>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
