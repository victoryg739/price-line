import React, { useState } from "react";
import { Box, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import NavBar from "../components/NavBar";
import { townArray } from "../utils/constant";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { z } from "zod";

export default function SellResale() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const flatSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().positive().lte(99999999999), // assuming this is a string; if it's a number, change to z.number()
    bedrooms: z.string().nonempty(),
    bathrooms: z.string().nonempty(),
    area: z.number().positive(), // assuming area is string; if it's a number, change to z.number()
    address: z.string().nonempty(),
    district: z.enum(townArray), // assuming townArray is an array of strings
    // image: z.union([z.string(), z.null()]).nonempty("Image is required"), // assuming image is either a string URL or null
  });
  const [flatDetails, setFlatDetails] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    address: "",
    district: "",
    username: "",
    phoneNumber: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorSummary, setErrorSummary] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user_token") === null) {
      navigate("/user-login");
    } else {
      const tokenValue = JSON.parse(localStorage.getItem("user_token"));
      console.log(tokenValue);

      let updatedFlatDetails = { ...flatDetails, username: tokenValue.username, phoneNumber: tokenValue.phoneNumber };

      if (state && state.resalePrice != null) {
        updatedFlatDetails.price = state.resalePrice;
      }

      setFlatDetails(updatedFlatDetails);
    }
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "price") {
      value = parseInt(e.target.value.replace(/,/g, ""), 10); // Remove commas before converting to integer
      if (isNaN(value)) {
        value = ""; // or set to a default value, like 0
      }
    } else if (e.target.name === "area") {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        value = "";
      }
    }
    setFlatDetails({
      ...flatDetails,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    const validationResult = flatSchema.safeParse(flatDetails);
    console.log(validationResult.success);
    console.log(validationResult);
    if (!validationResult.success) {
      const errorFields = Object.keys(validationResult.error.formErrors.fieldErrors);
      setErrorSummary(`Errors in fields: ${errorFields.join(", ")}`);
      return;
    }
    setLoading(true); // Start the loading

    const formData = new FormData();
    formData.append("file", flatDetails.image);
    formData.append("upload_preset", "evrh1ejd");
    console.log(flatDetails);

    await axios
      .post("https://api.cloudinary.com/v1_1/dv8vcnjt5/image/upload", formData)
      .then((response) => {
        const uploadedImageUrl = response.data.url;
        console.log("Uploaded Image URL:", uploadedImageUrl);
        flatDetails.image = uploadedImageUrl;
      })
      .catch((error) => {
        flatDetails.image = null;
        console.error("Error uploading image:", error);
      });

    try {
      console.log(flatDetails);
      const response = await axios.post(
        "http://127.0.0.1:8000/listflats",
        flatDetails, // send formData instead of JSON
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      navigate("/resale/buy");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
    setLoading(false); // End the loading
  };

  return (
    <Box>
      <NavBar />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Sell Your Resale Flat
        </Typography>
        {errorSummary && (
          <Typography variant="body2" color="error" gutterBottom>
            {errorSummary}
          </Typography>
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={flatDetails.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={flatDetails.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          value={flatDetails.price.toLocaleString()} // Convert the number to a string with commas
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Bedrooms</InputLabel>
          <Select name="bedrooms" value={flatDetails.bedrooms} onChange={handleChange}>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5+"}>5+</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Bathrooms</InputLabel>
          <Select name="bathrooms" value={flatDetails.bathrooms} onChange={handleChange}>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5+"}>5+</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Area (in sqft)"
          name="area"
          value={flatDetails.area}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={flatDetails.address}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>District</InputLabel>
          <Select name="district" value={flatDetails.district} onChange={handleChange}>
            {townArray.map((town) => (
              <MenuItem value={town}>{town}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <InputLabel color="info" htmlFor="image-upload" sx={{ mt: 3, mb: 2 }}>
          Upload Image of your flat
        </InputLabel>

        <FormControl fullWidth margin="normal">
          <input
            id="image-upload"
            type="file"
            name="image"
            onChange={(e) => {
              setFlatDetails({
                ...flatDetails,
                image: e.target.files[0],
              });
            }}
          />
        </FormControl>

        <Box mt={3} display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
