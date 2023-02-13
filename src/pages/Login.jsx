import React from 'react'
import logo from "../assets/logo.png";
import NavBar from "../components/NavBar";

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
          <Avatar
           sx={{ width: 100, height: 100 }}
          src = {logo}
          />
            
          
        <Typography component="h1" variant="h5" align ="center">
            Login
          </Typography>
        <p><TextField
              margin="auto"
              required
              
              id="username"
              label="Username"
              name="username"
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
            <Button
          sx={{ mt: 10 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={props.handleOnSubmit}
        >Login</Button>
        
        </Grid>
        
       </div>


       
  )
}

export default Login