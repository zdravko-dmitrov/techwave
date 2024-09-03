import React, { useState, useEffect } from "react";
import "../styles.css";
import PhoneCard from "./PhoneCard";

export default function PhonesGrid({ phones, compare, toggleCompare }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortState, setSortState] = useState("none");
  const [brand, setBrand] = useState("All Brands");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [currentNewInPage, setCurrentNewInPage] = useState(1);
  const [currentBestOffersPage, setCurrentBestOffersPage] = useState(1);
  const itemsPerPage = 4;

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

  const matchesAvailability = (phone, onlyAvailable) => {
    return !onlyAvailable || phone.available;
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
      matchesBrand(phone, brand) &&
      matchesSearchTerm(phone, searchTerm) &&
      matchesAvailability(phone, onlyAvailable)
  );

  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method: (a, b) => a.name.localeCompare(b.name) },
    descending: { method: (a, b) => b.name.localeCompare(a.name) },
  };

  filteredPhones.sort(sortMethods[sortState].method);

  const bestOffers = filteredPhones.filter((phone) => phone.promo === "offer");
  const newIn = filteredPhones.filter((phone) => phone.promo === "new");

  const totalNewInPages = Math.ceil(newIn.length / itemsPerPage);
  const totalBestOffersPages = Math.ceil(bestOffers.length / itemsPerPage);

  const startNewInIndex = (currentNewInPage - 1) * itemsPerPage;
  const paginatedNewIn = newIn.slice(
    startNewInIndex,
    startNewInIndex + itemsPerPage
  );

  const startBestOffersIndex = (currentBestOffersPage - 1) * itemsPerPage;
  const paginatedBestOffers = bestOffers.slice(
    startBestOffersIndex,
    startBestOffersIndex + itemsPerPage
  );

  const handleNextNewInPage = () => {
    if (currentNewInPage < totalNewInPages) {
      setCurrentNewInPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousNewInPage = () => {
    if (currentNewInPage > 1) {
      setCurrentNewInPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextBestOffersPage = () => {
    if (currentBestOffersPage < totalBestOffersPages) {
      setCurrentBestOffersPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousBestOffersPage = () => {
    if (currentBestOffersPage > 1) {
      setCurrentBestOffersPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="phones-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search phone..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="content-section">
        <div className="filter-section">
          <div className="filter-bar">
            <div className="filter-slot">
              <div className="filter-slot"></div>
              <label className="filer-titles">Show</label>
              <label className="checkbox-filter">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                />
                <span style={{ marginLeft: "2px" }}>Only available</span>
              </label>
              <label className="filer-titles">Sort by</label>
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

            <div className="filter-slot">
              <label className="filer-titles">Filter by</label>
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
              <button
                className="clear-filter"
                onClick={() => {
                  setOnlyAvailable(false);
                  setBrand("All Brands");
                  setSortState("none");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="phones-content">
          {loading ? (
            <div className="spinner">
              <div className="loading-icon"></div>
              <p className="loading-text">
                Searching for the perfect smartphone? 📱 Let's find your tech
                match! 🔍
              </p>
            </div>
          ) : (
            <>
              {searchTerm === "" && <h2>🔥BEST OFFERS</h2>}
              <div className="phones-grid">
                {paginatedBestOffers.map((phone) => (
                  <PhoneCard
                    phone={phone}
                    key={phone.id}
                    toggleCompare={toggleCompare}
                    isCompared={compare.includes(phone.id)}
                  />
                ))}
              </div>

              <div className="pagination">
                <button
                  onClick={handlePreviousBestOffersPage}
                  disabled={currentBestOffersPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentBestOffersPage} of {totalBestOffersPages}
                </span>
                <button
                  onClick={handleNextBestOffersPage}
                  disabled={currentBestOffersPage === totalBestOffersPages}
                >
                  Next
                </button>
              </div>

              {searchTerm === "" && <h2>🚨NEW IN</h2>}
              <div className="phones-grid">
                {paginatedNewIn.map((phone) => (
                  <PhoneCard
                    phone={phone}
                    key={phone.id}
                    toggleCompare={toggleCompare}
                    isCompared={compare.includes(phone.id)}
                  />
                ))}
              </div>

              <div className="pagination">
                <button
                  onClick={handlePreviousNewInPage}
                  disabled={currentNewInPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentNewInPage} of {totalNewInPages}
                </span>
                <button
                  onClick={handleNextNewInPage}
                  disabled={currentNewInPage === totalNewInPages}
                >
                  Next
                </button>
              </div>

              {filteredPhones.length === 0 && (
                <div>
                  <p className="no-result-text">
                    📱 We couldn't find any phones matching your search. <br />
                    Maybe it's time to check out some cool new phone cases
                    instead? 📱
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
      </div>
    </div>
  );
}
