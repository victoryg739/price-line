import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "../components/CarouselItem";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import {Typography} from "@mui/material";

function Search(props) {
  return (
    <Box>
      <NavBar></NavBar>
      <Container maxWidth="lg">
        <Typography variant="h3" color="#546e7a" sx={{mt:5}}> Housing that match similar criteria</Typography>
        <Carousel sx={{mt:5}}>
          {props.data.map((prop) => (
            <CarouselItem data={prop} />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}

export default Search;
