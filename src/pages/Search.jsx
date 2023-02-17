import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "../components/CarouselItem";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Footer from "../components/Footer";
import Chart from "../components/Chart";

function Search(props) {
  return (
    <Box>
      <NavBar></NavBar>
      <Container maxWidth="lg">
        <Typography variant="h4" color="black" sx={{ mt: 5 }}>
          Top 10 Most Recent Sales
        </Typography>
        <Carousel sx={{ mt: 5 }}>
          {props.data.map((prop, index) => (
            <CarouselItem data={prop} id={index} />
          ))}
        </Carousel>
        <Chart data = {props.data}></Chart>

      </Container>
      <Footer></Footer>

    </Box>
  );
}

export default Search;
