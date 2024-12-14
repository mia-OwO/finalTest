import React, { useState } from "react";
import "./FloatingButton.css";

const FloatingButton = ({ mainIcon, subButtons = [], position = { bottom: 20, right: 20 } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const containerStyle = {
    position: "fixed",
    bottom: position?.bottom ?? 20,
    right: position?.right ?? 20,
  };

  return (
    <div className="floating-button-container" style={containerStyle}>
      <button className="main-button" onClick={toggleMenu} aria-label="Toggle sub buttons">
        {mainIcon || "☰"}
      </button>
      {isOpen && (
        <div className="sub-buttons">
          {subButtons.map((button) => (
            <button
              key={button.id || button.icon}
              className="sub-button"
              onClick={button.onClick}
              style={{ ...button.style }}
              aria-label={`Sub button ${button.icon}`}
            >
              {button.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
