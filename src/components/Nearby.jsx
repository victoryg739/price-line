import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TrainTwoToneIcon from "@mui/icons-material/TrainTwoTone";
import LocalGroceryStoreTwoToneIcon from "@mui/icons-material/LocalGroceryStoreTwoTone";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Navigate, useNavigate } from "react-router-dom";
function Nearby(props) {
  const navigate = useNavigate();
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

//   return (
//     <Paper>
//       <Grid container sx={{ m: 5 }} rowSpacing={2}>
//         {console.log("123 " +props.food)}
//         {console.log("1" + Array.isArray(props.food))}
//         {chec}

//       </Grid>
//     </Paper>
//   );
// }

export default Nearby;
