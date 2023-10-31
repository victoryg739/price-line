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
import UserLogin from "./UserLogin";

export default function UserRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        { username: username, password: password, phoneNumber: phoneNumber },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        setMessage("Account Succesfully Created");
        navigate("/user-login");
        // Handle successful login, e.g., redirect to dashboard or set user state
      } else {
        setMessage("Error Signing Up!");
        console.log(message);
      }
    } catch {
      setMessage("Error Signing Up!");
    }
  };
  console.log(message);
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
          User Registration
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

        <TextField
          margin="normal"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          sx={{ mt: 6, width: "40%", maxWidth: "md" }}
        />

        <TextField
          margin="normal"
          required
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone Number"
          type="text"
          id="phoneNumber"
          sx={{ mt: 6, width: "40%", maxWidth: "md" }}
        />

        <Button sx={{ mt: 2, ml: 65 }} variant="contained" onClick={() => navigate("/user-login")}>
          User Login?
        </Button>
        <Button sx={{ mt: 5 }} variant="contained" endIcon={<SendIcon />} onClick={handleRegister}>
          Register
        </Button>
      </Grid>
      <Footer></Footer>
    </Box>
  );
}
