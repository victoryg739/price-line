import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Container, Box, Grid, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FaAddressCard } from "react-icons/fa";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LiaToiletSolid } from "react-icons/lia";
import { IoIosResize } from "react-icons/io";
import Divider from "@mui/material/Divider";

export default function BuyResaleId() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log(id);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8000/listflats/${id}`);
    console.log(response);
    setData(response.data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <Box>
      <NavBar></NavBar>
      <Container>
        <Card sx={{ mt: 6 }}>
          <CardActionArea>
            <CardMedia component="img" height="300" image={data.image} alt="flat details" />
            <CardContent></CardContent>
          </CardActionArea>
        </Card>
        <Typography variant="h3" mt={5}>
          {data.title}
        </Typography>
        <Typography variant="h4" mt={5}>
          {data.district}
        </Typography>
        <Typography variant="h5" mt={1}>
          {data.address}
        </Typography>
        <Divider light sx={{ my: 10 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">$ {data.price}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box component="span" display="flex" alignItems="center" style={{ fontSize: "1.4rem" }}>
              <MdOutlineBedroomChild />
              <Box ml={1} mr={5}>
                {data.bedrooms} bedrooms
              </Box>
              <LiaToiletSolid />
              <Box ml={1} mr={5}>
                {data.bathrooms} bathrooms
              </Box>
              <IoIosResize />
              <Box ml={1} mr={5}>
                {data.area} sqft
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider light sx={{ my: 10 }} />

        <Typography variant="h4">About The Property</Typography>
        <Typography mt={5}>{data.description}</Typography>
        <Divider light sx={{ my: 10 }} />

        <Typography variant="h4">Contact Information</Typography>
        <Typography mt={5}>Username: {data.username}</Typography>
        <Typography my={2}>Contact No: {data.phoneNumber}</Typography>
      </Container>
    </Box>
  );
}
