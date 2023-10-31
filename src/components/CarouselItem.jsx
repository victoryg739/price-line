/**
 * Represents a carousel item component that displays information about a HDB resale flat.
 * @component
 * @param {Object} props - The props object containing information about the HDB resale flat.
 * @param {number} props.id - The id of the carousel item.
 * @param {Object} props.data - The data object containing information about the HDB resale flat.
 * @param {string} props.data.block - The block number of the HDB resale flat.
 * @param {string} props.data.street_name - The street name of the HDB resale flat.
 * @param {string} props.data.remaining_lease - The remaining lease of the HDB resale flat.
 * @param {string} props.data.flat_type - The type of HDB flat.
 * @param {number} props.data.floor_area_sqm - The floor area of the HDB resale flat in square meters.
 * @param {string} props.data.flat_model - The model of the HDB resale flat.
 * @param {string} props.data.month - The month in which the HDB resale flat was posted.
 * @param {number} props.data.resale_price - The resale price of the HDB flat.
 */
import React from "react";
import { Paper } from "@mui/material";
import homeImage1 from "../assets/home1.jpg";
import homeImage2 from "../assets/home2.jpg";
import homeImage3 from "../assets/home3.jpg";
import homeImage4 from "../assets/home4.jpg";
import homeImage5 from "../assets/home5.jpg";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

/**
 * Determines which home image to display based on the id.
 *
 * @function
 * @param {number} id - The id of the carousel item.
 * @returns {string} - The image path of the home to display.
 */
let chooseImage = (id) => {
  if (id > 4) {
    id = id - 5;
  }
  if (id === 0) {
    return homeImage1;
  } else if (id === 1) {
    return homeImage2;
  } else if (id === 2) {
    return homeImage3;
  } else if (id === 3) {
    return homeImage4;
  } else {
    return homeImage5;
  }
};

function CarouselItem(props) {
  return (
    <Paper>
      <img src={chooseImage(props.id)} alt="homeImage" style={{ width: "100%", height: "40vh", objectFit: "cover" }} />
      <Grid container sx={{ m: 5 }} rowSpacing={1}>
        <Grid alignItems="right" item xs={3}>
          <Typography variant="inherit" color="grey">
            ADDRESS:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {/* <Typography variant="h6" display="inline"> {props.data.town}</Typography> */}
          <Typography variant="body1">{props.data.block + " " + props.data.street_name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="inherit" color="grey">
            REMAINING LEASE:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{props.data.remaining_lease}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="inherit" color="grey">
            FLAT TYPE:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{props.data.flat_type}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="inherit" color="grey">
            FLOOR AREA:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{props.data.floor_area_sqm + " sqm"}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="inherit" color="grey">
            FLAT MODEL:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{props.data.flat_model}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="inherit" color="grey">
            DATE POSTED:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{props.data.month}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pr: 10, mt: 5, mb: 2 }} align="right">
          <Typography variant="h5">{"SGD$ " + props.data.resale_price}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CarouselItem;
