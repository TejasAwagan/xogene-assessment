import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = (setActiveDrugDetails) => {
  const [searchTerm, setSerchTerm] = useState("");
  const data = [
    {
      name: "drug1",
      example: "azithromycin",
    },
    {
      name: "drug2",
      example: "azithromycin",
    },
    {
      name: "drug3",
      example: "azithromycin",
    },
  ];
  const [result, setResult] = useState([]);
  const [error, setError] = useState("Nothing to show, Kindly search the drug");

  const handleSearch = async () => {
    try {
      let test = data.filter((localData) =>
        localData.name.includes(searchTerm)
      );

      setResult(test);
      // const response = await  axios.get('https://lhncbc.nlm.nih.gov/RxNav/APIs/api-RxNorm.getDrugs.html')
      // console.log(response, 'response')
    } catch (e) {
      console.log(e, "e");
    }
  };
  return (
    <div className="container">
      <div className="button-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSerchTerm(e.target.value);
          }}
          placeholder="search here"
          className="search-bar"
        />
        <button onClick={handleSearch} className="button-primary">
          Search
        </button>
      </div>
      {result.length > 0 ? (
        <ul>
          {result.map((data, index) => {
            return (
              <h1>
                <li
                  key={index}
                  onClick={() => {
                    setActiveDrugDetails(data);
                  }}
                >
                  <Link to={"/drug-details"} />
                  {data.name}
                </li>
              </h1>
            );
          })}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default Search;
