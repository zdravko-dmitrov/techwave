import React from "react";
import "../styles.css";

function ErrorPopup({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
