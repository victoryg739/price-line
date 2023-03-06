import { useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomTable from "../components/CustomTable";
import { useState } from "react";

function AdminFeedback() {
  const [data, setData] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/feedback/")
      .then((response) => setData(response.data))
      .catch();
  }, [deleteTrigger]); //need trigger this when deletefeedback is called

  let columnName = ["name", "email", "message", ""];
  let deleteFeedback = (e) => {
    axios
      .delete(`http://127.0.0.1:8000/feedback/delete/${e.target.value}`)
      .then((response) => {
        console.log(response.data);
        setDeleteTrigger((prevNum) => prevNum + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      <NavBar></NavBar>
      <CustomTable
        columns={columnName}
        rows={data}
        deleteFeedback={deleteFeedback}
      ></CustomTable>
      <Footer></Footer>
    </Box>
  );
}

export default AdminFeedback;