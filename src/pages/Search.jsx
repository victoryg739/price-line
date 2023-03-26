import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "../components/CarouselItem";
import Footer from "../components/Footer";
import HistoricalChart from "../components/HistoricalChart";
import NavBar from "../components/NavBar";
import Nearby from "../components/Nearby";
import ResaleChart from "../components/ResaleChart";


function Search(props) {
  const [nearbyFood, setNearbyFood] = useState(false);
  const [nearbyTrain, setNearbyTrain] = useState(false);

  const findCoordinates = (address) => {
    return {
      method: "GET",
      url: "https://google-maps-geocoding3.p.rapidapi.com/geocode",
      params: { address: address },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "google-maps-geocoding3.p.rapidapi.com",
      },
    };
  };
  const findNearby = (coordinate, type, range) => {
    return {
      method: "GET",
      url: "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
      params: {
        location: coordinate,
        type: type,
        radius: range,
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
      },
    };
  };

  useEffect(() => {
    axios
      .request(findCoordinates(props.town + " Singapore"))
      .then(function (response) {
        let coordinate =
          response.data["latitude"] + "," + response.data["longitude"];
        console.log(coordinate);

        let type = "restaurant";
        axios
          .request(findNearby(coordinate, type, 5000))
          .then(async function (response) {
            setNearbyFood(response.data.results.slice(0, 3));
          })
          .catch(function (error) {
            console.error(error);
          });

        type = "supermarket";
        setTimeout(() => {
          axios
            .request(findNearby(coordinate, type, 5000))
            .then(function (response) {
              setNearbyTrain(response.data.results.slice(0, 3));
            })
            .catch(function (error) {
              console.error(error);
            });
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box>
      <NavBar></NavBar>
      <Container maxWidth="lg">
        <Typography variant="h4" color="black" sx={{ mt: 5 }}>
          Most Recent Sales
        </Typography>
        <Carousel sx={{ mt: 5 }}>
          {props.data.map((prop, index) => (
            <CarouselItem data={prop} id={index} />
          ))}
        </Carousel>

        {nearbyFood && nearbyTrain && (
          <Box>
            <Typography variant="h4" color="black" sx={{ mt: 5 }}>
              Nearby Amenities
            </Typography>
            <Nearby food={nearbyFood} train={nearbyTrain}></Nearby>
          </Box>
        )}

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography align="center" variant="h5" color="black" sx={{ m: 5 }}>
              Historical Prices
            </Typography>
            <HistoricalChart data={props.data}></HistoricalChart>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="h5" color="black" sx={{ m: 5 }}>
              AI Predicted Value
            </Typography>
            <ResaleChart resaleValue={props.resaleValue}></ResaleChart>
          </Grid>
        </Grid>
      </Container>
      <Footer></Footer>
    </Box>
  );
}

export default Search;
