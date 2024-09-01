import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DrugDetails = (drugDetails) => {
  return <div className="container">
    <div>
      <h1>
        {drugDetails.name}
        
      </h1>
    </div>
  </div>;
};

export default DrugDetails;
