import React from "react";
import logo from "../assets/logo.png";
import NavBar from "../components/NavBar";

import { Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";



function Login() {
  const navigate = useNavigate();
  const [errorAuthenticate, seterrorAuthenticate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let handleAdminLogin = async (event) => {
    try {
      const user = { username: username, password: password };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        user,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response");
      if (response.status === 200) {
        // Initialize the access & refresh token in localstorage.
        localStorage.clear();  
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response.status === 401) {
        // Handle 401 Unauthorized error
        localStorage.clear();
        seterrorAuthenticate(true);
        console.log("Unauthorized");
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <NavBar></NavBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        //justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 10 }}>
          Admin Login
        </Typography>
        {errorAuthenticate && (
          <Alert sx={{ mt: 5 }} severity="error">
            Wrong username or password. Try again!{" "}
          </Alert>
        )}

        <TextField
          margin="auto"
          required
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          sx={{ mt: 6, width: "40%", maxWidth: "md" }}
        />

        <TextField
          margin="normal"
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          id="password"
          sx={{ mt: 6, width: "40%", maxWidth: "md" }}
        />

        <Button
          sx={{ mt: 10 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleAdminLogin}
        >
          Login
        </Button>
      </Grid>
      <Footer></Footer>
    </Box>
  );
}

export default Login;
