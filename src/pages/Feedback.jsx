/**

Component for managing feedback given by users
@component
*/

import NavBar from "../components/NavBar";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Footer from "../components/Footer";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import feedbackImage from "../assets/feedback.png";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSumbitFeedback = async () => {
    if (!isEmailValid) {
      setError(true);
      setSuccess(false);
      return;
    }
    let feedback = { name: name, email: email, message: message };
    const response = await axios.post(
      "http://34.143.190.20:8000/feedback/",
      feedback,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 201) {
      setSuccess(true);
      setError(false);
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(() => {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(event.target.value)) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <>
    <NavBar></NavBar>

    <Container>

      <Grid container sx={{ mt: 5, mb:10,p: 5 }}>
        <Grid item xs={7} sx={{ pr: 10 }}>
          <Typography
            color="blue"
            fontWeight="bold"
            component="h1"
            variant="h2"
            align="center"
          >
            Customer Feedback
          </Typography>
          <Typography sx={{ mt: 5 }} component="h1" variant="h6" align="left">
            At Price Line, we believe that feedback is the cornerstone of growth
            and improvement. We value the opinions of our users and strive to
            create a platform that meets their needs and exceeds their
            expectations. 
          </Typography>
          <Typography component="h1" variant="h6" align="left">
            If you have any feedback for us, please do not hesitate to reach
            out. We welcome all kinds of feedback, we will use it to improve our services. We are committed to
            providing a user-friendly experience that meets the needs of our
            users, and your feedback is crucial to achieving this goal.
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <img
            src={feedbackImage}
            alt="homeImage"
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{border:1 ,borderRadius:5}}
      >
        <Grid item>
        <Typography
            fontWeight="500"
            component="h1"
            variant="h4"
            sx={{mt:3}}
            align="center"
          >Leave a message</Typography>
        </Grid>
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
            helperText={
              !isEmailValid ? "Please enter a valid email address" : ""
            }
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
          sx={{ mt: 6, mb:6 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSumbitFeedback}
        >
          Submit
        </Button>
        {success && (
          <Alert sx={{ mt: 5,mb:5 }} severity="success">
            Feedback has been successfully sent!{" "}
          </Alert>
        )}

        {error && (
          <Alert sx={{ mt: 5,mb:5}} severity="error">
            Error sending feedback. Try again!{" "}
          </Alert>
        )}
      </Grid>
      
    </Container>
    <Footer></Footer>

    </>
  );
}

export default Feedback;
