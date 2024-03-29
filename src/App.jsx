/**

The main App component of the Resale Property Finder web app. It defines the routing and renders the respective pages based on the URL path.
@return {JSX.Element} The rendered React element
@constructor

  
  
  State hook to store the current filter values for the property search
  @type {Object}
  @property {string} town - The selected town for the property search
  @property {string} flatType - The selected flat type for the property search
  @property {string} flatModel - The selected flat model for the property search
  @property {string} floorArea - The selected floor area for the property search
  @property {string} floor - The selected floor range for the property search
  @property {string} remainingLease - The selected remaining lease for the property search
  */
import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AdminLogin from "./pages/AdminLogin";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";
import Calculator from "./pages/Calculator";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import BuyResale from "./pages/BuyResale";
import SellResale from "./pages/SellResale";
import ManageResale from "./pages/ManageResale";
import BuyResaleId from "./pages/BuyResaleId";

function App() {
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState({
    town: "ANG MO KIO",
    flatType: "Any",
    flatModel: "Any",
    floorArea: "Any",
    floor: "Any",
    remainingLease: "Any",
  });

  const [data, setData] = useState(null);
  const [resaleValue, setResaleValue] = useState(null);

  const handleOnSubmit = async (event) => {
    const response = await axios.post("http://localhost:8000/flat/", filterValue);
    if (response.data.result.records.length === 0) {
      alert("No data matching the filtered results found, please try adjusting the filters");
    } else {
      setData(response.data.result.records);
      console.log(response.data.result.resaleValue);
      setResaleValue(response.data.result.resaleValue);
      navigate("/search");
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "Town") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        town: event.target.value,
      }));
    } else if (event.target.name === "Flat Type") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        flatType: event.target.value,
      }));
    } else if (event.target.name === "Flat Model") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        flatModel: event.target.value,
      }));
    } else if (event.target.name === "Floor Area") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        floorArea: event.target.value,
      }));
    } else if (event.target.name === "Floor") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        floor: event.target.value,
      }));
    } else if (event.target.name === "Remaining Lease") {
      setFilterValue((prevFilterValue) => ({
        ...prevFilterValue,
        remainingLease: event.target.value,
      }));
    }
  };

  return (
    <Routes>
      <Route path="/resale/buy" element={<BuyResale />} />
      <Route path="/resale/buy/:id" element={<BuyResaleId />} />

      <Route path="/resale/sell" element={<SellResale />} />
      <Route path="/resale/manage" element={<ManageResale />} />

      <Route
        path="/"
        element={
          <Home
            town={filterValue.town}
            flatType={filterValue.flatType}
            flatModel={filterValue.flatModel}
            floorArea={filterValue.floorArea}
            floor={filterValue.floor}
            remainingLease={filterValue.remainingLease}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
          />
        }
      />
      <Route path="/search" element={<Search data={data} resaleValue={resaleValue} town={filterValue.town} />} />
      <Route path="calculator" element={<Calculator />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin" element={<AdminFeedback />} />
    </Routes>
  );
}

export default App;
