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
        `https://rxnav.nlm.nih.gov/REST/drugs.xml?name=${searchTerm}`
      );
      if (response.data) {
        const result = xmljs.xml2json(response.data, { compact: true, spaces: 2 });
        const jsonResult = JSON.parse(result);

        // Extract the relevant data from the JSON
        const drugGroups = jsonResult.rxnormdata?.drugGroup?.conceptGroup || [];
        const parsedResults = drugGroups.flatMap(group =>
          group.conceptProperties.map(prop => ({
            rxcui: prop.rxcui?._text || '',
            name: prop.name?._text || '',
            synonym: prop.synonym?._text || '',
            tty: prop.tty?._text || '',
            language: prop.language?._text || '',
            suppress: prop.suppress?._text || ''
          }))
        );
        
        setResults(parsedResults);
        setError("");
      } else {
        setResults([])
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
        <table className="results-table">
          <thead>
            <tr>
              <th>RxCUI</th>
              <th>Name</th>
              <th>Synonym</th>
              <th>TTY</th>
              <th>Language</th>
              <th>Suppress</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.rxcui}</td>
                <td>{result.name}</td>
                <td>{result.synonym}</td>
                <td>{result.tty}</td>
                <td>{result.language}</td>
                <td>{result.suppress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default SearchPage;
