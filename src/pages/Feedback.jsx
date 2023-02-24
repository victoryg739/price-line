import logo from "../assets/logo.png";
import NavBar from "../components/NavBar";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Footer from "../components/Footer";
import { Box } from "@mui/system";
function Feedback(props) {
 

  return (
    <Box>
      <NavBar></NavBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        
        
        //justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
      
        <Avatar sx={{ width: 100, height: 100 }} src={logo} />
        
        <p/>
        
        
          <TextField
            margin="auto"
            required
            id="name"
            label="name"
            name="name"
            autoFocus
            sx={{width:'20%'}}
          />
        
        
        
          <TextField
            margin="normal"
            required
            name="email"
            label="email"
            type="email"
            id="email"
            sx={{width:'20%'}}
          />
        <TextField
            margin="normal"
            required
            name="message"
            label="message"
            type="message"
            id="message"
            sx={{width:'50%', }}
            multiline
            
          />
        
        <Button
          sx={{ mt: 10 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={props.handleOnSubmit}
        >
          Submit
        </Button>
        
      
      
</Grid>
<Footer></Footer>
    </Box>
  );
}

export default Feedback;
