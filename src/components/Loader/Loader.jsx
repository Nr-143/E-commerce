import React, { useState } from "react";
import "./Loader.css"; // We'll create this CSS file for styling

const Loader = ({ onRetry, onCancel }) => {
  const [loading, setLoading] = useState(true); // State to manage loading status

  const handleRetry = () => {
    setLoading(true); // Show the loader again
    onRetry(); // Trigger the retry function (e.g., re-fetch data)
  };

  const handleCancel = () => {
    setLoading(false); // Hide the loader
    onCancel(); // Trigger the cancel action (e.g., go back to the previous page)
  };

  return (
    <div className="loader-container">
      {loading ? (
        <>
          <div className="spinner">
            <div className="spinner-circle"></div>
          </div>
          <p className="loading-text">Loading...</p>
          <div className="buttons-container">
            <button className="retry-button" onClick={handleRetry}>
              Retry
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading Cancelled</p>
      )}
    </div>
  );
};

export default Loader;
