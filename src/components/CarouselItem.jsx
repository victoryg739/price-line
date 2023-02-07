import React from 'react'
import{Paper,Button, Box} from '@mui/material'
import homeImage from "../assets/home.jpg"
import {Typography} from '@mui/material'

function CarouselItem(props) {
  return (
        <Paper>
          {console.log("start")}
            <img src={homeImage} alt="homeImage" style={{width:"100%",height:"40vh",objectFit:"cover"}}/>
            <Typography variant="h5">{props.data.town}</Typography>

            <Typography variant="h5">{props.data.block +" "+ props.data.street_name}</Typography>
            <Typography variant="h5">{props.data.floor_area_sqm +" sqm"}</Typography>
            <Typography variant="h5">{"SGD$ " +props.data.resale_price}</Typography>

            {console.log(props.data.town)}
            <Button className="CheckButton">
                Check it out!
            </Button>3
            {console.log("end")}
        </Paper>    
    )
}

export default CarouselItem