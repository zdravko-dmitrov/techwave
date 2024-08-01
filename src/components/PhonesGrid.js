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
        {filteredPhones.map((phone) => (
          <PhoneCard phone={phone} key={phone.id}></PhoneCard>
        ))}
      </div>
    </div>
  );
}
