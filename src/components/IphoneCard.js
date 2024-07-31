import React from "react";
import "../styles.css";

export default function IphoneCard({iphone}) {
const handleError = (e) => {
  e.target.src = "favicon.png";
}

  return (
    <div key={iphone.id} className="phone-card">
      <img src={`images/${iphone.image}`} alt={iphone.title} onError={handleError} />
      <div className="phone-card-info">
        <h3 className="phone-card-title">{iphone.name}</h3>
        <span className="phone-card-extras">{iphone.processor}</span>
        <span className="phone-card-extras">{iphone.warranty}</span>
      </div>
    </div>
  );
}
