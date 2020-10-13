import React from "react";
import "./Table.scss";
 
function Table({ objects }) {
  return (
    <div className="table">
      {objects.map(({ country, cases }) => (
        <div key={country} className="row-container">
          <span className="live-country-name">{country}</span>
          <span className="live-cases">{cases}</span>
        </div>
      ))}
    </div>
  );
}

export default Table;
