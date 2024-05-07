import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  // Filter countries based on search query
  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search countries..."
      />

      {/* Display filtered countries */}
      <div className="country-list">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default CountryList;
