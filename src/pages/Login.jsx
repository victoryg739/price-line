import React from 'react'
import logo from "../assets/logo.png";
import NavBar from "../components/NavBar";
import DropDown from "../components/DropDown";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar'
function Login(props) { 
  const inputProps = {
      step: 300,
    };
    
  return (
   
    
       <div>
        <NavBar></NavBar>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        //justifyContent="center"
        style={{ minHeight: "100vh" }}>
          <Avatar sx={{ m: 2 }} src = {logo}>
            
          </Avatar>
        <Typography component="h1" variant="h5" align ="center">
            Login
          </Typography>
        <p><TextField
              margin="auto"
              required
              
              id="email"
              label="Username"
              name="email"
              autoFocus
              
            /></p>
            <p><TextField
              margin="normal"
              required
              
              name="password"
              label="Password"
              type="password"
              id="password"
              
            /></p>
        </Grid>
        
       </div>


       
  )
}

export default Login