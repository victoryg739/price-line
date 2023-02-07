import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Route, Routes,useNavigate } from "react-router-dom";
import axios from 'axios';


function App() {
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState({
    town: "null",
    flatType: "null",
    flatModel: "null",
    floorArea: "null",
    floor: "null",
    remainingLease: "null",
  });

  const [data,setData ]= useState(null);
  const handleOnSubmit = async(event)=>{
      console.log(filterValue);
      const response = await axios.post('http://127.0.0.1:8000/api/',filterValue)
      console.log(response.data.result.records);
      setData(response.data.result.records);
      console.log(data);
      navigate('/search');    
      //console.log(response)
  };
  // {    "town": "null",
  //     "flatType": "null",
  //     "flatModel": "null",
  //     "floorArea": "null",
  //     "floor": "null",
  //     "remainingLease": "null",}

  const handleChange = (event) => {
    console.log(event.target.value);
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
            handleOnSubmit = {handleOnSubmit}
       
          />
        }
       
      />
      <Route path="/search" element={<Search 
        data = {data}
      />} />

    </Routes>
  );
}

export default App;
