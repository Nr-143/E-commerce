import React, { useState, useEffect } from "react";
import "./AnimatedTextArea.css";
import { useNavigate } from "react-router-dom";

const mockSuggestions = [
  "Fresh Apples from Local Farms",
  "Organic Oranges - Vitamin C Boost",
  "Ripe Bananas - Rich in Potassium",
  "Full Cream Milk - 1 Liter Pack",
  "Whole Wheat Bread - Healthy Choice",
  "Discounted Rice Offers",
  "Best Quality Olive Oil",
  "Eggs - Farm Fresh",
  "Shampoo with Natural Ingredients",
  "Toothpaste - Complete Care",
];

const AnimatedTextArea = ({ setQuery, value }) => {
  const [localQuery, setLocalQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Typing Animation Effect
  const PLACEHOLDERS = [
    "Find the best grocery deals",
    "Shop fresh vegetables and fruits",
    "Discover exclusive discounts",
  ];
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (charIndex < PLACEHOLDERS[currentIndex].length) {
        setCurrentText((prev) => prev + PLACEHOLDERS[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentText("");
          setCharIndex(0);
          setCurrentIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        }, 1500);
      }
    }, Math.random() * 40 + 50);
    return () => clearTimeout(timeoutId);
  }, [charIndex, currentIndex, PLACEHOLDERS]);

  // Show suggestions based on input
  useEffect(() => {
    if (localQuery.trim().length > 1) {
      const filtered = mockSuggestions.filter((item) =>
        item.toLowerCase().includes(localQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [localQuery]);

  // Handle Search
  const handleSearch = (searchTerm) => {
    setLocalQuery(searchTerm);
    setQuery(searchTerm);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      handleSearch(localQuery);
    }
  };

  return (
    <div className="search-container">
      {/* Search Input */}
      <div className="input-with-image">
        <input
          className="animated-textarea"
          placeholder={currentText}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleSubmit}
          onFocus={() => setShowSuggestions(true)}
        />
        <button className="ai-search-btn-new" type="submit" onClick={handleSubmit}>
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSearch(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnimatedTextArea;
