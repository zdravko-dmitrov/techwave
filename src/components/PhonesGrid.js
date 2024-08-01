import React, { useState, useEffect } from "react";
import "../styles.css";
import PhoneCard from "./PhoneCard";

export default function PhonesGrid() {
  const [phones, setPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("smartphones.json")
      .then((response) => response.json())
      .then((data) => setPhones(data))
      .catch(error => console.error('No results', error));
      
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPhones = phones.filter((phone) => 
    phone.name.toLowerCase().includes(searchTerm)
  );

  const bestOffers = filteredPhones.filter((phone) => phone.promo === "offer");
  const newIn = filteredPhones.filter((phone) => phone.promo === "new");

  return (
    <div>
      <input
        type="text"
        placeholder="Search phone..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <h2>🔥BEST OFFERS</h2>
      <div className="phones-grid">
        {bestOffers.map((phone) => (
          <PhoneCard phone={phone} key={phone.id}></PhoneCard>
        ))}
      </div>

      <h2>🚨NEW IN</h2>
      <div className="phones-grid">
        {newIn.map((phone) => (
          <PhoneCard phone={phone} key={phone.id}></PhoneCard>
        ))}
      </div>
    </div>
  );
}
