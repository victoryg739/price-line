import logo from "../assets/logo.png";
import NavBar from "../components/NavBar";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Footer from "../components/Footer";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSumbitFeedback = async () => {
    if(!isEmailValid){
      setError(true);
      setSuccess(false);
      return
    } 
    let feedback = { name: name, email: email, message: message };
    const response = await axios.post(
      "http://127.0.0.1:8000/feedback/",
      feedback,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 201) {
      setSuccess(true);
      setError(false)
    } else {
      setError(true);
      setSuccess(false);

    }
  };

  const handleEmailChange  = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(()=>{ 
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(event.target.value)){
        return true
      }else{
        return false
      }
  })

  }

  return (
    <Box>
      <NavBar></NavBar>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 10 }}>
          Feedback
        </Typography>
        <Grid item>
          <TextField
            margin="auto"
            required
            id="name"
            label="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            sx={{ minWidth: 400, mt: 5 }}
          />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            name="email"
            label="email"
            type="email"
            error={!isEmailValid}
            helperText={!isEmailValid ? 'Please enter a valid email address' : ''}
            id="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ minWidth: 400, mt: 5 }}
          />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            name="message"
            label="message"
            type="message"
            id="message"
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ minWidth: 700, mt: 5 }}
            multiline
          />
        </Grid>

        <Button
          sx={{ mt: 6 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSumbitFeedback}
        >
          Submit
        </Button>
        {success && (
          <Alert sx={{ mt: 5 }} severity="success">
            Feedback has been successfully sent!{" "}
          </Alert>
        )}

        {error && (
          <Alert sx={{ mt: 5 }} severity="error">
            Error sending feedback. Try again!{" "}
          </Alert>
        )}
      </Grid>
      <Footer></Footer>
    </Box>
  );
}

export default Feedback;
