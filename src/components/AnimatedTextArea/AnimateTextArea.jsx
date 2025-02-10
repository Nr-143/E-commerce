import React, { useState, useEffect } from "react";
import "./AnimatedTextArea.css";

const AnimatedTextArea = ({ setQuery, onEnterPress }) => {
  const PLACEHOLDERS = [
    "Find the best grocery deals ",
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

  const handleSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div className="input-with-image">
      <input
        className="animated-textarea"
        placeholder={currentText}
        onChange={(e) => setQuery(e?.target?.value)}
        onKeyDown={handleSubmit}
      />
      <button className="ai-search-btn-new" type="submit" onClick={handleSubmit}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default AnimatedTextArea;
