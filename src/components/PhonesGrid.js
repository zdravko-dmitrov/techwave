import React, { useState, useEffect } from "react";
import "../styles.css";
import PhoneCard from "./PhoneCard";

export default function PhonesGrid() {
  const [phones, setPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("smartphones.json")
      .then((response) => response.json())
      .then((data) => setPhones(data))
      .catch((error) => console.error("No results", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after filtering is done
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timer);
    }
  }, [loading, searchTerm]);

  const filteredPhones = phones.filter((phone) =>
    phone.name.toLowerCase().includes(searchTerm)
  );

  const bestOffers = filteredPhones.filter((phone) => phone.promo === "offer");
  const newIn = filteredPhones.filter((phone) => phone.promo === "new");

  const noResults = filteredPhones.length === 0;

  return (
    <div>
      <input
        type="text"
        placeholder="Search phone..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      {loading ? (
        <div className="spinner">
        <div className="loading-icon"></div>
        <p className="loading-text">Searching for the perfect smartphone? 📱 Let's find your tech match! 🔍</p>
      </div>
      ) : (
        <>
          {searchTerm === "" && <h2>🔥BEST OFFERS</h2>}
          <div className="phones-grid">
            {bestOffers.map((phone) => (
              <PhoneCard phone={phone} key={phone.id} />
            ))}
          </div>

          {searchTerm === "" && <h2>🚨NEW IN</h2>}
          <div className="phones-grid">
            {newIn.map((phone) => (
              <PhoneCard phone={phone} key={phone.id} />
            ))}
          </div>

          {noResults && (
            <div>
              <p className="no-result-text">📱 We couldn't find any phones matching your search. <br />
              Maybe it's time to check out some cool new phone cases instead? 📱</p>
              <button className="modal-close-btn" onClick={() => setSearchTerm("")}>Yeah, sure</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
