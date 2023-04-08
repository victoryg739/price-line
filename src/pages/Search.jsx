/**

Search page component that displays most recent sales, nearby amenities, historical prices and AI predicted value.
@param {object} props - The properties object.
@param {array} props.data - Array of objects that contains data of most recent sales.
@param {number} props.resaleValue - The AI predicted value.
@param {string} props.town - The name of the town to search for.
@returns {JSX.Element} - Returns the JSX element.
**/

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
  /**

  Function that generates the RapidAPI request for finding the coordinates of the town.
  @param {string} address - The address of the town.
  @returns {object} - Returns the RapidAPI request object.
  */
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

    /**

  Function that generates the RapidAPI request for finding nearby amenities.
  @param {string} coordinate - The latitude and longitude of the town.
  @param {string} type - The type of amenity to search for.
  @param {number} range - The search radius in meters.
  @returns {object} - Returns the RapidAPI request object.
  */
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

  // Sort the month from ascending order
  props.data.sort(function(a, b) {
    let dateA = new Date(a.month);
    let dateB = new Date(b.month);
    return dateA - dateB;
  });


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
            {console.log(props.data)}
            <ResaleChart resaleValue={props.resaleValue}></ResaleChart>
          </Grid>
        </Grid>
      </Container>
      <Footer></Footer>
    </Box>
  );
}

export default Search;
