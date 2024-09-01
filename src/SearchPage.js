import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";
const xmljs = require("xml-js");
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://lhncbc.nlm.nih.gov/REST/drugs.xml?name=${searchTerm}`
      );
      if (response.data) {
        const result = 
        xmljs.xml2json(xmlData, { compact: true, spaces: 2 })
        // parser.parseString(response.data, (err, result) => {
        //   if (err) {
        //     setError("Error parsing the XML response");
        //     return;
        //   }
        // });
        const test = JSON.stringify(result, null, 2);
        setError("");
      } else {
        setError("No results found.");
      }
    } catch (error) {
      setError("Error fetching data.");
    }
  };

  return (
    <div className="container">
      <div className="button-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a drug..."
          className="search-bar"
        />
        <button onClick={handleSearch} className="button-primary">
          Search
        </button>
      </div>

      {results?.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <Link to={`/drugs/${result.displayName}`}>
                {result.displayName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default SearchPage;
