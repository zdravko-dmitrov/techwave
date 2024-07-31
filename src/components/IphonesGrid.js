import React, { useState, useEffect } from "react";
import "../styles.css";
import IphoneCard from "./IphoneCard";

export default function IphonesGrid() {
  const [iphones, setIphones] = useState([]);

  useEffect(() => {
    fetch("iphones.json")
      .then((response) => response.json())
      .then((data) => setIphones(data));
  }, {});

  return (
    <div className="phones-grid">
      {iphones.map((iphone) => (
        <IphoneCard iphone={iphone} key={iphone.id}></IphoneCard>
     
      ))}
    </div>
  );
}
