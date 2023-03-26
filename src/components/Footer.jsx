import React from 'react'
import { Box } from '@mui/system'
import { Paper } from '@mui/material'
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
  return (
    <Paper sx={{marginTop: 'calc(10% + 30px)', bottom: 0,background: "#659DBD"}} component="footer" square variant="outlined">
    <Container maxWidth="lg">
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          bottom: 0,
          my:1
        }}
      >
          <img style ={{cursor:"pointer"}} onClick ={()=>{navigate("/")}} src={Logo} width="50" height="50" alt="LOGO" />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          mb: 2,
        }}
      >
        <Typography variant="caption" color="initial">
        Copyright © Price Line 2023.
        </Typography>
      </Box>
    </Container>
  </Paper>
  )
}

export default Footer