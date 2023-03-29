/**
 * Nearby component renders a list of nearby restaurants and supermarkets.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.food - An array of objects containing information about nearby restaurants.
 * @param {string} props.food[].name - The name of the restaurant.
 * @param {string} props.food[].address - The address of the restaurant.
 * @param {string} props.food[].phone_number - The phone number of the restaurant.
 * @param {string} props.food[].website - The website of the restaurant.
 * @param {Array<Object>} props.train - An array of objects containing information about nearby supermarkets.
 * @param {string} props.train[].name - The name of the supermarket.
 * @param {string} props.train[].address - The address of the supermarket.
 * @returns {JSX.Element} - Rendered component.
 */

import { Paper } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalGroceryStoreTwoToneIcon from "@mui/icons-material/LocalGroceryStoreTwoTone";
import Link from "@mui/material/Link";
function Nearby(props) {
  return (
    <Paper>
      <Grid container sx={{ m: 5, p: 5 }}>
        <Grid alignItems="right" item xs={12}>
          <Typography sx={{ mb: 1 }} variant="h6" color="grey">
            <RestaurantIcon sx={{ mr: 1 }} color="primary"></RestaurantIcon>
            Food
          </Typography>
        </Grid>
        {props.food.map((prop) => (
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              {prop.name}
            </Typography>
            <Typography variant="body1">{prop.address}</Typography>
            <Typography variant="body1">{prop.phone_number}</Typography>
            <Link
              onClick={() => {
                window.location.href = prop.website;
              }}
              variant="body1"
            >
              {prop.website}
            </Link>
          </Grid>
        ))}

        <Grid alignItems="right" sx={{ mt: 5 }} item xs={12}>
          <Typography sx={{ mb: 1 }} variant="h6" color="grey">
            <LocalGroceryStoreTwoToneIcon sx={{ mr: 1 }} color="warning"></LocalGroceryStoreTwoToneIcon>
            Supermarket:
          </Typography>
        </Grid>

        {props.train.map((prop) => (
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              {prop.name}
            </Typography>
            <Typography variant="body1">{prop.address}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}


export default Nearby;
