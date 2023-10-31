import React from "react";

import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";
import { FaAddressCard } from "react-icons/fa";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LiaToiletSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";

export default function BuyResale() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/listflats")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCardClick = (item) => {
    navigate(`${item.id}`);
  };

  return (
    <Box>
      <NavBar></NavBar>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ my: 3, minHeight: "100vh", width: "95%", mx: "auto" }}
      >
        {data.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ minWidth: 800 }}>
              <CardActionArea onClick={() => handleCardClick(item)}>
                <CardMedia component="img" height="300" image={item.image} alt="flat image" sx={{ width: "100%" }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography mt={1} variant="body2" color="text.secondary">
                    <Box component="span" display="flex" alignItems="center">
                      <FaAddressCard />
                      <Box ml={1}>{item.address}</Box>
                    </Box>
                  </Typography>
                  <Typography mt={1} variant="body1" color="text.secondary" fontWeight="600">
                    S$ {item.price}
                  </Typography>
                  <Typography mt={1} variant="body1" color="text.secondary">
                    <Box component="span" display="flex" alignItems="center">
                      <MdOutlineBedroomChild />
                      <Box ml={1} mr={2}>
                        {item.bedrooms}
                      </Box>
                      <LiaToiletSolid />
                      <Box ml={1}>{item.bathrooms}</Box>
                    </Box>
                  </Typography>
                  <Typography mt={1} variant="body1" color="text.primary">
                    {item.area} sqft
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
