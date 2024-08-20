import React from "react";
import "../styles.css";
import PhoneCard from "./PhoneCard";

export default function Compare({ phones, compare, toggleCompare, phone }) {
  return (
    <div>
      <h2 className="title">Compare</h2>
      <div className="compare">
        {compare.map((id) => {
          const phone = phones.find((phone) => phone.id === id);

          return (
            <div key={id}>
              <PhoneCard
                phone={phone}
                toggleCompare={toggleCompare}
                isCompared={true}
              />

              <div className="extras-compare">
                <p>
              
                <h3 className="phone-card-title">Parameters:</h3>
                </p>
                <ul className="key-parameters">
                  <li className="p-small">&#128073; {phone.brand}</li>
                  <li className="p-small">&#128073; {phone.key1}</li>
                  <li className="p-small">&#128073; {phone.key2}</li>
                  <li className="p-small">&#128073; {phone.key3}</li>
                  <li className="p-small">&#128073; {phone.key4}</li>
                  <li className="p-small">&#128073; {phone.key5}</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
