import React, { useState, useEffect } from "react";
import "../styles.css";
import PhoneCard from "./PhoneCard";

export default function PhonesGrid() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    fetch("smartphones.json")
      .then((response) => response.json())
      .then((data) => setPhones(data));
  }, {});

  return (
    <div className="phones-grid">
      {phones.map((phone) => (
        <PhoneCard phone={phone} key={phone.id}></PhoneCard>
     
      ))}
    </div>
  );
}
