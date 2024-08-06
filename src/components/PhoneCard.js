import React, { useState } from "react";
import "../styles.css";
import CustomPopup from './Popup.js';

export default function PhoneCard({phone}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleError = (e) => {
    e.target.src = "favicon.png";
  }
  return (
    <div key={phone.id} className="phone-card" onClick={() => setIsModalOpen(true)}>
      <img src={`images/${phone.image}`} alt={phone.title} onError={handleError} />
      <div className="phone-card-info">
        <h3 className="phone-card-title">{phone.name}</h3>
        <span className="phone-card-extras">{phone.processor}</span>
        <span className="phone-card-extras">{phone.warranty}</span>
      </div>
      <CustomPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} phone={phone} />
    </div>
  );
}
