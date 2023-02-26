import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Box } from "@mui/system";
import NavBar from "../components/NavBar";

function Admin() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/login");
    } 
  });
  return (
      <Box>
        <NavBar></NavBar>
 
        <Footer></Footer>
      </Box>
  );
}

export default Admin;
