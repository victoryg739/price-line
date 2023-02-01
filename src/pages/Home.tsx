import React from "react";
import NavBar from "../components/NavBar";
import DropDown from "../components/DropDown";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

const townArray = ["ANG MO KIO","BEDOK","BISHAN","BUKIT BATOK","BUKIT MERAH","BUKIT PANJANG","BUKIT TIMAH","CENTRAL AREA","CHOA CHU KANG","CLEMENTI","GEYLAND","HOUGANG","JURONG EAST","JURONG WEST","KALLANG/WHAMPOA","MARINE PARADE","PASIR RIS","PUNGGOL","QUEENSTOWN","SEMBAWANG","SENGKANG","SERANGOON","TAMPINES","TOA PAYOH","WOODLANDS","YISHUN"];
const flatTypeArray = ["1 ROOM","2 ROOM","3 ROOM","4 ROOM","5 ROOM","EXECUTIVE","MULTI-GENERATION"]

function Home() {
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
        <DropDown 
            title="Town"
            values ={townArray}
        ></DropDown>
        <DropDown 
            title="Flat Type"   
            values ={flatTypeArray}
        ></DropDown>
      </Grid>
    </Box>
  );
}

export default Home;
