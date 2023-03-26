import { useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomTable from "../components/CustomTable";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/login");
    } 
  });

  return (
    <>
      <NavBar></NavBar>

      <Container>
        <Typography sx={{ mt: 6 }} component="h1" variant="h2" align="center">
          Manage Feedback
        </Typography>
        {data.length ? (
          <>
            <Typography
              color="red"
              fontWeight="bold"
              component="h1"
              variant="h6"
              align="left"
            >
              Count: {data.length}
            </Typography>

            <CustomTable
              columns={columnName}
              rows={data}
              deleteFeedback={deleteFeedback}
            ></CustomTable>
          </>
        ) : (
          <Typography
            color="black"
            fontWeight="bold"
            component="h1"
            variant="h6"
            align="center"
            sx={{mt:"37%",mb:"37%"}}
     
  
          >
            No Feedback available
          </Typography>
        )}
      </Container>
      <Footer></Footer>
    </>
  );
}

export default AdminFeedback;
