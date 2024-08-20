import React, { useState, useEffect } from "react";
import "../styles.css";
import PhoneCard from "./PhoneCard";

export default function PhonesGrid({ phones, compare, toggleCompare }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortState, setSortState] = useState("none");
  const [brand, setBrand] = useState("All Brands");

  // const [sortAv, setSortAv] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setLoading(true);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setLoading(true);
  };

  const matchesBrand = (phone, brand) => {
    return (
      brand === "All Brands" ||
      phone.brand.toLowerCase() === brand.toLowerCase()
    );
  };

  const matchesSearchTerm = (phone, searchTerm) => {
    return phone.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, searchTerm]);

  const filteredPhones = phones.filter(
    (phone) =>
      matchesBrand(phone, brand) && matchesSearchTerm(phone, searchTerm)
  );

  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method: (a, b) => a.name.localeCompare(b.name) },
    descending: { method: (a, b) => b.name.localeCompare(a.name) },
  };

  filteredPhones.sort(sortMethods[sortState].method);

  //  const avMethods = {
  //   true: { method: () => {
  //     // console.log(true)
  //     phones.filter((phone) => phone.available === true)
  //   } },
  //   false: { method: () => {
  //     console.log(false)
  //     return phones;
  //   }},
  // };

  // filteredPhones.filter(avMethods[sortAv].method);

  const bestOffers = filteredPhones.filter((phone) => phone.promo === "offer");
  const newIn = filteredPhones.filter((phone) => phone.promo === "new");
  return (
    <div>
      {/* <label htmlFor="available">
          <input
            type="checkbox"
            onChange={ () => setSortAv(!sortAv)}
            value="available"
            id="available"
          />
          <span style={{color: "black"}}>Only available</span>
        </label> */}

      <input
        type="text"
        placeholder="Search phone..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Filter by</label>
          <select
            className="filter-dropdown"
            value={brand}
            onChange={handleBrandChange}
          >
            <option>All Brands</option>
            <option>iPhone</option>
            <option>Samsung</option>
            <option>Huawei</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Sort by</label>
          <select
            className="filter-dropdown"
            defaultValue={"DEFAULT"}
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              None
            </option>
            <option value="ascending">Name(A to Z)</option>
            <option value="descending">Name(Z to A)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="spinner">
          <div className="loading-icon"></div>
          <p className="loading-text">
            Searching for the perfect smartphone? 📱 Let's find your tech match!
            🔍
          </p>
        </div>
      ) : (
        <>
          {searchTerm === "" && <h2>🔥BEST OFFERS</h2>}
          <div className="phones-grid">
            {bestOffers.sort().map((phone) => (
              <PhoneCard
                phone={phone}
                key={phone.id}
                toggleCompare={toggleCompare}
                isCompared={compare.includes(phone.id)}
              />
            ))}
          </div>

          {searchTerm === "" && <h2>🚨NEW IN</h2>}
          <div className="phones-grid">
            {newIn.map((phone) => (
              <PhoneCard
                phone={phone}
                key={phone.id}
                toggleCompare={toggleCompare}
                isCompared={compare.includes(phone.id)}
              />
            ))}
          </div>

          {filteredPhones.length === 0 && (
            <div>
              <p className="no-result-text">
                📱 We couldn't find any phones matching your search. <br />
                Maybe it's time to check out some cool new phone cases instead?
                📱
              </p>
              <button
                className="modal-close-btn"
                onClick={() => setSearchTerm("")}
              >
                Yeah, sure
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
