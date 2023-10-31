import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";
import NavBar from "../components/NavBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";
import { FaAddressCard } from "react-icons/fa";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LiaToiletSolid } from "react-icons/lia";
import { Container } from "@mui/material";

export default function ManageResale() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [username, setUserName] = useState([]);

  const fetchData = async () => {
    if (localStorage.getItem("user_token") === null) {
      navigate("/user-login");
    } else {
      const tokenValue = JSON.parse(localStorage.getItem("user_token"));
      setUserName(tokenValue.username)
      try {
        const response = await axios.get(`http://localhost:8000/listflats/${tokenValue.username}/`);
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:8000/listflats/${id}`);
    if (response.status == 200) {
      console.log("deleted successfully");
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <NavBar></NavBar>
      <Container>
        <Typography my={5} variant="h3" display="block">
          Manage Listings For User: {username}
        </Typography>

        {data.length === 0 && (
          <div>
            <Typography my={20} variant="h4">
              No Listing Availiable
            </Typography>
          </div>
        )}
      </Container>
      <Grid container alignItems="center" justifyContent="center" spacing={3} sx={{ mt: 1, width: "95%", mx: "auto" }}>
        {data.map((item) => (
          <Grid item xs={12}>
            <Card sx={{ minWidth: 800 }}>
              <CardActionArea>
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
                  <Typography
                    mt={1}
                    variant="body1"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    <Button variant="contained" onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
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
