import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
const DrugDetails = () => {
  const { drug_name } = useParams();
  const [drugDetails, setDrugDetails] = useState({});
  const [ndcs, setNdcs] = useState([]);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`https://lhncbc.nlm.nih.gov/REST/rxcui.json?name=${drug_name}`);
        if (response.data.idGroup.rxnormId) {
          const rxcui = response.data.idGroup.rxnormId[0];
          const detailsResponse = await axios.get(`https://lhncbc.nlm.nih.gov/REST/rxcui/${rxcui}/allrelated.json`);
          setDrugDetails(detailsResponse.data.relatedGroup.conceptGroup[0].conceptProperties[0]);
          
          const ndcResponse = await axios.get(`https://lhncbc.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`);
          setNdcs(ndcResponse.data.ndcGroup.ndcList.ndc);
        } else {
          setDrugDetails(null);
        }
      } catch (error) {
        console.error('Error fetching drug details:', error);
      }
    };

    fetchDrugDetails();
  }, [drug_name]);

  if (!drugDetails) return <p>Drug details not found.</p>;

  return (
    <div>
      <h2>{drugDetails.name}</h2>
      <p><strong>RxCUI:</strong> {drugDetails.rxCUI}</p>
      <p><strong>Synonyms:</strong> {drugDetails.synonym}</p>

      <h3>Associated NDCs:</h3>
      <ul>
        {ndcs.map((ndc, index) => (
          <li key={index}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrugDetails;