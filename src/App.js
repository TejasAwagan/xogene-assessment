import { useState } from "react";
import "./App.css";
import Search from "./Search";
import DrugDetails from "./DrugDetails";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [activeDrugDetails, setActiveDrugDetails] = useState("");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Search setActiveDrugDetails={setActiveDrugDetails} />}
          exact='/'
          ></Route>
          <Route
            path="/drugs-details"
            element={<DrugDetails activeDrugDetails={activeDrugDetails} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
