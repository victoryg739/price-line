import React from "react";
import NavBar from "../components/NavBar";
import DropDown from "../components/DropDown";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const townArray = [
  "ANG MO KIO",
  "BEDOK",
  "BISHAN",
  "BUKIT BATOK",
  "BUKIT MERAH",
  "BUKIT PANJANG",
  "BUKIT TIMAH",
  "CENTRAL AREA",
  "CHOA CHU KANG",
  "CLEMENTI",
  "GEYLAND",
  "HOUGANG",
  "JURONG EAST",
  "JURONG WEST",
  "KALLANG/WHAMPOA",
  "MARINE PARADE",
  "PASIR RIS",
  "PUNGGOL",
  "QUEENSTOWN",
  "SEMBAWANG",
  "SENGKANG",
  "SERANGOON",
  "TAMPINES",
  "TOA PAYOH",
  "WOODLANDS",
  "YISHUN",
];

const flatTypeArray = [
  "1 ROOM",
  "2 ROOM",
  "3 ROOM",
  "4 ROOM",
  "5 ROOM",
  "EXECUTIVE",
  "MULTI-GENERATION",
];

const storeyArray = ["GROUND", "LOW", "MEDIUM", "HIGH"];

const flatModelArray = [
  "Improved",
  "Standard",
  "Model A",
  "2-room",
  "Premium Apartment",
  "DBSS",
  "Simplified",
  "New Generation",
  "Terrace",
  "Model A2",
  "Adjoined flat",
  "Type S1",
  "Premium Apartment Loft",
  "Type S2",
  "3Gen",
  "Apartment",
  "Multi Generation",
  "Improved-Maisonette",
  "Model A-Maisonette",
  "Maisonette",
  "Premium Maisonette",
];

const remainingLeaseArray = [
  "<50 YEARS",
  "50 - 59 YEARS",
  "60 - 69 YEARS",
  "70 - 79 YEARS",
  "80 - 89 YEARS",
  "> 90 YEARS",
];

const floorAreaArray = [
  "<40 SQM",
  "40 - 49 SQM",
  "50 - 59 SQM",
  "60 - 69 SQM",
  "70 - 79 SQM",
  "80 - 89 SQM",
  "90 - 99 SQM",
  "100 - 109 SQM",
  "110 - 119 SQM",
  "120 - 129 SQM",
  "130 - 139 SQM",
  "140 - 149 SQM",
  "150 - 159 SQM",
  "160 - 169 SQM",
  "> 169 SQM",
];

function Home(props) {
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
          stateValue={props.town}
          handleChange={props.handleChange}
          title="Town"
          values={townArray}
        ></DropDown>
        <DropDown
          stateValue={props.flatType}
          handleChange={props.handleChange}
          title="Flat Type"
          values={flatTypeArray}
        ></DropDown>
        <DropDown
          stateValue={props.flatModel}
          handleChange={props.handleChange}
          title="Flat Model"
          values={flatModelArray}
        ></DropDown>
        <DropDown
          stateValue={props.floorArea}
          handleChange={props.handleChange}
          title="Floor Area"
          values={floorAreaArray}
        ></DropDown>
        <DropDown
          stateValue={props.floor}
          handleChange={props.handleChange}
          title="Floor"
          values={storeyArray}
        ></DropDown>
        <DropDown
          stateValue={props.remainingLease}
          handleChange={props.handleChange}
          title="Remaining Lease"
          values={remainingLeaseArray}
        ></DropDown>
        <Button
          sx={{ mt: 10 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={props.handleOnSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
}

export default Home;
