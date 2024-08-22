import React, { useState } from "react";
import "../styles.css";
import CustomPopup from "./Popup.js";

export default function PhoneCard({ phone, isCompared, toggleCompare }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleError = (e) => {
    e.target.src = "favicon.png";
  };
  return (
    <div key={phone.id} className="phone-card">
      <img
        src={`images/${phone.image}`}
        alt={phone.title}
        onError={handleError}
        onClick={() => setIsModalOpen(true)}
      />
      <h3 className="phone-card-title">{phone.name}</h3>
      <div className="phone-card-info">
        <span className="phone-card-extras">{phone.processor}</span>
        <span className="phone-card-extras">{phone.warranty}</span>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={isCompared}
          onChange={() => toggleCompare(phone.id)}
        ></input>
        <span className="slider">
          <span className="slider-label">
            {isCompared ? "In Compare" : "Add to Compare"}
          </span>
        </span>
      </label>
      <CustomPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        phone={phone}
      />
    </div>
  );
}
