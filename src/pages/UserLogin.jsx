import React from "react";
import NavBar from "../components/NavBar";

import { Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import TextField from "@mui/material/TextField";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

export default function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    try {
      const user = { username: username, password: password };
      const response = await axios.post("http://127.0.0.1:8000/login", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        // Handle successful login, e.g., redirect to dashboard or set user state
        localStorage.setItem("user_token", JSON.stringify(response.data));
        navigate("/resale/buy");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        setMessage(error.response.data.message || "Error occurred");
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage("Error in sending request");
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
          User Login
        </Typography>
        {message && (
          <Alert sx={{ mt: 5 }} severity="error">
            {message}
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
        <Button sx={{ mt: 2, ml: 65 }} variant="contained" onClick={() => navigate("/user-register")}>
          Register User?
        </Button>
        <Button sx={{ mt: 2, ml: 65 }} variant="contained" onClick={() => navigate("/admin-login")}>
          Admin Login?
        </Button>
        <Button sx={{ mt: 5 }} variant="contained" endIcon={<SendIcon />} onClick={handleLogin}>
          Login
        </Button>
      </Grid>
      <Footer></Footer>
    </Box>
  );
}
