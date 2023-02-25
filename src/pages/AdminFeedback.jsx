import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomTable from "../components/CustomTable";
import { useState } from "react";
function AdminFeedback() {
  const [data,setData] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/feedback/")
      .then((response) => setData(response.data))
      .catch();
  }, []);
  let columnName =["name","email","message"];
  return (
    <Box>
      <NavBar></NavBar>
      <CustomTable columns = {columnName} rows = {data} ></CustomTable>
      <Footer></Footer>
    </Box>
  );
}

export default AdminFeedback;
